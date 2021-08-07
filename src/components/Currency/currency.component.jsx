import React from 'react';
import { string } from 'prop-types';

import './styles.scss';

const Currency = ({ type }) => {
  const currencyConfig = {
    default: '$',
    euro: '€',
    dollar: 'u$d',
    libra: '£',
  };

  return (
    <div className="currency__container" data-testid="currency">
      {currencyConfig[type]}
    </div>
  );
};

Currency.propTypes = {
  type: string,
};

Currency.defaultProps = {
  type: 'default',
};

export default Currency;
