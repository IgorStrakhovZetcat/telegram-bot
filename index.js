import { TOKEN, WEB_URL } from './tokens.js'
import TelegramBot from 'node-telegram-bot-api';



const bot = new TelegramBot(TOKEN, { polling: true });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;


    if (text === '/start') {
        await bot.sendMessage(chatId, 'Fill out the form', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Form', web_app: { url: WEB_URL + '/form' } }]
                ]
            }
        })

        await bot.sendMessage(chatId, 'Go to website', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'To order', web_app: { url: WEB_URL } }]
                ]
            }
        })
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            await bot.sendMessage(chatId, 'Thank you! Your country: ' + data?.country + ', your street: ' + data?.street + ', ' + data?.subject + ' person')
        } catch (error) {
            console.log(error)
        }
    }




});

