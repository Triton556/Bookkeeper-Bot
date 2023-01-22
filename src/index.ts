import {Telegraf} from "telegraf";
import {commands} from "./commands";
require('dotenv').config()

const bot = new Telegraf(process?.env.BOT_TOKEN!);
bot.start((ctx) => ctx.reply(`Hi ${ctx.message.from.first_name ?? 'stranger'}`));
bot.help((ctx) => ctx.reply(commands));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));