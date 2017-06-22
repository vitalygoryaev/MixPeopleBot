const wallpaperList = [
    {
        id: 'one',
        url: 'https://cdn-images-1.medium.com/max/1600/1*eoWBXHT-HX7tUGLX8Z3ueA.png',
        markup: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'one', callback_data: '/image one' }],
                    [{ text: 'two', callback_data: '/image two' }],
                    [{ text: 'three', callback_data: '/image three' }],
                ]
            })
        }
    }, {
        id: 'two',
        url: 'https://cdn-images-1.medium.com/max/1600/1*kzoEQs4Cmy-7LOWVRQe_Xg.png',
        markup: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'one', callback_data: '/image one' }],
                    [{ text: 'two', callback_data: '/image two' }],
                    [{ text: 'three', callback_data: '/image three' }],
                ]
            })
        }
    }, {
        id: 'three',
        url: 'https://cdn-images-1.medium.com/max/1600/1*q1hs0kpSq2_3x4YQQXJJCQ.png',
        markup: {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'one', callback_data: '/image one' }],
                    [{ text: 'two', callback_data: '/image two' }],
                    [{ text: 'three', callback_data: '/image three' }],
                ]
            })
        }
    }
];

module.exports = wallpaperList;