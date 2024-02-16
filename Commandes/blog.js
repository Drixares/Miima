const { SlashCommandBuilder, messageLink, EmbedBuilder } = require('discord.js')
const puppeteer = require('puppeteer');


module.exports = {

  data: new SlashCommandBuilder()
    .setName('blog')
    .setDescription('Get the lasts articles from the IIM blog.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addIntegerOption(option => option.setName('number').setDescription('Number of articles (1-10)').setRequired(false))
    ,

  async run(bot, interaction) {

    await interaction.deferReply()

    try {
      const numberOfArticles = interaction.options.getInteger('number');
      
      if ((numberOfArticles && typeof numberOfArticles !== "number") || numberOfArticles > 10 || (numberOfArticles && numberOfArticles < 1)) {
        return await interaction.followUp('Precise a number between 1 and 10.')
      }

      await interaction.followUp('Scraping the blog...')
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('https://www.iim.fr/blog/')
  
      // get datas from the page
      const links = await page.evaluate(() => {
        // create an array of articles from the blog
        let elements = Array.from(document.querySelectorAll('.post_item'))
        // return an object with the title and the link of the article
        return elements.map(element => {
          return {
            title: element.querySelector('.post_title h3 > a').innerText,
            link: element.querySelector('.post_title h3 > a').href,
            img: element.querySelector('.attachment-post').src,
            date: element.querySelector('.post_meta').innerText,
          }
        })
      })

      // const links = await page.$$eval('.post_item', (posts) => {
      //   return posts.map(el => ({
      //     title: el.querySelector('.post_title h3 > a').innerText,
      //     link: el.querySelector('.post_title h3 > a').href,
      //     img: el.querySelector('.attachment-post').src 
      //   }))
      // })

      let reponse = ``

      for (let index = 0; index < (numberOfArticles ? numberOfArticles : 5); index++) {
        reponse += `${links[index].date.slice(0, 10)} - [${links[index].title.slice(0, -2)}](${links[index].link})\n`
      }
      await browser.close()

      let Embed = new EmbedBuilder()
        .setColor(bot.color.default)
        .setThumbnail(links[0].img)
        .setTitle(`${numberOfArticles ? numberOfArticles : 5} last articles from the IIM blog :`)
        .setDescription(reponse)
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp()

      return await interaction.editReply({content: "**Articles found !**", embeds: [Embed]})
    
    } catch (err) {
      return await interaction.editReply(`Erreur : ${err}`)
    }

    
  }
}