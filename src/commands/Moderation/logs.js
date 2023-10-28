const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ChannelType}= require('discord.js');
const logSchema = require("../../Schemas/logschema");
 
const noperms = new EmbedBuilder()
.setColor("Red")
.setDescription("You need to have Administrator to use this command!")

const already = new EmbedBuilder()
.setColor("Red")
.setDescription("You already have Logs setup!")

const notset = new EmbedBuilder()
.setColor("Red")
.setDescription("You don't have the Logs Setup yet!")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Configure your logging system.")
    .addSubcommand(command => command.setName('setup').setDescription('Set the Logs Channel to Log Events').addChannelOption(option => option.setName("channel").setDescription("The Channel you want to send the Logs in!").setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)))
    .addSubcommand(command => command.setName('disable').setDescription('Disable the Log System')),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [noperms], ephemeral: true })
 
        const sub = await interaction.options.getSubcommand();
        const data = await logSchema.findOne({ Guild: interaction.guild.id });
 
        switch (sub) {
            case 'setup':
 
            if (data) return await interaction.reply({ embeds: [already], ephemeral: true});
            else {
 
                const logchannel = interaction.options.getChannel("channel") || interaction.channel;
 
                const setupembed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Your Logs Channel has been set to ${logchannel}`)
 
                await interaction.reply({ embeds: [setupembed] });
 
                await logSchema.create({
                    Guild: interaction.guild.id,
                    Channel: logchannel.id
                })
            }
 
            break;
            case 'disable':
 
            if (!data) return await interaction.reply({ embeds: [notset], ephemeral: true});
            else {
 
                const disableEmbed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Your Logs have been disabled!`)
 
                await interaction.reply({ embeds: [disableEmbed] });
 
                await logSchema.deleteMany({ Guild: interaction.guild.id })
            }
        }          
    }
}