/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const Container = styled.div``;

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
	width: 10vh;
	position: fixed;
	right: 20px;
	bottom: 20px;
	&:hover {
		cursor: pointer;
		animation: ${Pulse} 2s infinite ease-in-out;
	};
	cursor: pointer;
`;

function CreateChatButton(props) {
	return (
		<Container>
			<Button
				src="https://image.flaticon.com/icons/svg/1159/1159633.svg"
				id="create-chat-button"
				onClick={props.onClick}
			/>
		</Container>
	);
}

CreateChatButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default CreateChatButton;
