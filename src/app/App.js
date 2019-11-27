/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import styled from '@emotion/styled';
import Header from '../components/Header';
import Body from '../components/Body';

const Container = styled.div``;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			mode: 'chats',
			chatId: 0, 
			title: 'Messenger',
			fullName: '',
			userName: 'admin',
			bio: '',
		};
		this.setMessagesMode = this.setMessagesMode.bind(this);
		this.setChatsMode = this.setChatsMode.bind(this);
		this.setFullName = this.setFullName.bind(this);
		this.setUserName = this.setUserName.bind(this);
		this.setBio = this.setBio.bind(this);
	}

	setMessagesMode(id, t) {
		this.setState(() => ({
			mode: 'messages',
			chatId: id,
			title: t,
		}));
	}

	setChatsMode() {
		this.setState(() => ({
			mode: 'chats',
			title: 'Messenger',
		}));
	}

	setFullName(name) {
		this.setState(() => ({ fullName: name }));
	}

	setUserName(name) {
		this.setState(() => ({ userName: name}))
	}

	setBio(b) {
		this.setState(() => ({ bio: b }));
	}

	render() {
		return (
			<Router>
				<Container>
					<Header 
						state={this.state} 
						setChatsMode={this.setChatsMode}/>
					<Body 
						state={this.state} 
						setMessagesMode={this.setMessagesMode}
						setFullName={this.setFullName}
						setUserName={this.setUserName}
						setBio={this.setBio}/>
				</Container>
			</Router>
		);
	}
}

export default App;
