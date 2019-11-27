/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
	useParams
} from "react-router-dom";
import styled from '@emotion/styled';
import { save } from '../actions/localDb';
import Message from './MessageForm';
import Input from './MessageInput';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 92vh;
	justify-content: space-between;
	font-size: 30px;
	overflow: hidden;
`;

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: -webkit-fill-available;
	background-color: rgba(0, 0, 0, 0.04);
`;

function getTime() {
	const now = new Date();
	const h = now.getHours();
	const m = now.getMinutes();
	const strh = h < 10 ? `0${h}` : h;
	const strm = m < 10 ? `0${m}` : m;
	return `${strh}:${strm}`;
}

function MessageList(props) {
	const {
		inputValue,
		setInputValue,
		messages,
		setMessages,
		yourName,
		setYourName,
		chats,
		setMessagesEnd,
		userName
	} = props.state;
	// eslint-disable-next-line react/prop-types
	const { chatId } = useParams();
	const handleSubmit = (event) => {
		event.preventDefault();
		if (inputValue !== '') {
			let messagesCopy = [];
			let messageId = 1;
			if (messages !== null) {
				messagesCopy = messages;
				messageId = messagesCopy.length + 1;
			}
			const curTime = getTime();
			messagesCopy.push({
				id: messageId,
				name: yourName,
				chat_id: Number(chatId),
				added_at: curTime,
				content: inputValue,
			});
			const chat = chats.find((elem) => elem.id === Number(chatId));
			chat.last_message = inputValue;
			chat.time = curTime;
			save('chats', chats);
			save('messages', messagesCopy);
			setMessages(messagesCopy);
			setInputValue('');
		}
	};
	const handleYourMessage = () => setYourName(userName);
	const handleCompanionMessage = () => setYourName('Companion');
	const handleChange = (event) => setInputValue(event.target.value);
	if (messages === null) {
		return (
			<Container>
				<MessageContainer />
				<Input
					onSubmit={handleSubmit}
					onChange={handleChange}
					value={inputValue}
				/>
			</Container>
		);
	}
	return (
		<Container>
			<MessageContainer>
				{messages
					.filter((message) => message.chat_id === Number(chatId))
					.map((message) => (
						<Message
							key={message.id}
							name={message.name}
							host={userName}
							time={message.added_at}
							value={message.content}
						/>
					))}
				<div
					ref={(elem) => {
						setMessagesEnd(elem);
					}}
				/>
			</MessageContainer>
			<Input
				onSubmit={handleSubmit}
				onChange={handleChange}
				value={inputValue}
				youOnTyping={handleYourMessage}
				compOnTyping={handleCompanionMessage}
			/>
		</Container>
	);
}

export default MessageList;
