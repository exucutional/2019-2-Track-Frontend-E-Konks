/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable object-shorthand */
import React, { useState, useEffect } from 'react'
import {
	Switch,
	Route
} from "react-router-dom";
import PropTypes from 'prop-types'
import ChatList from './ChatList';
import MessageList from './MessageList';
import ProfileForm from './ProfileForm';
import { save, load } from '../actions/localDb';

const MESSAGES_URL = 'http://localhost:8000/messages/list/'
const MESSAGES_EVENT_URL = 'http://localhost:8000/messages/events/'

function Body(props) {
	let profile = load('profile');
	if (profile === null) {
		profile = {
			fullName: '',
			userName: 'admin',
			bio: '',
		}
		save('profile', profile);
	}
	const [chats, setChats] = useState(load('chats'));
	// const [messages, setMessages] = useState(load('messages'));
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [yourName, setYourName] = useState(profile.userName);
	const [messagesEnd, setMessagesEnd] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [newMessageEvent] = useState(new EventSource(MESSAGES_EVENT_URL))
	useEffect(() => {
		const pollMessages = () => {
			fetch(`${MESSAGES_URL}`)
				.then(resp => resp.json())
				.then((data) => setMessages(data.messages))
		};
		newMessageEvent.onmessage = (event) => {
			console.log('new message event');
			pollMessages();
		}
		pollMessages();
	}, []);
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
		fullName: props.state.fullName,
		userName: props.state.userName,
		bio: props.state.bio,
		isRecording: isRecording,
		setIsRecording: setIsRecording,
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
