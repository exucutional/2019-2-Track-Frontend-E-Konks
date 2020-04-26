/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Peer from 'peerjs';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Body from '../components/Body';

const Container = styled.div``;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
	constructor(props) {
		super(props);
		const mpeer = new Peer();
		this.state = { 
			mode: 'chats',
			chatId: 0, 
			title: 'Messenger',
			peer: mpeer,
		};
		mpeer.on('open', (id) => {
			this.setState(() => ({peerId: id}));
		});
		mpeer.on('connection', (conn) => {
			this.setState(() => ({foreignPeerConn: conn}));
		});
		this.setMessagesMode = this.setMessagesMode.bind(this);
		this.setChatsMode = this.setChatsMode.bind(this);
		this.setTitle = this.setTitle.bind(this);
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

	setTitle(value) {
		this.setState(() => ({
			'title': value,
		}))
	}

	render() {
		return (
			<Router>
				<Container>
					<Header 
						state={this.state} 
						setChatsMode={this.setChatsMode}
						setTitle={this.setTitle}/>
					<Body 
						state={this.state}
						setMessagesMode={this.setMessagesMode}
						setContainer={this.setContainer}
						setTitle={this.setTitle}/>
				</Container>
			</Router>
		);
	}
}

export default App;
