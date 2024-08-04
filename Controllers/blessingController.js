import dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI ({
    apiKey:process.env.OPENAI_API_KEY,    
});

const appController={
   post: async (req, res) => {
            const { event, age, type, tone, length } = req.body;

    const runPrompt = async()=>{
        const prompt = `Please give me 3  blessings as a ${type} for ${event} for ${age} years old, write it in ${tone} tone and ${length} length
            Also, return the response in JSON format that can be parsed as follows:
            {
            "1":"...",
            "2":"...",
            "3":"..."
            }`;
        
            const response = await openai.chat.completions.create({
              model:"gpt-4o",
              messages:[{role: "system", content: prompt}],
              max_tokens:100,
          });
      
          console.log(response.choices[0].message.content)
          let parsedResponse;
          try{
            parsedResponse = JSON.parse(response.choices[0].message.content)
          }
          catch (error){
              console.error("Error parsing JSON response:", error)
              res.status(500).send("Error parsing JSON response")
              return{}
          }    
        console.log("prompt 1:", parsedResponse["1"]);
        console.log("prompt 2:", parsedResponse["2"]);
        console.log("prompt 3:", parsedResponse["3"]);
        
        res.json(parsedResponse)
        }
    
        try {
            const response = await runPrompt();
            res.send(response);  // שולח את התגובה ללקוח
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
   
};
export default appController;