/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';

const Appear = keyframes`
	0% {
		opacity(0);
		transform: scale(0.1, 0.1);
	}
	100% {
		opacity(1);
		transform: scale(1, 1);
	}
`;

const Avatar = styled.svg`
	animation: ${Appear} 0.5s;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	margin-left: 10px;
`;

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	&:hover {
		background: #e4e5ef;
	}
	cursor: pointer;
	animation: ${Appear} 0.5s;
`;

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 25px;
	margin-left: 2px;
`;

const Name = styled.div`
	font-size: 15px;
	color: darkgrey;
	margin-right: 10px;
	margin-left: 10px;
`;

const Time = styled.div`
	font-size: 15px;
	color: darkgrey;
	margin-right: 10px;
`;

const Content = styled.div`
	position: relative;
	display: flex;
	color: white;
	word-break: break-word;
	white-space: pre-wrap;
	background: white;
	border: 0.5rem solid;
	border-radius: 0.4em;
	border-color: rgba(0, 0, 0, 0);
	width: fit-content;
	max-width: 45vw;
	margin-left: 20px;
	margin-top: 5px;
	color: black;
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 10px;
		width: 0;
		height: 0;
		border: 15px solid transparent;
		border-bottom-color: white;
		border-top: 0;
		border-left: 0;
		margin-left: -13.5px;
		margin-top: -15px;
	}
`;

const Audio = styled.audio``;

function ContentAnalyzer(props) {
	switch (props.type) {
		case 'img': {
			return ( <img src={props.value} style={ {maxWidth: '45vw'} } alt=''/> );
		}
		case 'audio': {
			return ( <Audio src={props.value} controls/>);
		}
		default: {
			break;
		}
	}
	if (props.value.startsWith('http://') || props.value.startsWith('https://')) {
		return (
			<Content>
				<a href={props.value}>Location</a>
			</Content>
		);
	}
	return (
		<Content>{props.value}</Content>
	);
}

function Message(props) {
	let varstyle = {};
	if (props.name === props.host) {
		varstyle = { alignSelf: 'flex-end' };
	}
	return (
		<Container style={varstyle}>
			<Avatar width="25px" height="25px" viewBox="0 0 32 32">
				<circle cx="16" cy="16" r="16" fill="rgba(142, 36, 170, 0.71)" />
			</Avatar>
			<ColumnContainer>
				<RowContainer>
					<Name>{props.name}</Name>
					<Time>{props.time}</Time>
				</RowContainer>
				<ContentAnalyzer value={props.value} type={props.type}/>
			</ColumnContainer>
		</Container>
	);
}

Message.propTypes = {
	name: PropTypes.string.isRequired,
	host: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

ContentAnalyzer.propTypes = {
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default Message;
