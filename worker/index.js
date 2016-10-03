"use strict";

// var amqp = require('amqplib/callback_api');
//
// amqp.connect('amqp://worker:workwork@rabbit', function(err, conn) {
//     conn.createChannel(function(err, ch) {
//         var q = 'messages';
//
//         ch.assertQueue(q, {durable: false});
//         // Note: on Node 6 Buffer.from(msg) should be used
//         ch.sendToQueue(q, Buffer.from('Hello World!'));
//         console.log(" [x] Sent 'Hello World!'");
//
//         console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
//         ch.consume(q, function(msg) {
//             console.log(" [x] Received %s", msg.content.toString());
//         }, {noAck: true});
//     });
//
//     setTimeout(function() { conn.close() }, 500);
// });

let open = require('amqplib').connect('amqp://worker:workwork@rabbit');
let q = 'messages';

let testObj = { vendor: 'facebook', chatId: 123, text: '/start hello' };

// Publisher
open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(q, {durable: false}).then(function(ok) {
        return ch.sendToQueue(q, new Buffer(JSON.stringify(testObj)));
    });
}).catch(console.warn);

// Consumer
open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(q, {durable: false}).then(function(ok) {
        return ch.consume(q, function(msg) {
            if (msg !== null) {
                let message = JSON.parse(msg.content);

                console.log(message.vendor);
                console.log(message.chatId);
                console.log(message.text);
                ch.ack(msg);
            }
        });
    });
}).catch(console.warn);