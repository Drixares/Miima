const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  
  data: new SlashCommandBuilder()
    .setName('explain')
    .setDescription("Comprendre un concept ou une notion choisie.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addStringOption(option => option.setName('concept').setDescription("Le concept ou la notion à comprendre.").setRequired(false).setAutocomplete(true))
    ,

  async run(bot, interaction, args) {

    try {
      let command;
      if(interaction.options.getString("concept")) {
        command = args.find(concept => concept === interaction.options.getString("concept"))
        if(!command) return interaction.reply('Aucun concept à ce nom enregistré.')
      }
  
      if(!command) {
        
        let Embed = new EmbedBuilder()
        .setColor(bot.color.default)
        .setTitle(`Concepts disponibles`)
        .setDescription(`Concepts disponibles : \`${args.length}\``)
        .setTimestamp()
  
        args.forEach(concept => {
          Embed.addFields({name: `${concept}`, value: `${concept}`})
        })
  
        await interaction.reply({embeds: [Embed]})

      } else {
        await interaction.reply(`Concept : ${command}`);
      }


    } catch (e) {
      console.error(e);
      await interaction.reply(`Une erreur est survenue : ${e}`);
    }
    

  }
}