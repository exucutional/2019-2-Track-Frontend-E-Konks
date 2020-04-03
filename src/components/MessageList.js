/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import useForm from 'react-hook-form';
import styled from '@emotion/styled';
import Message from './MessageForm';
import Input from './MessageInput';
import EmojiList from './EmojiList';

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

export function EmptyMessageList(props, chatId, onSubmit, variableName, messages, setMessages) {
	const {
		inputValue,
		setInputValue,
		yourName,
		setYourName,
		setChats,
		userName,
		isRecording,
		setIsRecording,
		setUserName,
		emojiMode,
		setEmojiMode,
	} = props.state;
	const { register, handleSubmit } = useForm();
	const handleYourMessage = () => setYourName(userName);
	const handleCompanionMessage = () => setYourName('Companion');
	const handleChange = (event) => setInputValue(event.target.value);
	const handleYourNameChange = (event) => setUserName(event.target.value);
	const changeEmojiMode = () => setEmojiMode(!emojiMode);
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
				variableName={variableName}
				changeEmojiMode={changeEmojiMode}
			/>
			<EmojiList
				emojiMode={emojiMode}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>
		</Container>
	);
}

export function MessageList(props, chatId, onSubmit, variableName, userName, messages, setMessages) {
	const {
		inputValue,
		setInputValue,
		yourName,
		setYourName,
		setChats,
		setMessagesEnd,
		isRecording,
		setIsRecording,
		setUserName,
		emojiMode,
		setEmojiMode,
	} = props.state;
	const { register, handleSubmit } = useForm();
	const handleYourMessage = () => setYourName(userName);
	const handleCompanionMessage = () => setYourName('Companion');
	const handleChange = (event) => setInputValue(event.target.value);
	const handleYourNameChange = (event) => setUserName(event.target.value);
	const changeEmojiMode = () => setEmojiMode(!emojiMode);
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
				variableName={variableName}
				changeEmojiMode={changeEmojiMode}
			/>
			<EmojiList
				emojiMode={emojiMode}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>
		</Container>
	);
}
