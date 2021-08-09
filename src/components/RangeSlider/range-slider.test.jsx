/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Component from './range-slider.component';

jest.mock('axios');
const testId = 'range-component';
const testIdMinInput = 'range-component-input-min';
const testIdMaxInput = 'range-component-input-max';
let sentence = '';
let props;

beforeAll(() => {
  props = {
    min: 0,
    max: 100,
  };
});

test('Range Slider Component should render with error - no props recieved', () => {
  render(<Component />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId('error-message')).toBeDefined();
});
test('Range Slider Component should render with error - min > max', () => {
  render(<Component min={100} max={1} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId('error-message')).toBeDefined();
});

test('Range Slider Component should render', () => {
  render(<Component {...props} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testId)).not.toHaveTextContent('Bad Range');
  expect(screen.getByTestId(testIdMinInput).value).toEqual(`${props.min}`);
  expect(screen.getByTestId(testIdMaxInput).value).toEqual(`${props.max}`);
});

test('Range Slider Component inputs - should not allow letters', () => {
  const someLetters = 'Letters';
  render(<Component {...props} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  userEvent.type(screen.getByTestId(testIdMinInput), someLetters);
  userEvent.type(screen.getByTestId(testIdMaxInput), someLetters);
  expect(screen.getByTestId(testIdMinInput).value).not.toContain(someLetters);
  expect(screen.getByTestId(testIdMaxInput).value).not.toContain(someLetters);
});

sentence = `Range Slider Component 
  input min value typed should not be lower than min.prop and
  input max value typed should not be higher than max.prop`;
test(sentence, () => {
  render(<Component {...props} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  userEvent.type(screen.getByTestId(testIdMinInput), '-1');
  expect(screen.getByTestId(testIdMinInput).value).toBe('');

  userEvent.type(screen.getByTestId(testIdMaxInput), '1000');
  expect(screen.getByTestId('error-message')).toBeDefined();
});
sentence = `Range Slider Component 
  input min value typed should not be higher than max.prop and
  input max value typed should not be lower than min.prop`;
test(sentence, () => {
  render(<Component {...props} />);
  expect(screen.getByTestId(testId)).toBeDefined();
  userEvent.type(screen.getByTestId(testIdMinInput), '1000');
  expect(screen.getByTestId('error-message')).toBeDefined();

  userEvent.type(screen.getByTestId(testIdMaxInput), '-1');
  expect(screen.getByTestId('error-message')).toBeDefined();
});

/*
CU

- input min should move bullet to valid position

- input max should move bullet to valid position

- bullet min should be able to move within a valid range
- bullet min should stop on bullet.max.value
- bullet min should stop on min.prop.value
- bullet min on move, new value should be displayed on input.min.value

- bullet max should be able to move within a valid range
- bullet max should stop on bullet.min.value
- bullet max should stop on max.prop.value
- bullet max on move, new value should be displayed on input.max.value
*/
