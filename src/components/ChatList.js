import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Chat from './ChatForm';
import CreateChatButton from './CreateChatButton';
import { save, load } from'../actions/localDb';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`;

const Form = styled.form`
	display: flex;
	font-size: 30px;
	margin: 1em;
	border: solid;
	width: 80vw;
	position: fixed;
	bottom: 0px;
`;

function NameInput(props) {
	if (props.mode) {
		return (
			<Form onSubmit= { props.onSubmit }>
				<label style={ {width: 'inherit'} }>
					<input 
						type='text' 
						placeholder='Название чата'
						value={ props.value } 
						onChange={ props.onChange }
						style={ {display: 'flex', 'fontSize': 'inherit', width: '100%'} }/>
				</label>
				<input 
					type='submit' 
					value='Создать' 
					style={ {position: 'relative', 'fontSize': 'inherit'} }/>
			</Form>
		);
	}
	return (
		<span/>
	);
}

function ChatList(props) {
	const [chats, setChats] = useState(load('chats'));
	const [inputMode, setInputMode] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const InputOnClick = () => setInputMode(!inputMode);
	const handleSumbit = (event) => {
		event.preventDefault();
		let chatsCopy = [];
		let chatId = 1;
		if (chats !== null) {
			chatsCopy=chats.slice();
			chatId = chatsCopy.length + 1;
		}
		chatsCopy.push({
			id: chatId,
			name: inputValue,
			time: '',
			last_message: '',
		})
		save('chats', chatsCopy);
		setChats(chatsCopy);
		setInputValue('');
	}
	const handleChange = (event) => setInputValue(event.target.value);
	if( chats === null )
		return (
			<div>
				<Container/>
				<CreateChatButton onClick= { InputOnClick }/>
				<NameInput 
					mode={ inputMode } 
					onSubmit={ handleSumbit } 
					onChange={ handleChange } 
					value={ inputValue }/>
			</div>
		);
	return (
		<div>
			<Container>
				{ chats.map((chat) =>
					<Chat
						key={ chat.id }
						name={ chat.name }
						time={ chat.time }
						last_message={ chat.last_message }
						onClick={ props.setMessagesMode }
					/>
				) }
			</Container>
			<CreateChatButton onClick={ InputOnClick }/>
			<NameInput 
				mode={ inputMode }
				onSubmit={ handleSumbit }
				onChange={ handleChange }
				value={ inputValue }/>
		</div>
	);
}

ChatList.propTypes = {
	setMessagesMode: PropTypes.func.isRequired,
};

NameInput.propTypes = {
	mode: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
}

export default ChatList;
