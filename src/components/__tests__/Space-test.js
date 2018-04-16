import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Space from '../Space';

// describe what we are testing
describe('Space Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<Space />).exists(<div className='space'></div>)).toBe(true)
 })
})
