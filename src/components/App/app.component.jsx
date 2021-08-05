import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './styles.scss';

import RangeSlider from '../RangeSlider/range-slider.component';
import FixedRangeSlider from '../FixedRangeSlider/fixed-range-slider.component';

  // onSearchSubmit = async (term) => {
  //   const response = await unsplash.get('/search/photos', {
  //     params: { query: term },
  //   });

  //   this.setState({images: response.data.results});
  // }

const App = () => {
  axios({
    method: "post",
    url: "https://app.fakejson.com/q",
    data: {
      "token": "jH3uRHo3RB_Y543bo6WJvA",
      "data":  {"min": 1, "max": 100}
    }
  }).then((response) => {
    // Do something with fake data
    console.log('response.data', response.data);
  });

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
          <Route path="/exercise1">
            <RangeSlider min={0} max={100} />
          </Route>
          <Route path="/exercise2">
             <FixedRangeSlider values={ [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]} />
          </Route>
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
