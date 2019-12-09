/* eslint-disable react/prop-types */
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
import MessageListCommon from './MessageListCommon';
import ProfileForm from './ProfileForm';
import { load } from '../actions/localDb';

const MESSAGES_EVENT_URL = 'http://localhost:8000/messages/events/'

const messageEvent = new EventSource(MESSAGES_EVENT_URL);

function Body(props) {
	const [chats, setChats] = useState(load('chats'));
	const [localMessages, setLocalMessages] = useState(load('messages'));
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [yourName, setYourName] = useState(props.state.userName);
	const [messagesEnd, setMessagesEnd] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [newMessageEvent, setNewMessageEvent] = useState(messageEvent);
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
		newMessageEvent: newMessageEvent,
		setNewMessageEvent: setNewMessageEvent,
		localMessages: localMessages,
		setLocalMessages: setLocalMessages,
	};
	if (messagesEnd) {
		messagesEnd.scrollIntoView();
	}
	return (
		<Switch>
			<Route path='/chats/common'>
				<MessageListCommon state={ state }/>
			</Route>
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
