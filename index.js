let telegram = require('telegram-bot-api');
let _ = require('underscore');
var keyboards = require("./keyboards.js");

let users = {};

const WAITING = 'waiting';
const TALKING = 'talking';

var api = new telegram({
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

api.on('message', function(message)
{
	let userId = message.chat.id;

    if (message.text === '/start') {
		let user = users[userId];

		if (!user) {
			user = {
				status: WAITING,
				name: message.chat.first_name
			};
			users[userId] = user;
		}

		if (user.status !== WAITING) {
			return;
		}

		findOpponentAndLink(userId);

		return;
	}

	if (message.text === '/stop') {
		let user = users[userId];

		if (user) {
			unlinkOpponents(userId);
			sendText(userId, "mixing stopped", keyboards.inactiveKeyboard);
			delete users[userId];
		}

		return;
	}

	if (message.text === '/next') {
		let user = users[userId];

		if (user) {
			if (user.status === TALKING) {
				let opponentId = unlinkOpponents(userId);

				findOpponentAndLink(userId);
				findOpponentAndLink(opponentId);

				return;
			}
		}

		sendInactiveInstruction(userId);
		return;
	}

	passMessageToOpponent(userId, message);
});

function sendText(chatId, text, keyboard) {
	api.sendMessage({
		chat_id: chatId,
		text: text,
		reply_markup: JSON.stringify(keyboard)
	});
}

function sendInactiveInstruction(userId) {
	sendText(userId, "to start random conversation first press /start button or type /start", keyboards.inactiveKeyboard);
}

function getWaitingUser(userId) {
	let waitingUsers = _.pick(users, (user, currentUserId, object) => {
		return currentUserId != userId && user.status === WAITING;
	});

	let waitingUsersKeys = Object.keys(waitingUsers);

	let minIndex = 0;
	let maxIndex = waitingUsersKeys.length - 1;

	let randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

	return waitingUsersKeys[randomIndex];
}

function linkOpponents(userId, opponentId) {
	let opponent = users[opponentId];
	let user = users[userId];

	user.status = TALKING;
	user.opponentId = opponentId;
	opponent.status = TALKING;
	opponent.opponentId = userId;
	sendText(userId, `Meet ${opponent.name}!`, keyboards.activeKeyboard);
	sendText(opponentId, `Meet ${user.name}!`, keyboards.activeKeyboard);
}

function unlinkOpponents(userId) {
	let user = users[userId];
	let opponentId = user.opponentId;
	user.status = WAITING;
	user.opponentId = undefined;
	
	if (opponentId) {
		let opponent = users[opponentId];
		opponent.status = WAITING;
		opponent.opponentId = undefined;
	}

	return opponentId;
}

function findOpponentAndLink(userId) {
	let opponentId = getWaitingUser(userId);

	if (opponentId) {
		linkOpponents(userId, opponentId);
	} else {
		console.log('opponent not found, waiting for users to join');
		setTimeout(findOpponentAndLink.bind(null, userId), 1000);
	}
}

function passMessageToOpponent(userId, message) {
	let user = users[userId];

	if (user && user.opponentId) {
		sendText(user.opponentId, message.text, keyboards.activeKeyboard);
	}
}