import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";


export async function GET(req, {params}){

    try {
        
        await connectToDB();

        const creator = await User.findOne({
            email: params.email
        })

        const prompts = await Prompt.find({
            creator: creator.id
        }).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 201});

    } catch (error) {
        console.log(error);

        return new Response("Cant fetch posts", { status: 500});
    }

}