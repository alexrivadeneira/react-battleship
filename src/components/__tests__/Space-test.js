import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Space from '../Space';

// describe what we are testing
describe('Space Component', () => {

	 // make our assertion and what we expect to happen 

	 it('should have a div with classname space', () => {
	 	const wrapper = shallow(<Space />);
	 	expect(wrapper.contains(<div className="space">Space</div>)).toEqual(true);
	 });
})
