const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('This gets some server info'),
    async execute(interaction) {
 
        const { guild } = interaction;
        const { members } = guild;
        const { name, ownerId, createdTimestamp, memberCount } = guild;
        const icon = guild.iconURL();
        const roles = guild.roles.cache.size;
        const emojis = guild.emojis.cache.size;
        const id = guild.id;
        const joinedAt = interaction.member.joinedAt
 
        let baseVerification = guild.verificationLevel;
 
        if (baseVerification == 0) baseVerification = "None"
        if (baseVerification == 1) baseVerification = "Low"
        if (baseVerification == 2) baseVerification = "Medium"
        if (baseVerification == 3) baseVerification = "High"
        if (baseVerification == 4) baseVerification = "Very High"
 
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setThumbnail(icon)
        .setAuthor({ name: name, iconURL: icon })
        .setFooter({ text: `Server ID: ${id}`, iconURL: icon})
        .setTimestamp()
        .addFields({ name: "Name", value: `${name}`, inline: false})
        .addFields({ name: "Date Created", value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true})
        .addFields({ name: "Joined", value: `<t:${parseInt(joinedAt / 1000)}:R>`, inline: true})
        .addFields({ name: "Server Owner", value: `<@${ownerId}>`, inline: true})
        .addFields({ name: "Members", value: `${memberCount}`, inline: true})
        .addFields({ name: "Roles", value: `${roles}`, inline: true})
        .addFields({ name: "Emojis", value: `${emojis}`, inline: true})
        .addFields({ name: "Verification Level", value: `${baseVerification}`, inline: true})
        .addFields({ name: "Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true})
 
        await interaction.reply({ embeds: [embed] });
    }
}