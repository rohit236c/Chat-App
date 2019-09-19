const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index');
});

const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });
    // socket.on('disconnect', function(username) {
    //     io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    // });

    // socket.on('chat_message', function(message) {
    //     io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    // });
});

server.listen('2333', () => {
    console.log('http://localhost:2333')
});