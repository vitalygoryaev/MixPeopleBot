"use strict";

let queue;

function push(content) {
	console.log('pushing content', content);
	this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(content)));
}

function subscribe(callback) {
	let channel = this.channel;

	console.log('subscribing to queue', this.queueName);

	channel.consume(this.queueName, function(msg) {
		if (msg !== null) {
			let message = JSON.parse(msg.content);
			console.log('got new message from queue', message);

			channel.ack(msg);
			callback(message);
		}
	});
}

function get(host, login, password, queueName) {
	let self = this;

	if (!queue) {
		console.log('connection does not exist, creating new rabbit connection');
	} else {
		console.log('reusing old connection');
	}

	queue = queue || require('amqplib').connect(`amqp://${login}:${password}@${host}`);

	return queue.then(function(conn) {
		return conn.createChannel();
	}).then(function(ch) {
		return ch.assertQueue(queueName, {durable: false}).then(function(ok) {
			self.channel = ch;
			self.queueName = queueName;
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
