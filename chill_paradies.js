const { channel } = require("diagnostics_channel");
const Discord = require("discord.js");
const client = new Discord.Client();
require('discord-reply');
const fs = require("fs")
const Dataa = require('st.db');
const Conter = new Dataa(`/Datas/conuter.json`);
const Conterif = new Dataa(`/Datas/conuterif.json`);
const prefix = "cp!";
const config = require(`./config.json`)

client.on('message', message => {
    let command = message.content.toLowerCase().split(" ")[0];
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    if (command == prefix + 'startconter') {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: This command requires \`ADMINISTRATOR\` permission.`);
      Conter.set(`${message.channel.id}`, 1)
      Conter.set(`LLALALALAL`, `${message.channel.id}`)
        message.channel.send("Der Counter ist gestartet")
        message.delete();
    }
});
client.on('guildMemberAdd', member => {
    let count = member.guild.memberCount.toString() 
    let end = count[count.length-1]
    let suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count + "th" 
    const channel = client.channels.cache.get(config.wilkommen2)
    date = new Date();
  heute = date.toLocaleString('de-DE');
    const memberavatar = member.user.displayAvatarURL
        if (!channel) {
          console.log("Set channel name in config.");
          return;
        };
        let str = `Welcome to ${member.guild.name}! **${member.user.username}**! \nYou are the **${member.guild.memberCount}** member!`
        const embedaa = new Discord.MessageEmbed()
        .setTitle(`Wilkommen ${member.displayName}`)
        .setAuthor(`${member.guild.name}!`, '','https://discord.gg/ME5ea3mb5J')
        .addFields(
          { name: `Wilkommen auf ${member.guild.name}!`, value: `Du bist der ${member.guild.memberCount} user` },
          { name: `Gejoint`, value: `Du Bist am ${heute} Gejoint`},
          { name: `Reglen`, value: `Bitte lese dir die reglen duch in	<#854778212629086228> und akzeptieren die Regeln `, inline: true }, )
          .setImage(member.guild.iconURL)
          .setColor(`GREEN`)
        channel.send(embedaa);
  });
client.on('message', message => {
    let command = message.content.toLowerCase().split(" ")[0];
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let conuter = Conter.get(`${message.channel.id}`);
    let channelch = Conter.get(`LLALALALAL`);
    let user = Conterif.get(`${message.author.id}`);
    let Zahl = Math.floor(Math.random() * 4)
    if(message.author.id == "937476491107786773")return;
    if (message.channel.id == "937177978201313280"){
    if(user)return message.channel.send("Gib auch andere eine Chance")  && setTimeout(async () => {
        message.delete()
        message.channel.bulkDelete(1, true)
    },1600);
    if(conuter == command)return  Conter.math(`${message.channel.id}`,"+",1) && Conterif.clear() ||  Conterif.set(`${message.author.id}`, {} );
    if(Zahl == 0)return message.channel.send("Falsch versuchs nochmal")  && setTimeout(async () => {
        message.delete()
        message.channel.bulkDelete(1, true)
    },1600);
    if(Zahl == 1)return message.channel.send("Die Zahl ist" + counter + "und nicht" + command)&& setTimeout(async () => {
        message.delete()
        message.channel.bulkDelete(1, true)
    },1600);
    if(Zahl == 2)return message.channel.send("Du Lappen kannst nicht mal richtig zählen")&& setTimeout(async () => {
        message.delete()
        message.channel.bulkDelete(1, true)
    },1600);
    if(Zahl == 3)return message.channel.send("Mathe ist nicht so dein Ding oder ") && setTimeout(async () => {
        message.delete()
        message.channel.bulkDelete(1, true)
    },1600);
    if(Zahl == 4)return message.channel.send("Falsch versuchs nochmal")&& setTimeout(async () => {
        message.delete()
        message.channel.bulkDelete(1, true)
    },1600);
}
}
);



client.login("OTM3NDc2NDkxMTA3Nzg2Nzcz.YfcTBA.hebmrh7OGN_zZngdO7R-wAm8284") 