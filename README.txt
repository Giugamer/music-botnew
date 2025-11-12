🎵 DISCORD BOT - "SPOTIFY++"

A complete and stylish Spotify-inspired Discord music bot that can:

Play, pause, resume, skip, and stop audio files 🎧

Manage a dynamic music queue with live progress bars ⏱️

Create, load, and delete playlists 💾

Display all available audio files 📂

Upload new songs directly from Discord 📤

Spam fun messages (safe limit: 10 per command) 📣

Clean Spotify-like embeds and interactive control buttons 🟢

⚙️ INSTALLATION
1️⃣ Requirements

Windows 10/11, Linux, or macOS

node

FFmpeg installed and added to your PATH

Download FFmpeg:
👉 https://ffmpeg.org/download.html

or install via winget:

winget install ffmpeg

3️⃣ In the .env file

Replace `your` with your token.:

⚠️ Never share your Discord token publicly!
You can find it on the Discord Developer Portal
 → Bot → Token.

4️⃣ Start your bot

Run the following command:

node bot.js

🎮 SLASH COMMANDS
Command	Description
/play [name]	Play an audio file from the /audio folder
/skip	Skip the current song
/stop	Stop playback and clear the queue
/queue	Display the current queue
/nowplaying	Show the currently playing song with progress
/list	List all available audio files with duration
/upload	Upload an audio file directly from Discord
/spam	Send multiple messages quickly (limit 20)
🗂️ FOLDER STRUCTURE
📁 your_bot_folder/
│
├── bot.js                ← Main bot code
├── .env                  ← Your Discord bot token
├── README.txt            ← This file
│
├── 📁node_module          ← Module for node
├── 📁 music/              ← Your music files (MP3, m4a)
└── 📁 playlists/          ← JSON playlists created by the bot

💡 TIPS

All audio files should be placed in the /audio folder.

The bot automatically creates /audio and /playlists if they don’t exist.

Supported formats: .mp3, .wav, .ogg, .flac.

If slash commands don’t appear, type / in Discord to refresh them.

🚀 BOT DETAILS

Name: 'insérer un nom de bot qui claque sa mere'

Language: Javascript

Version: 1.1


Author: [@giugamer]
