const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {

  data: new SlashCommandBuilder()
    .setName('howtoask')
    .setDescription("Comment poser une question correctement ?")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    ,

  async run(bot, interaction) {
      
    let embed = new EmbedBuilder()
    .setColor(bot.color.default)
    .setTitle("Comment poser une question correctement ?")
    .setDescription(
      `Une bonne question est une question qui va au but sans passer par 4 chemins. 
      Ne demande pas si tu peux poser une question, pose la directement.

      **Ne pas faire :**  :x:
      \`Salut ! Est-ce que quelqu'un peut m'aider pour un exercice ?\`

      **Une bonne question :**  :white_check_mark: 
      \`Salut ! Quelqu'un peut m'aider à centrer ma div en CSS ? Voici mon code actuel : {votre code}\`
      `
    )
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    
    await interaction.reply({ embeds: [embed]});
  },


}