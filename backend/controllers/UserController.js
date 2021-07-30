const bcrypt = require("bcryptjs");
const UserModel = require("../models/users");
const jwt = require("jsonwebtoken")
const ConversationModel = require("../models/conversation");
const MessageModel = require("../models/messages")
const decode = require("jwt-decode")
const io = require("../APIs/socket")

exports.postRegisterUser = (req, res, next)=>{
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            console.log(err)
        }else{
            bcrypt.hash(req.body.password, 12, function(err, hash){
                if(err){
                    console.log(err)
                }else{
                    const user = new UserModel({
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        username:req.body.username,
                        email:req.body.email,
                        password:hash,
                        salt:salt,
                        image:req.body.image
                    })
                    UserModel.create(user, function(err, result){
                        if(err){
                            console.log(err)
                        }else{
                            res.status(201).json({
                                data:result
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.postLoginUser = (req, res, next)=>{
    UserModel.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, hash){
                if(err){
                    console.log(err)
                }else if(hash){
                    const token = jwt.sign({
                        email:user.email,
                        firstname:user.firstname,
                        lastname:user.lastname,
                        userId:user._id.toString()
                    }, process.env.TOKEN, { expiresIn: "4h"})
                    req.session.jwt = token;
                    res.status(200).json({
                        jwt:token
                    })
                }else{
                    res.status(401).json({
                        wrongPass:"Wrong password"
                    })
                }
            })
        }else{
            res.status(404).json({
                noUser:"No user found!"
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getUserInformation = (req, res, next)=>{
    const decoded = decode(req.session.jwt)
    UserModel.findOne({email:decoded.email})
    .populate("conversations")
    .populate({
        path:"conversations",
        populate:"clients"
    })
    .then(user=>{
        if(user){
            io.getIO().emit("userMessage", {action:"create", data:user})
            res.status(200).json({
                data:user
            })
        }else{
            res.status(404).json({
                noUser:"No user foud!"
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.postStartAnewConveration = (req, res, next)=>{
    const decoded = decode(req.session.jwt)
    UserModel.findOne({email:decoded.email})
    .then(user=>{
        if(user){
            UserModel.findOne({_id:req.body.clientId})
            .then(client=>{
                if(client){
                    const message = new MessageModel({
                        message:req.body.message
                    })
                    MessageModel.create(message, function(err, mess){
                        if(err){
                            console.log(err)
                        }else{
                        const id = req.body.convid;
                        ConversationModel.findOne({_id:id})
                        .then(conv=>{
                            if(conv){
                                conv.messages.push(mess._id)
                                conv.save()
                                io.getIO().emit("newMessage", { action:"create", data:mess})
                               
                                res.status(201).json({
                                    data:"message create without new"
                                })
                            }else{
                                const conversation = new ConversationModel({
                                    userId:user._id
                                })
                                ConversationModel.create(conversation, function(err, conve){
                                    if(err){
                                        console.log(err)
                                    }else{
                                        conve.messages.push(mess._id)
                                        conve.clients.push(client._id)
                                        mess.conversationId = conve._id
                                        user.conversations.addToSet(conve._id)
                                        client.conversations.addToSet(conve._id)
                                        mess.save()
                                        user.save()
                                        client.save()
                                        conve.save()
                                        res.status(201).json({
                                            data:"Message created!"
                                        })
                                    }
                                })
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                        }
                    })
                }else{
                    res.status(404).json({
                        noClient:"No client found"
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{  
            res.status(404).json({
                noUser:"No user found"
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
}


exports.getOneConversation = (req, res, next)=>{
    const decoded = decode(req.session.jwt)
    UserModel.findOne({email:decoded.email})
    .then(user=>{
        if(user){
            const id = req.params.id;
            ConversationModel.findOne({_id:id})
            .populate("messages")
            .then(conv=>{
                if(conv){
                    res.status(200).json({
                        data:conv
                    })
                }else{
                    res.status(404).json({
                        noFound:"no found"
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            res.status(404).json({
                noUser:"No user found"
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getMessagesInRealTime = (req, res, next)=>{
    const decoded = decode(req.session.jwt)
    UserModel.findOne({email:decoded.email})
    .then(user=>{
        if(user){
            const id = req.params.id;
            ConversationModel.findOne({_id:id})
            .populate("messages")
            .then(conv=>{
                if(conv){
                    res.status(200).json({
                        data:conv
                    })
                }else{
                    res.status(404).json({
                        noFound:"no found"
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            res.status(404).json({
                noUser:"No user found"
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
