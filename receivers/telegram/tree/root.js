const wallpaperList = require('./wallpaperList');
const imageHandler = require('../commandHandlers/image');
const echoHandler = require('../commandHandlers/echo');
const wallpapersHandler = require('../commandHandlers/wallpapers');
const defaultHandler = require('../commandHandlers/default');
const startHandler = require('../commandHandlers/start');

module.exports = {
  '/echo': { handler: echoHandler },
  '/image': { handler: imageHandler },
  '/wallpapers': { handler: wallpapersHandler, nextNode: wallpaperList },
  '/start': { handler: startHandler },
  default: { handler: defaultHandler },
};
