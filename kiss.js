const {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  Client
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Give a user a kiss')
    .addBooleanOption(o =>
      o
        .setName('send-dm')
        .setDescription('Send the embed to the targets dms')
        .setRequired(true)
    )
    .addUserOption(o =>
      o
        .setName('user')
        .setDescription('Please specify a user')
        .setRequired(true)
    ),
  /**
       * 
       * @param {CommandInteraction} interaction 
       * @param {Client} client 
       */

  async execute(interaction, client) {
    const {user} = interaction;
    const target = interaction.options.getUser('user');
    const boolean = interaction.options.getBoolean('send-dm');

    if (!target)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `The user ${target} is not in this server`
          )
        ],
        ephemeral: true
      });

    if (boolean === true) {
      const embed = new EmbedBuilder()
        .setTitle('Kissing Notification')
        .setColor('DarkVividPink')
        .setDescription(`You got a **kiss** from ${user}`)
        .setImage('https://media.giphy.com/media/PFjXmKuwQsS9q/giphy.gif')
        .setFooter({text: `Requested by ${user.username}`});

      await target.send({embeds: [embed]});
      interaction.reply({
        content: 'Embed was sent successfully',
        ephemeral: true
      });
      return;
    }
    const embed = new EmbedBuilder()
      .setTitle('Kissing Notification')
      .setColor('DarkVividPink')
      .setDescription(`You got a **kiss** from ${user}`)
      .setImage('https://media.giphy.com/media/PFjXmKuwQsS9q/giphy.gif')
      .setFooter({text: `Requested by ${user.username}`});

    interaction.reply({content: `${target}`, embeds: [embed]});

    target.send({
      content: `${user} just tagged you in a post look now\n${interaction.channel}`
    });
  }
};
