const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db.js');
//
const { generateMessage, generateYouTubeMessage } = require('./utils/message.js');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
//DB
const usersRoute = require('./utils/routes/users.route');
const chatRoute = require('./utils/routes/chat.route');
//
const app = express();
const server = http.createServer(app);
//
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected '+config.DB) },
  err => { console.log('Can not connect to the database '+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Socket io
app.use(express.static(publicPath));
var io = socketIO(server);
var users = new Users();
//Action on DB
app.use('/users', usersRoute);
app.use('/chat', chatRoute);
//
io.on('connection', (socket) => {
    //console.log("user connected");
    socket.on('leave', (params) => {
        console.log("user out... "+params.room);
        socket.leave(params.room);
    });

    socket.on('join', (params, callback) => {
        console.log("user join");
        //localStorage.setItem('duplicado',0);
        if (!isRealString(params.nickname) || !isRealString(params.room)) {
            return callback('Bad request');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.nickname, params.room);
        //console.log(params);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', params.room, 'Welcome to the chat app.'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.room, `${params.nickname} has joined.`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log("user createMessage");
        //console.log(getUserList(user.room));
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            let tempObj = generateMessage(user.nickname, user.room, message.text);
            //let chatMessage = generateMessage(user.name, user.room, message.text);
            io.to(user.room).emit('newMessage', tempObj);
            callback({
                data: tempObj
            });
        }
        callback();
    });

    socket.on('createYouTubeMsg', (message, callback) => {
        console.log("user createYouTubeMsg");
        //
        var user = users.getUser(socket.id);
        if (user) {
            let tempObj = generateYouTubeMessage(user.nickname, user.room, message.video);
            //console.log(tempObj);
            io.to(user.room).emit('newMessageYT', tempObj);
            callback({
                data: tempObj
            });
        }
        callback();
    });
    
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
         console.log("user disconnect... ");
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', user.room, `${user.nickname} has left.`));
        }
    });

});
//
server.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});