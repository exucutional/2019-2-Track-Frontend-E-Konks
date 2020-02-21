import React from 'react';
import renderer from 'react-test-renderer';
import CreateChatButton from '../components/CreateChatButton'

it('renders correctly', () => {
	const tree = renderer
		.create(<CreateChatButton onClick={ () => {} }/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

