const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Affiche la queue actuelle des fichiers audio locaux'),
    async execute(interaction, client) {
        const guildQueue = client.guildQueues.get(interaction.guild.id);
        if (!guildQueue || (guildQueue.queue.length === 0 && !guildQueue.nowPlaying))
            return interaction.reply('❌ La queue est vide.');

        const nowPlaying = guildQueue.nowPlaying ? `▶️ En cours : ${guildQueue.nowPlaying}\n` : '';
        const queueList = guildQueue.queue.map((f, i) => `${i + 1}. ${f.split(/[\\/]/).pop()}`).join('\n');

        await interaction.reply(`${nowPlaying}📃 Queue (${guildQueue.queue.length}) :\n${queueList}`);
    }
};
