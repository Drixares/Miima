const prisma = require("../config/prisma")
const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');


class ProfileController {

  async create(bot, interaction) {

    try {
      
      const values = {
        userId: interaction.user.id,
        name: interaction.options.getString('name') ? interaction.options.getString('name') : interaction.user.tag,
        github: interaction.options.getString('github') ? interaction.options.getString('github') : "Aucun",
        stacks: interaction.options.getString('stacks') ? interaction.options.getString('stacks').split(' ') : "Aucune",
        description: interaction.options.getString('description') ? interaction.options.getString('description') : "Aucune description"
      }

      console.log(values.stacks);

      const profile = await prisma.profile.create({
        data: {
          userId: values.userId,
          name: values.name,
          github: values.github,
          stack: `${values.stacks}`,
          description: values.description
        },
        select: {
          name: true,
        }
      })

      return await interaction.editReply(`Your profile \`${profile.name}\` has been **registered** !`)

    } catch (error) {

      if (error.code === 'P2002') return await interaction.editReply('You already have a profile. Use `/profile edit` to edit it.');

      return await interaction.editReply(`An error as occured : ${error}.`)
    }



  }

  async show(bot, interaction) {

    try {
      
      const user = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;

      const profile = await prisma.profile.findUnique({
        where: {
          userId: user.id,
        }
      })

      if (!profile) return await interaction.editReply("No profile found.")

        const dataUser = bot.users.cache.get(profile.userId)
        const arrayStacks = profile.stack.split(',');
        let stacksReponse = '';

        let Embed = new EmbedBuilder()
          .setColor(bot.color.default)
          .setAuthor({iconURL: dataUser.displayAvatarURL(), name: `Author : ${dataUser.username}`})
          .setTitle(`${profile.name}'s profil :`)
          .setThumbnail(dataUser.displayAvatarURL())
          .setDescription(profile.description)
          .addFields({name: 'Github :', value: `[Github](${profile.github})`, inline: true})
          .setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
          .setTimestamp()
          
        arrayStacks.forEach(stack => {
          stacksReponse += `- **${stack}**\n`
        })
          
        Embed.addFields({name: 'Stacks :', value: stacksReponse, inline: true})
        return interaction.editReply({content: '**Profile found !**', embeds: [Embed]})

    } catch (error) {
      
      return await interaction.editReply(`An error as occured : ${error.message}.`)
    }

  }

  async delete(bot, interaction) {

    try {

      const user = interaction.user.id;

      const profile = await prisma.profile.delete({
        where: {
          userId: user,
        }
      })
      
      return await interaction.editReply(`Your profile \`${profile.name}\` has been **deleted** !`)

    } catch (error) {

      if (error.code === 'P2025') return await interaction.editReply('No profile to delete.')

      return await interaction.editReply(`An error as occured : ${typeof error}.`)
    }

  }

  async edit(bot, interaction) {

    try {

      const user = interaction.user.id;

      const values = {};

      if (interaction.options.getString('name')) values['name'] = interaction.options.getString('name')
      if (interaction.options.getString('github')) values['github'] = interaction.options.getString('github')
      if (interaction.options.getString('stacks')) values['stack'] = interaction.options.getString('stacks')
      if (interaction.options.getString('description')) values['description'] = interaction.options.getString('description')

      await prisma.profile.update({
        where: {
          userId: user,
        },
        data: {
          ...values
        }
      })
      
      return await interaction.editReply('Your profile has been **edited** ! \`/profile show\` to see yout profile.')

    } catch (error) {

      if (error.code === 'P2025') return await interaction.editReply('No profile to edit.');
      return await interaction.editReply(`An error as occured : ${error}.`)
    }

  }

}

module.exports = new ProfileController();