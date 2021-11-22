const Discord = require("discord.js");
const client = new Discord.Client();
require('discord-reply');
const fs = require("fs")
const Dataa = require('st.db');
const db = new Dataa(`/Datas/tickets.json`);
const ticketab = new Dataa(`/Datas/ifticketsa.json`);
const warnplayer = new Dataa(`/Datas/warn.json`);
const Geld = new Dataa(`/Datas/Geld.json`);
const ifGeld = new Dataa(`/Datas/ifGeld.json`);
const Warnt = new Dataa(`/Datas/WarnT.json`);
const dailyaaa = new Dataa(`/Datas/daily.json`);
const countsdb = new Dataa(`/Datas/tickets-counts.json`);
const ifban = new Dataa(`/Datas/ban.json`);
const ticketschannelsdb = new Dataa(`/Datas/tickets-channels.json`);
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
async function support(embed) {
  if (!config.supportlog) return;
  let ch = await client.channels.cache.get(config.supportlog)
  if (!ch) return console.log(`FEHLER!`)
  ch.send(embed)
}
async function partherer(embed) {
  if (!config.partherer) return;
  let ch = await client.channels.cache.get(config.partherer)
  if (!ch) return console.log(`FEHLER!`)
  ch.send(embed)
}
date = new Date();
heute = date.toLocaleString('de-DE');
client.on('guildMemberAdd', member => {
  let count = member.guild.memberCount.toString() 
  let end = count[count.length-1]
  let suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count + "th" 
  const channel = client.channels.cache.get(config.wilkommen)
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
      .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.pn','https://discord.gg/JNadFyEznH')
      .addFields(
        { name: `Wilkommen auf ${member.guild.name}!`, value: `Du bist der ${member.guild.memberCount} user` },
        { name: `Gejoint`, value: `Du Bist am ${heute} Gejoint`},
        { name: `Reglen`, value: `Bitte lese dir die reglen duch in	<#854778212629086228> und akzeptieren die Regeln `, inline: true }, )
        .setImage('https://schlumpfcraft.de/img/logo.png')
        .setColor(`GREEN`)
      channel.send(embedaa);
      let logs = client.channels.cache.get(config.log_channel_id)
      channelLog(`> :inbox_tray: ${member} ist gejoint ${member.guild.name}.`)
});
client.on('guildMemberRemove', member => {
  let count = member.guild.memberCount.toString() 
  let end = count[count.length-1]
  let suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count + "th" 
  const channel = client.channels.cache.get(config.wilkommen)
  const memberavatar = member.user.displayAvatarURL
      if (!channel) {
        console.log("Set channel name in config.");
        return;
      };
      let str = `Verlassen to ${member.guild.name}! **${member.user.username}**! \nYou are the **${member.guild.memberCount}** member!`
      const embeda = new Discord.MessageEmbed()
      .setTitle(`Verlassen ${member.user.username}`)
      .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
      .addFields(
        { name: `Verlassen ${member.guild.name}!`, value: `Wir sind jezte nur noch ${member.guild.memberCount} User` },
        { name: `Verlassen `, value: `Er hat uns am  ${heute} verlassen`, inline: true }, )
        .setImage('https://schlumpfcraft.de/img/logo.png')
        .setColor(`RED`)
      channel.send(embeda);
      let logs = client.channels.cache.get(config.log_channel_id)
      channelLog(`> :inbox_tray: ${member} has verlasst ${member.guild.name}.`)
});

