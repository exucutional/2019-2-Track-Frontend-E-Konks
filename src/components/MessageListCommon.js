/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react'
import useForm from 'react-hook-form';
import styled from '@emotion/styled';
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

const MESSAGE_CREATE_URL = 'http://localhost:8000/messages/create/'
const MESSAGES_URL = 'http://localhost:8000/messages/list/'
const USER_SEARCH_URL = 'http://localhost:8000/users/search/'

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
			}).then(resp => console.log(resp));
		})
}

function MessageListCommon(props) {
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
		newMessageEvent,
		setUserName,
	} = props.state;
	// eslint-disable-next-line react/prop-types
	const chatId = '1';
	const { register, handleSubmit } = useForm();
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
	const handleYourMessage = () => setYourName(userName);
	const handleCompanionMessage = () => setYourName('Companion');
	const handleChange = (event) => setInputValue(event.target.value);
	const handleYourNameChange = (event) => setUserName(event.target.value);
	useEffect(() => {
		const pollMessages = () => {
			fetch(`${MESSAGES_URL}`)
				.then(resp => resp.json())
				.then((data) => {
					if (data.messages.length !== 0) {
						setMessages(data.messages);
					}
				})
		};
		newMessageEvent.onmessage = (event) => {
			console.log('new message event');
			pollMessages();
		}
		pollMessages();
	}, [newMessageEvent, setMessages]);
	if (messages === null) {
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
					changeYourName={handleYourNameChange}
					setMessages={setMessages}
					yourName={yourName}
					setChats={setChats}
					chatId={chatId}
					messages={messages}
					setIsRecording={setIsRecording}
					isRecording={isRecording}
					refer={register}
					variableName={true}
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
				changeYourName={handleYourNameChange}
				setMessages={setMessages}
				yourName={yourName}
				setChats={setChats}
				chatId={chatId}
				messages={messages}
				setIsRecording={setIsRecording}
				isRecording={isRecording}
				refer={register}
				variableName={true}
			/>
		</Container>
	);
}

export default MessageListCommon;
