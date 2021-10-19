const moment = require('moment');
const fs = require('fs');

var emotes = fs.readdirSync('./public/emotes');
var emoteNames = emotes.map(emote => emote.slice(0, -4))

function handleEmotes(message){
    emoteNames.forEach((emoteName, i) => message = message.replace(new RegExp(`:${emoteName}:`, 'g'), `<img src="emotes/${emotes[i]}" height="50" width="50">`));
    return message;
}

function formatMessage(username, message){
    message = handleEmotes(message);
    return{
        username,
        message,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;