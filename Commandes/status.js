const { SlashCommandBuilder, PermissionFlagsBits, ActivityType } = require('discord.js')

module.exports = {

  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription("Change the bot activity.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('activity').setDescription('Activity to put.').setRequired(true)
    .addChoices(
      {name: 'Streaming', value: 'Streaming'}, 
      {name: 'Watching', value: 'Watching'}, 
      {name: 'Listening', value: 'Listening'}, 
      {name: 'Playing', value: 'Playing'}, 
      {name: 'Competing', value: 'Competing'}, 
      {name: 'Custom', value: 'Custom'})
      .setDescription('Activity option'))
    .addStringOption(option => option.setName('place').setDescription("Place of the bot's activity.").setRequired(true))
    .addStringOption(option => option.setName('link').setDescription("Link of the bot's stream.").setRequired(false))
    ,
  
  async run(bot, interaction) {

    const activity = interaction.options.getString('activity')
    if (!activity) return await interaction.reply('You need to chose an activity.')
    const place = interaction.options.getString('place');
    if (!place) return await interaction.reply("You need to precise the place of the bot's activity.")

    if(activity === "Custom") {
      return await interaction.reply('Vous avez choisi de mettre une activité custom.')
    
    } else if (activity === "Streaming"){
      const link = interaction.options.getString('link');
      const regexTwitch = /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]{4,25})/i;
      const regexYoutube = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;

      if (!link || !(link.match(regexTwitch) || link.match(regexYoutube))) {
        return await interaction.reply('You must chose a **Youtube/Twitch** link for the stream activity of your bot.')
      }

      bot.user.setActivity(place, {type: ActivityType[activity], url: link})
      return await interaction.reply(`New activity set to the bot : ${activity}`)
    
    } else {
      bot.user.setActivity(place, {type: ActivityType[activity]})
      return await interaction.reply(`New activity set to the bot : ${activity}`)
    }

  }

}