import React from 'react';
import renderer from 'react-test-renderer';
import BurgerButton from '../components/BurgerButton'

it('renders correctly', () => {
	const tree = renderer
		.create(<BurgerButton/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
