const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Client Connected!')

    socket.on('disconnect', () => {
        console.log('Client Disconected :(')
    });

    socket.on('send-element', (elem) => {
        io.emit('received-element', elem)
    });

    socket.on('send-cursor', (elem) => {
        io.emit('received-cursor', elem)
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000')
})