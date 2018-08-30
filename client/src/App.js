import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import NotFound from './Components/NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='*' component={NotFound}/>

    </Switch>
  </main>
)

export default Main