
// let telegramBot = require('../lib/node_modules/node-telegram-bot-api');
// let botToken = "", botChatId = "";
// let bot;
// const telegramConn = {
//     initialized:false,
//     init: function(token, chatId){
//         botToken = token;
//         botChatId = chatId;
//         bot = new telegramBot(token, {polling:true});
//         this.initialized = true;
//     },
//     send: function(message){
//         if(this.initialized)
//             bot.sendMessage(botChatId, message);
//     }
// };

// module.exports = telegramConn;

const { Telegraf } = require('../lib/node_modules/telegraf')
let bot;
const telegramConn = {
    state:false,
    recieveHandler : null,
    init: async function(token, handler){
        
        let _handler = null;
        if(typeof handler !== 'undefined'){
            _handler = handler;
            this.recieveHandler = handler;
        }        

        if(this.state === false
            || this.state === 'failed'){

            bot = new Telegraf(token);
            bot.use(async (ctx, next) => {
                const start = new Date()
                await next()
                const ms = new Date() - start
                console.log('Recieved: ' + JSON.stringify(ctx.message));
                console.log('Response time: %sms', ms);

                if(_handler !== null){
                    _handler(JSON.stringify(ctx.message))
                }
            })
            //this.initialized = true;
            this.state = "initializing";
            bot.launch()
            .then(() => this.state = "initialized")
            .catch(err => {
                console.log(err)
                this.state = "failed";
            });

        }else if(this.state === 'initialized'){
            this.state = "initializing";

            await bot.stop();
            bot = new Telegraf(token);
            bot.use(async (ctx, next) => {
                const start = new Date()
                await next()
                const ms = new Date() - start
                console.log('Recieved: ' + JSON.stringify(ctx.message));
                console.log('Response time: %sms', ms);

                if(_handler !== null){
                    _handler(JSON.stringify(ctx.message))
                }

            })
            //this.initialized = true;
            this.state = "initializing";
            bot.launch()
            .then(() => this.state = "initialized")
            .catch(err => {
                console.log(err)
                this.state = "failed";
            });
        }

    },
    send: function(message, chatId){ // chatId = group chat id or channel name
        if(this.state === 'initialized')
            bot.telegram.sendMessage(chatId, message);
    }
};
module.exports = telegramConn;