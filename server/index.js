const express = require('express');
const http = require("http")
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(__dirname + "/public"))

io.on('connection', (socket) => {
    console.log("Client connected")

    socket.on("send-item", (item) => {
        io.emit("item-received", item)
    })

    socket.on("send-pointer", (item) => {
        io.emit("pointer-received", item)
    })

    socket.on("disconnect", (socket) => {
        console.log("Client disconnected")
    })
});

server.listen(3000, () => {
    console.log("Server listening at port 3000");
});
