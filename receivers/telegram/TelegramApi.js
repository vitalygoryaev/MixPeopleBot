const TelegramApi = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '226303585:AAESI73YnfVa3v8gxVAhXCmc0eEvG7tUePY';

let instance;

class Telegram {
    constructor() {
        if (!instance) {
            this.initialize(TELEGRAM_TOKEN);

            instance = this;
        }

        return instance;
    }

    async initialize(token) {
        try {
            this.api = new TelegramApi(token, { polling: true });

            const botInfo = await this.api.getMe();

            console.log('got bot info', botInfo);
            console.log('Telegram initialization complete');
        } catch(error) {
            throw Error(error);
        }
    }
}

module.exports = Telegram;
