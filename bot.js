const token = process.env.TOKEN;
const Bot = require("node-telegram-bot-api");
let bot;

if (process.env.NODE_ENV === "production") {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new Bot(token, { polling: true });
}

console.log("Bot server started in the " + process.env.NODE_ENV + " mode");

// bot.on("message", msg => {
//   const name = msg.from.first_name;
//   bot.sendMessage(msg.chat.id, "Hello, " + name + "!").then(() => {
//     // reply sent!
//   });
// });

module.exports = bot;

//Keyboard
bot.onText(/\/keyboard/, message => {
  const chatId = message.chat.id;

  const opts = {
    reply_markup: {
      keyboard: [["🚲 Bike", "🚗 Car"]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };

  bot.sendMessage(chatId, "Select a transport", opts);
});

//Inline keyboard
bot.onText(/\/inlinekeyboard/, message => {
  const chatId = message.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Like", callback_data: "Yay" },
          { text: "❌ Dislike", callback_data: "Nah" }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, "Random question ?", opts);
});

bot.on("callback_query", message => {
  const msg = message.message;
  const answer = message.data;

  bot.sendMessage(msg.chat.id, answer);
});
