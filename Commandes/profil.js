const { SlashCommandBuilder } = require('discord.js');
const ProfileController = require('../Controllers/ProfileController.js');
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
      .addStringOption(option => option.setName('stacks').setDescription('The stacks you use. Separate your stacks with space.').setRequired(false))
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
          ProfileController.create(bot, interaction);
          break;
      
        case 'show': 
          ProfileController.show(bot, interaction);
          break;

        case 'delete':
          ProfileController.delete(bot, interaction);
          break;

        case 'edit':
          ProfileController.edit(bot, interaction);
          break;
       }

    } catch(err) {
      return interaction.editReply(`A error as occured : ${err}.`)
    }

  }
}