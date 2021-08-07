/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import {
  render, screen, fireEvent, waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Component from './app.component';

jest.mock('axios');
const testId = 'app';

test('App - Home content', () => {
  render(<Component />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testId)).toHaveTextContent('Mango - Capitole Challenge');
});

test('App - RangeSlider content', async () => {
  axios.post.mockImplementation(() => Promise.resolve({
    data: {
      min: 1,
      max: 100,
    },
  }));
  render(<Component />);

  expect(screen.getByTestId(testId)).toBeDefined();
  fireEvent.click(screen.getByTestId('link-exercise1'));
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  expect(screen.getByTestId('range-component')).toBeDefined();
});

test('App - RangeSlider content fail to load', async () => {
  axios.post.mockImplementation(() => Promise.reject());
  render(<Component />);

  expect(screen.getByTestId(testId)).toBeDefined();
  fireEvent.click(screen.getByTestId('link-exercise1'));
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  expect(screen.getByTestId(testId)).toHaveTextContent('Error getting data from server, please try again later...');
});

test('App - FixedRangeSlider content', async () => {
  axios.post.mockImplementation(() => Promise.resolve({
    data: {
      values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    },
  }));
  render(<Component />);

  expect(screen.getByTestId(testId)).toBeDefined();
  fireEvent.click(screen.getByTestId('link-exercise2'));
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  expect(screen.getByTestId('fixed-range-component')).toBeDefined();
});

test('App - FixedRangeSlider content fail to load', async () => {
  axios.post.mockImplementation(() => Promise.reject());
  render(<Component />);

  expect(screen.getByTestId(testId)).toBeDefined();
  fireEvent.click(screen.getByTestId('link-exercise2'));
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  expect(screen.getByTestId(testId)).toHaveTextContent('Error getting data from server, please try again later...');
});
