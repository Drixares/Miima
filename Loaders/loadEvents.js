const { readdirSync } = require('fs');


module.exports = bot => {

    const dirsEvents =  readdirSync('./events')

    let count = 0;
    for (const dirsUnderEvents of dirsEvents) {
        const filesArray = readdirSync(`./events/${dirsUnderEvents}`).filter(f => f.endsWith('.js'));

        for (const file of filesArray) {
            const event = require(`../events/${dirsUnderEvents}/${file}`)

            bot.on(event.name, (...args) => event.run(bot, ...args));
            count++;
        }
    }

    console.log(`[Events] => ${count} events logged.`);

}