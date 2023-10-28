const { EmbedBuilder, Events } = require("discord.js");
 
function handleLogs(client) {
 
    const logSchema = require("../Schemas/logschema");
 
    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data || !data.Channel) return;
            const LogChannel = client.channels.cache.get(data.Channel);
 
            if (!LogChannel) return;
            embed.setTimestamp();
 
            try {
                LogChannel.send({ embeds: [embed] });
            } catch(err) {
                console.log('Error sending log!');
            }
        });
    };

//message deleted
client.on("messageDelete", function (message) {
 
    try {
        if (message.guild === null) return;
        if (message.author.bot) return;

        const embed = new EmbedBuilder()
        .setTitle('Message Deleted!')
        .setColor("Red")
        .setTimestamp()
        .setDescription(`${message.author} deleted his his message in ${message.channel}\nMessage Content : \`${message.content}\``)
        .setFooter({ text: `ID : ${message.author.id}`, iconURL: message.author.displayAvatarURL()})

        return send_log(message.guild.id, embed);
    } catch (err) {
        console.log(`Couldn't log deleted msg`)
    }
});

//message updated
client.on("messageContentEdited", (message, oldContent, newContent) => {
 
    try {

    if (message.guild === null) return;
    if (message.author.bot) return;

    const embed = new EmbedBuilder()
    .setTitle('Message Edited')
    .setColor("DarkOrange")
    .setTimestamp()
    .setDescription(`${message.author} edited his his message in ${message.channel}`)
    .addFields({ name: 'Before', value: oldContent })
    .addFields({ name: 'After', value: newContent })
    .setFooter({ text: `ID : ${message.author.id}`, iconURL: message.author.displayAvatarURL() })

    return send_log(message.guild.id, embed);

} catch (err) {
    console.log('Err logging message edit')
}

});

//Joined
client.on("guildMemberAdd", (member) => {

    try {

    if (member.guild === null) return;

    const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle('Member joined')
    .setDescription(`${member} Joined this Server`)
    .setFooter({ text: `ID : ${member.id}`, iconURL: member.displayAvatarURL() })

    return send_log(member.guild.id, embed);

} catch (err) {
    console.log('Err logging User Joined')
}
})

// User leavt
client.on("guildMemberRemove", (member) => {
 
    try {
 
    if (member.guild === null) return;
 
     const embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle('Member leavt')
    .setDescription(`${member} Leavt this Server`)
    .setFooter({ text: `ID : ${member.id}`, iconURL: member.displayAvatarURL() })
 
    return send_log(member.guild.id, embed);
 
} catch (err) {
        console.log('Err logging member leave')
}
 
});

// Member Role Added
client.on("guildMemberRoleAdd", (member, role) => {
 
    try {

    if (member.guild === null) return;

    const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle('Role Added')
    .setDescription(`${member} was given the role ${role}`)
    .setFooter({ text: `ID : ${member.id}`, iconURL: member.displayAvatarURL() })

    return send_log(member.guild.id, embed);

} catch (err) {
    console.log('Err logging role give')
}

})

// Member Role Removed
client.on("guildMemberRoleRemove", (member, role) => {

    try {

    if (member.guild === null) return;

    const embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle('Role Removed')
    .setDescription(`The Role ${role} has been removed from ${member}`)
    .setFooter({ text: `ID : ${member.id}`, iconURL: member.displayAvatarURL() })

    return send_log(member.guild.id, embed);

} catch (err) {
    console.log('Err logging role remove')
}

})

// VC Switch
client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
 
    try {

    if (member.guild === null) return;

    const embed = new EmbedBuilder()
    .setTitle('Voice Channel Switched')
    .setColor("Orange")
    .setDescription(`${member} switched Voice Channel from ${oldChannel} to ${newChannel}`)
    .setFooter({ text: `ID : ${member.id}`, iconURL: member.displayAvatarURL()})


    return send_log(member.guild.id, embed);

} catch (err) {
    console.log('Err logging vc switch')
}

});

// Role Created
client.on("roleCreate", (role) => {
 
    try {
 
    if (role.guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle('Role Created')
        .setColor('Green')
        .setDescription(`The role ${role} has been created`)
        .setFooter({ text: `Role ID : ${role.id}`})

 
    return send_log(role.guild.id, embed);
 
 } catch (err) {
    console.log('Err logging role create')
}
 
});

// Role Deleted
client.on("roleDelete", (role) => {
 
    try {

    if (role.guild === null) return;

    const embed = new EmbedBuilder()
    .setTitle('Role Deleted')
    .setColor('DarkRed')
    .setDescription(`The role \`${role.name}\` has been deleted`)
    .setFooter({ text: `Role ID : ${role.id}`})


return send_log(role.guild.id, embed);

} catch (err) {
    console.log('Err logging role delete')
}


});

// User Banned
client.on("guildBanAdd", ({guild, user}) => {
 
    try {

    if (guild === null) return;

    const embed = new EmbedBuilder()
    .setTitle('> User Banned')
    .setColor('DarkRed')
    .setDescription(`${user} has been banned`)
    .setFooter({ text: `ID : ${user.id}`})

    return send_log(guild.id, embed);

} catch (err) {
    console.log('Err logging ban add')
}

});

// User Unbanned
client.on("guildBanRemove", ({guild, user}) => {
 
    try {

    if (guild === null) return;

    const embed = new EmbedBuilder()
    .setTitle('> User Unbanned')
    .setColor('Green')
    .setDescription(`${user} has been unbanned`)
    .setFooter({ text: `ID : ${user.id}`})


    return send_log(guild.id, embed);

} catch (err) {
    console.log('Err logging ban remove')
}

});

// Channel Created
client.on("channelCreate", (channel) => {
 
    try {

    if (channel.guild === null) return;

    const embed = new EmbedBuilder()
    .setTitle('Channel Created')
    .setColor('Green')
    .setDescription(`The Channel ${channel.name} was created (${channel})`)

    return send_log(channel.guild.id, embed);

} catch (err) {
    console.log('Err logging channel create')
}

});

// Channel Deleted
client.on("channelDelete", (channel) => {

    try {

    if (channel.guild === null) return;

    const embed = new EmbedBuilder()
    .setTitle('Channel Deleted')
    .setColor('Red')
    .setDescription(`The Channel ${channel.name} has been deleted!`)

    return send_log(channel.guild.id, embed);

} catch (err) {
    console.log('Err logging channel delete')
}

});

//VC Join
client.on('voiceChannelJoin', async (member, channel) => {

    try {

        if (member.guild === null) return;
    
        const embed = new EmbedBuilder()
        .setTitle('Voice Channel Joined')
        .setColor("Green")
        .setDescription(`${member} joined the Voice Channel ${channel}`)
        .setFooter({ text: `ID : ${member.id}`, iconURL: member.displayAvatarURL()})
    
    
        return send_log(member.guild.id, embed);
    
    } catch (err) {
        console.log('Err logging vc join')
    }
});

//VC Leave
client.on('voiceChannelLeave', async (member, channel) => {

    try {

        if (member.guild === null) return;
    
        const embed = new EmbedBuilder()
        .setTitle('Voice Channel Leavt')
        .setColor("Red")
        .setDescription(`${member} joined the Voice Channel ${channel}`)
        .setFooter({ text: `ID : ${member.id}`, iconURL: member.displayAvatarURL()})
    
    
        return send_log(member.guild.id, embed);
    
    } catch (err) {
        console.log('Err logging vc leavt')
    }
});

}
module.exports = { handleLogs };