import React from 'react';
import styled from '@emotion/styled';

const Avatar = styled.img`
	display: flex;
	height: 8vh;
    filter: invert(0.5);
    background-color: 
    border-radius: 30px;
    margin-top: 20px;
	&:hover {
		filter: invert(0.8);
    }
`;

function AvatarForm() {
	return <Avatar src="https://image.flaticon.com/icons/svg/918/918761.svg"/>;
}

export default AvatarForm;