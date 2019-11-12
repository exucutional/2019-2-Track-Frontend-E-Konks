/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import BackButton from './BackButton';
import SearchButton from './SearchButton';
import BurgerButton from './BurgerButton';
/*
const year = new Date().getFullYear()

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`

const TopBar = styled.div`
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: #fff;

	.redux-logo {
		animation: ${rotate360} infinite 20s linear;
		height: 80px;
	}
`

function Header() {
	return (
		<TopBar>
			<img src={logo} className="redux-logo" alt="logo" />
			<h2>Track Mail.Ru, {year}</h2>
		</TopBar>
	)
}
*/

const TopBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background-color: #8e24aa;
	height: 8vh;
`;

const Title = styled.span`
	display: flex;
	font-size: 7vh;
	font-family: monospace;
	color: white;
`;

function Header(props) {
	const { mode, title } = props.state;
	switch (mode) {
		case 'messages':
			return (
				<TopBar>
					<BackButton onClick={props.setChatsMode} />
					<Title>{title}</Title>
					<span />
				</TopBar>
			);
		case 'chats':
			return (
				<TopBar>
					<BurgerButton />
					<Title>{title}</Title>
					<SearchButton />
				</TopBar>
			);
		default:
			break;
	}
}

Header.propTypes = {
	setChatsMode: PropType.func.isRequired,
};

export default Header;
