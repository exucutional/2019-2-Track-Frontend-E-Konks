/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	margin-left: 5px;
	margin-right: 5px;
`;

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	&:hover {
		background: #e4e5ef;
	}
`;

const TopPart = styled.div`
	display: flex;
	flex-direction: raw;
	align-items: baseline;
	justify-content: space-between;
`;

const BottomPart = styled.div`
	display: flex;
	flex-direction: raw;
	border-bottom: 2px solid darkgrey;
	padding-bottom: 10px;
	width: 80vw;
	justify-content: space-between;
`;

const Name = styled.span`
	font-size: 30px;
	margin-right: 10px;
	margin-left: 10px;
`;

const Time = styled.span`
	font-size: 18px;
	color: darkgrey;
	margin-left: 25px;
`;

const LastMessage = styled.span`
	color: darkgrey;
	font-size: 20px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-left: 20px;
`;

const Indicator = styled.img`
	width: 1.5em;
`;

function MessageIndicator(props) {
	if (props.last_message !== '') {
		return (
			<Indicator src="https://image.flaticon.com/icons/svg/446/446191.svg" />
		);
	}
	return <span />;
}

function Chat(props) {
	/*
	const onClick = () => {
		props.onClick(props.id, props.name);
	};
	*/
	let link = props.id;
	if (props.mode === 'centrifuge') {
		link = 'centrifuge';
	}
	if (props.mode === 'webrtc') {
		link = 'webrtc';
	}
	return (
		<Link to={`/chats/${link}`} id={`link-to-chat${props.id}`} style={ { 
			textDecoration: 'none',
			color: 'unset',
		} }>
			<RowContainer>
				<svg width="70px" height="70px" viewBox="0 0 32 32">
					<circle cx="16" cy="16" r="16" fill="rgba(25, 91, 125, 0.69)" />
				</svg>
				<ColumnContainer>
					<TopPart>
						<Name>{props.name}</Name>
						<Time>{props.time}</Time>
					</TopPart>
					<BottomPart>
						<LastMessage>{props.last_message}</LastMessage>
						<MessageIndicator last_message={props.last_message} />
					</BottomPart>
				</ColumnContainer>
			</RowContainer>
		</Link>
	);
}

Chat.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired,
	name: PropTypes.string.isRequired,
	mode: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	last_message: PropTypes.string.isRequired,
};

MessageIndicator.propTypes = {
	last_message: PropTypes.string.isRequired,
};

export default Chat;
