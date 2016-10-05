"use strict";
let queue;
let tarantool;

require('./lib/queue.js').get('rabbit', 'worker', 'workwork', 'messages')
    .then(q => {
        queue = q;

        return require('./lib/tarantool.js').get('worker', 'workwork');
    })
    .then(t => {
        tarantool = t;

        queue.subscribe(function handler(content) {
            console.log(content.vendor);
            console.log('got message from queue: ', content.message);

            tarantool.getUser(content.vendor, content.message.chat.id, content.message.chat.first_name)
                .then(result => {
                    console.log('got result from getUser tarantool\n', result);
                    
                    if (!result.success) {
			console.log('rejecting because tarantool returned success false');
                        return reject(result);
                    }

                    return result.result;
                })
                .then(user => {
			console.log('user info: ', user);
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
                });
        }

        return;
	}

	// if (message.text === '/settings') {
	// 	if (user) {
	// 		sendText(userId, "Settings", keyboards.settingsKeyboard);
	// 	}

	// 	return;
	// }

    // if (message.text === '/name') {
    //     let user = users[userId];

    //     if (user) {
    //         sendText(userId, "Set you name", keyboards.nameKeyboard);
    //         user.status = status.WAITINGFORNAME;
    //     }

    //     return;
    // }

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

    // if (user.status === status.WAITINGFORNAME) {
    //     let user = users[userId];
    //     user.name = message.text;
    //     user.status = status.WAITING;
    //     sendText(userId, "You new name is " + message.text, keyboards.activeKeyboard);
    //     return;
    // }

	// passMessageToOpponent(userId, message);
}
