import React from 'react'

import './styles.scss';

import RangeSlider from '../RangeSlider/range-slider.component';
import FixedRangeSlider from '../FixedRangeSlider/fixed-range-slider.component';

const App = () => {
  return (
    <div className="app__container">
      <h1>
        ⭐ Create React App Without CRA ⭐
      </h1>
      <RangeSlider min={0} max={100} />
      <FixedRangeSlider values={[]} />
    </div>
  )
}

export default App
