const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("Déverrouille le salon vocal")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply("❌ Vous devez être dans un salon vocal.");
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { Connect: true });
        interaction.reply("🔓 Salon vocal déverrouillé !");
    }
};