const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
    message:{
        type:String
    },
    isread:{
        type:Boolean,
        default:false
    },
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversations"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
}, {timestamps:true})

const MessagesModel = mongoose.model("messages", MessagesSchema);

module.exports = MessagesModel;