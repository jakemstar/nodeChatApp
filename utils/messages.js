const moment = require('moment');

const emotes = ["slep", "slurp", "1rock", "4real", "bananaeat", "BloodOfTheUnforgiven", "BUP", "CharmedChamp", "ColoraptorApproved", 
"ColoraptorDisapproved", "crunk", "ducksanyu", "flatchamp", "gayvery", "glasses", "haha", "hahahafuckyou", "hungry", "jacob", 
"KirbyNoApprove", "KirbySaysTimeToDie", "kiwi","KpopAnger", "meet", "flatvery", "princecharming", "rasim", "SamuraiAnger", "SamuraiApproved", 
"superior", "suplilbitch"];

function handleEmotes(message){
    emotes.forEach(emote => message = message.replace(new RegExp(`:${emote}:`, 'g'), `<img src="emotes/${emote}.png" height="50" width="50">`));
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