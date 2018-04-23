import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Game from '../Game';
import StatusDisplay from '../StatusDisplay';

// describe what we are testing
describe('Game Component', () => {

	 // make our assertion and what we expect to happen 

	 it('should contain a StatusDisplay element', () => {
	 	const wrapper = shallow(<Game />);
	 	expect(wrapper.find('h3').text()).toEqual("Game");
	 });
})
