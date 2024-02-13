const { Events, InteractionType, PermissionsBitField } = require("discord.js");


module.exports = {

  name: Events.InteractionCreate,

  async run(bot, interaction) {

    let concepts;

    switch(interaction.type){

      case InteractionType.ApplicationCommandAutocomplete:
        // On récupère l'interaction par son name puis on lance sa fonction run()
        let entry = interaction.options.getFocused();
        console.log(entry);

        if (interaction.commandName === "explain") {
          concepts = ['api', "fonction d'ordre supérieur (HOF)", "fetching", "promises", "async/await", "callback"]
          let choices = concepts.filter(cmd => cmd.includes(entry));
          await interaction.respond(entry === "" ? concepts.map(concept => ({ name: concept, value: concept })) : choices.map(choice => ({ name: choice, value: choice })));
        }
        
        break;

        case InteractionType.ApplicationCommand:
        // On récupère l'interaction par son name puis on lance sa fonction run()
        const command = bot.commands.get(interaction.commandName);
        if (command.data.default_member_permissions && !interaction.member.permissions.has(new PermissionsBitField(command.data.default_member_permissions))) {
          return interaction.reply({ content: "You don't have the permissions to run this command!", ephemeral: true });
        }
        
        if (interaction.commandName === "explain") {
          concepts = ['api', "fonction d'ordre supérieur (HOF)", "fetching", "promises", "async/await", "callback"]
          await command.run(bot, interaction, concepts);
        } else {
          await command.run(bot, interaction);
        }

        break;

    }
  }
}