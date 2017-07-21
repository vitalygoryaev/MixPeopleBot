const TelegramReceiver = require('./TelegramReceiver');
const YoutubeMiner = require('./miners/youtube');
const EventEmitter = require('events');
const { NEW_YOUTUBE_VIDEO } = require('./events');
const handleNewVideo = require('./commandHandlers/newVideo');

const youtubeApiKey = 'AIzaSyAS3JdJiFjlpo3cPRnlOCOdrCatT7xNA-k';

class MyEventEmitter extends EventEmitter {}

const eventEmitter = new MyEventEmitter();

const telegram = new TelegramReceiver();
const youtube = new YoutubeMiner({ apikey: youtubeApiKey }, eventEmitter);

eventEmitter.on(NEW_YOUTUBE_VIDEO, ({ url }) => {
  handleNewVideo(url);
});

telegram.receive();
youtube.mine();
