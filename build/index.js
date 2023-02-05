"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const commands_1 = require("./commands");
const options_1 = require("./options");
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
require('dotenv').config();
const token = process.env['BOT_TOKEN'];
exports.bot = new TelegramBot(token, { polling: true });
exports.bot.setMyCommands(commands_1.botCommands);
const chats = {};
const startGame = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!chatId) {
        return undefined;
    }
    chats[chatId] = Math.floor(Math.random() * 10);
    yield exports.bot.sendMessage(chatId, 'Я загадал цифру от 0 до 9, отгадывай', options_1.gameOptions);
});
const start = () => {
    exports.bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const chatId = msg.chat.id;
        const text = msg.text;
        if (text === '/start') {
            return yield exports.bot.sendMessage(chatId, 'Ниже появится кнопка для призыва котика', {
                reply_markup: {
                    keyboard: [
                        [{ text: 'Хочу котика', }]
                    ],
                    resize_keyboard: true
                }
            });
        }
        if (text === '/info') {
            return exports.bot.sendMessage(chatId, `Тебя зовут ${(_a = msg.from) === null || _a === void 0 ? void 0 : _a.first_name} ${(_b = msg.from) === null || _b === void 0 ? void 0 : _b.last_name}`);
        }
        if (text === 'Хочу котика') {
            exports.bot.sendMessage(chatId, 'Вот котик');
            return yield fetch('https://api.thecatapi.com/v1/images/search')
                .then(res => res.json())
                .then(responceBody => {
                console.log(responceBody);
                return exports.bot.sendPhoto(chatId, responceBody[0].url);
            })
                .catch((e) => {
                console.log(e);
            });
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return exports.bot.sendMessage(chatId, 'Я тебя не понимаю');
    }));
    exports.bot.on('callback_query', (msg) => {
        var _a;
        const data = msg.data;
        const chatId = (_a = msg.message) === null || _a === void 0 ? void 0 : _a.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data == chats[chatId]) {
            return exports.bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, options_1.againOptions);
        }
        else {
            return exports.bot.sendMessage(chatId, `Не угадал цифру ${chats[chatId]}`, options_1.againOptions);
        }
    });
};
start();
