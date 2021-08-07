/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Component from './currency.component';

const testId = 'currency';

const currencyConfig = {
  default: '$',
  euro: '€',
  dollar: 'u$d',
  libra: '£',
};

test('Currency - euro content', () => {
  render(<Component type="euro" />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testId)).toHaveTextContent(currencyConfig.euro);
});
test('Currency - dollar content', () => {
  render(<Component type="dollar" />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testId)).toHaveTextContent(currencyConfig.dollar);
});
test('Currency - brit libra content', () => {
  render(<Component type="libra" />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testId)).toHaveTextContent(currencyConfig.libra);
});
test('Currency - default content', () => {
  render(<Component />);
  expect(screen.getByTestId(testId)).toBeDefined();
  expect(screen.getByTestId(testId)).toHaveTextContent(currencyConfig.default);
});
