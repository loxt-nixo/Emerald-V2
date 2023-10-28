const { Client, GatewayIntentBits, ActivityType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Events, Partials, ChannelType, PermissionsBitField, Permissions, MessageManager, Embed, Collection, ButtonBuilder, ActionRowBuilder, ButtonStyle, DefaultDeviceProperty } = require(`discord.js`);
const fs = require('fs');
const internal = require('stream');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates], partials: [Partials.Message, Partials.Channel, Partials.Reaction] }); 

//logs
const Logs = require('discord-logs')
const process = require('node:process');
 
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
 
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:", err);
});
 
Logs(client, {
    debug: true
})
 
const {handleLogs} = require('./events/handleLogs');

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token).then(() => {
        handleLogs(client);
    })
})();

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:", err);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("Uncaught Exception Monitor", err, origin);
});

//autorole
const autorole = require('./Schemas/autorole');
client.on(Events.GuildMemberAdd, async member => {
    const data = await autorole.findOne({ Guild: member.guild.id });
    if (!data) return;
    else {
        try {
            await member.roles.add(data.Role);
        } catch (e) {
            return;
        }
    }
})