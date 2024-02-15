const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {


  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('See informations about the bot.')
    .setDMPermission(true)
    .setDefaultMemberPermissions(null)
    ,

    async run(bot, interaction) {

      const guild = await bot.guilds.fetch("1190054472450318516"); 
      const owner = guild.members.cache.find(member => member.id === "408722478647476236")

      let Embed = new EmbedBuilder()
        .setColor(bot.color.default)
        .setAuthor({name: 'Owner : ' + owner.user.username, iconURL: owner.user.displayAvatarURL()})
        .setTitle(`Informations about ${bot.user.username}`)
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription(`
        ${bot.user.tag} est un bot créé pour aider et faciliter l'apprentissage pour le groupe de Coding de première année à l'IIM Digital School.\n
        C'est un bot codé avec Nodejs et Discordjs par Mattéo (.unknown78) en collaboration avec Nicolas (miicolas).\n
        Son code source est disponible dans ce [repository Github](https://github.com/Drixares/Miima).`)
        .setTimestamp()

      
      return await interaction.reply({embeds: [Embed]})

    }

}