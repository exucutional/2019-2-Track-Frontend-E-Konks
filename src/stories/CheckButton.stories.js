import React from 'react';
import { action } from '@storybook/addon-actions';
import CheckButton from '../components/CheckButton';

export default {
	title: 'CheckButton',
	component: CheckButton,
};

export const Default = () => <CheckButton onClick={ action('clicked') }/>;
