/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import {
	useParams
} from "react-router-dom";
import { connect } from 'react-redux';
import { getTime } from '../actions/time';
import { saveMessage } from '../actions/localDb';
import { getProfile } from '../actions/index';
import { EmptyMessageList, MessageList } from './MessageList';

function LocalMessageList(props) {
	const {
		inputValue,
		setInputValue,
		localMessages,
		setLocalMessages,
		yourName,
		setChats,
	} = props.state;
	const {
		userName,
	} = props;
	const {chatId} = useParams();
	const variableName = false;
	const onSubmit = (values) => {
		if (inputValue !== '') {
			const curTime = getTime();
			const message = {
				name: yourName,
				chat_id: Number(chatId),
				added_at: curTime,
				content: inputValue,
			}
			saveMessage(message, true, setLocalMessages, setChats, localMessages);
			setInputValue('');
		}
	};
	if (localMessages === null) {
		return EmptyMessageList(props, chatId, onSubmit, variableName, localMessages, setLocalMessages)
	}
	return MessageList(props, chatId, onSubmit, variableName, userName, localMessages, setLocalMessages)
}

const mapStateToProps = (state) => ({
	userName: state.profile.userName,
})

export default connect(
	mapStateToProps,
	{ getProfile },
)(LocalMessageList)