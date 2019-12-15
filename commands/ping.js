const Discord = require('discord.js');
const bot  = new Discord.Client();

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    execute: async(message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Latencyul este **${Math.floor(msg.createdTimestap - message.createdTimestap)}ms**
        API Latency este **${Math.round(bot.ping)}ms**`);
    }
}