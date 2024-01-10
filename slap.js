const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  CommandInteraction,
  Client
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Give a user a slap.')
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

    if (!target)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `The user ${target} is not in this server`
          )
        ],
        ephemeral: true
      });

    const embed = new EmbedBuilder()
      .setTitle('Slapping Notification')
      .setColor('DarkVividPink')
      .setDescription(`You got a **Slap** from ${user}`)
      .setImage('https://media.giphy.com/media/mEtSQlxqBtWWA/giphy.gif')
      .setFooter({text: `Requested by ${user.username}`});

    interaction.reply({content: `${target}`, embeds: [embed]});

    target.send({
      content: `${user} just tagged you in a post look now\n${interaction.channel}`
    });
  }
};
