const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../functions.js");

module.exports = {
    name: "whois",
    description: "Returns user information",
    execute: (message, args) => {
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Informatii Membru:', stripIndents`**> Display name:** ${member.displayName}
            **> A intrat pe server pe:** ${joined}
            **> Roluri:** ${roles}`, true)

            .addField('Informatii Membru:', stripIndents`**> ID:** ${member.user.id}
            **> Username**: ${member.user.username}
            **> Tag**: ${member.user.tag}
            **> Si-a facut contul pe**: ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('Acum se joaca:', stripIndents`**> Status:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}