client.on('message', message => {
  if(message.mentions.has("831502185640099880") | message.mentions.has("541311174168543256")| message.mentions.has("605835662653915146")| message.mentions.has("634312667263270913")) {
  if(message.member.hasPermission('MANAGE_MESSAGES')) return;
  if(warnplayer.get(`${message.author.id}`) == 12 )  return  message.delete() && message.guild.members.cache.get(message.author.id).ban({reason: "Tagge Teammtglieder"});
  if(warnplayer.get(`${message.author.id}`) == 6 )  return message.delete()| warnplayer.math(`${message.author.id}`, `+`, 1) |message.guild.members.cache.get(message.author.id).kick("Tagge Teammtglieder");
    let VErwarung = new Discord.MessageEmbed()
    .setTitle(`Verwarnung`)
    .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
    .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
    .addFields(
      { name: 'Verwarunng', value: 'Bitte Tagge keine Teammitglieder' },
      { name: `${message.member.user.tag}`, value: `!!`, inline: true },
    )
    .setTimestamp()
    .setImage('https://schlumpfcraft.de/img/logo.png')
    .setColor(`RED`)
    .setFooter('Schlumpfcraft.de Bot');
    message.delete()
    message.channel.send(VErwarung);
    warnplayer.math(`${message.author.id}`, `+`, 1)
  }
});
client.on('message', message => {
  if (message.content === prefix + 'ping') {
    if (message.channel.id == "881581314816479232") return ;
    message.channel.send("Der Ping vom Bot ist 1ms") 
  }
});
client.on('message', message => {
  if (message.content === prefix + 'web') {
  if (message.channel.id == "881581314816479232") return ;
    let Webseite = new Discord.MessageEmbed()
    .setTitle(`Webseite Info`)
    .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
    .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
    .addField(`https://schlumpfcraft.de/`, "Unser Hauptwebseite" )
    .addField(`https://schlumpfcraft.de/zeit`, "Unser Minecraft Zeit" )
    .addField(`https://schlumpfcraft.de/forum`, "Unser Forum" )
    .setTimestamp()
    .setImage('https://schlumpfcraft.de/img/logo.png')
    .setColor(`BLUE`)
    .setFooter('Schlumpfcraft.de Bot');
    message.channel.send(Webseite)
  }
});
client.on('ready', async () => {
  channelLog(`> Der Bot ist gestartet `)
  channelLog(">Der Ping vom Bot ist " + client.ws.ping +"ms")
  client.on('message', async (message) => {
    let tickets = db.all()
    tickets.forEach(async body => {
      let channel = await client.channels.cache.get(body.data.channelID)
      if (!channel) return;
      let msg = channel.messages.fetch(body.data.msgID)
      if (!msg) return;
      let new_id = randomstring.generate({ length: 20 })
      let button = new disbut.MessageButton()
        .setStyle(`gray`)
        .setEmoji(`📩`)
        .setLabel(`Ticket`)
        .setID(body.data.id)
      let embed = new Discord.MessageEmbed()
        .setTitle(body.data.reason)
        .setDescription("Erstellen Sie ein Interaktionsticket mit 📩")
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(message.guild.name, message.guild.iconURL())
      try {
        msg.edit({ embed: embed, component: button })
      } catch{

      }
    })
  })
})
client.on('message', async (message) => {
  if (message.author.bot) return;
  let command = message.content.toLowerCase().split(" ")[0];
  if (command == prefix + `add`) {
    if (message.channel.id == "881581314816479232") return ;
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    if (await ticketschannelsdb.has(`ticket_${channel.id}`) == true) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.lineReply(`Bitte wählen Sie die Person, die Sie hinzufügen möchten, richtig aus`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
        }).then(() => {
          message.lineReply({ embed: { description: `erfolgreich hinzugefügt ${member} mir ${channel}`, color: 0x5865F2 } });
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Personen zum Ticket hinzugefügt`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Person hinzugefügt'`, member.user)
            .addField(`Aktion von`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        });
      }
      catch (e) {
        return message.channel.send('Es ist ein Fehler aufgetreten. Bitte versuche es');
      }
    }
  }
  if (command == prefix + `remove`) {
    if (message.channel.id == "881581314816479232") return ;
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    if (await ticketschannelsdb.has(`ticket_${channel.id}`) == true) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.lineReply(`Bitte wählen sie einen User aus den sie remove möchten!`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
        }).then(() => {
           let log_embed = new Discord.MessageEmbed()
            .setTitle(`Person aus Ticket entfernt`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Person hinzugefügt`, member.user)
            .addField(`Aktion von`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          message.lineReply({ embed: { description: `أنحذف بنجاح ${member} من ${channel}`, color: 0x5865F2 } });
        });
      }
      catch (e) {
        return message.channel.send('Ein Fehler ist aufgetreten. Bitte versuchen sie es erneut!');
      }
    }
  }
  if (command == prefix + 'delete') {
    if (message.channel.id == "881581314816479232") return ;
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let channel = message.mentions.channels.first() || message.channel;
    if (await ticketschannelsdb.has(`ticket_${channel.id}`) == true) {
      message.lineReply({ embed: { description: `Der Channel wird nach 5 Sekunden gelöscht!`, color: 0x5865F2 } })
      setTimeout(async () => {
        let log_embed = new Discord.MessageEmbed()
            .setTitle(`Das Ticket wurde gelöscht!`)
            .addField(`Die Ticket Nummer!`, `${await ticketschannelsdb.get(`ticket_${channel.id}`).count}`)
            .addField(`Hey`,`<@!${await ticketschannelsdb.get(`ticket_${channel.id}`).ticket_by}>`)
            .addField(`Aktion von`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          channel.delete()
      }, 5000)
    }
  }
  if (command == prefix + 'close') {
    if (message.channel.id == "881581314816479232") return ;
    let channel = message.mentions.channels.first() || message.channel;
    if (await ticketschannelsdb.has(`ticket_${channel.id}`) == true) {
      let msg = await message.lineReply({ embed: { description: `Das Ticket wird nach 5 Sekunden geschlossen!`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Ticket wurde geschlossen von <@!${message.author.id}>`, color: `YELLOW` } })
          ticketab.remove(`${message.author.id}`)
          let type = 'member'
          await Promise.all(channel.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
          channel.setName(`closed-${await ticketschannelsdb.get(`ticket_${channel.id}`).count}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket geschlossen`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Aktion von`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`YELLOW`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch {

        }
      }, 1000)
    }
  }
  if (command == prefix + 'open') {
    if (message.channel.id == "881581314816479232") return ;
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let channel = message.mentions.channels.first() || message.channel;
    if (await ticketschannelsdb.has(`ticket_${channel.id}`) == true) {
      let msg = await message.lineReply({ embed: { description: `Ihre Aktion wird nach 5 Sekunden ausgeführt`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Das Ticket wurde geöffnet von <@!${message.author.id}>`, color: `GREEN` } })
          let meember = client.users.cache.get(await ticketschannelsdb.get(`ticket_${channel.id}`).ticket_by);
          channel.updateOverwrite(meember, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite(config.support_1, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite(config.support_2, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.setName(`ticket-${await ticketschannelsdb.get(`ticket_${channel.id}`).count}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket wieder geöffnet`)
            .addField(`ticket`, `<#${channel.id}>`)
            .addField(`الاجراء بواسطة`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch {

        }
      }, 1000)
    }
  }
  if (command == prefix + 'rename' || command == prefix + 'setname') {
    if (message.channel.id == "881581314816479232")return;
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let channel = message.mentions.channels.first() || message.channel;
    if (await ticketschannelsdb.has(`ticket_${channel.id}`) == true) {
      let args = message.content.split(' ').slice(1).join(' ');
      if (!args) return message.lineReply({ embed: { description: `Bitte wählen sie einen Namen für das Ticket aus!`, color: 0x5865F2 } })
      channel.setName(args)
      message.delete()
      let log_embed = new Discord.MessageEmbed()
        .setTitle(`Änderung des Ticket Namens!`)
        .addField(`Neuer Ticketname!`, args)
        .addField(`Das Ticket!`, `<#${channel.id}>`)
        .addField(`Aktion von`, `<@!${message.author.id}>`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(message.guild.name, message.guild.iconURL())
      channelLog(log_embed)
    }
  }
  if (command == prefix + 'send') {
    if (message.channel.id == "881581314816479232") return ;
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: This command requires \`ADMINISTRATOR\` permission.`);
    let idd = randomstring.generate({ length: 20 })
    let args = message.content.split(' ').slice(1).join(' ');
    if (!args) args = `Support Ticket`
    let button = new disbut.MessageButton()
      .setStyle(`gray`)
      .setEmoji(`📩`)
      .setLabel(`Ticket`)
      .setID(idd)
    let embed = new Discord.MessageEmbed()
      .setTitle(args)
      .setDescription("Erstellen Sie ein Interaktionsticket mit 📩")
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(message.guild.name, message.guild.iconURL())
    let msg = await message.channel.send({ embed: embed, component: button }).then(async msg => {
      msg.pin()
      let log_embed = new Discord.MessageEmbed()
        .setTitle(`Senden Sie eine Nachricht, um neue Tickets zu öffnen`)
        .addField(`Inside Rom`, `<#${message.channel.id}>`)
        .addField(`von`, `<@!` + message.author.id + `>`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(`Schlumpfcraft.de`, message.guild.iconURL())
      channelLog(log_embed)
      await db.set(`tickets_${idd}`, {
        reason: args,
        msgID: msg.id,
        id: idd,
        guildName: message.guild.name,
        guildAvatar: message.guild.iconURL(),
        channelID: message.channel.id
      })
    })
  }
})
client.on('clickButton', async button => {
  if (db.has(`tickets_${button.id}`) == true) {
    if(ticketab.has(`${button.clicker.user.id}`))return button.reply.send(`du hast schon ein Ticket`, true)
    await button.reply.send(`Ihr Ticket wird vorbereitet. Bitte warten`, true)
    await countsdb.math(`counts_${button.message.id}`, `+`, 1)
    let count = await countsdb.get(`counts_${button.message.id}`)
    let channel;
    button.guild.channels.create(`ticket-${count}`,{
      permissionOverwrites: [
        {
          id: button.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: config.support_1,
          allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
        },
        {
          id: config.support_2,
          allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
        },
        {
          id: button.clicker.user.id,
          allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
        },
      ], parent: config.category_id, position: 1, topic: `Ticket Von : <@${button.clicker.user.id}>`, reason: "Alle Rechte Bei Schlumpfcraft.de"
    }).then(async channel => {
      channel = channel
      await ticketschannelsdb.set(`ticket_${channel.id}`, { count: count, ticket_by: button.clicker.user.id })
      await button.reply.edit(`
**Ihr Ticket wurde erfolgreich geöffnet** <#${channel.id}>`, true)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Es wurde ein Neues Ticket erstellt!`)
            .addField(`Das Ticket!`, `<#${channel.id}>`)
            .addField(`Diesen Knopf betätigen!`, `${button.clicker.user}`)  
            .addField(`Zahle : `, count)
            .setTimestamp()
            .setColor(`GREEN`)
          channelLog(log_embed)
          ticketab.set(`${button.clicker.user.id}`,"{}")
      const embedticket = new Discord.MessageEmbed()
        .setFooter(`Ticket geöffnet um`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setDescription(`Der Support wird bald bei Ihnen sein.
        Um dieses Ticket zu schließen, Clicken Sie auf 🔒`)
      let idd = randomstring.generate({ length: 25 })
      let bu1tton = new disbut.MessageButton()
        .setStyle(`gray`)
        .setEmoji(`🔒`)
        .setLabel(`Close`)
        .setID(idd)
      channel.send(`<@&854778181847482408>${button.clicker.user}`, { embed: embedticket, component: bu1tton }).then(msg => {
        msg.pin()
         {
        }
      })
client.on('clickButton', async (button1) => {
        if (button1.id == idd) {
          let bu0tton = new disbut.MessageButton()
            .setStyle(`red`)
            .setLabel(`schließen`)
            .setID(idd + `sure`)
          await button1.reply.send(`Möchten Sie dieses Ticket wirklich schließen?`, { component: bu0tton, ephemeral: true });
        }
client.on('clickButton', async (button) => {
          if (button.id == idd + `sure`) {
            await button1.reply.edit(`Ihre Ticket wird nach 5 Sekunden ausgeführt und geschlossen`, true)
            let ch = channel
            if (!ch) return;
            setTimeout(async () => {
              try {
                await ch.send({ embed: { description: `Ticket wurde geschlossen von <@${button.clicker.user}>`, color: `YELLOW` } });
                ticketab.remove(`${button.clicker.user.id}`)
                let type = 'member'
                await Promise.all(ch.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
                ch.setName(`closed-${await ticketschannelsdb.get(`ticket_${ch.id}`).count}`)
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Ticket geschlossen`)
                  .addField(`Ticket`, `<#${ch.id}>`)
                  .addField(`Aktion von` , `<@${button.clicker.user}>`)
                  .setTimestamp()
                  .setColor(`YELLOW`)
                channelLog(log_embed)
              } catch {

              }
            }, 4000)
          }
        })
      })
    })
  }
  });
  client.on('message', message => {
    let command = message.content.toLowerCase().split(" ")[0];
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    
  if (command == prefix + 'ban') {
    if (message.channel.id == "881581314816479232") return ;
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Du hast die Permissions, um das zu tun, nicht.");
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
client.on("ready", async () => {
  await client.user.setActivity(config.status || `SchlumpfcraftBot Alle Rechte Bei SchlumpfkopfYT`)
  console.clear()
  console.log(`Schlumpfcraft.de`);
});
client.on('message', (message) => {
  if (message.channel.id == "854778236093726760"){
    if (message.content === prefix + 'web') return message.delete();
    if (message.content === prefix + 'infowarn') return message.delete();
    if (message.content === prefix + 'help') return message.delete();
    if (message.content === prefix + 'resume') return message.delete();
    if (message.content === prefix + 'pause') return message.delete();
    if (message.content === prefix + 'volume') return message.delete();
    if (message.content === prefix + 'np') return message.delete();
    if (message.content === prefix + 'repeat') return message.delete();
    if (message.content === prefix + 'loop') return message.delete();
    if (message.content === prefix + 'skip') return message.delete();
    if (message.content === prefix + 'stop') return message.delete();
    if (message.content === prefix + 's') return message.delete();
    if (message.content === prefix + 'l') return message.delete();
    if (message.content === prefix + 'leave') return message.delete();
    if (message.content === prefix + 'infowarn') return message.delete();
    if (message.content === prefix + 'play') return message.delete();
    if (message.content === prefix + 'kick') return message.delete();
    if (message.content === prefix + 'ban') return message.delete();
    if (message.content === prefix + 'send') return message.delete();
    if (message.content === prefix + 'rename') return message.delete();
    if (message.content === prefix + 'open') return message.delete();
    if (message.content === prefix + 'close') return message.delete();
    if (message.content === prefix + 'remove') return message.delete();
    if (message.content === prefix + 'add') return message.delete();
    if (message.content === prefix + 'ping') return message.delete();
    if(message.mentions.has("831502185640099880") | message.mentions.has("541311174168543256")| message.mentions.has("605835662653915146")| message.mentions.has("634312667263270913")) return ;
    message.react("👍")
    message.react("👎")
  
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

const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello Express app!');
});
const distube = require('distube');
const e = require("express");
const Data = require("st.db");
client.distube = new distube(client, {
	searchSongs: false,
	emitNewSongOnly: true, 
	youtubeDL: true,
    updateYouTubeDL: true,
});
require("ffmpeg-static");
require("ytdl-core");
client.on("message", message =>{
if (message.content.startsWith(prefix + "play")) {
  if (message.channel.id == "881581314816479232")return;
  const volume = parseInt("5")
		const args = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if(!args) return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Gib den Songnamen oder den Link an!`)
			
			); 
		if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte betritt einen Sprachchat!`)
			);
		try {
		client.distube.play(message, args);
       
		}catch (e) {
const embed = new Discord.MessageEmbed()
.setTitle("❌ Error")
.setColor("RED")
.setDescription(e)
message.channel.send(embed)
  } 
	}
	if (message.content === prefix +"stop" || message.content === prefix +"s" || message.content === prefix +"l"|| message.content === prefix +"leave") {
    if (message.channel.id == "881581314816479232")return;
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("BLUE")
     .setDescription(`Bitte betritt einen Sprachchat!`)
			
			); 
	const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("Es ist gerade kein Song in der Warteschlange!")) 
		client.distube.stop(message);
const embed = new Discord.MessageEmbed()
.setTitle("⏸️  Stop")
.setColor("RED")
.setDescription(`Der Song wurde gestopt`)
message.channel.send(embed) 
	}
	if (message.content === prefix +"skip") {
    if (message.channel.id == "881581314816479232")return;
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte betritt einen Sprachchat`)
			
			);
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("Es ist gerade kein Song in der Warteschlange!")) 
try {
		client.distube.skip(message);
const embed = new Discord.MessageEmbed()
.setTitle("⏭️  Skip")
.setColor("BLUE")
.setDescription(`Der Song wurde übersprungen!`)
message.channel.send(embed) 
}catch (e) {
const embed = new Discord.MessageEmbed()
.setTitle("❌ Error")
.setColor("RED")
.setDescription(e)
message.channel.send(embed)
        }
	}
	if (message.content === prefix +"repeat" || message.content === prefix +"loop" ) {
    if (message.channel.id == "881581314816479232")return;
const args = message.content.split("Bitte betritt einen Sprachchat! ")
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(``)
			); 
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`Es wird gerade kein Song abgespielt!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = client.distube.setRepeatMode(message, mode)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
const embed = new Discord.MessageEmbed()
.setTitle("🔄  Repeat")
.setColor("RED")
.setDescription(`Wiederholmodus einstellen auf \`${mode}\``)
message.channel.send(embed) 
	}
	if (message.content === prefix +"queue" || message.content.startsWith(prefix + "q")) {
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte betritt einen Sprachchat!`)
			
			); 
		let queue = client.distube.getQueue(message);
		if(!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("Es ist gerade kein Song in der Warteschlange!"))
		const embed = new Discord.MessageEmbed()
		.setTitle("Current Queue :")
	.setColor("BLUE")
	.setDescription(queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n") )
		message.channel.send(embed)
	}
	if (message.content === prefix +"np"){
    if (message.channel.id == "881581314816479232")return;
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte betritt einen Sprachchat!`)
			
			); 
		let queue = client.distube.getQueue(message);
		if(!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("Es ist gerade kein Song in der Warteschlange!"))
		const embed = new Discord.MessageEmbed()
		.setTitle(" Now Playing:")
	.setColor("BLUE")
	.setDescription(queue.songs.map((song, id) =>
            `${song.name} - \`${song.formattedDuration}\``
        ).slice(0,1).join("\n") )
		message.channel.send(embed)
        
	}
	if (message.content === prefix +"volume" || message.content.startsWith(prefix + "vol")) {
    if (message.channel.id == "881581314816479232")return;

const args = message.content.split(" ")
if(!args) return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte gib eine Nummer zwischen 1 und 100 an!`)
			); 
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.seTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte betritt einen Sprachchat!`)
			
			); 
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("Es ist gerade kein Song in der Warteschlange!"))
  const volume = parseInt(args[1])
