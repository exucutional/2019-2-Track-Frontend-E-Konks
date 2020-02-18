import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { getTime } from '../actions/time'
import { saveMessage } from '../actions/localDb';

const Button = styled.img`
	width: 1em;
	transform: rotate(90deg);
	&:hover {
		filter: invert(0.5);
	}
	cursor: pointer;
`;

const Container = styled.div`
	display: flex;
`;

function ClipButton(props) {
	// eslint-disable-next-line react/prop-types
	const { chatId, yourName, setMessages, setChats, messages } = props
	const fileSelectOnClick = () => {
		const fileElem = document.getElementById('fileElem');
		if (fileElem) {
			fileElem.click();
		}
	}
	const dropbox = document.getElementById('messageContainer');
	const handleFiles = (event) => {
		const { files } = event.target;
		if (files.length) {
			for (let i = 0; i < files.length; i += 1) {
				if (!files[i].type.startsWith('image/')) {
					// eslint-disable-next-line no-continue
					continue;
				}
				const img = document.createElement('img');
				img.src = window.URL.createObjectURL(files[i]);
				img.onload = () => {
					window.URL.revokeObjectURL(img.src);
				};
				const curTime = getTime();
				const message = {
					name: yourName,
					chat_id: Number(chatId),
					added_at: curTime,
					content: img.src,
					type: 'img'
				}
				dropbox.removeEventListener('dragenter', preventAndStop, false);
				dropbox.removeEventListener('dragover', preventAndStop, false);
				dropbox.removeEventListener('drop', drop, false);
				saveMessage(message, false, setMessages, setChats, messages);
				const data = new FormData();
				data.append('image', files[i]);
				fetch('https://tt-front.now.sh/upload/', {
					method: 'POST',
					body: data,
				}).then(response => console.log(response));
			}
		}
	}
	const preventAndStop = (event) => {
		event.stopPropagation();
		event.preventDefault();
	}
	const drop = (event) => {
		preventAndStop(event);
		const { files } = event.dataTransfer;
		// eslint-disable-next-line object-shorthand
		handleFiles({target: { files: files }});
	}
	if (dropbox) {
		dropbox.addEventListener('dragenter', preventAndStop, false);
		dropbox.addEventListener('dragover', preventAndStop, false);
		dropbox.addEventListener('drop', drop, false);
	}
	return (
		<Container>
			<input 
			    type='file' 
			    id='fileElem' 
			    multiple 
			    accept='image/*'
			    style={ {display: 'none'} } 
			    onChange={ handleFiles.bind(this) }
			/>
			<Button src='https://image.flaticon.com/icons/svg/54/54848.svg' id='fileSelect' onClick={fileSelectOnClick}/>
		</Container>
	);
}

ClipButton.propTypes = {
	yourName: PropTypes.string.isRequired,
	chatId: PropTypes.string.isRequired,
	setMessages: PropTypes.func.isRequired,
	setChats: PropTypes.func.isRequired,
}

export default ClipButton;
