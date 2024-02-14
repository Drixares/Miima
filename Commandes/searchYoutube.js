const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
require('dotenv').config()


module.exports = {

  data: new SlashCommandBuilder()
  .setName('search')
  .setDescription('Return a list of 10 videos from Youtube.')
  .setDMPermission(false)
  .setDefaultMemberPermissions(null)
  .addStringOption(option => option.setName('searchquery').setDescription('Search...').setRequired(true))
  ,

  async run(bot, interaction) {

    const query = interaction.options.getString('searchquery');
    if (!query) return await interaction.reply('Incorrect search query.')
    await interaction.deferReply()

    try {

      let Embed = new EmbedBuilder()
      .setColor(bot.color.default)
      .setAuthor({name: 'Youtube', url: 'https://youtube.com'})
      .setTitle(`Résultats (10 vidéos) :`)
      .setFooter({text: `Démandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
      .setTimestamp()
      
      await interaction.followUp('fetching the datas...')
      const searchURL = 'https://www.googleapis.com/youtube/v3/search?'
      const options = {
        key: process.env.YOUTUBE_API_KEY,
        type: 'video',
        part: 'snippet',
        maxResults: 10,
        q: query,
      }
      
      const data = await fetch(searchURL + new URLSearchParams(options))
      const { items } = await data.json()
      
      let reponse = ``
      items.forEach(video => {
        const videoURL = 'https://www.youtube.com/watch?v=' + video.id.videoId
        reponse += `**${video.snippet.channelTitle}** :\n [${video.snippet.title}](${videoURL})\n\n`
      })
      
      Embed.setDescription(reponse).setThumbnail(items[0].snippet.thumbnails.medium.url)

      return await interaction.editReply({content: '**Vidéos trouvées !**', embeds: [Embed]})

    } catch(err) {
      return await interaction.editReply(` \`${err.message}\` `) 
    }
  }

}