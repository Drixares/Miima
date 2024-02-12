const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('codeblock')
    .setDescription("Qu'est-ce qu'un codeblock ?")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    ,

  async run(bot, interaction) {

    
    const embed = new EmbedBuilder()
    .setColor(bot.color.default)
    .setTitle(`${interaction.guild.emojis.cache.get('1206360037669470340')} Le Codeblock`)
    .setThumbnail(bot.user.displayAvatarURL())
    .setDescription(`Le codeblock est une fonctionnalité qui permet d'afficher du code de manière lisible et propre. 
    \nC'est un markdown fournit par Discord qui est déjà intégré à votre application. 
    \nPour l'utiliser, veuillez respecter la syntaxe suivante :`)
    .setImage('https://i.imgur.com/vkEvoL3.png')
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed]});
  },
}