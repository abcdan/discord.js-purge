const Discord = require('discord.js');
const config = require('./config.json');
const util = require('util');
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => {
    bot.user.setActivity('with messages')
    console.log(`Ready to PURGE!`);
});
bot.on("message", async message => {
    if(message.author.bot || message.system) return
    if (message.channel.type === 'dm') {
        return;
    }

    if (message.content.indexOf(config.prefix) === 0) {
        let msg = message.content.slice(config.prefix.length);
        let args = msg.split(" ");
        let cmd = args[0].toLowerCase();
        args.shift();

        if (cmd === 'embed') {
            if (message.author.id === config.owner) {
                var embed = new Discord.RichEmbed() // THe color is the color of the embed, 0xHEXCODE
                .setColor('#9B59B6')
                .setTitle('This is a message')
                .setDescription('That you can send in the channel for information')
                .setThumbnail('https://i.imgur.com/Fbetme6.png')
                .addField('This is handy for:', `- Making a post without disableling the bot (sticky)`)
                .addField('There will be an echo command with embeds','Soon:tm:')
                message.channel.send(embed)
            } else {
                return
            }
        
        } else { // if the command doesn't match anything you can say something or just ignore it
            if (message.channel.id === config.channel) {
                if (message.author.id === config.botid){
                    return
                } else{
                    message.delete(6000) // Change the 6000 to how long you want the bot to wait to delete the message, 6000 = 6 seconds
                }
            } else {
                return
            }

        }
    }
});

process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
});

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
});

bot.login(config.token);