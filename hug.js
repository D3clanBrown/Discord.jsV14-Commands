const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  CommandInteraction,
  Client
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Give a user a hug')
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
      .setTitle('Hugging Notification')
      .setColor('DarkVividPink')
      .setDescription(`You got a **hug** from ${user}`)
      .setImage(
        'https://media1.giphy.com/media/VbawWIGNtKYwOFXF7U/giphy.gif?cid=ecf05e471tw29hhwspdhod7qjlv5egtnadm2oe0d0ocfs3h9&ep=v1_gifs_search&rid=giphy.gif&ct=g'
      )
      .setFooter({text: `Requested by ${user.username}`});

    interaction.reply({content: `${target}`, embeds: [embed]});

    target.send({
      content: `${user} just tagged you in a post look now\n${interaction.channel}`
    });
  }
};
