/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getTime } from '../actions/time';
import { EmptyMessageList, MessageList } from './MessageList';

const Centrifuge = require('centrifuge');

const MESSAGE_CREATE_URL = 'https://2020-tt-ek.mooo.com/messages/create/'
const MESSAGES_URL = 'https://2020-tt-ek.mooo.com/messages/list/'
const USER_SEARCH_URL = 'https://2020-tt-ek.mooo.com/users/search/'

const CENTRIFUGE_WS_URL = 'wss://2020-tt-ek.mooo.com/centrifugo/connection/websocket/';

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
		setMessages,
		userName,
	} = props.state;
	let {
		messages,
	} = props.state;
	// eslint-disable-next-line react/prop-types
	const {chatId} = useParams();
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
			messages.push(message);
			const messagesCopy = messages.slice()
			setMessages(messagesCopy);
			messages = messagesCopy;
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
	}, [setMessages]);
	if (messages === null) {
		return EmptyMessageList(props, chatId, onSubmit, variableName, messages, setMessages);
	}
	return MessageList(props, chatId, onSubmit, variableName, userName, messages, setMessages)
}

export default MessageListCentrifuge;
