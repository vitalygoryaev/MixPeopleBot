"use strict";

function push(vendor, message) {
	let content = { vendor, message };
	this.channel.sendToQueue(q, new Buffer(JSON.stringify(content)));
}

function subscribe(callback) {
	this.channel.consume(q, function(msg) {
		if (msg !== null) {
			let message = JSON.parse(msg.content);
			ch.ack(msg);
			callback(message);
		}
	});
}

function get(host, login, password, queueName) {
	let self = this;
	let queue = require('amqplib').connect(`amqp://${login}:${password}@${host}`);

	return queue.then(function(conn) {
		return conn.createChannel();
	}).then(function(ch) {
		return ch.assertQueue(queueName, {durable: false}).then(function(ok) {
			self.channel = ch;
			console.log(`queue ${queueName} initialized`);

			return {
				push: push.bind(self),
				subscribe: subscribe.bind(self)
			}
		});
	}).catch(console.warn);
}

module.exports = {
	get: get
}