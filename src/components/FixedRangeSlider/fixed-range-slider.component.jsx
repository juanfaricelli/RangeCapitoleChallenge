import React, { useEffect, useState } from 'react';
import { arrayOf, number } from "prop-types";

import Currency from '../Currency/currency.component';

import './styles.scss';

const FixedRange = ({ values }) => {
  if (values.length === 0) {
    values.push(0);
  }
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
    width: `${maxPerc - minPerc}%`
  });

  useEffect(() => {
    setContainerWidth(document.querySelector(CONTAINER_CLASS_NAME).offsetWidth);
    setContainerLeft(document.querySelector(CONTAINER_CLASS_NAME).offsetLeft);
    window.addEventListener('resize', setWindowSize);

    return () => window.removeEventListener('resize', setWindowSize);
  }, [windowSize]);

  const bulletPosition = (percentageType) => ({
    transform: `translate(-50%) translateX(${percentageType / 100 * constainerWidth}px)`,
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
      const percentage = parseFloat((translate / constainerWidth * 100).toFixed(2));
      const inputValue = (percentage * (values[values.length - 1] - values[0]) / 100) + values[0];
      const inputValueToShow = values.find((item, i) => item <= inputValue && inputValue <= values[++i]);
      if (!inputValueToShow && bulletType === MAX) {
        setMaxInputValue(values[values.length - 1]);
      }
      if (bulletType === MIN) {
        if (clientX < constainerLeft) {
          setMinPerc(0);
        } else if (clientX > constainerWidth + constainerLeft) {
          setMinPerc(100);
        } else {
          setMinPerc(percentage);
          setMinInputValue(inputValueToShow);
          setSelectedStyle({
            left: `${percentage}%`,
            width: `${maxPerc - percentage}%`,
          });
        }
      } else {
        if (clientX < constainerLeft) {
          setMaxPerc(0);
        } else if (clientX > constainerWidth + constainerLeft){
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
    }
  };

  return (
    <div className="fixed-range__container">
      <div className="fixed-range__input">
        <input
          id={MIN}
          type="number"
          value={minInputValue}
          readOnly />
        <Currency type="euro" />
      </div>
      <div
        className="fixed-range__track__container"
        onMouseMove={(e) => onMouseMoveHandler(e)}
        onMouseUp={onMouseUpHandler}
        onMouseLeave={onMouseUpHandler}
      >
        <div className="fixed-range__track">
          <div className="fixed-range__track__selected"
            style={selectedStyle}
          ></div>
          <div
            className="fixed-range__track__bullet--min"
            style={bulletPosition(minPerc)}
            onMouseDown={() => onMouseDownHandler(MIN)}
            onMouseUp={onMouseUpHandler}
          ></div>
          <div
            className="fixed-range__track__bullet--max"
            style={bulletPosition(maxPerc)}
            onMouseDown={() => onMouseDownHandler(MAX)}
            onMouseUp={onMouseUpHandler}
          ></div>
        </div>
      </div>
      <div className="fixed-range__input">
        <input
          id={MAX}
          type="number"
          value={maxInputValue}
          readOnly/>
        <Currency type="euro" />
      </div>
    </div>
  )
}

FixedRange.propTypes = {
  values: arrayOf(number).isRequired,
};

FixedRange.defaultProps = {
  values:  [0],
};

export default FixedRange;
