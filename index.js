import { TOKEN, WEB_URL } from './tokens.js'
import TelegramBot from 'node-telegram-bot-api';
import express from 'express'
import cors from 'cors'


const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();
app.use(cors())

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

app.post('/web-data', async (req, res) => {
    const {queryId, products, totalCost} = req.body;
    try {
        await bot.answerCallbackQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Succes purchase',
            input_message_content: {message_text: "Succes purchase, total cost" + totalCost}
        })
        return res.status(200).json({})
    } catch (error) {
        await bot.answerCallbackQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Succes purchase',
            input_message_content: {message_text: "Anything wrong whith buy"}
        })
        return res.status(500).json({})
    }
    
})

const PORT = 8000;
app.listen(PORT, () => console.log('Server OK, Port: ' + PORT))

