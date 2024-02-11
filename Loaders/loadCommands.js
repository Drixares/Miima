const { readdirSync } = require('fs');

module.exports = (bot) => {
  const commandFiles = readdirSync('./Commandes').filter(file => file.endsWith('.js'));
  
  let count = 0;
  commandFiles.forEach(file => {
    const command = require(`../Commandes/${file}`);

    if(!command.data.name) return console.log(`Command ${file} is missing a name!`);
    bot.commands.set(command.data.name, command);   
    count++;
  })

  console.log(`[Commands] => ${count} commands loaded!`);
}