const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Path = require('path')
const {getMessage, getLocationMessage} = require('./utils/message')
const port = process.env.PORT || 3000;

app.use("/static", express.static('./static/'));

app.get('/', function (req, res) {
    res.sendfile(Path.join(__dirname + '/static/index.html'));
});

io.on('connection', function (socket) {
    console.log("user connected");

    socket.emit('newMessage', getMessage('Admin', 'Welcome to the chat'));

    socket.broadcast.emit('newMessage', getMessage('Admin', 'New User Joined'));

    socket.on('message',(message,callback) => {
        console.log(message);

        io.emit('newMessage', getMessage(message.from, message.text))
        callback();
    });
});

http.listen(port, () => {
    console.log(`server listen on: ${port}`)
});