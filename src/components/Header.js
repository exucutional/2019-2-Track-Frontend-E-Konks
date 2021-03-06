/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
	Switch,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import BackButton from './BackButton';
import SearchButton from './SearchButton';
import CheckButton from './CheckButton';
import MenuBar from './MenuBar';
import { save, load } from '../actions/localDb';
import { getProfile } from '../actions/index';

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

const ID = styled.div`
	display: flex;
	font-size: 2vh;
	font-family: monospace;
	color: white;
	align-items: center;
`

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
			fullName: props.fullName,
			userName: props.userName,
			bio: props.bio,
		}
		save('profile', profile);
	}
	return (
		<Switch>
			<Route path='/chats/webrtc'>
				<TopBar>
					<Link to='/'>
						<BackButton/>
					</Link>
					<ChatTitle title='WebRTC'/>
					<ID>Your ID: {props.state.peer.id}</ID>
					<span/>
				</TopBar>
			</Route>
			<Route path='/chats/centrifuge'>
				<TopBar>
					<Link to='/'>
						<BackButton/>
					</Link>
					<ChatTitle title='Centrifuge'/>
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

const mapStateToProps = (state) => ({
	fullName: state.profile.fullName,
	userName: state.profile.userName,
	bio: state.profile.bio,
})

export default connect(
	mapStateToProps,
	{ getProfile },
)(Header)
