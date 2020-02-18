/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';

const Button = styled.img`
	display: flex;
	height: 8vh;
	margin-right: 10px;
	filter: invert(1);
	&:hover {
		filter: invert(0.5);
	};
	cursor: pointer;
`;

function CheckButton(props) {
	return <Button onClick={ props.onClick } src="https://image.flaticon.com/icons/svg/446/446191.svg"/>;
}

CheckButton.propTypes = {
	onClick: PropType.func.isRequired,
}

export default CheckButton;

