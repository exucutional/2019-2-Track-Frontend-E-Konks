/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from '@emotion/styled';

const Button = styled.img`
	display: flex;
	height: 8vh;
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
		/>
	);
}


export default BackButton;
