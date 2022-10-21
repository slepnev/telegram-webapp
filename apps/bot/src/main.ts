import TelegramBot from 'node-telegram-bot-api';

/* BOT */
const token = process.env.NX_BOT_TOKEN;
const webAppUrl = process.env.NX_WEB_APP_URL;
console.log(webAppUrl);

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
      reply_markup: {
        keyboard: [
          [
            { text: 'Заполнить форму', web_app: { url: webAppUrl + '/form' } },
            {
              text: 'Проверить счета',
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    });

    await bot.sendMessage(chatId, 'Возможности Интернет Банкинга', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Проверить счета', web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  if (text === '/menu') {
    await bot.sendMessage(chatId, 'Вам открылось меню', {
      reply_markup: {
        keyboard: [[{ text: 'Проверить счета', web_app: { url: webAppUrl } }]],
      },
    });
  }

  console.log(msg?.web_app_data);
  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);

      switch (data.event) {
        case 'form':
          await bot.sendMessage(chatId, 'Мы сохранили ваши данные');
          await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
          await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

          setTimeout(async () => {
            await bot.sendMessage(
              chatId,
              'Всю информацию вы получите в этом чате'
            );
          }, 3000);
          break;
        case 'card':
          await bot.sendMessage(
            chatId,
            `*Проверка счета:*\n Сумма на вашем сечту ${data?.cardNumber} составляет: ${data?.cardBalance} руб.`,
            { parse_mode: 'Markdown' }
          );
          break;
        case 'card_api':
          await bot.answerWebAppQuery(data?.queryId, {
            type: 'article',
            id: data?.queryId,
            title: 'Проверка счета',
            input_message_content: {
              message_text: `Сумма на вашем сечту ${data?.cardNumber} составляет: ${data?.cardBalance} руб.`,
            },
          });
          break;
        default:
          await bot.sendMessage(
            chatId,
            'Некорректный запрос, попробуйте снова'
          );
      }
    } catch (e) {
      console.log(e);
    }
  }
});

/* EXPRESS */
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.post('/card', async (req, res) => {
//   const {queryId, cardNumber, cardBalance} = req.body;
//   try {
//     await bot.answerWebAppQuery(queryId, {
//       type: 'article',
//       id: queryId,
//       title: 'Проверка счета',
//       input_message_content: {
//         message_text: ` Сумма на вашем сечту ${cardNumber} составляет: ${cardBalance} руб.`
//       }
//     })
//     return res.status(200).json({});
//   } catch (e) {
//     return res.status(500).json({})
//   }
// })
//
// const PORT = 8000;
//
// app.listen(PORT, () => console.log('server started on PORT ' + PORT))
