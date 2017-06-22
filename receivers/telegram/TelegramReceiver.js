const TelegramApi = require('./TelegramApi');
const root = require('./tree/root');

const commandRegex = /^\/\w*/;

const defaultUserContext = {
  node: root,
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
    this.telegram.api.on('callback_query', this.handleCallbackQuery);

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
    const commandText = commandRegex.exec(message.text)[0] || '';

    return this.handleCommand(commandText, message, userContext);
  }

  handleCallbackQuery(callbackQuery) {
    return Promise.resolve(this.handleMessage({
      ...callbackQuery.message,
      text: callbackQuery.data,
    }))
      .then(() => this.telegram.api.answerCallbackQuery(callbackQuery.id));
  }

  handleCommand(commandText, message, userContext) {
    const { node: currentNode = {} } = userContext;
    const { [commandText]: action } = currentNode;

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
