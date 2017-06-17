function handleImage(telegramApi, message) {
    telegramApi.sendPhotoByUrl(message.chat, 'http://img.sxsw.com/2016/spg_images/PP91412.png');
}

module.exports = handleImage;