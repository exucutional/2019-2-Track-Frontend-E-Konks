import React from 'react';
import styled from '@emotion/styled';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	};
	cursor: pointer;
`;

function BurgerButton() {
	return (
		<Button src="http://vcmediapartners.com/media/images/hamburger-white.svg" />
	);
}

export default BurgerButton;
