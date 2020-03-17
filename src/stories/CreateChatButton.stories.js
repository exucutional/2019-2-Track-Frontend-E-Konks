import React from 'react';
import { action } from '@storybook/addon-actions';
import CreateChatButton from '../components/CreateChatButton';

export default {
	title: 'CreateChatButton',
	component: CreateChatButton,
};

export const Default = () => <CreateChatButton onClick={ action('clicked') }/>;
