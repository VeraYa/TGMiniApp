const { Telegraf } = require('telegraf')
const TOKEN = '7431697891:AAFP3q0ngl711QRUKwiJdY4XTclV5p93NkM'
const web_link = 'https://benevolent-starlight-b074c8.netlify.app/'

const bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Welcome ^_^', {
    reply_markup: {keyboard: [[{text: 'web app', web_app: {url: web_link}}]]}
}))
bot.launch()