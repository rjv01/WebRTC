import { Server } from "socket.io";
import http from "http";
import express from 'express';

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:"*"
});

const room = {
    
};

io.on('connection',socket =>{
    console.log('socket connected: ',socket.id);

    // socket.on('message',msg=>{
    //     console.log(msg);
    // })
    // console.log('join room: ',roomid);
    // room[roomid].push(socket.id);
    // socket.join(roomid);
    // console.log("First Person , Second Person and RoomId: ",socket.id,room[roomid]);
    // console.log("First Person Added: ");

    socket.on('joinRoom',roomid=>{

    if(room[roomid]){
        console.log("My Socket Id:",socket.id);
        console.log("My Remote Socket Id:",room[roomid]);
    }
    else{
        room[roomid] = socket.id;
        console.log("Room Created: ",roomid);
    }

    });

    socket.on('disconnect',()=>{
        console.log('a client disconnected',socket.id);
    })
});

app.get('/',(req,res)=>{
    res.send("Backend is running raj");
    console.log("Backend is running raj");
});



server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});