module.exports = {
    name: 'crypt',
    description: 'Shows a Skycrypt Link',
    options: [
      {
        name: 'name',
        description: 'Minecraft Username',
        type: 3,
        required: true
      }
    ],
  
    async execute(interaction) {
      const { options } = interaction;
      const name = options.getString('name');
      await interaction.reply({ content: `https://sky.shiiyu.moe/stats/${name}`, ephemeral: false });
    }
  };