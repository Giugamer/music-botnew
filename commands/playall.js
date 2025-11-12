const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playall')
        .setDescription('Ajoute tous les fichiers audio du dossier ./music à la queue et les lit'),
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.reply('❌ Vous devez être dans un salon vocal.');

        const musicFolder = path.resolve(__dirname, '../music');
        // Inclut .mp3 et .m4a
        let files = fs.readdirSync(musicFolder).filter(f => f.endsWith('.mp3') || f.endsWith('.m4a'));

        if (files.length === 0) return interaction.reply('❌ Aucun fichier audio trouvé dans ./music.');

        const guildId = interaction.guild.id;

        // Initialiser la queue si nécessaire
        if (!client.guildQueues.has(guildId)) {
            client.guildQueues.set(guildId, {
                queue: [],
                player: createAudioPlayer(),
                connection: joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                }),
                nowPlaying: null,
            });
            client.guildQueues.get(guildId).connection.subscribe(client.guildQueues.get(guildId).player);
        }

        const guildQueue = client.guildQueues.get(guildId);

        // Ajouter tous les fichiers à la queue
        files.forEach(f => guildQueue.queue.push(path.join(musicFolder, f)));

        // Fonction pour jouer la prochaine musique
        const playNext = () => {
            if (guildQueue.queue.length === 0) {
                guildQueue.nowPlaying = null;
                guildQueue.connection.destroy();
                client.guildQueues.delete(guildId);
                return;
            }
            const nextFile = guildQueue.queue.shift();
            guildQueue.nowPlaying = nextFile.split(/[\\/]/).pop(); // pour /nowplaying
            const resource = createAudioResource(nextFile);
            guildQueue.player.play(resource);
        };

        guildQueue.player.removeAllListeners();
        guildQueue.player.on(AudioPlayerStatus.Idle, playNext);

        // Si rien n’est en cours, lancer la première musique
        if (guildQueue.player.state.status === 'idle') playNext();

        await interaction.reply(`▶️ Tous les fichiers audio ont été ajoutés à la queue (${files.length}).`);
    }
}; // <-- IMPORTANT : fermeture de module.exports
