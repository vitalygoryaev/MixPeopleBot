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
		.catch(console.log);
        })
    })

function processMessage(user, message) {
    if (message.text === '/start') {

        console.log('found /start command', user.status);

        if (user.status === 'idle') {
            tarantool.link(user.id)
                .then(result => {
                    if (result.success) {
                        result = result.result;
                        console.log('got result from link tarantool\n', result);
                        
                        let content = { user: result.user, message };
                        vendorQueues[result.user.vendor].push(content);

                        content = { user: result.opponent, message };
                        vendorQueues[result.opponent.vendor].push(content);
                    }
                })
		.catch(console.warn);
        }

        return;
	}

	if (message.text === '/stop') {
        console.log('found /stop command');

        if (user.status === 'talking' || user.status === 'waiting') {
            tarantool.unlinkAndStop(user.id)
                .then(result => {
                    console.log('got result from unlinkAndStop tarantool\n', result);
                })
		.catch(console.warn)
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

	if (user.status === 'talking') {
		console.log('user is talking to', user.opponent);
		tarantool.getUserById(user.opponent)
            .then(result => {
                console.log('got result from getUserById tarantool\n', result);

                if (!result.success) {
                    return reject(result);
                }

                return result.result;
            })
            .then(opponent => {
                console.log('pushing message to vendor queue', message, 'to user', opponent);
                vendorQueues[opponent.vendor].push({ user: opponent, message });
            })
		.catch(console.warn);
	}
}
