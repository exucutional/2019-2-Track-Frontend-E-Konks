import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
`;

const Button = styled.img`
	width: 10vh;
	position: fixed;
	right: 20px;
	bottom: 20px;
	cursor: pointer;
`;

function AddButton() {
	return (
		<Container>
			<Button
				src='https://assets.dryicons.com/uploads/icon/svg/12631/d3fab4d2-3a88-4439-9a83-3bea496ed86b.svg'
			/>
		</Container>
	);
}

export default AddButton;