if (isNaN(volume)) return message.channel.send(` Gib eine Zahl zwischen 1 und 100 an!`)
if(volume > 100) return message.channel.send(new Discord.MessageEmbed()
.setTitle("❌  Error")
.setColor("RED")
.setDescription(`Das maximale Volumen ist \`100\``)
)
        client.distube.setVolume(message, volume)
const embed = new Discord.MessageEmbed()
.setTitle("🔊  Volume")
.setColor("RED")
.setDescription(`Volume set to \`${volume}\``)
message.channel.send(embed) 
	}
	if (message.content === prefix +"pause") {
    if (message.channel.id == "881581314816479232")return;
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.seTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte betritt einen Sprachchat!`)
			
			); 
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("Es ist gerade kein Song in der Warteschlange!"))
if (queue.pause) {
            client.distube.resume(message)
            return message.channel.send(new Discord.MessageEmbed()
.setTitle("▶️  Resumed")
.setColor("RED")
.setDescription(`Der Song wurde fortgesetzt!`)
) 
            
        }
        client.distube.pause(message)
const embed = new Discord.MessageEmbed()
.setTitle("⏸️  Paused")
.setColor("RED")
.setDescription(`Der Song wurde pausiert`)
message.channel.send(embed) 
	}
	if (message.content === prefix +"resume") {
    if (message.channel.id == "881581314816479232")return;

if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Bitte betritt einen Sprachchat!`)
			
			);
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("Es ist gerade kein Song in der Warteschlange!")) 
client.distube.resume(message)
const embed = new Discord.MessageEmbed()
.setTitle("▶️  Fortgesetzt")
.setColor("RED")
.setDescription(`Der Song wurde fortgesetzt!`)
message.channel.send(embed) 

	}
    
});
const status = queue =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter ||
		'Off'}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode == 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

