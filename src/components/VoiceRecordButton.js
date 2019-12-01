import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/core';
import { saveMessage } from '../actions/localDb';
import { getTime } from '../actions/time';

const Pulse = keyframes`
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.1, 1.1);
	}
	100% {
		transform: scale(1, 1);
	}
`;


const Button = styled.img`
	width: 1em;
	&:hover {
		filter: invert(0.5);
	}
	cursor: pointer;
`;

const ButtonRecording = styled.img`
	width: 1em;
	cursor: pointer;
	animation: ${Pulse} 1s ease-in 0s infinite alternate-reverse both;
		&:hover {
		filter: invert(0.1);
	}
`;

let mediaRecorder = null;

function VoiceRecordButton(props) {
	const {
		yourName,
		chatId,
		// eslint-disable-next-line react/prop-types
		messages,
		setMessages,
		setChats,
		isRecording,
		setIsRecording,
	} = props;
	const onClick = () => {
		if (isRecording) {
			mediaRecorder.stop();
			setIsRecording(false);
			return;
		}
		const constraints = {audio: true}
		navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
			mediaRecorder = new MediaRecorder(mediaStream);
			setIsRecording(true);
			mediaRecorder.start();
			let chunks = [];
			mediaRecorder.addEventListener('stop', () => {
				const audio = document.createElement('audio');
				const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
				chunks = [];
				const audioURL = URL.createObjectURL(blob);
				audio.src = audioURL;
				const curTime = getTime();
				const message = {
					name: yourName,
					chat_id: Number(chatId),
					added_at: curTime,
					content: audio.src,
					type: 'audio'
				};
				saveMessage(message, false, setMessages, setChats, messages);
			});
			mediaRecorder.addEventListener('dataavailable', (event) => {
				chunks.push(event.data);
			});
		}).catch((err) => {
			console.log(err.message);
		});
	}
	if (isRecording) {
		return( <ButtonRecording src='https://image.flaticon.com/icons/svg/438/438945.svg' onClick={onClick}/> );
	}
	return ( <Button src='https://image.flaticon.com/icons/svg/25/25682.svg' onClick={onClick}/> );
}

VoiceRecordButton.propTypes = {
	yourName: PropTypes.string.isRequired,
	chatId: PropTypes.string.isRequired,
	setMessages: PropTypes.func.isRequired,
	setChats: PropTypes.func.isRequired,
	isRecording: PropTypes.bool.isRequired,
	setIsRecording: PropTypes.func.isRequired,
}

export default VoiceRecordButton;