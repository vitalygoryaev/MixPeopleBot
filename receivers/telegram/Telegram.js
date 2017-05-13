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
        this.sendMessage(message.chat, message.text);

        this.sendPhotoByUrl(message.chat, 'https://pp.userapi.com/c836735/v836735560/33544/6E3dR1IoLFs.jpg');
    }

    sendPhotoByUrl(chat, url) {
        this.api.sendPhoto(chat.id, url);
    }

    sendMessage(chat, text) {
        return this.api.sendMessage(chat.id, text);
    }
}

module.exports = Telegram;
