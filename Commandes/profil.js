const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const mysql = require('mysql2');
require('dotenv').config()

module.exports = {

  data: new SlashCommandBuilder()
    .setName('profil')
    .setDescription("Description invisible")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addSubcommand(subcommand => subcommand.setName('create').setDescription('Create your profil.')
      .addStringOption(option => option.setName('name').setDescription('Your name').setRequired(false))
      .addStringOption(option => option.setName('github').setDescription('The link of your Github account.').setRequired(false))
      .addStringOption(option => option.setName('stacks').setDescription('The stacks you use.').setRequired(false))
      .addStringOption(option => option.setName('description').setDescription('A description of you.').setRequired(false))
    )
    .addSubcommand(subcommand => subcommand.setName('show').setDescription('Look for a profil.')
      .addUserOption(option => option.setName('user').setDescription('The user you want to see the profil.').setRequired(false))
    )
    .addSubcommand(subcommand => subcommand.setName('delete').setDescription('Delete your profil.'))
    .addSubcommand(subcommand => subcommand.setName('edit').setDescription('Edit your profil.')
      .addStringOption(option => option.setName('name').setDescription('Your name').setRequired(false))
      .addStringOption(option => option.setName('github').setDescription('The link of your Github account.').setRequired(false))
      .addStringOption(option => option.setName('stacks').setDescription('The stacks you use.').setRequired(false))
      .addStringOption(option => option.setName('description').setDescription('A description of you.').setRequired(false))
    )
  ,


  async run(bot, interaction) {

    const subcommand = interaction.options.getSubcommand();

    await interaction.deferReply()
    await interaction.followUp('Loading...')
    try {

      switch(subcommand) {
  
        case 'create': 
          const values = [
            interaction.user.id,
            interaction.options.getString('name') ? interaction.options.getString('name') : interaction.user.tag,
            interaction.options.getString('github') ? interaction.options.getString('github') : "Aucun",
            interaction.options.getString('stacks') ? interaction.options.getString('stacks') : "Aucune",
            interaction.options.getString('description') ? interaction.options.getString('description') : "Aucune description"
          ]
  
          bot.db.query(`SELECT * FROM profil WHERE user = ?`, values[0], async (err, data) => {
            // if (err) throw err;
            if (data.length > 0) return await interaction.editReply(`You already have a profil.`)
  
            const queryCreate = "INSERT INTO profil (user, name, github, stacks, description) VALUES(?, ?, ?, ?, ?)"
  
            bot.db.query(queryCreate, [...values], async (err, data) => {
              // if (err) throw err;
              return await interaction.editReply('Your profil has been **registered** !')
            })
          })

          break;
        
        case 'show': 

          const user = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user
          // console.log(user);
          bot.db.query('SELECT * FROM profil WHERE user = ?', user.id, async (err, data) => {
            // if (err) throw err;
            if (data.length === 0) return await interaction.editReply("No profile found.") 

            const dataUser = bot.users.cache.get(data[0].user)
            const arrayStacks = data[0].stacks.split(' ');
            let stacksReponse = '';

            let Embed = new EmbedBuilder()
              .setColor(bot.color.default)
              .setAuthor({iconURL: dataUser.displayAvatarURL(), name: `Author : ${dataUser.username}`})
              .setTitle(`${data[0].name}'s profil :`)
              .setThumbnail(dataUser.displayAvatarURL())
              .setDescription(data[0].description)
              .addFields({name: 'Github :', value: `[Github](${data[0].github})`, inline: true})
              .setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
              .setTimestamp()
              
            arrayStacks.forEach(stack => {
              stacksReponse += `- **${stack}**\n`
            })
              
            Embed.addFields({name: 'Stacks :', value: stacksReponse, inline: true})
            return interaction.editReply({content: '**Profile found !**', embeds: [Embed]})
          })

          break;

        case 'delete':

          bot.db.query('DELETE FROM profil WHERE user = ?', interaction.user.id, async (err, data) => {
            // if (err) throw err;
            if (data.affectedRows === 0) return await interaction.editReply('No profile found.')

            return await interaction.editReply('Your profile has been **deleted** !')
          })
          break;

        case 'edit':
            
            bot.db.query('SELECT * FROM profil WHERE user = ?', interaction.user.id, async (err, data) => {
              // if (err) throw err;
              if (data.length === 0) return await interaction.editReply('No profile found.')
  
              const profil = data[0]
              let name = profil.name
              let github = profil.github
              let stacks = profil.stacks
              let description = profil.description
  
              if (interaction.options.getString('name')) name = interaction.options.getString('name')
              if (interaction.options.getString('github')) github = interaction.options.getString('github')
              if (interaction.options.getString('stacks')) stacks = interaction.options.getString('stacks')
              if (interaction.options.getString('description')) description = interaction.options.getString('description')
  
              bot.db.query('UPDATE profil SET name = ?, github = ?, stacks = ?, description = ? WHERE user = ?', [name, github, stacks, description, interaction.user.id], async (err, data) => {
                // if (err) throw err;
                return await interaction.editReply('Your profile has been **edited** !')
              })
            })
  
            break;
       }

    } catch(err) {
      return interaction.editReply(`A error as occured : ${err}.`)
    }

  }
}