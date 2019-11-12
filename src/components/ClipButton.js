import React from 'react';
import styled from '@emotion/styled';

const Button = styled.img`
	width: 2em;
	transform: rotate(90deg);
	&:hover {
		filter: invert(0.5);
	}
`;

function ClipButton() {
	return <Button src="https://image.flaticon.com/icons/svg/54/54848.svg" />;
}

export default ClipButton;
