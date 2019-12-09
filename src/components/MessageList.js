/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import {
	useParams
} from "react-router-dom";
import useForm from 'react-hook-form';
import styled from '@emotion/styled';
import Message from './MessageForm';
import Input from './MessageInput';
import { getTime } from '../actions/time';
import { saveMessage } from '../actions/localDb';

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
		localMessages,
		setLocalMessages,
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
	const { register, handleSubmit } = useForm();
	const onSubmit = (values) => {
		if (inputValue !== '') {
			const curTime = getTime();
			const message = {
				name: yourName,
				chat_id: Number(chatId),
				added_at: curTime,
				content: inputValue,
			}
			saveMessage(message, true, setLocalMessages, setChats, localMessages);
			setInputValue('');
		}
	};
	const handleYourMessage = () => setYourName(userName);
	const handleCompanionMessage = () => setYourName('Companion');
	const handleChange = (event) => setInputValue(event.target.value);
	if (localMessages === null) {
		return (
			<Container>
				<MessageContainer id='messageContainer'/>
				<Input
					onSubmit={handleSubmit(onSubmit)}
					onChange={handleChange}
					setInputValue={setInputValue}
					value={inputValue}
					youOnTyping={handleYourMessage}
					compOnTyping={handleCompanionMessage}
					setMessages={setLocalMessages}
					yourName={yourName}
					setChats={setChats}
					chatId={chatId}
					messages={localMessages}
					setIsRecording={setIsRecording}
					isRecording={isRecording}
					refer={register}
				/>
			</Container>
		);
	}
	return (
		<Container>
			<MessageContainer id='messageContainer'>
				{localMessages
					.filter((message) => message.chat_id === Number(chatId))
					.map((message) => (
						<Message
							key={message.id}
							name={message.name || message.username}
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
				onSubmit={handleSubmit(onSubmit)}
				onChange={handleChange}
				setInputValue={setInputValue}
				value={inputValue}
				youOnTyping={handleYourMessage}
				compOnTyping={handleCompanionMessage}
				setMessages={setLocalMessages}
				yourName={yourName}
				setChats={setChats}
				chatId={chatId}
				messages={localMessages}
				setIsRecording={setIsRecording}
				isRecording={isRecording}
				refer={register}
			/>
		</Container>
	);
}

export default MessageList;