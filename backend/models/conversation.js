const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"messages"
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    clients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
})

const ConversationModel = mongoose.model("conversations", ConversationSchema);

module.exports = ConversationModel;