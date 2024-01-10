const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  CommandInteraction,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bot-info')
    .setDescription('Shows information about the bot'),
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

  async execute(interaction, client) {
    const {application, channels, emojis, guilds, uptime, user, ws} = client;

    const commandCount = (application.commands.cache.size);
    const channelCount = channels.cache.size;
    const emojisCount = emojis.cache.size;
    const guildsCount = guilds.cache.size;
    const user_Id = user.username + ' | ' + user.id;
    const ping = ws.ping;
    const embed = new EmbedBuilder();
  
    embed
      .setAuthor({
        name: 'D3 Developments',
        iconURL: 'https://avatars.githubusercontent.com/u/95593009?v=4'
      })
      .setTitle('Bot Information')
      .setColor('Green')
      .addFields(
        {name: '🌐 Client username & Id:', value: `${user_Id}`, inline: false},
        {name: '🌐 Command Total:', value: `${commandCount}`, inline: true},
        {
          name: '🌐 Watching Channel Total:',
          value: `${channelCount}`,
          inline: true
        },
        {name: '🌐 Watching Emojis Total:', value: `${emojisCount}`, inline: true},
        {name: '🌐 Watching Guild Total:', value: `${guildsCount}`, inline: false},
        {name: '🌐 Client Ping:', value: `${ping} ms`, inline: false}
      )
      .setFooter({text: 'Made by D3 Development Team'});

    interaction.reply({embeds: [embed]});
  }
};
