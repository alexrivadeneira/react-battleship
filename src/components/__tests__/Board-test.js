import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Board from '../Board';
import Space from '../Space';

// describe what we are testing
describe('Board Component', () => {

	 // make our assertion and what we expect to happen 

	 it('should contain 100 <Space /> components', () => {
	 	const wrapper = mount(<Board/>);
	 	expect(wrapper.find(Space).length).toBe(100);
	 });
})
