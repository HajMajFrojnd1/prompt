import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function POST(req){

    const {prompt, userId, tag} = await req.json();

    try {
        
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId, 
            prompt: prompt, 
            tag: tag
        }); 

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new prompt", {status: 500});
    }

}