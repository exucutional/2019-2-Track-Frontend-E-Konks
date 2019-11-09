import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {save, load} from '../actions/localDb';

function MessageList(props) {
	const { chatId } = props.state;
	const messages = load('messages');
	if (messages === null) {
		return (
			<Container>
			</Container>
		);
	}
	return (
		<Container>
		</Container>
	);
};

export default MessageList;