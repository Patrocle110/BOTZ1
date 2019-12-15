const Discord = require('discord.js');
const bot  = new Discord.Client();

const { config } = require("dotenv");

//const token = 'NjUxMzQ4OTE5ODQxODQ5MzQ2.XfXl9w.4kXOotUPJcrDxyu0zj02F6-nZ8E';

const prefix = '$';

const cheerio  = require('cheerio');

const request = require('request');

const ms = require('ms');

const ytdl = require("ytdl-core");

config({
    path: __dirname + "/.env"
});

const fs = require('fs');
bot.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    bot.commands.set(command.name, command);
}

const {
    Client,
    Attachment,
    RichEmbed,
    Collection

} = require('discord.js');

var version = '1.7';

var servers = {};

bot.on('ready', () =>{
    console.log('Botu e online sa moara jaxi');

    bot.user.setPresence({
       status: "dnd",
        game: {
           name: "Patrocle",
           type: "LISTENING"
        }
    })
})

bot.on('message', message=>{

    if(!message.content.startsWith(prefix)) return;

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'gif':
        image(message);
    }
})

bot.on('message', message=>{
    if(!message.content.startsWith(prefix)) return;

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'ping':
            bot.commands.get('ping').execute(message, args);
        break;

        case 'meme':
            bot.commands.get('meme').execute(message, args);
        break;

        case 'love':
            bot.commands.get('love').execute(message, args);
        break;

        case 'gluma':
            bot.commands.get('gluma').execute(message, args);
        break;

        case 'whois':
            bot.commands.get('whois').execute(message, args);
        break;

        case 'phf':
            bot.commands.get('rps').execute(message, args);
        break;

        case 'mc':
            bot.commands.get('mc').execute(message, args);
        break;
    }
})

bot.on('message', message=>{
    
    if(message.content ===  "salut"){
        message.channel.send('Salut Gustere');
    }

    if(message.content ===  "stefan"){
        message.channel.send('E la tigara sau joint.').then(message.react('🚬'));
    }

    if(message.content ===  "mihai"){
        message.channel.send('Probabil se joaca Dota 2.');
    }

    if(message.content ===  "putza"){
        message.channel.send('Intra din joi in pasti.');
    }

    if(message.content ===  "hai pe lol"){
        message.channel.send('Haideee.');
    }

    if(message.content ===  "epicfaced"){
        message.channel.send('Looking for a girlfriend...');
    }

    if(message.content ===  "rares"){
        message.channel.send('E la teme ca il bate maica-sa.');
    }

    if(message.content ===  "haide"){
        message.channel.send('Sarpiliiiiiiii baaaaaaaaa !');
    }

})

bot.on('message', message=>{

    if(!message.content.startsWith(prefix)) return;

    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]) {
        case 'play':
            
            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                message.channel.send('Trebuie sa pui un link');
                return;
            }

            if(!message.member.voiceChannel){
                message.channel.send('Trebuie sa fii intr-un canal ca sa pui muzica');
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            })


        break;

        case 'skip':
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send("Skipped !")
        break;
 
        case 'stop':
            var server = servers[message.guild.id];
             if(message.guild.voiceConnection){
                 for(var i = server.queue.length -1; i >=0; i--){
                     server.queue.splice(i, 1);
                 }

                 server.dispatcher.end();
                 message.channel.send("Queueul s-a oprit.")
                 console.log('stopped the queue')
             }

             if(message.guild.connection) message.guild.voiceConnection.disconnect();
        break;

    }   
        
})

bot.on('message', message=>{

    if(!message.content.startsWith(prefix)) return;

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){

        case 'kick':

            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nu ai acces la aceasta comanda !")

            if(!args[1]) message.channel.send('Da tag unui prost sa ii dam kick da l drecu!')

            var user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.kick('Ai luat kick pentru ca ai fost prost !').then(() =>{
                        message.reply(`A luat kick cu succes ${user.tag}!`);
                    }).catch(err =>{
                        message.reply('Nu am putut sa ii dau kick.');
                        console.log(err);
                    });
                } else{
                    message.reply("Membrul nu este pe server.")
                }
            }

        break;  

        case 'ban':
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nu ai acces la aceasta comanda !")

                if(!args[1]) message.channel.send('Da tag unui prost ii dam ban da l drecu!!')
    
                var user = message.mentions.users.first();
    
                if(user){
                    const member = message.guild.member(user);
    
                if(member){
                    member.ban('Ai luat ban pentru ca ai fost idiot !').then(() =>{
                        message.channel.send(`A luat ban cu succes ${user.tag}!`);
                    }).catch(err =>{
                        message.reply('Nu am putut sa ii dau ban.');
                        console.log(err);
                    });
                } else{
                    message.reply("Membrul nu este pe server.")
                }
            }
        break;

        case 'clear':
                if(!args[1]) return message.reply('Eroare te rog pune un numar de mesaje care sa fie sterse.')
                if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nu ai acces la aceasta comanda !")
                .then(msg => msg.delete(7000));
                message.channel.bulkDelete(args[1]);
        break;
    }
})

bot.on('message', message=>{

    if(!message.content.startsWith(prefix)) return;

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){

        case 'avatarme':
            message.channel.send(message.author.displayAvatarURL);
        break;

        case 'avatar':
            let aTaged = message.mentions.users.first();
            message.channel.send(`${aTaged.displayAvatarURL}`);
        break;

        case 'minecraftpls':
            const attachment = new Attachment('./Minecraft_Launcher.exe')
            message.author.send(message.author, attachment);
            message.channel.send('In cateva secunde iti voi trimite Minecraftul in privat.')
        break;
    }
})

function image(message){

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "funny gif",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };


    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });

}

bot.login(process.env.TOKEN);