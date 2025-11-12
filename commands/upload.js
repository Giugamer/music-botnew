const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upload')
        .setDescription('⬆️ Envoie une musique sur le serveur local.')
        .addAttachmentOption(option =>
            option.setName('fichier')
                .setDescription('Fichier audio .mp3 ou .m4a')
                .setRequired(true)
        ),

    async execute(interaction) {
        const fichier = interaction.options.getAttachment('fichier');
        if (!fichier.name.endsWith('.mp3') && !fichier.name.endsWith('.m4a'))
            return interaction.reply({ content: '❌ Seuls les fichiers `.mp3` et `.m4a` sont acceptés.', ephemeral: true });

        const res = await fetch(fichier.url);
        const buffer = await res.arrayBuffer();
        const chemin = path.join(__dirname, '../music', fichier.name);

        fs.writeFileSync(chemin, Buffer.from(buffer));
        await interaction.reply(`✅ Fichier **${fichier.name}** ajouté dans le dossier /music.`);
    }
};
