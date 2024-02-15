const { SlashCommandBuilder, messageLink, EmbedBuilder } = require('discord.js')
const puppeteer = require('puppeteer');


module.exports = {

  data: new SlashCommandBuilder()
    .setName('blog')
    .setDescription('Get the 5 lasts articles from the IIM blog.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    ,

  async run(bot, interaction) {

    await interaction.deferReply()

    try {
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
            img: element.querySelector('.attachment-post').src
          }
        })
      })

      let reponse = ``

      for (let index = 0; index < 5; index++) {
        reponse += `${index+1}. [${links[index].title.slice(0, -2)}](${links[index].link})\n`
      }

      // await page.screenshot({path: 'ressources/exemple.png', fullPage: false})
      await browser.close()

      let Embed = new EmbedBuilder()
        .setColor(bot.color.default)
        .setThumbnail(links[0].img)
        .setTitle('5 last articles from the IIM blog :')
        .setDescription(reponse)
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp()

      console.log(links);
      return await interaction.editReply({content: "**Articles found !**", embeds: [Embed]})
    
    } catch (err) {
      return await interaction.editReply(`Erreur : ${err}`)
    }

    
  }
}