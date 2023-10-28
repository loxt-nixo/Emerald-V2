const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

const noperms = new EmbedBuilder()
    .setColor("Red")
    .setDescription("You need to have Administrator to use this command!")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-all')
        .setDescription('Add a role to all users')
        .addRoleOption(option => option.setName('role').setDescription('The role to add to all users').setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            console.log("User doesn't have Administrator permission");
            return await interaction.reply({ embeds: [noperms], ephemeral: true });
        }

        const role = interaction.options.getRole('role');

        const members = await interaction.guild.members.fetch();

        let number = 0;

        members.forEach(member => {
            if (!member.roles.cache.has(role.id)) {
                member.roles.add(role);
                number ++;
            }
        });

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`Added the Role ${role} to ${number} Users!`)

        await interaction.reply({ embeds: [embed] });
    }
};
