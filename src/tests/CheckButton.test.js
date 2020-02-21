import React from 'react';
import renderer from 'react-test-renderer';
import CheckButton from '../components/CheckButton'

it('renders correctly', () => {
	const tree = renderer
		.create(<CheckButton onClick={ () => {} }/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
