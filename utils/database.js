import mongoose from "mongoose";


let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("Connected mongoDB is");
        return;
    }else{
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "share_prompt"
            })

            isConnected = true;

            console.log("Connected mongoDB is");
        } catch (error) {
            console.log(error);
        }
    }
}