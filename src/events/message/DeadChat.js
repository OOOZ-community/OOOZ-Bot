const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const signale = require("signale");

const lastMessage = {};

const deadTime = 3_600_000; // 3_600_000

const ogolnyId = process.env.OGOLNY_ID;

module.exports = (msg, client) => {
    // TODO: cleanup code
    if (msg.channel.id == ogolnyId) { // ogólny
        if (lastMessage[ogolnyId]) clearTimeout(lastMessage[ogolnyId]);
        lastMessage[ogolnyId] = setTimeout(async () => {
            signale.info('reviving chat "ogolny"');
            let quote = (await axios.get('https://programming-quotes-api.herokuapp.com/Quotes/random')).data;
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`~ ${quote.author}`)
                .setDescription(quote.en)
                .setTimestamp();
                
            (await client.channels.fetch(ogolnyId)).send({ embeds: [embed] });
        }, deadTime);

    }
}
