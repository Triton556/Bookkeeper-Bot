import {Message} from "node-telegram-bot-api";

const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch')
require('dotenv').config()

const token = process.env['BOT_TOKEN']
export const bot = new TelegramBot(token, {polling: true});

const start = () => {
    bot.on('message', async (msg: Message) => {
        const chatId = msg.chat.id;
        const text = msg.text
        if (text === '/start') {
            return await bot.sendMessage(chatId,'Ниже появится кнопка для призыва котика', {
                reply_markup: {
                    keyboard: [
                        [{text: 'Хочу котика', }]
                    ],
                    resize_keyboard: true
                }
            })
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from?.first_name} ${msg.from?.last_name}`)
        }
        if (text === 'Хочу котика'){
            bot.sendMessage(chatId, 'Вот котик')
            return await fetch('https://api.thecatapi.com/v1/images/search')
                .then(res => res.json())
                .then(responceBody => {
                    console.log(responceBody)
                    return bot.sendPhoto(chatId, responceBody[0].url)
                })
                .catch((e: any) => {
                    console.log(e)
                })
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю')
    });
}


start()