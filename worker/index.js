"use strict";
let queue;
require('./lib/queue.js').get('rabbit', 'worker', 'workwork', 'messages')
    .then(queue => {
        queue = queue;

        return require('./lib/tarantool.js').get('worker', 'workwork');
    })
    .then(tarantool => {
        queue.subscribe(function handler(content) {
            console.log(content.vendor);
            console.log('got message from queue: ', content.message);

            tarantool.getUser(content.vendor, content.message.chat.id, content.message.chat.first_name)
                .then(result => {
                    console.log('got result from getUser tarantool\n', result);
                })
        })
    })