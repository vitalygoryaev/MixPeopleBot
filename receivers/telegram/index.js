const Telegram = require('./Telegram');
const imageHandler = require('./commandHandlers/image');
const echoHandler = require('./textHandlers/echo');

const telegram = new Telegram();
telegram.subscribeToCommand('/image', imageHandler);
telegram.subscribeToText(echoHandler);

