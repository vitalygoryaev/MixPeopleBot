const TelegramSender = require('../TelegramSender');
const wallpaperList = require('../resources/mobileWallpaperList');

const getRandomIndexUnder = upperBound => Math.floor(Math.random() * (upperBound + 1));

const getRandomItemFromList = (list) => {
  const randomIndex = getRandomIndexUnder(list.length - 1);

  return list[randomIndex];
};

const getRandomItemsFromList = (list, count) => {
  const randomList = [];

  for (let i = 0; i < count; i += 1) {
    randomList.push(getRandomItemFromList(list));
  }

  return randomList;
};

const PAGINATION_COUNT = 5;

const addMoreButtonToLastItem = (list) => {
  const lastListItem = list[list.length - 1];
  const lastListItemWithMarkup = {
    ...lastListItem,
    markup: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'more', callback_data: '/wallpapers_mobile' }],
        ],
      }),
    },
  };

  return [
    ...list.slice(0, list.length - 1),
    lastListItemWithMarkup,
  ];
};

const handleWallpapersMobile = (message) => {
  const sender = new TelegramSender();
  const trimmedList = getRandomItemsFromList(wallpaperList, PAGINATION_COUNT);
  const listWithMoreMarkup = addMoreButtonToLastItem(trimmedList);

  return sender.sendMultipleImages(
    message.chat,
    ...listWithMoreMarkup,
  );
};

module.exports = handleWallpapersMobile;
