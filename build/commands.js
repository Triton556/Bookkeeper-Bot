"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const commandsHelp = `
/start - Запуск бота
/help - Посмотреть все команды
`;
const botCommands = [
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию' }
];
index_1.bot.setMyCommands(botCommands);
