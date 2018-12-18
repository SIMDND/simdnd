const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');
const app = express();
const authctrl = require('./authctrl.js');
app.use(express.json());
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const io = socket(
    app.listen(SERVER_PORT, () => {
        console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single`);
    })
)

massive(CONNECTION_STRING).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})

io.on("connection", socket => {
    


    /*
    socket.on("come-inside",data=>{
        io.to(data.room).emit("come-inside");
    })

    socket.on('request-identities',data=>{
        io.to(data.room).emit('request-identities');
    })

    */

})


