const mongoose = require("mongoose");

mongoose.connect(process.env.DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const db = mongoose.connection;

db.on("error", (err)=>{console.log("Error with the database")})
db.once("open", ()=>{console.log("Database is up and connected!")})
db.on("disconnected", ()=>{console.log("Database is disconnected!")})

module.exports = db;