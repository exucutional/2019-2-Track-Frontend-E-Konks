import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	margin-left: 5px;
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
	flex-direction: column;
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
	margin-left: 25px
`;

const LastMessage = styled.span`
	color: darkgrey;
	font-size: 20px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-left: 20px;
`;

function Chat(props) {
	return (
		<RowContainer onClick={ props.onClick }>
			<ColumnContainer>
				<TopPart>
					<Name>{ props.name }</Name>
					<Time>{ props.time }</Time>
				</TopPart>
				<BottomPart>
					<LastMessage>{ props.last_message }</LastMessage>
				</BottomPart>
			</ColumnContainer>
		</RowContainer>
	);
}

Chat.propTypes = {
	name: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	last_message: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Chat;