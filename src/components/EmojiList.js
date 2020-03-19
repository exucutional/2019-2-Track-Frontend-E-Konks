import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import {emojiList} from '../constants/emojiList';
import '../styles/emojiList.scss';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	border-top: 3px solid rgba(25,25,25,0.32);
	justify-content: center;
	padding-top: 10px;
`;

const EmojiForm = styled.div`
`;

export default function EmojiList(props) {
	const {
		emojiMode,
		inputValue,
		setInputValue,
	} = props;
	const onClick = (event) => setInputValue(`${inputValue}:${event.target.id}:`);
	if (!emojiMode)
		return( <div/> );
	return (
		<Container>
			{emojiList
				.map((emoji) => (
					<EmojiForm
						key={emoji}
						id={emoji}
						className={`emoji ${emoji}`}
						onClick={onClick}
					/>
				))}
		</Container>
	);
}

EmojiList.propTypes = {
	emojiMode: PropType.bool.isRequired,
	inputValue: PropType.string.isRequired,
	setInputValue: PropType.func.isRequired,
}
