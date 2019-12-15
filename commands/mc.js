const { RichEmbed } = require("discord.js");
const ping = require('minecraft-server-util');

module.exports = {
    name: "mc",
    description: "Pinguieste un server",
    execute: async(message, args) => {

        if(!args[1]) return message.channel.send('Trebuie sa scrii un ip.')
        if(!args[2]) return message.channel.send('Trebuie sa scrii un port (25565).')

        ping(args[1], parseInt(args[2]), (error, reponse) =>{
            if(error) throw error
            const Embed = new RichEmbed()
            .setTitle('Server Status')
            .setColor('0xFFC300')
            .addField('Server IP:', reponse.host)
            .addField('Versiunea Serverului:', reponse.version)
            .addField('Jucatori Online:', reponse.onlinePlayers)
            .addField('Sloturi:', reponse.maxPlayers)
           
            message.channel.send(Embed)
        })
    }
}