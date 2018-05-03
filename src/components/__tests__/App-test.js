import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../../App.js';

describe('getNeighbors', () => {
  it('should return the correct neighbors (1,2)', () => {
  	const row = 1;
    const col = 2;
    const neighbors = [[1,1],[1,3],[0,2],[2,2]];

  	const wrapper = shallow(<App />);
  	expect(wrapper.instance().getNeighbors(row,col)).toEqual(neighbors);

  });

  it('should return the correct neighbors (0,0)', () => {
  	const row = 0;
    const col = 0;
    const neighbors = [[0,1],[1,0]];

  	const wrapper = shallow(<App />);
  	expect(wrapper.instance().getNeighbors(row,col)).toEqual(neighbors);

  });
});


describe('getNeighborsOneDirection', () => {
  it('should find the common axis between two points and then return all points along that axis', () => {
  	const point1 = [2,1]
  	const point2 = [3,1]
    const neighborsInLine = [[9,1],[8,1],[7,1],[6,1],[5,1],[4,1],[3,1],[2,1],[1,1],[0,1]];

  	const wrapper = shallow(<App />);
  	expect(wrapper.instance().getNeighborsOneDirection(point1, point2)).toEqual(neighborsInLine);

  });

});