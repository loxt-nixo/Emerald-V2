const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const autorole = require('../../Schemas/autorole');
 
const already = new EmbedBuilder()
.setColor("Red")
.setDescription("You already have a autorole setup!")
 
const noperms = new EmbedBuilder()
.setColor("Red")
.setDescription("You need to have Administrator to use this command!")

const deleted = new EmbedBuilder()
.setColor("Red")
.setDescription("The Autorole System has been deleted!")

const noSet = new EmbedBuilder()
.setColor("Red")
.setDescription("The Autorole System has not been setup!")
 
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("autorole")
    .setDescription("Set the autorole for this Server!")
    .addSubcommand((command) => command.setName('setup').setDescription("Set the autorole for this Server").addRoleOption(option => option.setName("role").setDescription("The Role you want to set for the Autorole").setRequired(true)))
    .addSubcommand((command) => command.setName('disable').setDescription("Disable the Autorole for this Server")),
    async execute(interaction) {
        
        const sub = interaction.options.getSubcommand();
        
        switch (sub) {
            case 'setup':

            const role = interaction.options.getRole('role')
            const set = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`The Autorole has been set to ${role.name}`)
     
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [noperms], ephemeral: true })
     
            autorole.findOne({ Guild: interaction.guild.id }, async (err, data) => {
     
                if (!data) {
                    autorole.create({
                        Guild: interaction.guild.id,
                        Role: role.id
                    })
                    await interaction.reply({ embeds: [set], ephemeral: true })
                } else {
                    await interaction.reply({ embeds: [already], ephemeral: true})
                    return;
                }
            })
            break;
            case 'disable':
            
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [noperms], ephemeral: true })
            autorole.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                
                if (data) {
                    await autorole.deleteOne({ Guild: interaction.guild.id });
                    await interaction.reply({embeds: [deleted], ephemeral: true });
                } else {
                    await interaction.reply({embeds: [noSet], ephemeral: true});
                }
            })
        };  
    }
}