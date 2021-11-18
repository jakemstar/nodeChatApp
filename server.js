const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const { formatMessage, getEmotes } = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function dataBaseStuff(){
  try{
    await client.connect();
  }
  catch {
    console.log("Database connnection failed");
  }
}

async function createMessage(client, message){
  try{
    await client.db("Messages").collection("Messages").insertOne(message);
  }
  catch{
    console.log("Message not inserted");
  }
}

async function getHistory(client, room){
  try{
    const cursor = client.db("Messages").collection("Messages").find({
      messageRoom: room
    }).limit(50)

    const result = await cursor.toArray();
    return result;
  }
  catch{
    console.log("Failed to obtain message history");
  }
}

dataBaseStuff();

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('joinRoom', async ({username, room}) => {
    try{
      const messageHistory = await getHistory(client, room);
      socket.emit('previous messages', { messageHistory, room });
    }
    catch{
      console.log("Message history fucked up");
    }

    socket.emit('get emotes', getEmotes());

    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  })

  socket.on('chat message', (msg) => {
    const user = getCurrentUser(socket.id);
    createMessage(client, { ...formatMessage(user.username, msg), messageRoom : user.room });
    io.to(user.room).emit('chat message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user){
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  })
})

server.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});