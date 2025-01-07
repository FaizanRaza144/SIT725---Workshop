const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


io.on('connection', (socket) => {
    console.log('A user connected');

    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});


server.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});
