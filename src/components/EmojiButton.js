import React from 'react';
import PropType from 'prop-types';
import '../styles/emojiButton.css';

export default function EmojuButton(props) {
	const {onClick} = props;
	return (
		<input
			className='emoji-button'
			onClick={onClick}
			type='button'
		/>
	);
}

EmojuButton.propTypes = {
	onClick: PropType.func.isRequired,
}
