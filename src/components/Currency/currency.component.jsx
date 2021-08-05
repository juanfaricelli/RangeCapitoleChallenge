import React from 'react';
const { string } = require('prop-types');

import './styles.scss';

const Currency = ({ type }) => {
  const currencyConfig = {
    default: '$',
    euro: '€',
    dollar: 'u$d',
    libra:  '£'
  }

  return (
    <div className="currency__container">
      {currencyConfig[type]}
    </div>
  )
}

Currency.propTypes = {
  type: string,
};

Currency.defaultProps = {
  type: 'default'
};

export default Currency;
