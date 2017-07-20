const TelegramReceiver = require('./TelegramReceiver');
const YoutubeMiner = require('./miners/youtube');
const EventEmitter = require('events');
const NEW_YOUTUBE_VIDEO = require('./events');

const youtubeApiKey = 'AIzaSyAS3JdJiFjlpo3cPRnlOCOdrCatT7xNA-k';

class MyEventEmitter extends EventEmitter {}

const eventEmitter = new MyEventEmitter();

const telegram = new TelegramReceiver();
const youtube = new YoutubeMiner({ apikey: youtubeApiKey }, eventEmitter);

eventEmitter.on(NEW_YOUTUBE_VIDEO, (event) => {
  console.log(event);
});

telegram.receive();
youtube.mine();
