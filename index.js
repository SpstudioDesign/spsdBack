const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const port = process.env.PORT || 5000; // використовуємо process.env.PORT як динамічний порт або 5000, якщо змінна PORT не визначена
require('dotenv').config();
const botToken =  process.env.TELEGRAM_BOT_TOKEN;
const cors = require('cors');
const bot = new TelegramBot(botToken, { polling: true });
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function sendTelegramMessage(chatId, message) {
  bot.sendMessage(chatId, message);
}

app.post('/form', (req, res) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const { name, phone } = req.body;
  const telegramMessage = `Name: ${name}\nPhone: ${phone}`;

  sendTelegramMessage(chatId, telegramMessage);
  res.send('Form submitted successfully!');
});

app.post('/form2', (req, res) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const { name, email, phone, letter } = req.body;
  const telegramMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${letter}`;
  sendTelegramMessage(chatId, telegramMessage);
  res.send('Form submitted successfully!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
