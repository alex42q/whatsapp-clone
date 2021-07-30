require('dotenv').config()
const express = require("express");
const app = express();
PORT = process.env.PORT;
const db = require("./lib/db")
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");

const store = new MongoDBStore({
    uri:process.env.DB,
    collection:"sessions"
});

app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:false,
    resave:false,
    store:store,
    cookie: {maxAge: 14400000}
}));

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET, POST, PUT, DELETE, PATCH",
    credentials:true
}));

app.use(bodyParser.json());


//Import the routers
const UserRouter = require("./routers/UserRouter");

//Use the routers
app.use(UserRouter);

const server = app.listen(PORT, function(err){
    if(err){
        console.log(err)
    }else{
        console.log(`Backend is up on port ${PORT}`)
    }
});

//Socket io
const io = require("./APIs/socket").init(server);
io.on('connection', socket=>{
    console.log('Client Connected!');
});

