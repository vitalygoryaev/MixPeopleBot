const TelegramApi = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '226303585:AAESI73YnfVa3v8gxVAhXCmc0eEvG7tUePY';

class Telegram {
    constructor() {
        this.initialize(TELEGRAM_TOKEN);
        this.handleMessage = this.handleMessage.bind(this);
        this.commandHandlers = {};
        this.textHandlers = [];
        this.userContext = {};
    }

    getUserContext(chatId) {
        return this.userContext[chatId];
    }

    async initialize(token) {
        try {
            this.api = new TelegramApi(token, { polling: true });

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
        const userContext = this.getUserContext(message.chat.id);

        this.handleMessageWithCommand(message, userContext);
        this.handleText(message, userContext);
    }

    sendPhotoByUrl(chat, url) {
        this.api.sendPhoto(chat.id, url);
    }

    sendMessage(chat, text) {
        return this.api.sendMessage(chat.id, text);
    }

    subscribeToCommand(commandText, handler) {
        if (!this.commandHandlers[commandText]) {
            this.commandHandlers[commandText] = [];
        }

        this.commandHandlers[commandText].push(handler);
    }

    subscribeToText(handler) {
        this.textHandlers.push(handler);
    }

    handleMessageWithCommand(message, userContext) {
        if (message.entities) {
            message.entities.map(({ type, offset, length }) => {
                if (type === 'bot_command') {
                    const commandText = message.text.substr(offset, length);

                    this.handleCommand(commandText, message, userContext);
                }
            })
        }
    }

    handleCommand(commandText, message, userContext) {
        for (const handler of this.commandHandlers[commandText]) {
            handler(this, message, userContext);
        }
    }

    handleText(message, userContext) {
        for (const handler of this.textHandlers) {
            handler(this, message, userContext);
        }
    }
}

module.exports = Telegram;
