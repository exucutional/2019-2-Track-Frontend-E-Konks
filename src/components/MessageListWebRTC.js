/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react'
import { getTime } from '../actions/time';
import { EmptyMessageList, MessageList } from './MessageList';

function MessageListWebRTC(props) {
	const {
		inputValue,
		setInputValue,
		setMessages,
		userName,
		setForeignIdInputMode,
		myPeerConn,
		foreignPeerConn,
	} = props.state;
	let {
		messages
	} = props.state;
	// eslint-disable-next-line react/prop-types
	const chatId = '2';
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
			myPeerConn.send(message);
			setInputValue('');
		}
	};
	useEffect(() => {
		if (foreignPeerConn) {
			foreignPeerConn.on('open', () => {
				foreignPeerConn.on('data', (message) => {
					messages.push(message);
					const messagesCopy = messages.slice()
					setMessages(messagesCopy);
					messages = messagesCopy;
				});
			});
		} else {
			setForeignIdInputMode(true);
		}
	}, [foreignPeerConn, setForeignIdInputMode]);
	if (messages === null) {
		return EmptyMessageList(props, chatId, onSubmit, variableName, messages, setMessages);
	}
	return MessageList(props, chatId, onSubmit, variableName, userName, messages, setMessages)
}

export default MessageListWebRTC;