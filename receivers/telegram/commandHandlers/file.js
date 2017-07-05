const TelegramSender = require('../TelegramSender');
const fileList = require('../resources/combinedWallpaperList');

function handleFile(message) {
  const sender = new TelegramSender();

  const fileId = message.text.substr(message.text.indexOf(' ') + 1);

  if (!fileId) {
    return Promise.resolve();
  }

  const file = fileList.filter(currentFile => currentFile.id === fileId)[0];

  if (!file) {
    return Promise.resolve();
  }

  return sender.sendDocument(message.chat, file.fileId, file.markup);
}

module.exports = handleFile;
