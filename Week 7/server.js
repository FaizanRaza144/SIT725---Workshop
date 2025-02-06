import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);


import projectsRoute from './routes/projects.js';

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/projects', projectsRoute);

app.get("/test", (req, res) => {
    const user_name = req.query.user_name;
    res.end(`Hello ${user_name}!`);
});

app.get('/addTwoNumbers/:firstNumber/:secondNumber', (req, res) => {
    const firstNumber = parseInt(req.params.firstNumber);
    const secondNumber = parseInt(req.params.secondNumber);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        res.status(400).json({ result: null, statusCode: 400 });
    } else {
        const result = firstNumber + secondNumber;
        res.status(200).json({ result, statusCode: 200 });
    }
});

// Socket.IO configuration
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    setInterval(() => {
        socket.emit('number', Math.floor(Math.random() * 10));
    }, 1000);
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
