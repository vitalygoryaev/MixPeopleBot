const desktopWallpaperList = require('./desktopWallpaperList');
const mobileWallpaperList = require('./mobileWallpaperList');

const combinedWallpaperList = [
  ...desktopWallpaperList,
  ...mobileWallpaperList,
];

module.exports = combinedWallpaperList;
