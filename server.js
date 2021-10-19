const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const messageHistory = [];

// set static folder to public
app.use(express.static(path.join(__dirname, 'public')));

// run when 
io.on('connection', (socket) => {
  socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);

    socket.emit('previous messages', { messageHistory, room });

    socket.join(user.room);

    socket.broadcast.to(user.room).emit('chat message', formatMessage('Server', `${user.username} joined`));

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  })

  socket.on('chat message', (msg) => {
    const user = getCurrentUser(socket.id);
    messageHistory.push({ ...formatMessage(user.username, msg), messageRoom : user.room });
    io.to(user.room).emit('chat message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user){
      io.to(user.room).emit('chat message', formatMessage('Server', `${user.username} left`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});