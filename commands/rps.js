const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rps",
    description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
    execute: async(message, args) => {
        const embed = new RichEmbed()
            .setColor("0xFFC300")
            .setFooter(message.guild.me.displayName)
            .setDescription("Alege piatra, hartie sau foarfeca pentru a juca !")
            .setTimestamp();

        const m = await message.channel.send(embed);

        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);

        await m.clearReactions();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "Ai castigat, bun esti ma!";
            } else if (me === clientChosen) {
                return "Remiza!";
            } else {
                return "Ai pierdut fraere!";
            }
        }
    }
}