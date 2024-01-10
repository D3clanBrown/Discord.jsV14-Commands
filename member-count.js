const {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  Client
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('member-count')
    .setDescription('Counts the number of members in the server'),

  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

  async execute(interaction, client) {
    const embed = new EmbedBuilder();

    embed
      .setTitle('Server Member Count')
      .setColor('Green')
      .setDescription(
        `🌏 | Total members (including bots): ${interaction.guild.memberCount}`
      )
      .setTimestamp()
      .setFooter({text: `${interaction.user.id}`});

    return interaction.reply({embeds: [embed], ephemeral: true});
  }
};
