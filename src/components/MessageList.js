/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
	useParams
} from "react-router-dom";
import styled from '@emotion/styled';
import { saveMessage } from '../actions/localDb';
import Message from './MessageForm';
import Input from './MessageInput';
import { getTime } from '../actions/time';

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

function MessageList(props) {
	const {
		inputValue,
		setInputValue,
		messages,
		setMessages,
		yourName,
		setYourName,
		setChats,
		setMessagesEnd,
		userName,
		isRecording,
		setIsRecording,
	} = props.state;
	// eslint-disable-next-line react/prop-types
	const { chatId } = useParams();
	const handleSubmit = (event) => {
		event.preventDefault();
		if (inputValue !== '') {
			const curTime = getTime();
			const message = {
				name: yourName,
				chat_id: Number(chatId),
				added_at: curTime,
				content: inputValue,
			}
			saveMessage(message, true, setMessages, setChats, messages)
			setInputValue('');
		}
	};
	const handleYourMessage = () => setYourName(userName);
	const handleCompanionMessage = () => setYourName('Companion');
	const handleChange = (event) => setInputValue(event.target.value);
	if (messages === null) {
		return (
			<Container>
				<MessageContainer id='messageContainer'/>
				<Input
					onSubmit={handleSubmit}
					onChange={handleChange}
					setInputValue={setInputValue}
					value={inputValue}
					youOnTyping={handleYourMessage}
					compOnTyping={handleCompanionMessage}
					setMessages={setMessages}
					yourName={yourName}
					setChats={setChats}
					chatId={chatId}
					messages={messages}
					setIsRecording={setIsRecording}
					isRecording={isRecording}
				/>
			</Container>
		);
	}
	return (
		<Container>
			<MessageContainer id='messageContainer'>
				{messages
					.filter((message) => message.chat_id === Number(chatId))
					.map((message) => (
						<Message
							key={message.id}
							name={message.name}
							host={userName}
							time={message.added_at}
							value={message.content}
							type={message.type || 'text'}
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
				setInputValue={setInputValue}
				value={inputValue}
				youOnTyping={handleYourMessage}
				compOnTyping={handleCompanionMessage}
				setMessages={setMessages}
				yourName={yourName}
				setChats={setChats}
				chatId={chatId}
				messages={messages}
				setIsRecording={setIsRecording}
				isRecording={isRecording}
			/>
		</Container>
	);
}

export default MessageList;
