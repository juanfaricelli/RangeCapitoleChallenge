/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { arrayOf, number, string } from 'prop-types';

import Currency from '../Currency/currency.component';

import './styles.scss';

const FixedRange = ({ values }) => {
  if (values.length === 0) {
    values = [...values, ...[0, 1]];
  }
  values = values.sort((a, b) => a - b).filter((num) => num > -1);
  const CONTAINER_CLASS_NAME = '.fixed-range__track__container';
  const MAX = 'max';
  const MIN = 'min';
  const max = 100;
  const min = 0;
  const [constainerWidth, setContainerWidth] = useState(0);
  const [constainerLeft, setContainerLeft] = useState(0);
  const [minPerc, setMinPerc] = useState(min);
  const [minInputValue, setMinInputValue] = useState(values[0]);
  const [maxPerc, setMaxPerc] = useState(max);
  const [maxInputValue, setMaxInputValue] = useState(values[values.length - 1]);
  const [windowSize, setWindowSize] = useState(0);

  const [dragging, setDragging] = useState(false);
  const [bulletType, setBulletType] = useState(null);

  const [selectedStyle, setSelectedStyle] = useState({
    left: `${minPerc}%`,
    width: `${maxPerc - minPerc}%`,
  });

  useEffect(() => {
    setContainerWidth(document.querySelector(CONTAINER_CLASS_NAME).offsetWidth);
    setContainerLeft(document.querySelector(CONTAINER_CLASS_NAME).offsetLeft);
    window.addEventListener('resize', setWindowSize);

    return () => window.removeEventListener('resize', setWindowSize);
  }, [windowSize]);

  const bulletPosition = (percentageType) => ({
    transform: `translate(-50%) translateX(${(percentageType / 100) * constainerWidth}px)`,
  });
  const onMouseDownHandler = (bulletPressed) => {
    setDragging(true);
    setBulletType(bulletPressed);
  };
  const onMouseUpHandler = () => {
    setDragging(false);
    setBulletType(null);
  };
  const Bullet = ({ position, type }) => (
    <div
      className={`range__track__bullet--${type}`}
      style={bulletPosition(position)}
      onMouseDown={() => onMouseDownHandler(type)}
      onMouseUp={onMouseUpHandler}
    />
  );
  Bullet.propTypes = {
    position: number.isRequired,
    type: string.isRequired,
  };

  const Input = ({ value, type }) => (
    <input
      id={type}
      type="number"
      value={value}
      readOnly
      data-testid={`fixed-range-component-input-${type}`}
    />
  );
  Input.propTypes = {
    value: number.isRequired,
    type: string.isRequired,
  };

  const onMouseMoveHandler = (e) => {
    if (dragging) {
      const { clientX } = e;
      const translate = clientX - constainerLeft;
      const percentage = parseFloat(((translate / constainerWidth) * 100).toFixed(2));
      const inputValue = ((percentage * (values[values.length - 1] - values[0])) / 100) + values[0];
      const inputValueToShow = values.find(
        (item, i) => item <= inputValue && inputValue <= values[i + 1],
      );
      if (!inputValueToShow && bulletType === MAX) {
        setMaxInputValue(values[values.length - 1]);
      }
      if (bulletType === MIN) {
        if (clientX < constainerLeft) {
          setMinPerc(0);
        } else if (clientX > constainerWidth + constainerLeft) {
          setMinPerc(100);
        } else {
          const maxLimit = percentage - maxPerc;
          if (maxLimit < -2) {
            setMinPerc(percentage);
            setMinInputValue(inputValueToShow);
            setSelectedStyle({
              left: `${percentage}%`,
              width: `${maxPerc - percentage}%`,
            });
          }
        }
      } else if (clientX < constainerLeft) {
        setMaxPerc(0);
      } else if (clientX > constainerWidth + constainerLeft) {
        setMaxPerc(100);
      } else {
        const maxLimit = percentage - minPerc;
        if (maxLimit > 2) {
          setMaxPerc(percentage);
          setMaxInputValue(inputValueToShow);
          setSelectedStyle({
            left: `${minPerc}%`,
            width: `${maxLimit}%`,
          });
        }
      }
    }
  };

  return (
    <div className="fixed-range__container" data-testid="fixed-range-component">
      <div className="fixed-range__input">
        <Input type={MIN} value={minInputValue} data-testid="fixed-range-component-input-min" />
        <Currency type="euro" />
      </div>
      <div
        className="fixed-range__track__container"
        onMouseMove={(e) => onMouseMoveHandler(e)}
        onMouseUp={onMouseUpHandler}
        onMouseLeave={onMouseUpHandler}
      >
        <div className="fixed-range__track">
          <div
            className="fixed-range__track__selected"
            style={selectedStyle}
          />
          <Bullet position={minPerc} type={MIN} />
          <Bullet position={maxPerc} type={MAX} />
        </div>
      </div>
      <div className="fixed-range__input">
        <Input type={MAX} value={maxInputValue} data-testid="fixed-range-component-input-max" />
        <Currency type="euro" />
      </div>
    </div>
  );
};

FixedRange.propTypes = {
  values: arrayOf(number),
};

FixedRange.defaultProps = {
  values: [0, 1],
};

export default FixedRange;
