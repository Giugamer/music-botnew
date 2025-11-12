const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spam')
        .setDescription('📣 Envoie plusieurs messages rapidement.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message à spammer')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Combien de fois ? (max 20)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const message = interaction.options.getString('message');
        const nombre = Math.min(interaction.options.getInteger('nombre'), 20);

        await interaction.reply({ content: `📣 Spam de **${nombre}** messages lancé !`, ephemeral: true });

        for (let i = 0; i < nombre; i++) {
            await interaction.channel.send(message);
        }
    }
};
