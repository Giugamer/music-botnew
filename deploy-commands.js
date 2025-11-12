import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import fs from "fs";
import path from "path";
import config from "./config.json" assert { type: "json" };

const commands = [];
const commandsPath = path.join("./commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath);
  commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
  try {
    console.log(`🚀 Déploiement de ${commands.length} commandes sur Discord...`);
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );
    console.log("✅ Commandes déployées !");
  } catch (error) {
    console.error(error);
  }
})();
