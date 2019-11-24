/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
	Switch,
	Route,
	Link,
} from "react-router-dom";
import styled from '@emotion/styled';
import BackButton from './BackButton';
import SearchButton from './SearchButton';
import CheckButton from './CheckButton';
import MenuBar from './MenuBar';
import { save } from '../actions/localDb';

const TopBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background-color: #8e24aa;
	height: 8vh;
`;

const Title = styled.span`
	display: flex;
	font-size: 6vh;
	font-family: monospace;
	color: white;
	align-items: center;
`;


function Header(props) {
	const { 
		title
	 } = props.state;
	const profileOnClickSave = () => {
		const profile = {
			fullName: props.state.fullName,
			userName: props.state.userName,
			bio: props.state.bio,
		}
		save('profile', profile);
		alert("Saved!");
	}
	return (
		<Switch>
			<Route path='/chats/:chatId'>
				<TopBar>
					<Link to='/'>
						<BackButton/>
					</Link>
					<Title>{title}</Title>
					<span/>
				</TopBar>
			</Route>
			<Route path='/profile'>
				<TopBar>
					<Link to='/'>
						<BackButton/>
					</Link>
					<Title style={ {fontSize: ' 5vh'} }>Edit Profile</Title>
					<CheckButton onClick={ profileOnClickSave }/>
				</TopBar>
			</Route>
			<Route path='/'>
				<TopBar>
					<MenuBar/>
					<Title>Messenger</Title>
					<SearchButton/>
				</TopBar>
			</Route>
		</Switch>
	);
}

export default Header;
