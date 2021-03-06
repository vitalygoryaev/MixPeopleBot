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

  sendMultipleImages(chat, ...images) {
    let promise = Promise.resolve();

    images.map(({ url, markup }) => {
      promise = promise.then(() => this.sendImageByUrl(chat, url, markup));
    });

    return promise;
  }

  sendImageByUrl(chat, url, markup) {
    return this.telegram.api.sendPhoto(chat.id, url, markup);
  }

  sendMessage(chat, text, opts) {
    return this.telegram.api.sendMessage(chat.id, text, opts);
  }

  sendDocument(chat, url, markup) {
    return this.telegram.api.sendDocument(chat.id, url, markup);
  }

  sendMultipleMessages(chat, ...messageList) {
    let promise = Promise.resolve();

    messageList.map((item) => {
      promise = promise.then(() => this.sendMessage(chat, item));
    });
  }
}

module.exports = TelegramSender;
