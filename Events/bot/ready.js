const { Events, ActivityType } = require('discord.js');
const loadDatabase = require('../../Loaders/loadDatabase.js')

module.exports = {

    name: Events.ClientReady,

    async run(bot) {
        
        // Ligne à ne pas oublier pour set les slash commandes
        await bot.application.commands.set(bot.commands.map(command => command.data))
        console.log(`[Interaction] => loaded !`)

        bot.db = await loadDatabase()
        bot.db.connect(() => {
            console.log('[Database] => loaded !')
            bot.user.setActivity("the last commit", { type: ActivityType.Watching })
            console.log(`${bot.user.username} is online`);
        })

    }
};