const { IntentsBitField, Client, Collection } = require('discord.js');
const loadCommands = require('./Loaders/loadCommands.js');
const loadEvents = require('./Loaders/loadEvents.js');
require('dotenv').config();



// Create an instance of a Discord client
const bot = new Client({ intents: new IntentsBitField(3276799) });
bot.commands = new Collection();

bot.color = {
  default: "Blue",
}

async function start() {
  loadCommands(bot);
  loadEvents(bot);
  await bot.login(process.env.TOKEN);
}

start();