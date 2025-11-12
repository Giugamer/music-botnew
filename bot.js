const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 🔹 Création du client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
    ]
});

// 🔹 Collection pour les commandes
client.commands = new Collection();

// 🔹 Initialisation de DisTube (version récente)
client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    nsfw: false,
    emitAddListWhenCreatingQueue: false,
});

// 🔹 Chargement des commandes depuis ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`✅ Commande chargée : ${command.data.name}`);
}

// 🔹 Event interactionCreate
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Une erreur est survenue.', ephemeral: true });
    }
});

// 🔹 Event ready
client.once('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

// Queue globale pour chaque serveur (guild)
client.guildQueues = new Map();

// 🔹 Connexion du bot
client.login(process.env.TOKEN);
