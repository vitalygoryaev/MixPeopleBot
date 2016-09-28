let telegram = require('telegram-bot-api');
let _ = require('underscore');
let keyboards = require("./keyboards.js");
let status = require('./userStatus.js');

let users = {};

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

api.on('message', function(message)
{
	let userId = message.chat.id;

    if (message.text === '/start') {
		let user = users[userId];

		if (!user) {
			user = {
				status: status.WAITING,
				name: message.chat.first_name
			};
			users[userId] = user;

			let numberOfActiveUsers = _.size(users);

			sendText(userId, "Hi! Now we will find you a companion. Please wait.",  keyboards.activeKeyboard)
				.then(() => sendText(userId, "Now " + numberOfActiveUsers +" people talking",  keyboards.activeKeyboard));
		}

		if (user.status !== status.WAITING) {
			return;
		}

		findOpponentAndLink(userId);
		return;
	}

	if (message.text === '/settings') {
		let user = users[userId];

		if (user) {
			sendText(userId, "Settings", keyboards.settingsKeyboard);
		}

		return;
	}

if (message.text === '/name') {
    let user = users[userId];

    if (user) {
        sendText(userId, "Set you name", keyboards.nameKeyboard);
        user.status = status.WAITINGFORNAME;
    }

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
			if (user.status === status.TALKING) {
				let opponentId = unlinkOpponents(userId);

				findOpponentAndLink(userId);
				findOpponentAndLink(opponentId);

				return;
			}
		}

		sendInactiveInstruction(userId);
		return;
	}
    if (user.status === status.WAITINGFORNAME) {
        let user = users[userId];
        user.name = message.text;
        user.status = status.WAITING;
        sendText(userId, "You new name is " + message.text, keyboards.activeKeyboard);
        return;
    }

	passMessageToOpponent(userId, message);
});

function sendText(chatId, text, keyboard) {
	return api.sendMessage({
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
		return currentUserId != userId && user.status === status.WAITING;
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

	user.status = status.TALKING;
	user.opponentId = opponentId;
	opponent.status = status.TALKING;
	opponent.opponentId = userId;
	sendText(userId, `Meet ${opponent.name}!`, keyboards.activeKeyboard);
	sendText(opponentId, `Meet ${user.name}!`, keyboards.activeKeyboard);
}

function unlinkOpponents(userId) {
	let user = users[userId];
	let opponentId = user.opponentId;
	user.status = status.WAITING;
	user.opponentId = undefined;
	
	if (opponentId && users[opponentId]) {
		let opponent = users[opponentId];
		opponent.status = status.WAITING;
		opponent.opponentId = undefined;
	}

	return opponentId;
}

function findOpponentAndLink(userId) {
	let user = users[userId];
	
	if (!user || user.status !== status.WAITING) {
		return;
	}
	
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