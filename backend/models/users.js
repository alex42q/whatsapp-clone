const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    salt:{
        type:String
    },
    image:{
        type:String
    },
    conversations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversations"
    }]
})

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;