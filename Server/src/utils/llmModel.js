import { ChatGroq } from "@langchain/groq"
import { OpenAI } from "@langchain/openai"


const llm = new ChatGroq({
    model : "openai/gpt-oss-120b",
temperature: 0 ,
maxTokens:undefined,
maxRetries: 2
})


const openAi = new OpenAI({
    model:"gpt-3.5-turbo-instruct",
    temperature:0,
    maxTokens:undefined,
    timeout:undefined,
    maxRetries:2,
            apiKey: process.env.OPENAI_API_KEY
})