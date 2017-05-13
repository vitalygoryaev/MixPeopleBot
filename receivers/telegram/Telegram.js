const TelegramApi = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '226303585:AAESI73YnfVa3v8gxVAhXCmc0eEvG7tUePY';

class Telegram {
    constructor() {
        this.initialize(TELEGRAM_TOKEN);

        this.handleMessage = this.handleMessage.bind(this);
    }

    async initialize(token) {
        try {
            this.api = new TelegramApi(token, {polling: true});

            const botInfo = await this.api.getMe();

            console.log('got bot info', botInfo);

            await this.subscribe();

            console.log('Telegram initialization complete');
        } catch(error) {
            throw Error(error);
        }
    }

    subscribe() {
        this.api.on('message', this.handleMessage);
    }

    handleMessage(message) {
        // console.log('received message', message);

        this.sendMessage(message.chat, message.text);

        // let content = { vendor: 'telegram', message };
        // queue.push(content);
    }

    sendMessage(chat, text) {
        return this.api.sendMessage(chat.id, text);
    }
}

module.exports = Telegram;
