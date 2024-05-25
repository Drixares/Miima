const { SlashCommandBuilder } = require('discord.js');
const puppeteer = require('puppeteer')

module.exports = {

  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Affiche le rank de l\'utilisateur')
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    ,
  
  async run(bot, interaction) {

    await interaction.deferReply()
    const url = 'https://rocketleague.tracker.network/rocket-league/profile/epic/zenrll/overview';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537');
    await page.goto(url, { waitUntil: 'networkidle0' });

    const title = await page.title();

    const usernameElement = await page.$('.trn-ign__username')
    const username = await page.evaluate(element => element.textContent, usernameElement); 
    console.log(username);

    await browser.close();

    interaction.followUp(`Le rank de ${username}.`)
  }  


  
}