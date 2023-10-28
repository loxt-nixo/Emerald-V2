const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get your avatar or the Avatar from someone else')
    .addUserOption(option => option.setName('user').setDescription('The User you want to Avatar from').setRequired(false)),
    async execute (interaction) {

        const user = interaction.options.getUser('user') || interaction.user;
        const avatar = user.displayAvatarURL();
        const color = user.displayHexColor || "Blue";

        const Embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`Here is ${user.username}'s Avatar`)
        .setImage(avatar)

        await interaction.reply({embeds: [Embed], ephemeral: true})
    }
}