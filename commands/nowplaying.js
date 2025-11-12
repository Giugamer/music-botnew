const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Affiche la musique actuellement en lecture'),
    async execute(interaction, client) {
        const guildQueue = client.guildQueues.get(interaction.guild.id);
        if (!guildQueue || !guildQueue.nowPlaying)
            return interaction.reply('❌ Aucune musique en cours de lecture.');

        await interaction.reply(`▶️ En cours : **${guildQueue.nowPlaying}**`);
    }
};
