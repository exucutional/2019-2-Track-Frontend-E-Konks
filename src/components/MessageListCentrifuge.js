/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react'
import { getTime } from '../actions/time';
import { EmptyMessageList, MessageList } from './MessageList';

const Centrifuge = require('centrifuge');

const MESSAGE_CREATE_URL = 'http://localhost:8000/messages/create/'
const MESSAGES_URL = 'http://localhost:8000/messages/list/'
const USER_SEARCH_URL = 'http://localhost:8000/users/search/'

const CENTRIFUGE_WS_URL = 'ws://localhost:8001/connection/websocket';

const MessageCreate = (message) => {
	const formData = new FormData();
	fetch(`${USER_SEARCH_URL}?username=${message.name}`)
		.then(resp => resp.json())
		.then(user => {
			formData.append('chat', message.chat_id);
			formData.append('user', user.data.pop().id);
			formData.append('content', message.content);
			formData.append('added_at', message.added_at);
			fetch(MESSAGE_CREATE_URL, {
				method: 'POST',
				body: formData
			});
		})
}

function MessageListCentrifuge(props) {
	const {
		inputValue,
		setInputValue,
		messages,
		setMessages,
		userName,
	} = props.state;
	// eslint-disable-next-line react/prop-types
	const chatId = '1';
	const variableName = true;
	const onSubmit = (values) => {
		if (inputValue !== '') {
			const curTime = getTime();
			const message = {
				name: userName,
				chat_id: Number(chatId),
				added_at: curTime,
				content: inputValue,
			}
			MessageCreate(message);
			setInputValue('');
		}
	};
	useEffect(() => {
		const centrifuge = new Centrifuge(CENTRIFUGE_WS_URL);
		centrifuge.subscribe("chats:centrifuge", (resp) => {
			if (resp.data.status === 'ok') {
				pollMessages();
			}
		});
		centrifuge.connect();
		const pollMessages = () => {
			fetch(`${MESSAGES_URL}`)
				.then(resp => resp.json())
				.then((data) => {
					if (data.messages.length !== 0) {
						setMessages(data.messages);
					}
				})
		};
		pollMessages();
	}, []);
	if (messages === null) {
		return EmptyMessageList(props, chatId, onSubmit, variableName, messages, setMessages);
	}
	return MessageList(props, chatId, onSubmit, variableName, userName, messages, setMessages)
}

export default MessageListCentrifuge;
