import React from 'react';
import {Route, Switch} from 'react-router-dom';
import auth from './auth';
// pages for this product
import LandingPage from './components/LandingPage.js';
import MovieDetail from './components/MovieDetail.js';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Forum from './components/Forum';

function App() {
  return (
    <div className="grid-container">
      <Navbar />
      <div className="app">
        <Switch>
          <Route exact path="/" component={auth(LandingPage, null)} />
          <Route exact path="/movie/:id" component={auth(MovieDetail, null)} />
          <Route exact path="/login" component={auth(LoginPage, null)} />
          <Route exact path="/register" component={auth(RegisterPage, null)} />
          <Route exact path="/forum" component={auth(Forum, null)} />
        </Switch>
      </div>
      <div className="footer">
        <h4>
          Made with{' '}
          <span role="img" aria-label="love">
            &#128151;
          </span>{' '}
          and{' '}
          <span role="img" aria-label="coffe">
            &#9749;
          </span>{' '}
          by Nabil
        </h4>
      </div>
    </div>
  );
}

export default App;
