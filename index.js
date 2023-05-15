const chalk = require("chalk");
require('dotenv').config();
const { Discord, Client, Collection, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require("discord.js");
const { checkKeys } = require('./API/functions/handleKeys');
const { sendStartupData } = require('./API/functions/handleStart');
const mascot = `───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───\n───█▒▒░░░░░░░░░▒▒█───\n────█░░█░░░░░█░░█────\n─▄▄──█░░░▀█▀░░░█──▄▄─\n█░░█─▀▄░░░░░░░▄▀─█░░█\n───█░░░▀▄░░░▄▀░░░█───\n───█░░░░░▀▀░░░░░█───\n───█░░░░░░░░░░░░░█───\n───█░░░░░░░░░░░░░█───\n───▀█▄         ▄█▀──`
const messages = require(`./messages.json`)
checkKeys()
const axios = require('axios');
const config = require('./config.json');
const packageJson = require('./package.json');
const os = require(`os`)
const { networkInterfaces } = require('os');

function getLocalIP() {
  const interfaces = networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
      if (!address.internal && address.family === 'IPv4') {
        return address.address;
      }
    }
  }
  return null;
}

const localIP = getLocalIP();

function getOperatingSystem() {
  const release = os.release();
  switch (os.platform()) {
    case 'darwin':
      return 'macOS ' + (/Mac OS X (\d+[\.\_\d]+)/i.exec(release) || [, ''])[1].replace(/_/g, '.');
    case 'win32':
      return 'Windows ' + (/Windows NT (\d+[\.\_\d]+)/i.exec(release) || [, ''])[1];
    case 'linux':
      return (/^Android(\s[\d\.]+)/i.exec(release) || ['Linux'])[0];
    default:
      return os.platform();
  }
}
const operatingSystem = getOperatingSystem();
    global.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    const client = global.client;

client.on('ready', () => {
  console.log(`awaiting start`);
  const id = `1107468985684988037`
  const channel = client.channels.cache.get(id);
  if (channel) {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('mode_select')
      .setPlaceholder('Select a mode')
      .addOptions([
        {
          label: 'Prod',
          description: 'Start the bot in production mode',
          value: 'prod',
        },
        {
          label: 'Dev',
          description: 'Start the bot in development mode',
          value: 'dev',
        },
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);
    const time = Math.floor(Date.now() / 1000); 
    const embed = {
      title: `SkyStats Development Startup`,
      description: `In the select menu below, please select the mode you would like to start.`,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: `Time Started:`,
          value: `<t:${time}>`,
          inline: true,
        },
        {
          name: `SkyStats Version:`,
          value: `${packageJson.version}`,
          inline: true,
        },
        {
          name: `Latest Bot Name:`,
          value: `${packageJson.name}`,
          inline: true,
        },
        {
          name: `OS Version:`,
          value: `${operatingSystem + `` + os.release()}`,
          inline: true,
        },
        {
          name: `IP Started On:`,
          value: `${localIP}`,
          inline: true,
        },
        {
          name: `Discord Bot ID(s):`,
          value: `${process.env.devID}\n${process.env.prodID}`,
          inline: true,
        },
      ],
      footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
    }


    channel.send({ embeds: [embed], components: [row] })
    .then((botMessage) => {
      const collector = client.on('interactionCreate', async (interaction) => {
        if (!interaction.isSelectMenu() || interaction.customId !== 'mode_select') return;
        
        const selectedMode = interaction.values[0];
        interaction.deferUpdate();

        if (selectedMode === 'prod') {
              // Start the bot in Prod mode
              const db = require('./API/functions/getDatabase');
              db.connect();
              process.env.TOKEN = process.env.PROD;
              process.env.ID = process.env.PRODID;
              console.log(mascot);
              sendStartupData();
              console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`));
              const webServer = require('./src/web/server.js'); 
              console.log(chalk.cyan(`You have started the production enviroment\nmake sure you know what you are doing!`));
          
              process.on("uncaughtException", function (err) {
                console.log(err);
              });
              
              const app = require("./src/Application");
              app
                .register()
                .then(() => {
                  app.connect();
                })
                .catch((err) => {
                  console.error(err);
                });
                channel.send('Bot started in Prod mode.');
            } else if (selectedMode === 'dev') {
              // Start the bot in Dev mode
              console.log(mascot);
              const db = require('./API/functions/getDatabase');
              db.connect();
              process.env.TOKEN = process.env.DEV;
              process.env.ID = process.env.DEVID;
              sendStartupData();
              console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`));
              const webServer = require('./src/web/server.js'); 
              console.log(chalk.cyan(`Warning, it seems you are running on the development bot check token and clientID and try again!`));
              
              process.on("uncaughtException", function (err) {
                console.log(err);
              });
              
              const app = require("./src/Application");
              app
                .register()
                .then(() => {
                  app.connect();
                })
                .catch((err) => {
                  console.error(err);
                });
                channel.send('Bot started in Dev mode.');
              }
     //         client.destroy();
              });
              collector.on('end', () => console.log('Collector ended'));
            })
            .catch(console.error);
        } else {
          console.error(`Invalid channel ID: ${channelId}`);
        }
      });

      client.login(process.env.DEV);