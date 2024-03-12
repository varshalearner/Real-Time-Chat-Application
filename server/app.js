const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const path = require('path');

require('./model/chat');
require('./model/message');
require('./model/user');

const router =  require('./router/route');

const chatRoutes = require('./router/chatRoutes');
const messageRoutes = require('./router/messageRoutes');


dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true}));

const port  = process.env.PORT||8080;



// mongoose.connect('mongodb://127.0.0.1:27017/Anjali')
// .then(()=>{
//      console.log("DB Connected");
// })
// .catch((err)=>{
//      console.log(err);
// })


mongoose.connect(`mongodb+srv://dimpy:${process.env.DB_PASSWORD}@cluster0.glj5682.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('database is connected');
}).catch(err =>{
    console.log('Connection error', err.message);
})


app.use('/',router);
app.use('/chats',chatRoutes);
app.use('/message',messageRoutes);
 
const server = app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
   
})

const io = require("socket.io")(server,{
    pingTimeout: 60000,
    cors:{
        origin: "https://localhost:3000",
    },
});

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

});

