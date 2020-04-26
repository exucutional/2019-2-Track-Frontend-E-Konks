/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable object-shorthand */
import React, { useState, useEffect } from 'react'
import {
	Switch,
	Route
} from "react-router-dom";
import { connect } from 'react-redux';
import ChatList from './ChatList';
import LocalMessageList from './LocalMessageList';
import MessageListCentrifuge from './MessageListCentrifuge';
import MessageListWebRTC from './MessageListWebRTC';
import ProfileForm from './ProfileForm';
import ForeignIdInput from './ForeignIdInput';
import { load } from '../actions/localDb';
import { getProfile } from '../actions/index';

const MESSAGES_EVENT_URL = 'https://2020-tt-ek.mooo.com/messages/events/'

const CHATS_LIST_URL = 'https://2020-tt-ek.mooo.com/chats/list/'

const messageEvent = new EventSource(MESSAGES_EVENT_URL);

function Body(props) {
	const [chats, setChats] = useState(load('chats'));
	const [localMessages, setLocalMessages] = useState([]);
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [foreignIdInputMode, setForeignIdInputMode] = useState(true);
	const [yourName, setYourName] = useState(props.userName);
	const [messagesEnd, setMessagesEnd] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [newMessageEvent, setNewMessageEvent] = useState(messageEvent);
	const [fullName, setFullName] = useState(props.fullName);
	const [userName, setUserName] = useState(props.userName);
	const [bio, setBio] = useState(props.bio);
	const [emojiMode, setEmojiMode] = useState(false);
	const [foreignPeerId, setForeignPeerId] = useState("");
	const [myPeerConn, setMyPeerConn] = useState();
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
		foreignPeerId,
		setForeignPeerId,
		foreignIdInputMode,
		setForeignIdInputMode,
		myPeerConn,
		setMyPeerConn,
		peer: props.state.peer,
		foreignPeerConn: props.state.foreignPeerConn,
	};
	if (messagesEnd) {
		messagesEnd.scrollIntoView();
	}
	useEffect(() => {
		const getChatList = () => {
			fetch(CHATS_LIST_URL)
				.then(response => response.json())
				.then(data => {
					setChats(data.chats)
				})
		}
		getChatList();
	}, []);
	return (
		<Switch>
			<Route path='/chats/webrtc'>
				<MessageListWebRTC state={ state }/>
				<ForeignIdInput state={ state }/>
			</Route>
			<Route path='/chats/:chatId'>
				<MessageListCentrifuge state={ state }/>
			</Route>
			<Route path='/profile'>
				<ProfileForm state={ state }/>
			</Route>
			<Route path='/'>
				<ChatList state={ state } setTitle={props.setTitle}/>
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
