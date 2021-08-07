/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './styles.scss';

import RangeSlider from '../RangeSlider/range-slider.component';
import FixedRangeSlider from '../FixedRangeSlider/fixed-range-slider.component';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [values, setValues] = useState({ max: 1, min: 0 });
  const [redirectError, setRedirectError] = useState(false);

  const API_URL = 'https://app.fakejson.com/q';
  const token = 'jH3uRHo3RB_Y543bo6WJvA';
  const LOADING_MESSAGE = 'Loading...';
  const ERROR_MESSAGE = 'Error getting data from server, please try again later...';

  const fetchData = async (data) => {
    try {
      const response = await axios.post(API_URL, {
        token,
        data,
      });
      setValues(response.data);
      setLoaded(true);
    } catch (error) {
      /* Allowed request amount exceeded */
      setRedirectError(true);
      setLoaded(true);
    }
  };

  const RangeSliderPage = () => {
    if (!loaded) {
      fetchData({ min: 1, max: 100 });
    }

    return loaded
      ? (redirectError ? ERROR_MESSAGE : <RangeSlider {...values} />)
      : LOADING_MESSAGE;
  };

  const FixedRangeSliderPage = () => {
    if (!loaded) {
      fetchData({
        values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
      });
    }

    return loaded
      ? (redirectError ? ERROR_MESSAGE : <FixedRangeSlider {...values} />)
      : LOADING_MESSAGE;
  };

  const HomePage = () => (
    <h3>
      Mango - Capitole Challenge ☘️
    </h3>
  );

  const onLickClickHandler = () => {
    setLoaded(false);
    setRedirectError(false);
  };

  return (
    <Router>
      <div className="app__container" data-testid="app">
        <h1>
          ⭐ Create React App Without CRA ⭐
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/" data-testid="link-home" onClick={onLickClickHandler}>Home</Link>
            </li>
            <li>
              <Link to="/exercise1" data-testid="link-exercise1" onClick={onLickClickHandler}>RangeSlider</Link>
            </li>
            <li>
              <Link to="/exercise2" data-testid="link-exercise2" onClick={onLickClickHandler}>FixedRangeSlider</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/exercise1" render={RangeSliderPage} />
          <Route path="/exercise2" render={FixedRangeSliderPage} />
          <Route path="/" render={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
