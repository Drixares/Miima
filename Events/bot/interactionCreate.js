const { Events, InteractionType, PermissionsBitField } = require("discord.js");

module.exports = {

  name: Events.InteractionCreate,

  async run(bot, interaction) {

    let concepts = [
      {
        name: "api",
        description: "Application Programming Interface.",
        sources: {
          mdn: "https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
          wikipedia: "https://fr.wikipedia.org/wiki/Interface_de_programmation",
          w3schools: "https://www.w3schools.com/js/js_api_intro.asp",
          youtube: "https://www.youtube.com/watch?v=fm1xxyBkerc",
        },
      },
      {
        name: "fonction d'ordre supérieur (HOF).",
        description:
          "Fonction qui prend une autre fonction en argument ou qui retourne une fonction.",
        sources: {
          mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
          wikipedia: "https://fr.wikipedia.org/wiki/Fonction_d%27ordre_sup%C3%A9rieur",
          w3schools: "https://www.w3schools.com/js/js_function_closures.asp",
          youtube: "https://youtu.be/d812SUKhMbY?si=HsBgtqPI4j_MLnYl",
        },
      },
      {
        name: "fetching",
        description: "Récupération de données depuis une source.",
        sources: {
          mdn: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API",
          wikipedia: "Rien ici...",
          w3schools: "https://www.w3schools.com/js/js_api_fetch.asp",
          youtube: "https://youtu.be/z9pcgJX1DdY?si=7mAAw989xPzCrnUR",
        },
      },
      {
        name: "promises",
        description:
          "Objet représentant une valeur qui peut être disponible maintenant, dans le futur ou jamais.",
        sources: {
          mdn: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          wikipedia: "https://fr.wikipedia.org/wiki/Futures_(informatique)",
          w3schools: "https://www.w3schools.com/js/js_promise.asp",
          youtube: "https://youtu.be/05mKXSdkCJg?si=CLjfOfXeSkJGlSko",
        },
      },
      {
        name: "async/await",
        description: "Méthode pour gérer les promesses de manière synchrone.",
        sources: {
          mdn: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await",
          wikipedia: "https://en.wikipedia.org/wiki/Async/await",
          w3schools: "https://www.w3schools.com/js/js_async.asp",
          youtube: "https://www.youtube.com/watch?v=spvYqO_Kp9Q",
        },
      },
      {
        name: "callback",
        description:
          "Fonction passée en argument à une autre fonction pour être appelée ultérieurement.",
        sources: {
          mdn: "https://developer.mozilla.org/fr/docs/Glossary/Callback_function",
          wikipedia: "https://fr.wikipedia.org/wiki/Fonction_de_rappel",
          w3schools: "https://www.w3schools.com/js/js_callback.asp",
          youtube: "https://youtu.be/TPEvfnXNO0E?si=x9RTScE_oewnvYUS",
        },
      },
    ];

    switch(interaction.type){

      case InteractionType.ApplicationCommandAutocomplete:
        // On récupère l'interaction par son name puis on lance sa fonction run()
        let entry = interaction.options.getFocused();

        if (interaction.commandName === "explain") {
          
          let choices = concepts.filter(cmd => cmd.name.includes(entry));
          await interaction.respond(entry === "" ? concepts.map(concept => ({ name: concept.name, value: concept.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })));
        }
        
        break;

        case InteractionType.ApplicationCommand:
        // On récupère l'interaction par son name puis on lance sa fonction run()
        const command = bot.commands.get(interaction.commandName);
        if (command.data.default_member_permissions && !interaction.member.permissions.has(new PermissionsBitField(command.data.default_member_permissions))) {
          return interaction.reply({ content: "You don't have the permissions to run this command!", ephemeral: true });
        }
        
        if (interaction.commandName === "explain") {
          await command.run(bot, interaction, concepts);
        } else {
          await command.run(bot, interaction);
        }

        break;

    }
  }
}