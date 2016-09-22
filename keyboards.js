let inactiveKeyboard = {
	keyboard: [[
		{
			text: '/start'
		},
		{
			text: '/settings'
		},
		{
			text: '/help'
		}
	]],
	resize_keyboard: true
};

let activeKeyboard = {
	keyboard: [[
		{
			text: '/next'
		},
		{
			text: '/settings'
		},
		{
			text: '/stop'
		}
	]],
	resize_keyboard: true
};

let settingsKeyboard = {
	keyboard: [[
		{
			text: '/back'
		},
		{
			text: '/region'
		},
		{
			text: '/name'
		}
	]],
	resize_keyboard: true
};

let nameKeyboard = {
	keyboard: [[
		{
			text: '/backToSettings'
		}
	]],
	resize_keyboard: true
};

module.exports = {
	inactiveKeyboard, activeKeyboard
}