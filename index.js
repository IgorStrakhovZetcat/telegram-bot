const TelegramBot = require('node-telegram-bot-api');

const token = '5695263363:AAEVPwE94Z-uoq7EL8vrFHpE5Tut-Pf0jqo';

const webUrl = 'https://vermillion-tartufo-e0ee25.netlify.app'

const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;


  if(text === '/start'){
    await bot.sendMessage(chatId, 'Fill out the form', {
        reply_markup: {
            keyboard: [
                [{text: 'Form', web_app: {url: webUrl + '/form'}}]
            ]
        }
    })

    await bot.sendMessage(chatId, 'Go to website', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'To order', web_app: {url: webUrl}}]
            ]
        }
    })
  }

  if(msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)
        await bot.sendMessage(chatId, 'Thank you! Your country: ' + data?.country + ', your street: ' + data?.street + ', ' + data?.subject)
    } catch (error) {
        console.log(error)
    }
  }




});

