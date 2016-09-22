let inactiveKeyboard = {
	keyboard: [[
		{
			text: '/start'
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
			text: '/stop'
		}
	]],
	resize_keyboard: true
};

module.exports = {
	inactiveKeyboard, activeKeyboard
}