"use strict";
let queue;
require('./lib/queue.js').get('rabbit', 'worker', 'workwork', 'messages')
    .then(queue => {
        queue = queue;

        queue.subscribe(function handler(content) {
            console.log(content.vendor);
            console.log('got message from queue: ', content.message);
        })
    })