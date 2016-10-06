"use strict";
let queue;
let tarantool;
let vendorQueues = {}
let amqp = require('./lib/queue.js');

amqp.get('rabbit', 'worker', 'workwork', 'messages')
    .then(q => {
        queue = q;

        return require('./lib/tarantool.js').get('worker', 'workwork');
    })
    .then(t => {
        tarantool = t;

        return amqp.get('rabbit', 'worker', 'workwork', 'telegram')
    })
    .then(telegram => {
        vendorQueues['telegram'] = telegram;
    })
    .then(() => {	
        queue.subscribe(function handler(content) {
            console.log(content.vendor);
            console.log('got message from queue: ', content.message);

            tarantool.getUser(content.vendor, content.message.chat.id, content.message.chat.first_name)
                .then(result => {
                    console.log('got result from getUser tarantool\n', result);
                    
                    if (!result.success) {
                        return reject(result);
                    }

                    return result.result;
                })
                .then(user => {
                    processMessage(user, content.message);
                })
        })
    })

function processMessage(user, message) {
    if (message.text === '/start') {

        console.log('found /start command');

        if (user.status === 'idle') {
            tarantool.link(user.id)
                .then(result => {
                    console.log('got result from link tarantool\n', result);
                    
                    let content = { user: result.user, message };
                    vendorQueues[result.user.vendor].push(content);

                    content = { user: result.opponent, message };
                    vendorQueues[result.opponent.vendor].push(content);
                })
        }

        return;
	}

	if (message.text === '/stop') {
        console.log('found /stop command');

        if (user.status === 'talking') {
            tarantool.unlinkAndStop(user.id)
                .then(result => {
                    console.log('got result from unlinkAndStop tarantool\n', result);
                })
        }

		return;
	}

	if (message.text === '/next') {
        if (user.status === 'talking') {
            tarantool.next(user.id)
                .then(result => {
                    console.log('got result from next tarantool\n', result);
                })
        }

		return;
	}

	// passMessageToOpponent(userId, message);
}
