/* eslint-disable react/destructuring-assignment */
/* eslint-disable object-shorthand */
import React, { useState } from 'react'
import {
	Switch,
	Route
} from "react-router-dom";
import PropTypes from 'prop-types'
import ChatList from './ChatList';
import MessageList from './MessageList';
import ProfileForm from './ProfileForm';
import { load } from '../actions/localDb';

function Body(props) {
	let profile = load('profile');
	if (profile === null) {
		profile = {
			fullName: 'admin',
			userName: 'admin',
			bio: '',
		}
	}
	const [chats, setChats] = useState(load('chats'));
	const [messages, setMessages] = useState(load('messages'));
	const [inputValue, setInputValue] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [yourName, setYourName] = useState(profile.userName);
	const [messagesEnd, setMessagesEnd] = useState(false);
	const state = {
		chats: chats,
		setChats: setChats,
		messages: messages,
		inputValue: inputValue,
		inputMode: inputMode,
		setInputValue: setInputValue,
		setInputMode: setInputMode,
		setYourName: setYourName,
		setMessagesEnd: setMessagesEnd,
		setMessages: setMessages,
		yourName: yourName,
		messagesEnd: messagesEnd,
		setFullName: props.setFullName,
		setUserName: props.setUserName,
		setBio: props.setBio,
		fullName: profile.fullName,
		userName: profile.userName,
		bio: profile.bio,
	};
	if (messagesEnd) {
		messagesEnd.scrollIntoView();
	}
	return (
		<Switch>
			<Route path='/chats/:chatId'>
				<MessageList state={ state }/>
			</Route>
			<Route path='/profile'>
				<ProfileForm state={ state }/>
			</Route>
			<Route path='/'>
				<ChatList state={ state }/>
			</Route>
		</Switch>
	);
}

Body.propTypes = {
	setFullName: PropTypes.func.isRequired,
	setUserName: PropTypes.func.isRequired,
	setBio: PropTypes.func.isRequired,
}

export default Body;
