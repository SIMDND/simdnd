
const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');
const app = express();
const authctrl = require('./authctrl.js');
const chatctrl = require('./chatctrl.js');
const campctrl = require('./campctrl.js');
const session = require('express-session');
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

//campaign endpoints
app.get('/camp/get-camps', campctrl.getCampaigns)
app.post('/camp/create',campctrl.createCampaign)
app.put('/camp/edit-name',campctrl.editCampaignName)
app.put('/camp/edit-room',campctrl.editRoomCode)
app.put('/camp/edit-name-room',campctrl.editNameRoom)
app.delete('/camp/delete-camp/:campName', campctrl.deleteCampaign)

//Chat endpoints
app.post('/api/updatemessages', chatctrl.updateMessages);
app.get('/api/getmessages/:campaign_id',chatctrl.getMessages)

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

    socket.on("join-room",data=>{
        console.log('joinedRoom', data.room)
        socket.join(data.room);
        io.to(data.room);
    })
//chat-box socket stuff
    socket.on("new-message-send", data=>{
        io.to(data.room).emit('update-messages-array',{messagesArray:data.messagesArray})
    })

    socket.on('what-should-chat-box-say',data=>{
        io.to(data.room).emit('what-should-chat-box-say',{username:data.username})
    })

    socket.on('this-is-what-chat-box-should-say',data=>{
        io.to(data.room).emit('what-should-chat-box-say',{messagesArray:data.messagesArray})
    })

    socket.on('make-a-move',data=>{
        console.log('move made');
        io.to(data.room).emit('show-me-a-moose',{Tokens:data.Tokens})
    })

})


