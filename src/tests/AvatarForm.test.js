import React from 'react';
import renderer from 'react-test-renderer';
import AvatarForm from '../components/AvatarForm'

it('renders correctly', () => {
	const tree = renderer
		.create(<AvatarForm/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
