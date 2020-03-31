/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable object-shorthand */
import React, { useState } from 'react'
import {
	Switch,
	Route
} from "react-router-dom";
import { connect } from 'react-redux';
import ChatList from './ChatList';
import MessageList from './MessageList';
import MessageListCommon from './MessageListCommon';
import ProfileForm from './ProfileForm';
import { load } from '../actions/localDb';
import { getProfile } from '../actions/index';

const MESSAGES_EVENT_URL = 'http://localhost:8000/messages/events/'

const messageEvent = new EventSource(MESSAGES_EVENT_URL);

function Body(props) {
	const [chats, setChats] = useState(load('chats'));
	const [localMessages, setLocalMessages] = useState(load('messages'));
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [yourName, setYourName] = useState(props.userName);
	const [messagesEnd, setMessagesEnd] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [newMessageEvent, setNewMessageEvent] = useState(messageEvent);
	const [fullName, setFullName] = useState(props.fullName);
	const [userName, setUserName] = useState(props.userName);
	const [bio, setBio] = useState(props.bio);
	const [emojiMode, setEmojiMode] = useState(false);
	const state = {
		chats,
		setChats,
		messages,
		inputValue,
		inputMode,
		setInputValue,
		setInputMode,
		setYourName,
		setMessagesEnd,
		setMessages,
		yourName,
		messagesEnd,
		setFullName,
		setUserName,
		setBio,
		fullName,
		userName,
		bio,
		isRecording,
		setIsRecording,
		newMessageEvent,
		setNewMessageEvent,
		localMessages,
		setLocalMessages,
		emojiMode,
		setEmojiMode,
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

const mapStateToProps = (state) => ({
	fullName: state.profile.fullName,
	userName: state.profile.userName,
	bio: state.profile.bio,
})

export default connect(
	mapStateToProps,
	{ getProfile },
)(Body)
