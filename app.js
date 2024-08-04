import blessingController from "./Controllers/blessingController.js"
import express from "express"
import dotenv from "dotenv"
import OpenAI from "openai"
import cors from "cors"

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());

const openai = new OpenAI ({
    apiKey:process.env.OPENAI_API_KEY,    
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/gpt', blessingController.post);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on http://localhost:${process.env.PORT}`)
  })

console.log("hi")