const { RichEmbed } = require("discord.js");
const fetch = require('snekfetch');
const emoji = [`:smile:`];

module.exports = {
    name: "gluma",
    description: "Da o gluma.",
    execute: async(message, args) => {
        fetch.get("https://api.apithis.net/yomama.php").then(joke => {
                const yomama = new RichEmbed()
                .setTitle("Na' situatie")
                .setColor('RANDOM')
                .addField(`${emoji[~~Math.random() * emoji.length]}`, joke.body);
                message.channel.send({embed: yomama})
        })
    }
}