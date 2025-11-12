const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('📂 Liste toutes les musiques disponibles en local.'),
    
    async execute(interaction) {
        const dossierMusique = path.join(__dirname, '../music');
        const fichiers = fs.readdirSync(dossierMusique)
            .filter(f => f.endsWith('.mp3') || f.endsWith('.m4a'));

        if (!fichiers.length)
            return interaction.reply('📁 Aucun fichier dans le dossier `/music`.');

        await interaction.reply(`🎵 **Musiques disponibles :**\n${fichiers.join('\n')}`);
    }
};
