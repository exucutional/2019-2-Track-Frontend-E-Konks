import { useState } from 'react';
import ChatList from './ChatList';
import MessageList from './MessageList';
import { load } from '../actions/localDb';

function Body(props) {
	const { mode } = props.state;
	const [chats, setChats] = useState(load('chats'));
	const [messages, setMessages] = useState(load('messages'));
	const [inputValue, setInputValue] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [yourName, setYourName] = useState('You');
	const [messagesEnd, setMessagesEnd] = useState(false);
	const state = {
		chats: chats,
		setChats: setChats,
		messages: messages,
		setMessages: setMessages,
		inputValue: inputValue,
		setInputValue: setInputValue,
		inputMode: inputMode,
		setInputMode: setInputMode,
		yourName: yourName,
		setYourName: setYourName,
		messagesEnd: messagesEnd,
		setMessagesEnd: setMessagesEnd,
	};
	if (messagesEnd) {
		messagesEnd.scrollIntoView();
	}
	switch (mode) {
		case 'chats':
			return ChatList(state, props);
		case 'messages':
			return MessageList(state, props);
		default:
			break;
	}
}

export default Body;
