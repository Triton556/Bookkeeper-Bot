import {bot} from "./index";

const commandsHelp = `
/start - Запуск бота
/help - Посмотреть все команды
`

const botCommands = [
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию'}
]

bot.setMyCommands(botCommands)