"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const commands_1 = require("./commands");
require('dotenv').config();
const bot = new telegraf_1.Telegraf(process === null || process === void 0 ? void 0 : process.env.BOT_TOKEN);
bot.start((ctx) => { var _a; return ctx.reply(`Hi ${(_a = ctx.message.from.first_name) !== null && _a !== void 0 ? _a : 'stranger'}`); });
bot.help((ctx) => ctx.reply(commands_1.commands));
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
