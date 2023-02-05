import {CallbackQuery, Message, SendBasicOptions} from "node-telegram-bot-api";
import {botCommands} from "./commands";
import {againOptions, gameOptions} from "./options";

const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch')
require('dotenv').config()

const token = process.env['BOT_TOKEN']
export const bot = new TelegramBot(token, {polling: true});
bot.setMyCommands(botCommands)

const chats = {}



const startGame = async (chatId?: number) => {
    if (!chatId){
        return undefined
    }
    chats[chatId] = Math.floor(Math.random() * 10)
    await bot.sendMessage(chatId, 'Я загадал цифру от 0 до 9, отгадывай', gameOptions)
}
const start = () => {
    bot.on('message', async (msg: Message) => {
        const chatId = msg.chat.id;
        const text = msg.text
        if (text === '/start') {
            return await bot.sendMessage(chatId, 'Ниже появится кнопка для призыва котика', {
                reply_markup: {
                    keyboard: [
                        [{text: 'Хочу котика',}]
                    ],
                    resize_keyboard: true
                }
            })
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from?.first_name} ${msg.from?.last_name}`)
        }
        if (text === 'Хочу котика') {
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
        if (text === '/game') {
           return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю')
    });

    bot.on('callback_query', (msg: CallbackQuery) => {
        const data = msg.data
        const chatId = msg.message?.chat.id
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Не угадал цифру ${chats[chatId]}`, againOptions)
        }
    })
}


start()