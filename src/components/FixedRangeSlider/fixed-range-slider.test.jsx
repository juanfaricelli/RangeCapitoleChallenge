/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Component from './fixed-range-slider.component';

const testId = 'fixed-range-component';
const testIdMinInput = `${testId}-input-min`;
const testIdMaxInput = `${testId}-input-max`;

test('Fixed Range Slider Component should render - no props recieved', () => {
  render(<Component />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testIdMinInput).value).toEqual('0');
  expect(screen.getByTestId(testIdMaxInput).value).toEqual('1');
});
test('Fixed Range Slider Component should render - empty array', () => {
  render(<Component values={[]} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testIdMinInput).value).toEqual('0');
  expect(screen.getByTestId(testIdMaxInput).value).toEqual('1');
});
test('Fixed Range Slider Component should render - ideal array values', () => {
  const idealArray = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
  render(<Component values={idealArray} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testIdMinInput).value).toEqual(`${idealArray[0]}`);
  expect(screen.getByTestId(testIdMaxInput).value).toEqual(`${idealArray[idealArray.length - 1]}`);
});
test('Fixed Range Slider Component should render - array with negative values', () => {
  render(<Component values={[-6, 1, 3, 8, 4]} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testIdMinInput).value).toEqual('1');
  expect(screen.getByTestId(testIdMaxInput).value).toEqual('8');
});
test('Fixed Range Slider Component should render - array with negative values', () => {
  render(<Component values={[-6, 1, 3, 8, 4]} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testIdMinInput).value).toEqual('1');
  expect(screen.getByTestId(testIdMaxInput).value).toEqual('8');
});
test('Fixed Range Slider Component should render - array with unexpected values', () => {
  render(<Component values={['asdf', 1, 3, 8, 4]} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testIdMinInput).value).toEqual('1');
  expect(screen.getByTestId(testIdMaxInput).value).toEqual('8');
});

/*
CU

- bullet min should be able to move within a valid range
- bullet min should stop on bullet.max.value
- bullet min should stop on min.prop.value
- bullet min on move, new value should be displayed on input.min.value

- bullet max should be able to move within a valid range
- bullet max should stop on bullet.min.value
- bullet max should stop on max.prop.value
- bullet max on move, new value should be displayed on input.max.value
*/
