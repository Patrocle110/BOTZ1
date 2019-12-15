const { RichEmbed } = require("discord.js");
const { getMember } = require("../functions.js");

module.exports = {
    name: "love",
    description: "Calculates the love affinity you have for another person.",
    execute: async(message, args) => {
        let person = getMember(message, args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💓".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new RichEmbed()
            .setColor("0xFFC300")
            .addField(`☁ **${person.displayName}** il/o iubeste pe **${message.member.displayName}** atat de mult:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    }
}