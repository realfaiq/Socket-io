const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

//Listening to the events 
//This is the first event whenever a user opens the website on client it gets connected to the server
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data)=>{
        socket.broadcast.emit("recieve_message", data);
    });

});



server.listen(3001, ()=> {
    console.log("SERVER IS RUNNING");
});
