import {Schema, model, models} from "mongoose"


const PromptSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The user is required"]
    },
    
    prompt: {
        type: "string",
        required: [true, "Ai prompt text is required"]
    },

    tag: {
        type: "String",
        required: [true, "Tag is required"]
    }

})

const Prompt =  models.Prompt || model("Prompt", PromptSchema);

export default Prompt;