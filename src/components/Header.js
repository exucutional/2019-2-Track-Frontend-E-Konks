/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
	Switch,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import BackButton from './BackButton';
import SearchButton from './SearchButton';
import CheckButton from './CheckButton';
import MenuBar from './MenuBar';
import { save, load } from '../actions/localDb';

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

function ChatTitle(props) {
	const { chatId } = useParams();
	if (props.title !== '') {
		return (
			<Title>{ props.title }</Title>
		)
	}
	const chats = load('chats');
	let chatName = '';
	if (chats !== null) {
		chatName = load('chats').filter((chat) => chat.id === Number(chatId))[0].name;
	}
	return (
		<Title>{ chatName }</Title>
	);
}

function Header(props) {
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
			<Route path='/chats/common'>
				<TopBar>
					<Link to='/'>
						<BackButton/>
					</Link>
					<ChatTitle title='Мусорка'/>
					<span/>
				</TopBar>
			</Route>
			<Route path='/chats/:chatId'>
				<TopBar>
					<Link to='/'>
						<BackButton/>
					</Link>
					<ChatTitle/>
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

ChatTitle.defaultProps = {
	title: '',
}

ChatTitle.propTypes = {
	title: PropTypes.string,
}

export default Header;
