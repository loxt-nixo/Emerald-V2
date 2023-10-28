const { Interaction, EmbedBuilder } = require("discord.js");

const DevOnly = new EmbedBuilder()
.setColor("Red")
.setDescription("This Command can only be executed by the Developer!")

const Error = new EmbedBuilder()
.setColor("Red")
.setDescription("There was an error while executing this command!")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return

        if (command.dev == true) {
            if (interaction.user.id !== '674294528915800074' && interaction.user.id !== '699547532832800819>') {
                return await interaction.reply({ embeds: [DevOnly], ephemeral: true });
            }
        }
        
        
        try{


            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                embeds: [Error], 
                ephemeral: true
            });
        } 

    },
    


};