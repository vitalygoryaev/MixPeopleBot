const wallpapersDesktop = require('../commandHandlers/wallpapersDesktop');
const wallpapersMobile = require('../commandHandlers/wallpapersMobile');

module.exports = {
  '/wallpapers_mobile': { handler: wallpapersMobile },
  '/wallpapers_desktop': { handler: wallpapersDesktop },
};
