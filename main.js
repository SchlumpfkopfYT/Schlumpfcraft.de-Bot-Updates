const Discord = require("discord.js");
const client = new Discord.Client();
require('discord-reply');
const fs = require("fs")
const Dataa = require('st.db');
const ifban = new Dataa(`/Datas/ban.json`);
const randomstring = require("randomstring");
const disbut = require('discord-buttons');
require('discord-buttons')(client);
const config = require(`./config.json`)
const prefix = config.prefix
async function channelLog(embed) {
  if (!config.log_channel_id) return;
  let ch = await client.channels.cache.get(config.log_channel_id)
  if (!ch) return console.log(`FEHLER!`)
  ch.send(embed)
}
client.on('guildMemberAdd', member => {
  if(ifban.has(`${member.id}`)) return member.guild.members.cache.get(member.id).ban({reason: ifban.get(member.id)});
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  if (command == prefix + 'ban') {
  if (message.channel.id == "881581314816479232") return ;
  if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Du hast die Permissions, um das zu tun, nicht.");
  const user = message.mentions.users.first();
  if (!user) return message.reply("Bitte gib einen User an den du bannen möchtest. **!ban <user> [Grund]**");
  if(user.id === message.author.id) return message.reply("Du kannst dich nicht selbst bannen.");
  const reason = args.slice(1).join(" ");
  message.guild.members.cache.get(user.id).ban({reason: reason});
  let banmessage = new Discord.MessageEmbed()
  .setColor("#00aaaa")
  .setDescription(`${user} wurde gebannt. Reason: **${reason != "" ? reason : "-"}**`);
  ifban.set(`${user.id}`,`${reason}`)
  message.channel.send(banmessage)
}
});

    client.on('message', message => {
      let command = message.content.toLowerCase().split(" ")[0];
      let messageArray = message.content.split(" ");
      let args = messageArray.slice(1);
if (command == prefix + 'kick') {
  if (message.channel.id == "881581314816479232")return;
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Du hast die Permissions, um das zu tun, nicht.");
    const user = message.mentions.users.first();
    if (!user) return message.reply("Bitte gib einen User an den du kicken möchtest. **!kick <user> [Grund]**");
    if(user.id === message.author.id) return message.reply("Du kannst dich nicht selbst kicken.");
    const reason = args.slice(1).join(" ");
    message.guild.members.cache.get(user.id).kick(reason);

    let kickmessage = new Discord.MessageEmbed()
    .setColor("#00aaaa")
    .setDescription(`${user} wurde gekickt. Reason: **${reason != "" ? reason : "-"}**`);
    message.channel.send(kickmessage)
}
});

client.on('message', message  => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(0);
  if (command === prefix + 'infowarn') { 
    if (message.channel.id == "881581314816479232")return;
    const user = message.mentions.users.first();
    if (!user) return message.reply("Gib einen User an.");
    if(warnplayer.has(`${user.id}`) == 0 ) return message.channel.send(`${user.username} hast 0 Verwarung`);    
      let WARNPLAYER1 = warnplayer.get(`${user.id}`)
      message.channel.send(`${user.username} Hat ${WARNPLAYER1} Verwarung`)  

  }
});


  client.on('message', message => {
      if (message.content === prefix + 'help'| message.mentions.has("887026881810034688")) {
      if (message.channel.id == "881581314816479232")return;
      if (message.member.hasPermission('KICK_MEMBERS'))return;
      let Help = new Discord.MessageEmbed()
      .setTitle(`Help Seite`)
      .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.jpg','https://discord.gg/JNadFyEznH')
      .setThumbnail(`https://schlumpfcraft.de/img/logo.jpg`)
      .addFields(
        { name: '!ping', value: 'Dann kommt Pong!' },
        { name: '!play', value: 'Dann kannst du Musik hören' },
        { name: '!web', value: 'Webseite Info' },
        { name: '!infowarn <user>', value: 'Damit kannst du die Verwarung von <User>' },
        { name: '!volume <1-10>', value: 'Damit kannst du die Lautstärke entscheiden! ' },
        { name: `!stop/!leave/!s/!l`, value: `Dadurch verlässt der Bot den Sprachchat!`, inline: true },
      )
      .setTimestamp()
      .setImage('https://schlumpfcraft.de/img/logo.jpg')
      .setColor(`GREEN`)
      .setFooter('Schlumpfcraft.de Bot');
      message.channel.send("Kommt Bald")
      message.delete()
    }
  });


  client.on('message', async (message) => {
    if (
      message.content.toLowerCase().startsWith(prefix + 'clear') ||
      message.content.toLowerCase().startsWith(prefix + 'c ')
    ) {
      if (message.channel.id == "881581314816479232") return message.delete();
      if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt");
      if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
          amount = 1;
        } else {
          amount = message.content.split(' ')[1];
          if (amount > 100) {
            amount = 100;
          }
        }
        await message.delete().catch(e => { amount++; });
        await message.channel.bulkDelete(amount, true).then((_message) => {
          message.channel.send(`Bot gelöscht \`${_message.size}\` messages :broom:`).then((sent) => {
            setTimeout(function () {
              sent.delete();
            }, 2500);
          });
        });
      }
    }
  });


client.login('ODg3MDI2ODgxODEwMDM0Njg4.YT-KKA.T-xZ9OzdIaXlvW95xPS8s4inol0') 