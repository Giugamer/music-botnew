const { SlashCommandBuilder } = require('discord.js');
const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Passe à la musique suivante dans la queue'),
    async execute(interaction, client) {
        const guildQueue = client.guildQueues.get(interaction.guild.id);
        if (!guildQueue || guildQueue.queue.length === 0) return interaction.reply('❌ Rien à passer.');

        guildQueue.player.stop(); // Déclenche l’événement Idle pour jouer le suivant
        await interaction.reply('⏭ Musique suivante !');
    }
};
