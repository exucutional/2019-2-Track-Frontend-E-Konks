/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = styled.img`
	display: flex;
	height: auto;
	max-width: 3em;
	margin-left: 10px;
	filter: invert(1);
	&:hover {
		filter: invert(0.5);
	}
`;

function BackButton(props) {
	return (
		<Button
			src="https://image.flaticon.com/icons/svg/109/109618.svg"
			onClick={props.onClick}
		/>
	);
}

BackButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default BackButton;
