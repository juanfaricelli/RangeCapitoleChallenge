import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

import './styles.scss';

import RangeSlider from '../RangeSlider/range-slider.component';
import FixedRangeSlider from '../FixedRangeSlider/fixed-range-slider.component';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [values, setValues] = useState({max: 1, min: 0});
  const [location, setLocation] = useState('');
  const [redirectError, setRedirectError] = useState(false);

  const loadingMessage = 'Loading...';
  const errorMessage = 'Error getting data from server, please try again later...';

  useEffect(() => {
    setLoaded(false);
    setRedirectError(false);
  }, [location]);

  const fetchRangeData = async () => {
    try {
      const response = await axios.post('https://app.fakejson.com/q', {
        "token": "jH3uRHo3RB_Y543bo6WJvA",
        "data": { "min": 1, "max": 100 }
      });
  
      setValues(response.data);
      setLoaded(true);
    } catch (error) {
      console.log('ERROR: ', error);
      setRedirectError(true);
      setLoaded(true);
    }
  };
  const RangeSliderPage = (props) => {
    if (!loaded) {
      fetchRangeData();
    }
    setLocation(props.location);

    return loaded ?
      (redirectError ? errorMessage : <RangeSlider {...values} />)
      : loadingMessage;
  }

  const fetchFixedRangeData = async () => {
    try {
      const response = await axios.post('https://app.fakejson.com/q', {
        "token": "jH3uRHo3RB_Y543bo6WJvA",
        "data": { values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] }
      });

      setValues(response.data.values);
      setLoaded(true);
    } catch (error) {
      console.log('ERROR: ', error);
      setRedirectError(true);
      setLoaded(true);
    }
  };
  const FixedRangeSliderPage = (props) => {
    if (!loaded) {
      fetchFixedRangeData();
    }
    setLocation(props.location);

    return loaded ?
      (redirectError ? errorMessage : <FixedRangeSlider values={values} />)
      : loadingMessage;
  }

  return (
    <Router>
      <div className="app__container">
        <h1>
          ⭐ Create React App Without CRA ⭐
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/exercise1">RangeSlider</Link>
            </li>
            <li>
              <Link to="/exercise2">FixedRangeSlider</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/exercise1" render={RangeSliderPage} />
          <Route path="/exercise2" render={FixedRangeSliderPage} />
          <Route path="/">
            <h3>
              Mango - Capitole Challenge ☘️
            </h3>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
