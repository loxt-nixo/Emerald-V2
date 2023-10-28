const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server-icon')
    .setDescription('Get the Server Icon of this Server'),
    async execute (interaction) {
        const icon = interaction.guild.iconURL();
        const name = interaction.guild.name;

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`${name}'s Icon`)
        .setImage(icon)

        await interaction.reply({ embeds: [embed]})
    }
}