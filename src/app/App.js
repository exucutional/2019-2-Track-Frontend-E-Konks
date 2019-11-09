import React, { Component } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Body from '../components/Body';

const Container = styled.div`
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
	constructor(props) {
		super(props);
		this.state = { mode: 'chats' };
		this.setMessagesMode = this.setMessagesMode.bind(this);
	}

	setMessagesMode() {
		this.setState(() => ({
			mode: 'messages',
		}));
	}

	render() {
		return (
			<Container>
				<Header/>
				<Body 
					state={ this.state }
					setMessagesMode={ this.setMessagesMode }/>
			</Container>
		)
	}
}

export default App;