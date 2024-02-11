const { Events, InteractionType, PermissionsBitField } = require("discord.js");


module.exports = {

  name: Events.InteractionCreate,

  async run(bot, interaction) {
    switch(interaction.type){
      case InteractionType.ApplicationCommand:
        // On récupère l'interaction par son name puis on lance sa fonction run()
        const command = bot.commands.get(interaction.commandName);
        if (command.data.default_member_permissions && !interaction.member.permissions.has(new PermissionsBitField(command.data.default_member_permissions))) {
          return interaction.reply({ content: "You don't have the permissions to run this command!", ephemeral: true });
        }

        await command.run(bot, interaction);
        break;

    }
  }
}