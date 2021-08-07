/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { number } from 'prop-types';

import Currency from '../Currency/currency.component';

import './styles.scss';

const Range = ({ min, max }) => {
  const CONTAINER_CLASS_NAME = '.range__track__container';
  const MAX = 'max';
  const MIN = 'min';
  const [constainerWidth, setContainerWidth] = useState(0);
  const [constainerLeft, setContainerLeft] = useState(0);
  const [minPerc, setMinPerc] = useState(min);
  const [minInput, setMinInput] = useState(min);
  const [minInputValue, setMinInputValue] = useState(min);
  const [maxPerc, setMaxPerc] = useState(100);
  const [maxInput, setMaxInput] = useState(max);
  const [maxInputValue, setMaxInputValue] = useState(max);
  const [badRange, setBadRange] = useState(false);
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

  const onMouseMoveHandler = (e) => {
    if (dragging) {
      const { clientX } = e;
      const translate = clientX - constainerLeft;
      const percentage = parseFloat(((translate / constainerWidth) * 100).toFixed(2));
      const inputValues = parseFloat(((translate / constainerWidth) * max).toFixed(2));
      if (bulletType === MIN) {
        if (clientX < constainerLeft) {
          setMinPerc(0);
        } else if (clientX > constainerWidth + constainerLeft) {
          setMinPerc(100);
        } else {
          setMinPerc(percentage);
          setMinInput(inputValues + 2);
          setMinInputValue(inputValues);
          setSelectedStyle({
            left: `${percentage}%`,
            width: `${maxPerc - percentage}%`,
          });
        }
      } else if (clientX < constainerLeft) {
        setMaxPerc(0);
      } else if (clientX > constainerWidth + constainerLeft) {
        setMaxPerc(100);
      } else {
        const maxLimit = percentage - minPerc;
        if (maxLimit > 2) {
          setMaxPerc(percentage);
          setMaxInput(inputValues - 2);
          setMaxInputValue(inputValues);
          setSelectedStyle({
            left: `${minPerc}%`,
            width: `${maxLimit}%`,
          });
        }
      }
      setBadRange(false);
    }
  };

  const inputOnChangeHandler = (e, type) => {
    const value = parseFloat(e.target.value);

    setBadRange(false);
    if (type === MAX && value > minPerc && value < 100) {
      setMaxPerc(value);
      setMaxInput(value - 2);
      setSelectedStyle({
        left: `${minPerc}%`,
        width: `${value - minPerc}%`,
      });
    } else if (type === MIN && value < maxPerc && value > 0) {
      setMinPerc(value);
      setMinInput(value + 2);
      setSelectedStyle({
        left: `${value}%`,
        width: `${maxPerc - value}%`,
      });
    } else {
      setBadRange(true);
    }
    if (type === MAX) {
      setMaxInputValue(value);
    } else {
      setMinInputValue(value);
    }
  };

  return (
    <div className="range__container" data-testid="range-component">
      <div className="range__input">
        <input
          id={MIN}
          type="number"
          value={minInputValue}
          min="0"
          max={maxInput}
          onChange={(e) => inputOnChangeHandler(e, MIN)}
        />
        <Currency type="euro" />
      </div>
      <div
        className="range__track__container"
        onMouseMove={(e) => onMouseMoveHandler(e)}
        onMouseUp={onMouseUpHandler}
        onMouseLeave={onMouseUpHandler}
      >
        <div className="range__track">
          <div
            className="range__track__selected"
            style={selectedStyle}
          />
          <div
            className="range__track__bullet--min"
            style={bulletPosition(minPerc)}
            onMouseDown={() => onMouseDownHandler(MIN)}
            onMouseUp={onMouseUpHandler}
          />
          <div
            className="range__track__bullet--max"
            style={bulletPosition(maxPerc)}
            onMouseDown={() => onMouseDownHandler(MAX)}
            onMouseUp={onMouseUpHandler}
          />
        </div>
      </div>
      <div className="range__input">
        <input
          id={MAX}
          type="number"
          value={maxInputValue}
          min={minInput}
          max="100"
          onChange={(e) => inputOnChangeHandler(e, MAX)}
        />
        <Currency type="euro" />
      </div>
      {badRange
        && (
        <div className="range__message">
          🛑 Bad Range Selected. Please, try other range selection. 🛑
        </div>
        )}
    </div>
  );
};

Range.propTypes = {
  min: number.isRequired,
  max: number.isRequired,
};

export default Range;
