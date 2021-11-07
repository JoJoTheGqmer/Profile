const mySecret = process.env['TOKEN']
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Test Bot is ready to work!'));
app.listen(port, () => console.log(`Example app listening at https://Test-Bot.jojothegqmer.repl.co`));
 // ================= START BOT CODE =================== 
const Discord = require('discord.js');
const client = new Discord.Client ()
const config = require('../config.json')
const fs = require('fs');
const { token } = require('./config.json');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
    
client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`);

client.user.setActivity("With JoJo");                         
});

client.on('message', message => {
 // ping command without a prefix (exact match) 
if (message.content === 'ping') {
 const delay = Date.now() - message.createdAt
 message.reply(`**pong** *(delay: ${delay}ms)*`)
 
} 

const prefix = '!'
if (message.content === `${prefix}help`) {
 message.reply('`!whois` - Get information about you')
  return
};
// ignore all other messages without our prefix 
if (!message.content.startsWith(prefix)) return 
   
// let the bot introduce itself (exact match) 

 // user info, either call with valid user name or default to info about message author 
if (message.content.startsWith(`${prefix}whois`)) { 
// if the message contains any mentions, pick the first as the target 

// default to sender if no user is menti    oned 
const { author } = message 
message.reply(
 `**User Self Info:** ${author.tag}
 **(account created:** ${author.createdAt.toUTCString()})`,
    )
}
  
 })

client.login(process.env['TOKEN']);