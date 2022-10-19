import TelegramBot from 'node-telegram-bot-api';

const token = process.env.NX_BOT_TOKEN;
const webAppUrl = process.env.NX_WEB_APP_URL;
console.log(webAppUrl);

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Пожалуйста заполните форму', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Форма через webapp', web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  if (text === '/menu') {
    await bot.sendMessage(chatId, 'Пожалуйста заполните форму', {
      reply_markup: {
        keyboard: [[{ text: 'Форма через сервер', web_app: { url: webAppUrl } }]],
      },
    });
  }
});
