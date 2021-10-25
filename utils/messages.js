const moment = require('moment');
const fs = require('fs');
const YouTubeGetID = require('./youtubeID');

var emotes = fs.readdirSync('./public/emotes');
var emoteNames = emotes.map(emote => emote.slice(0, -4))

function handleEmotes(message){
    emoteNames.forEach((emoteName, i) => message = message.replace(
        new RegExp(`:${emoteName}:`, 'g'), `<img src="emotes/${emotes[i]}" height="50" width="50">`
        ));
    return message;
}

function handleYoutubeEmbeds(message, youtubeID){
    regex = RegExp(`.*?youtu(\.)?be.*?(${youtubeID}).*`)
    message = message.replace(regex, `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    return message;
}

function formatMessage(username, message){
    message = handleEmotes(message);
    if(typeof YouTubeGetID(message) === 'string'){
        youtubeID = YouTubeGetID(message);
        message = handleYoutubeEmbeds(message, youtubeID);
    }
    return{
        username,
        message,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;