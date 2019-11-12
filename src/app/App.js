/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Body from '../components/Body';

const Container = styled.div``;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
	constructor(props) {
		super(props);
		this.state = { mode: 'chats', chatId: 0, title: 'Messenger' };
		this.setMessagesMode = this.setMessagesMode.bind(this);
		this.setChatsMode = this.setChatsMode.bind(this);
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

	render() {
		return (
			<Container>
				<Header state={this.state} setChatsMode={this.setChatsMode} />
				<Body state={this.state} setMessagesMode={this.setMessagesMode} />
			</Container>
		);
	}
}

export default App;
