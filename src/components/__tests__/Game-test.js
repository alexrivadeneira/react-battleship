import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Game from '../Game';
import StatusDisplay from '../StatusDisplay';
import PlayerShipsMap from '../PlayerShipsMap';
import PlayerRadar from '../PlayerRadar';

// describe what we are testing
describe('Game Component', () => {

	 // make our assertion and what we expect to happen 

	 it('should contain a StatusDisplay element', () => {
	 	const wrapper = shallow(<Game />);
	 	expect(wrapper.find(StatusDisplay).length).toEqual(1);
	 });

	 it('should contain a PlayerRadar element', () => {
	 	const wrapper = shallow(<Game />);
	 	expect(wrapper.find(PlayerRadar).length).toEqual(1);
	 });	 

	 it('should contain a PlayerShipsMap element', () => {
	 	const wrapper = shallow(<Game />);
	 	expect(wrapper.find(PlayerShipsMap).length).toEqual(1);
	 });	 

})

