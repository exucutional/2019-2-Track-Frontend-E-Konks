import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
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
	border-radius: .4em;
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

function Message(props) {
	return (
		<ColumnContainer>
			<RowContainer>
				<Name value={ props.name }/>
				<Time value={ props.time }/>
			</RowContainer>
			<Content value={ props.content }/>
		</ColumnContainer>
	);
}

Message.propTypes = {
	name: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};

export default Message;