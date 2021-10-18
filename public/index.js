var socket = io();

var messages = document.getElementById('messages');
var messageForm = document.getElementById('messageForm');
var messageInput = document.getElementById('messageInput');

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
    // create chat message
    var item = document.createElement('div');
    item.classList.add('message');
    item.innerHTML = `<p class="meta">${messageObject.username} <span>${messageObject.time}</span></p><p class="text">${messageObject.message}</p>`;
    document.getElementById("messages").appendChild(item);

    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
});
