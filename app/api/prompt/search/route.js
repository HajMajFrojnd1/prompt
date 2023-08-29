import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req) => {

    const searchParam = req.nextUrl.searchParams.get("searchParam");
    const searchParamRegex = new RegExp(searchParam + '.*');
    const tagSearchParamRegex = new RegExp('.*' +searchParam + '.*')

    try {

        await connectToDB();
        
        const users = await User.find({
            username: {$regex: searchParamRegex}
        }).select("_id");


        if(users && users.length > 0){
            const prompts = await Prompt.find({
                creator: {$in: users}
            }).populate("creator");
            return new Response(JSON.stringify(prompts), {status: 200});


        }else{

            const prompts = await Prompt.find({
                tag: {$regex: tagSearchParamRegex}
            }).populate("creator");

            return new Response(JSON.stringify(prompts), {status: 200});

        }

    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts", {status: 500});
    }

}