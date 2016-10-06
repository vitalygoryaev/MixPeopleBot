"use strict";
let queue;
let telegram = require('telegram-bot-api');

require('./lib/queue.js').get('rabbit', 'worker', 'workwork', 'telegram')
    .then(q => {
        queue = q;

		let api = initTelegram();
        
        queue.subscribe(function handler(content) {
            console.log('got message from queue: ', content.message);

            api.sendMessage({
				chat_id: content.message.chat.id,
				text: content.message.text
			});
        })
    })

function initTelegram() {
	let api = new telegram({
		token: '226303585:AAESI73YnfVa3v8gxVAhXCmc0eEvG7tUePY',
		updates: {
			enabled: false
		}
	});

	api.getMe()
		.then(function(data)
		{
			console.log(data);
		})
		.catch(function(err)
		{
			console.log(err);
		});

	return api;
}