const { Client, GatewayIntentBits, Partials } = require('discord.js');
const googleapis = require('googleapis');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds], 
  partials: [Partials.Channel]
});

require('dotenv').config();

const SCOPES = process.env.SCOPES; 

const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: SCOPES,
});

client.on('messageCreate', message => {
  console.log("Missatge creat!");

  console.log('Message received! Message content: ' + message.content);

  crearDocument(message.content);
});

function crearDocument(missatge) {
  const docs = googleapis.google.docs({ version: 'v1', auth });

  docs.documents.create({
    resource: {
      name: new Date().toISOString(),
      mimeType: 'text/plain'
    },
    media: {
      mimeType: 'text/plain',
      body: missatge
    }
  })

  console.log('Document');
  console.log();
};


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  if(auth == null) {
    console.log("No s'ha pogut autenticar");
  } else {
    console.log("S'ha autenticat correctament");
  }
});


client.login(process.env.TOKEN);
