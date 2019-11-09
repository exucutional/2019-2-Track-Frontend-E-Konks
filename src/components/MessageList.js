import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {save, load} from '../actions/localDb';
import Message from './MessageForm';
import Input from './MessageInput';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 92vh;
	justify-content: space-between;
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
	const strh = h < 10 ? `0{h}` : h;
	const strm = m < 10 ? `0{m}` : m;
	return `{strh}:{strm}`;
}

function MessageList(props) {
	const [inputValue, setInputValue] = useState(0);
	const messages = load('messages');
	const chatId = props.chatId;
	const handleSubmit = (event) => {
		event.preventDefault();
		let messagesCopy = [];
		let messageId = 1;
		if (messages !== null) {
			messagesCopy = messages.slice();
			messageId = messagesCopy.length + 1;
		}
		messagesCopy.push({
			id: messageId,
			chat_id: chatId,
			added_at: getTime(),
			content: inputValue,
		});
		save('messages', messagesCopy);
		// setMessages(messagesCopy);
		setInputValue('');
	};
	const handleChange = (event) => setInputValue(event.target.value);
	if (messages === null) {
		return (
			<Container>
				<MessageContainer/>
				<Input 
					onSubmit={ handleSubmit } 
					onChange={ handleChange }
					value={ inputValue }/>
			</Container>
		);
	};
	return (
		<Container>
			<MessageContainer>
				{ messages.filter(message => message.chat_id === chatId).map((message) =>
					<Message
						key={ message.id }
						name={ message.name }
						time={ message.added_at}
						value={ message.content}
					/>
				) }
			</MessageContainer>
			<Input 
				onSubmit={ handleSubmit } 
				onChange={ handleChange } 
				value={ inputValue }/>
		</Container>
	);
};

MessageList.propTypes = {
	chatId: PropTypes.number.isRequired,
};

export default MessageList;