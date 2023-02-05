"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botCommands = void 0;
const commandsHelp = `
/start - Запуск бота
/help - Посмотреть все команды
`;
exports.botCommands = [
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию' },
    { command: '/game', description: 'Игра угадай цифру' }
];
