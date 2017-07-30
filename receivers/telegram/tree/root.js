const wallpaperCategory = require('./wallpaperCategory');
const imageHandler = require('../commandHandlers/image');
const echoHandler = require('../commandHandlers/echo');
const wallpaperCategoryHandler = require('../commandHandlers/wallpaperCategory');
const defaultHandler = require('../commandHandlers/default');
const startHandler = require('../commandHandlers/start');
const wallpapersMobile = require('../commandHandlers/wallpapersMobile');
const wallpapersDesktop = require('../commandHandlers/wallpapersDesktop');
const fileHandler = require('../commandHandlers/file');
const handleYoutubeSubscribe = require('../commandHandlers/youtubeSubscribe');
const handleYoutubeUnsubscribe = require('../commandHandlers/youtubeUnsubscribe');
const handleInstagramPostsSubscribe = require('../commandHandlers/instagramPostsSubscribe');
const handleInstagramPostsUnsubscribe = require('../commandHandlers/instagramPostsUnsubscribe');

module.exports = {
  '/echo': { handler: echoHandler },
  '/image': { handler: imageHandler },
  '/wallpapers': { handler: wallpaperCategoryHandler, nextNode: wallpaperCategory },
  '/start': { handler: startHandler },
  '/wallpapers_mobile': { handler: wallpapersMobile },
  '/wallpapers_desktop': { handler: wallpapersDesktop },
  '/file': { handler: fileHandler },
  '/youtubeSubscribe': { handler: handleYoutubeSubscribe },
  '/youtubeUnsubscribe': { handler: handleYoutubeUnsubscribe },
  '/instagramPostsSubscribe': { handler: handleInstagramPostsSubscribe },
  '/instagramPostsUnsubscribe': { handler: handleInstagramPostsUnsubscribe },
  default: { handler: defaultHandler },
};
