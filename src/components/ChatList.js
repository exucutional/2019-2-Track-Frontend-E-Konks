/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Chat from './ChatForm';
import CreateChatButton from './CreateChatButton';
import { save } from '../actions/localDb';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 92vh;
`;

const ChatContainer = styled.div`
	display: block;
	flex-direction: column;
	overflow-y: auto;
`;

const Form = styled.form`
	display: flex;
	font-size: 30px;
	border: solid;
	margin-left: 4vw;
	margin-right: 4vw;
	width: 92vw;
	position: fixed;
	bottom: 15vh;
`;

function NameInput(props) {
	if (props.mode) {
		return (
			<Form onSubmit={props.onSubmit}>
				<label style={{ width: 'inherit' }}>
					<input
						type="text"
						placeholder="Название"
						value={props.value}
						onChange={props.onChange}
						style={{ display: 'flex', fontSize: 'inherit', width: '100%' }}
						id="create-chat-name"
					/>
				</label>
				<input
					type="submit"
					value="Создать"
					style={{ position: 'relative', fontSize: 'inherit', cursor: 'pointer' }}
					id="create-chat-submit"
				/>
			</Form>
		);
	}
	return <span />;
}

function ChatList(props) {
	const {
		chats,
		setChats,
		inputMode,
		setInputMode,
		inputValue,
		setInputValue,
	} = props.state;
	const InputOnClick = () => setInputMode(!inputMode);
	const handleSumbit = (event) => {
		event.preventDefault();
		if (inputValue !== '') {
			let chatsCopy = [];
			let chatId = 1;
			if (chats !== null) {
				chatsCopy = chats.slice();
				chatId = chatsCopy.length + 1;
			}
			chatsCopy.push({
				id: chatId,
				name: inputValue,
				time: '',
				last_message: '',
			});
			save('chats', chatsCopy);
			setChats(chatsCopy);
			setInputValue('');
		}
		setInputMode(false);
	};
	const handleChange = (event) => setInputValue(event.target.value);
	if (chats === null)
		return (
			<Container>
				<ChatContainer />
				<Chat
					key='0'
					id='webrtc'
					mode='webrtc'
					name='WebRTC'
					time=''
					last_message=''
				/>
				<Chat
					key='1'
					id='centrifuge'
					mode='centrifuge'
					name='Centrifuge'
					time=''
					last_message=''
				/>
				<CreateChatButton onClick={InputOnClick} />
				<NameInput
					mode={inputMode}
					onSubmit={handleSumbit}
					onChange={handleChange}
					value={inputValue}
				/>
			</Container>
		);
	return (
		<Container>
			<ChatContainer>
				<Chat
					key='0'
					id='webrtc'
					mode='webrtc'
					name='WebRTC'
					time=''
					last_message=''
				/>
				<Chat
					key='1'
					id='centrifuge'
					mode='centrifuge'
					name='Centrifuge'
					time=''
					last_message=''
				/>
				{chats.map((chat) => (
					<Chat
						key={chat.id}
						id={chat.id}
						mode='local'
						name={chat.name}
						time={chat.time}
						last_message={chat.last_message}
					/>
				))}
			</ChatContainer>
			<CreateChatButton onClick={InputOnClick} />
			<NameInput
				mode={inputMode}
				onSubmit={handleSumbit}
				onChange={handleChange}
				value={inputValue}
			/>
		</Container>
	);
}

NameInput.propTypes = {
	mode: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

export default ChatList;
