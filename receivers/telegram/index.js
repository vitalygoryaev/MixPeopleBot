const TelegramReceiver = require('./TelegramReceiver');
const YoutubeMiner = require('./miners/youtube');
const InstagramMiner = require('./miners/instagram');
const FacebookMiner = require('./miners/facebook');
const EventEmitter = require('events');
const { NEW_YOUTUBE_VIDEO, NEW_INSTAGRAM_POST, NEW_FACEBOOK_POST } = require('./events');
const handleNewVideo = require('./commandHandlers/newVideo');
const handleNewInstagramPost = require('./commandHandlers/newInstagramPost');
const handleNewFacebookPost = require('./commandHandlers/newFacebookPost');

const youtubeApiKey = process.env.YOUTUBE_TOKEN;

class MyEventEmitter extends EventEmitter {}

const eventEmitter = new MyEventEmitter();

const telegram = new TelegramReceiver();
const youtube = new YoutubeMiner({ apikey: youtubeApiKey }, eventEmitter);
const instagram = new InstagramMiner(eventEmitter);
const facebook = new FacebookMiner(eventEmitter);

eventEmitter.on(NEW_YOUTUBE_VIDEO, ({ url }) => {
  handleNewVideo(url);
});

eventEmitter.on(NEW_INSTAGRAM_POST, handleNewInstagramPost);
eventEmitter.on(NEW_FACEBOOK_POST, handleNewFacebookPost);

telegram.receive();
youtube.mine();
instagram.mine();
facebook.mine();