client.distube
.on("finish", message => message.guild.me.voice.channel.leave() )
.on("empty", message => message.guild.me.voice.channel.leave())

.on("initQueue", queue => {
  queue.autoplay = false;
  queue.volume = 100;
})
.on("noRelated", message => message.channel.send("Es wurde kein passendes Video zu Song gefunden! Musik wurde pausiert"))

	.on('playSong', (message, queue, song) =>
		message.channel.send({
			embed: {
  color: 0x0099ff,
	title: song.name
	,url: song.url,
				image: {
					url: song.thumbnail
				}, 
				fields: [
				 {
						name: '🕘 Zeit',
						value: `\`${song.formattedDuration}\``,
						inline: true
					},
				],
	timestamp: new Date(),
	footer: {
		text: `Anfrage von ${song.user.username}`
	}
			}
		})
		
	)
	.on('addSong', (message, queue, song) =>		message.channel.send({
			embed: {
  color: 0x0099ff,
	title: song.name,
	url: song.url,
				image: {
					url: song.thumbnail
				}, 
				fields: [
				 {
						name: '🕘 Time',
						value: `\`${song.formattedDuration}\``,
						inline: true
					},
				],
	timestamp: new Date(),
	footer: {
		text: `Anfrage von ${song.user.username}`
	}
			}
		})
		
	)
	.on("playList", (message, queue, playlist, song) => 
	
	message.channel.send({embed :{
	color: 0x0099ff,
	title:playlist.name,
	url:playlist.url, 
	fields: [
		{
			name: '📃 Playlist-Songs',
			value: playlist.songs.length,
		},
		{
		  name:"▶️ Läuft gerade", 
		  value:`${song.name} \`${song.formattedDuration}\``
		},  
], 
	image:{
	  url:playlist.thumbnail.url, 
	}, 
	timestamp: new Date(),
	footer: {
		text: `Anfrage von ${message.author.tag}`
	},
	}})
	
	
	) 
 	.on("addList", (message, queue, playlist, song) => 
	
	message.channel.send({embed :{
	color: 0x0099ff,
	title:playlist.name,
	url:playlist.url, 
	fields: [
		{
			name: '📃 Playlist-Songs',
			value: playlist.songs.length,
		},
		
], 
	image:{
	  url:playlist.thumbnail.url, 
	}, 
	timestamp: new Date(),
	footer: {
		text: `Anfrage von ${message.author.tag}`
	},
	}})
) 

	.on('error', (message, e) => {
		console.error(e);
		message.channel.send('Ein Fehler ist aufgetreten: ' + e);
	});
  client.on('message', message => {
    if (message.content === prefix + 'help') {
      if (message.channel.id == "881581314816479232")return;
      if (message.channel.id == "854778206249549854")return;
      if (message.channel.id == "854778214143361046")return;
      var Helpa = new Discord.MessageEmbed()
      .setTitle(`Help Seite`)
      .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
      .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
      .addFields(
        { name: '!ping', value: 'Dann kommt Pong!' },
        { name: '!play', value: 'Dann kannst du Musik hören' },
        { name: '!web', value: 'Webseite Info' },
        { name: '!infowarn <user>', value: 'Damit kannst du die Verwarung von <User>' },
        { name: '!volume <1-100>', value: 'Damit kannst du die Lautstärke entscheiden! ' },
        { name: `!stop/!leave/!s/!l`, value: `Dadurch verlässt der Bot den Sprachchat!`, inline: true }
      )
      .setTimestamp()
      .setImage('https://schlumpfcraft.de/img/logo.png')
      .setColor(`GREEN`)
      .setFooter('Schlumpfcraft.de Bot');
      message.channel.send(Helpa)
      message.delete();
    }
  });
  client.on('message', message  => {
    let command = message.content.toLowerCase().split(" ")[0];
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(0);
    if (command === prefix + 'warn') { 
      if (message.channel.id == "881581314816479232")return;
      const user = message.mentions.users.first();
      if (!message.member.hasPermission('KICK_MEMBERS'))return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt");    
      if (!user) return message.reply("Gib einen User an.")  |message.delete();;
      if (message.channel.id == "881581314816479232")return;
      if (!message.member.hasPermission('KICK_MEMBERS'))return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt"); 
      warnplayer.math(`${user.id}`, `+`, 1)
      let WarnPlayer = new Discord.MessageEmbed()
      .setTitle(`Syetem`)
      .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
      .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
      .addField(`${user.tag}`, `Du hast gegen unsere Reglen verstoßen`)
      .addField('Verwarung', 'Bei fragen Bitte ich dich ein ticket zu erstellen')
      .setTimestamp()
      .setImage('https://schlumpfcraft.de/img/logo.png')
      .setColor(`RED`)
      .setFooter('Schlumpfcraft.de Bot');
      message.channel.send(WarnPlayer)
     message.delete();
     let log_warn = new Discord.MessageEmbed()
     .setTitle(`System
Erfolgreich Ausgeführt`)
     .addField(`${user.tag}`, `Hat ein verwarung gekommen`) 
     .addField(`Aktion von `, `${message.member.user.tag}`) 
     .setTimestamp()
     .setColor(`GREEN`)
   channelLog(log_warn)
  
    }
  });

  client.on('message', message  => {
    let command = message.content.toLowerCase().split(" ")[0];
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(0);
    if (command === prefix + 'unwarn') { 
      if (message.channel.id == "881581314816479232")return;
      const user = message.mentions.users.first();
      if (!message.member.hasPermission('MANAGE_MESSAGES'))return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt");    
      if (!user) return message.reply("Gib einen User an.")  |message.delete();;
      if (message.channel.id == "881581314816479232")return;
      if (!message.member.hasPermission('MANAGE_MESSAGES'))return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt");    
      let WarnPlayer = new Discord.MessageEmbed()
      .setTitle(`Syetem`)
      .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
      .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
      .addFields(
        { name: `${user.tag}`, value: `Dir wörde ein Verwarung entfernt`, inline: true },
        { name: 'UnVerwarung', value: 'Bei fragen Bitte ich dich ein ticket zu erstellen' },
      )
      .setTimestamp()
      .setImage('https://schlumpfcraft.de/img/logo.png')
      .setColor(`GREEN`)
      .setFooter('Schlumpfcraft.de Bot');
      let log_warn = new Discord.MessageEmbed()
      .setTitle(`System
 Erfolgreich Ausgeführt`)
      .addField(`${user.tag}`, `Hat ein unverwarung gekommen`) 
      .addField(`Aktion von `, `${message.member.user.tag}`) 
      .setTimestamp()
      .setColor(`GREEN`)
      if(warnplayer.has(`${user.id}`) == 1 ) return warnplayer.remove(`${user.id}`) |   message.channel.send(WarnPlayer)   |   channelLog(log_warn)|  message.delete(); ;
      warnplayer.math(`${user.id}`, `-`, 1)
      message.channel.send(WarnPlayer)
     message.delete();
  
    }
  });
  client.on('message', async (message) => {
    if (
      message.content.toLowerCase().startsWith(prefix + 'clear') ||
      message.content.toLowerCase().startsWith(prefix + 'c ')
    ) {
      if (message.channel.id == "881581314816479232") return message.delete();
      if (!message.member.hasPermission('KICK_MEMBERS'))
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

    client.on('message', message  => {
    if (message.content === prefix + "listservers") {
          message.channel.send(` Name : ${message.guild.name} / Id von Server : ${message.guild.id}`);
        }
    });
    client.on('message', message => {
      if (message.content === prefix + 'sendclose') {
        if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt");
        let cticket = new Discord.MessageEmbed()
        .setTitle(`[Möchtest du das Ticket schließen?]`)
        .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
        .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
        .addFields(
          { name: `Falls du **keine weiteren Fragen** hast, schließe das Ticket`, value: ` mit **!close** Für **weitere Fragen** stehen wir dir in **diesem Ticket** gerne zur Verfügung.`, },
        )
        .setTimestamp()
        .setImage('https://schlumpfcraft.de/img/logo.png')
        .setColor(`RED`)
        .setFooter('Schlumpfcraft.de Bot');
        message.channel.send(cticket)
       message.delete();
      }
    });
    client.on('message', msg => {
      let messageArray = msg.content.split(" ");
      let args = messageArray.slice(0);
    if(msg.content === prefix + "unban"){
      if(!msg.member.hasPermission("BAN_MEMBERS")) {
        return msg.channel.send(`**${msg.author.username}**, You do not have perms to unban someone`)
      }
      
      if(!msg.guild.me.hasPermission("BAN_MEMBERS")) {
        return msg.channel.send(`**${msg.author.username}**, I do not have perms to unban someone`)
      }
      
      let userID = args[0]
        msg.guild.fetchBans().then(bans=> {
        if(bans.size == 0) return 
        let bUser = bans.find(b => b.user.id == userID)
        if(!bUser) return
        msg.guild.members.unban(bUser.user)
        msg.channel.send("hi")
        
  })
};
});

client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
if (command == prefix + 'start') {
  if(ifGeld.has(`${message.author.id}`))return;
  ifGeld.set(`${message.author.id}`,"{}")
  Geld.math(`${message.author.id}`,`+`, 1);
  message.channel.send("Du bist nur für Schlumpfcoins verifiziert")


}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  let Money = Geld.get(`${message.author.id}`)
if (command == prefix + 'money') {
  if(!ifGeld.has(`${message.author.id}`))return message.channel.send("Du bist nicht für Schlumnpfcoins verifiziert")
  if(Geld.get(`${message.author.id}`)== 0 ) return message.channel.send("Du hast 0 Schlumpcoins");
    message.channel.send("Du hast "+ Money + " Schlumpfcoins")
        
    
}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
if (command == prefix + 'schlumpf') {
  if(!ifGeld.has(`${message.author.id}`))return message.channel.send("Du bist nicht für Schlumnpfcoins verifiziert***!start***")
  Geld.math(`${message.author.id}`,`+`, 1);
  message.channel.send("Du Hast 1 Euro Gekommen !")
  let log_warn = new Discord.MessageEmbed()
  .setTitle(`Befehlen Check`)
  .addField(`${message.author.tag}`, `Hat /schlumpf Gemacht!`) 
  .setTimestamp()
  .setColor(`GREEN`)
 channelLog(log_warn)
}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  let Money = Geld.get(`${message.author.id}`)
if (command == prefix + 'daily') {
  if(!ifGeld.has(`${message.author.id}`))return message.channel.send("Du bist nicht für Schlumnpfcoins verifiziert***!start***")
if(dailyaaa.has(`${message.author.id}`))return message.channel.send("Bitte Warte 1 Stunde")
Geld.math(`${message.author.id}`,`+`, 100);
dailyaaa.set(`${message.author.id}`,"{}")
message.channel.send(`Du hast 100+ Schlumpfcoins gekommen Auf Dein Konto ist jezte ` + Geld.get(`${message.author.id}`))

}  
});
function iantervalFunc() {
  dailyaaa.clear()
  let ch = client.channels.cache.get("893130629942767656")
  if (!ch) return console.log(`FEHLER!`)
  ch.send("Ihr konnt wieder !daily")
}
setInterval(iantervalFunc,1000 * 60 * 60 * 24);
function intervalFunc() {
  if (!config.log_channel_id) return;
  partherer(`Heyy du! Ja genau du, genau dich meine ich!
Du hast Lust auf einen guten Minecraft- oder Discordserver, dann bist bei uns genau richtig.
Wir bieten dir:
-	eine lustige Community auf unserem Discord
-	einen Minecraftserver, aber was für Spielmodis wir haben muss du wohl selbst herausfinden
-	einen sehr netten Support und nette Teamitglieder
-	eine Website zum Bewerben und anderen features
-	wir unterstützen auch die Minecraft Bedrock Version
Wir freuen uns auf dich, aber wir können dir noch nicht versichern, ob der Minecraftserver schon bald öffentlich gehen kann, denn es gibt Momentan Probleme, aber diese sind sicher bald behoben. 
Also wie wäre es? Schaust du mal bei uns vorbei?
Fallst du dich noch fragst wie die Server IP lautet...
Sie lautet: Schlumpfcraft.de!
Wir würden uns freuen 
Dein Schlumpfcraft.de Team
  https://discord.gg/rHeBKMRd63`)
}
setInterval(intervalFunc,1000 * 60 * 60 * 6);
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
if (command == prefix + 'closeadmin') {
  if (message.channel.id == "881581314816479232") return ;
  let channel = message.mentions.channels.first() || message.channel;
  let bans = message.guild.fetch().then();
  let User = message.guild.member(message.mentions.users.first()) ||message.guild.members.cache.get(args[0])
  if(!User) return message.channel.send("Bitte Geb ein Spieler Ein!");
  if(!ticketschannelsdb.has(`ticket_${channel.id}`) == true) return message.channel.send("hi JAJAJA");
  ticketab.remove(`${User.id}`)
  let type = 'member'
  Promise.all(channel.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
  let log_embed = new Discord.MessageEmbed()
  .setTitle(`Ticket geschlossen`)
  .addField(`Ticket`, `<#${channel.id}>`)
  .addField(`Aktion von`, `<@!${message.author.id}>`)
  .setTimestamp()
  .setColor(`YELLOW`)
  .setFooter(message.guild.name, message.guild.iconURL())
channelLog(log_embed)
channel.setName(`${User.displayName}-Ticket`)
channel.send(`Ticket wurde geschlossen von <@!${message.author.id}>`)

}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
if (command == prefix + 'warnteam') {
  if (message.channel.id == "881581314816479232")return;
  const user = message.guild.member(message.mentions.users.first()) ||message.guild.members.cache.get(args[0])
  if (!message.member.hasPermission('KICK_MEMBERS'))return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt");    
  if (!user) return message.reply("Gib einen User an.")  | message.delete();;
  if (message.channel.id == "881581314816479232")return;
  if (!message.member.hasPermission('KICK_MEMBERS'))return message.channel.send("Sie können diesen Befehl nicht verwenden, da Ihnen die Permission von `*Team Rolle*` fehlt"); 
  if(Warnt.get(`${user.id}`) == 3 )return user.roles.remove(`854778181847482408`)|| user.roles.remove(`854778165292564560`)|| user.roles.remove(`854778171647459389`)|| user.roles.remove(`854778170619985971`) || user.roles.remove(`854778171325284382`)|| user.roles.remove(`854778165292564560`)|| user.roles.remove(`854778164567867442`)|| user.roles.remove(`854778163762561064`)|| user.roles.remove(`854778172872065044`)|| user.roles.remove(`854778173564649502`)|| user.roles.remove(`854778174612570212`)|| user.roles.remove(`854778175661932634`);
  Warnt.math(`${user.id}`, `+`, 1)
  let WarnPlayer = new Discord.MessageEmbed()
  .setTitle(`Syetem`)
  .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
  .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
  .addField(`${user.user.tag}`, `Du hast gegen unsere Teamreglen verstoßen`)
  .addField('Verwarung', 'Bie fragen Gerne zu [Sc] SchlumpfkopfYT#2005 Melden Danke')
  .setTimestamp()
  .setImage('https://schlumpfcraft.de/img/logo.png')
  .setColor(`RED`)
  .setFooter('Schlumpfcraft.de Bot');
  message.channel.send(WarnPlayer)
 message.delete();
 let log_warn = new Discord.MessageEmbed()
 .setTitle(`System
Erfolgreich Ausgeführt`)
 .addField(`${user.user.tag}`, `Hat ein Team Verwarnungen gekommen`) 
 .addField(`Aktion von `, `${message.member.user.tag}`) 
 .setTimestamp()
 .setColor(`GREEN`)
channelLog(log_warn)
}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
if (command == prefix + 'rechtlich'|| command == prefix + 'Impressum') {
  message.channel.send("https://schlumpfcraft.de/Impressum/")
}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  let role = message.guild.roles.cache.get("854778187317772289");
  let VipGe = new Discord.MessageEmbed()
.setTitle(`Vip Gekauft`)
.setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
.setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
.addField(`${message.author.tag}`, `Du hast dir den Vip Rang gekauft`)
.setTimestamp()
.setImage('https://schlumpfcraft.de/img/logo.png')
.setColor(`GREEN`)
.setFooter('Schlumpfcraft.de Bot');
if (command == prefix + 'schlumpfvip') {
if (!ifGeld.has(`${message.author.id}`))return;
if (role)return;
if (Geld.get(`${message.author.id}`)== 10000)return Geld.math(`${message.author.id}`, `-`, 10000) & message.member.roles.add(role) & message.channel.send(VipGe);
if (Geld.get(`${message.author.id}`) > 10000)return Geld.math(`${message.author.id}`, `-`, 10000) & message.member.roles.add(role) & message.channel.send(VipGe) && message.delete();
message.channel.send("Leider hast du nicht genug Geld daher guck mal im Shop ( !schlumpfshop) dann siehst du wie Teuer es ist und wie viel Geld du brauchst.")
}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
if (command == prefix + 'schlumpfshop') {
  var Shop = new Discord.MessageEmbed()
  .setTitle(`Shop`)
  .setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
  .setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
  .addFields(
    { name: '10.000 Schlumpfcoins = VIP ', value: 'Du kaufst dir damit den Vip Rang' },
    { name: `100.000 Schlumpfcoins = KOPF`, value: `Du kaufst dir damit den Kopf Rang`, inline: true }
  )
  .setTimestamp()
  .setColor(`RED`)
  .setFooter('Schlumpfcraft.de Bot');
 message.channel.send(Shop)
 message.delete();
}
});
client.on('message', message => {
  let command = message.content.toLowerCase().split(" ")[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  let role = message.guild.roles.cache.get("854778187317772289");
  let VipGe = new Discord.MessageEmbed()
.setTitle(`Kopf Gekauft`)
.setAuthor('Schlumpfcraft.de', 'https://schlumpfcraft.de/img/logo.png','https://discord.gg/JNadFyEznH')
.setThumbnail(`https://schlumpfcraft.de/img/logo.png`)
.addField(`${message.author.tag}`, `Du hast dir den Kopf Rang gekauft`)
.setTimestamp()
.setImage('https://schlumpfcraft.de/img/logo.png')
.setColor(`GREEN`)
.setFooter('Schlumpfcraft.de Bot');
if (command == prefix + 'schlumpfkopf') {
if (!ifGeld.has(`${message.author.id}`))return;
message.channel.send("Komm bald")

}
});
client.login("ODczNTk5NzI3NDc0NzI5MDcw.YQ6xJQ.9nnBEKbVmGsGnrs9L_veXsvMI-s")