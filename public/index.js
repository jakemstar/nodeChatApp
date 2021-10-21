var socket = io();

var messages = document.getElementById('messages');
var messageForm = document.getElementById('messageForm');
var messageInput = document.getElementById('messageInput');
var roomHeader = document.getElementById('roomHeader');
var userList = document.getElementById('userList');
var roomHeaderOffcanvas = document.getElementById('roomHeaderOffcanvas');
var userListOffcanvas = document.getElementById('userListOffCanvas');
var offcanvasMenu = document.getElementById('offcanvasMenu');
var showUsers = document.getElementById('showUsers');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinRoom', {username, room})

messageForm.addEventListener('submit', function(e) {
e.preventDefault();
if (messageInput.value) {
    socket.emit('chat message', messageInput.value);
    messageInput.value = '';
    }
});

socket.on('chat message', function(messageObject) {
    var item = document.createElement('div');
    item.classList.add('message');
    item.innerHTML = `<p class="meta">${messageObject.username} <span>${messageObject.time}</span></p><p class="text">${messageObject.message}</p>`;
    document.getElementById("messages").appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('previous messages', function(data) {
    data.messageHistory.forEach((messageData, i) => {
        if (data.room === messageData.messageRoom) {
            var item = document.createElement('div');
            item.classList.add('message');
            item.innerHTML = `<p class="meta">${messageData.username} <span>${messageData.time}</span></p><p class="text">${messageData.message}</p>`;
            document.getElementById("messages").appendChild(item);
        }
    });
})

socket.on('roomUsers', ({ room, users }) => {
    roomHeader.innerText = `Users In ${room}`;
    roomHeaderOffcanvas.innerText = `Users In ${room}`;

    userListOffcanvas.innerHTML=`${users.map(user => `<li class="userListItem">${user.username}</li>`).join('')}`;
    userList.innerHTML=`${users.map(user => `<li class="userListItem">${user.username}</li>`).join('')}`;
})