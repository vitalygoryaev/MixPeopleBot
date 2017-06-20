const TelegramApi = require('./TelegramApi');

let instance;

class TelegramSender {
    constructor() {
        if (!instance) {
            this.telegram = new TelegramApi();

            instance = this;
        }

        return instance;
    }

    sendPhotoByUrl(chat, url) {
        return this.telegram.api.sendPhoto(chat.id, url);
    }

    sendMessage(chat, text, opts) {
        return this.telegram.api.sendMessage(chat.id, text, opts);
    }

    sendMultipleMessages(chat, ...messageList) {
        let promise = Promise.resolve();

        messageList.map(item => {
            promise = promise.then(() => {
                return this.sendMessage(chat, item);
            });
        });
    }
}

module.exports = TelegramSender;
