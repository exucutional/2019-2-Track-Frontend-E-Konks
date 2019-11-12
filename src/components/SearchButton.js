import React from 'react';
import styled from '@emotion/styled';

const Button = styled.img`
	width: 3em;
	margin-right: 10px;
	filter: invert(1);
	&:hover {
		filter: invert(0.5);
	}
`;

function SearchButton() {
	return <Button src="https://image.flaticon.com/icons/svg/149/149309.svg" />;
}

export default SearchButton;
