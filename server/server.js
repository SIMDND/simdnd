
const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');
const app = express();
const authctrl = require('./authctrl.js');
const session = require('express-session')
app.use(express.json());
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
app.use(session({
    secret: SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

//Authentication end points
app.post('/auth/login', authctrl.login)
app.post('/auth/register', authctrl.register)
app.get('/auth/get-user', authctrl.getUser)

//Authentication Endpoint END


//Add endpoints here!
const io = socket(
    app.listen(SERVER_PORT, () => {
        console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single`);
    })
)

massive(CONNECTION_STRING).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})
//Socket anything will go here, After the listening
io.on("connection", socket => {
    
    socket.on('send-message', data=>{
        io.to(data.room).emit('update-messages',{messagesArray:data.messagesArray});
    })

    /*
    socket.on("come-inside",data=>{
        io.to(data.room).emit("come-inside");
    })

    socket.on('request-identities',data=>{
        io.to(data.room).emit('request-identities');
    })

    */

})


