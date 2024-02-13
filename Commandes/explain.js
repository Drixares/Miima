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
        command = args.find(concept => concept.name === interaction.options.getString("concept"))
        if(!command) return interaction.reply('Aucun concept à ce nom enregistré.')
      }
  
      if(!command) {
        
        let Embed = new EmbedBuilder()
        .setColor(bot.color.default)
        .setTitle(`${args.length} concepts disponibles :`)
        .setDescription(`${args.map(concept => `**>** ${concept.name}`).join('\n')}`)
        .setTimestamp()
        .setFooter({text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
  
        await interaction.reply({embeds: [Embed]})

      } else {

        let p = '';
        
        let Embed = new EmbedBuilder()
        .setColor(bot.color.default)
        .setTitle(`Concept : ${command.name}`)
        .setDescription(command.description)
        .setFooter({text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp()
        
        for (const [site, link] of Object.entries(command.sources)) {
          p += `**${site}** : ${link}\n`
        }
        
        Embed.addFields({name: "Sources :", value: p})

        await interaction.reply({embeds: [Embed]})
      }


    } catch (e) {
      await interaction.reply(`Une erreur est survenue : \`${e}\` `);
    }
    

  }
}