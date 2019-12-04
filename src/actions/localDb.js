export function load(key) {
	const jsonIn = localStorage.getItem(key);
	if (jsonIn === null) {
		return null;
	}
	const chats = JSON.parse(jsonIn);
	return chats;
}

export function save(key, object) {
	const out = JSON.stringify(object);
	localStorage.setItem(key, out);
}

export function saveMessage(message, saveDB, setMessages, setChats, messages) {
	const chats = load('chats');
	let messagesCopy = [];
	let messageId = 1;
	if (messages !== null) {
		messagesCopy = messages;
		messageId = messagesCopy.length + 1;
	}
	const messageCopy = message;
	messageCopy.id = messageId;
	messagesCopy.push(messageCopy);
	const chat = chats.find((elem) => elem.id === Number(message.chat_id));
	chat.last_message = message.content;
	chat.time = message.added_at;
	if (saveDB) {
		save('chats', chats);
		save('messages', messagesCopy);
	}
	setMessages(messagesCopy);
	setChats(chats);
}
