let telegram = require('telegram-bot-api');

let queue;
require('./lib/queue.js').get('rabbit', 'worker', 'workwork', 'messages')
    .then(queue => {
        queue = queue;
		return queue;
    })
	.then(initTelegram);

function initTelegram(queue) {
	let api = new telegram({
        token: '226303585:AAESI73YnfVa3v8gxVAhXCmc0eEvG7tUePY',
		updates: {
            enabled: true,
			get_interval: 100
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

	api.on('message', function(message) {
		queue.push('telegram', message);
	});
}

