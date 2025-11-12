const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Vide la queue et quitte le salon vocal'),
    async execute(interaction, client) {
        const guildQueue = client.guildQueues.get(interaction.guild.id);
        if (!guildQueue) return interaction.reply('❌ Rien à arrêter.');

        guildQueue.queue = [];
        guildQueue.player.stop();
        guildQueue.connection.destroy();
        client.guildQueues.delete(interaction.guild.id);

        await interaction.reply('⏹ La lecture a été arrêtée et la queue vidée.');
    }
};
