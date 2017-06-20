const TelegramApi = require('./TelegramApi');
const root = require('./tree/root');

const defaultUserContext = {
    node: root
};

class TelegramReceiver {
    constructor() {
        this.telegram = new TelegramApi();
        this.handleMessage = this.handleMessage.bind(this);
        this.handleCallbackQuery = this.handleCallbackQuery.bind(this);
        this.commandHandlers = {};
        this.textHandlers = [];
        this.userContext = {};
        this.subscribe();
    }

    getUserContext(chat) {
        return this.userContext[chat.id];
    }

    initUserContext(chat) {
        this.userContext[chat.id] = { ...defaultUserContext, chat };
    }

    subscribe() {
        this.telegram.api.on('message', this.handleMessage);
        this.telegram.api.on("callback_query", this.handleCallbackQuery);

        console.log('subscribed to messages');
    }

    setNextNode(userContext, nextNode) {
        userContext.node = nextNode;
    }

    handleMessage(message) {
        let userContext = this.getUserContext(message.chat);

        if (!userContext) {
            this.initUserContext(message.chat);
            userContext = this.getUserContext(message.chat);
        }

        return this.handleMessageWithContext(message, userContext);
    }

    handleMessageWithContext(message, userContext) {
        const currentNode = userContext.node;

        if (message.entities) {
            message.entities.map(({ type, offset, length }) => {
                if (type === 'bot_command') {
                    const commandText = message.text.substr(offset, length);

                    return this.handleCommand(commandText, message, userContext, currentNode);
                }
            })
        } else {
            return this.handleCommand('', message, userContext, currentNode);
        }
    }

    handleCallbackQuery(callbackQuery) {
        console.log(callbackQuery);

        return Promise.resolve(this.handleMessage({
            ...callbackQuery.message,
            entities: [{
                type: 'bot_command',
                offset: 0,
                length: callbackQuery.data.length
            }],
            text: callbackQuery.data
        }))
            .then(() => this.telegram.api.answerCallbackQuery(callbackQuery.id));
    }

    handleCommand(commandText, message, userContext, currentNode) {
        const action = currentNode[commandText];

        if (!action && currentNode !== root) {
            this.setNextNode(userContext, root);

            return this.handleMessage(message);
        }

        if (!action && currentNode === root && currentNode.default && currentNode.default.handler) {
            currentNode.default.handler(message);
        }

        if (!action) {
            return;
        }

        return Promise.resolve(action.handler(message))
            .then(() => this.setNextNode(userContext, action.nextNode || root));
    }
}

module.exports = TelegramReceiver;
