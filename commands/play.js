const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue un fichier audio local depuis ./music et l’ajoute à la queue')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Nom du fichier audio (avec extension .mp3 ou .m4a)')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.reply('❌ Vous devez être dans un salon vocal.');

        const songName = interaction.options.getString('song');
        const filePath = path.resolve(__dirname, '../music', songName);

        if (!fs.existsSync(filePath)) {
            const musicFiles = fs.readdirSync(path.resolve(__dirname, '../music'))
                .filter(f => f.endsWith('.mp3') || f.endsWith('.m4a'));
            return interaction.reply(`❌ Fichier introuvable.\nFichiers disponibles : ${musicFiles.join(', ')}`);
        }

        const guildId = interaction.guild.id;
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
        guildQueue.queue.push(filePath);

        const playNext = () => {
            if (guildQueue.queue.length === 0) {
                guildQueue.nowPlaying = null;
                guildQueue.connection.destroy();
                client.guildQueues.delete(guildId);
                return;
            }
            const nextFile = guildQueue.queue.shift();
            guildQueue.nowPlaying = nextFile.split(/[\\/]/).pop();
            const resource = createAudioResource(nextFile);
            guildQueue.player.play(resource);
        };

        guildQueue.player.removeAllListeners();
        guildQueue.player.on(AudioPlayerStatus.Idle, playNext);

        if (guildQueue.player.state.status === 'idle') playNext();

        await interaction.reply(`▶️ **${songName}** a été ajouté à la queue !`);
    }
};
