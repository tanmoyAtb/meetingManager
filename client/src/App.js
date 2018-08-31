import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import NotFound from './Components/NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Layout}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
)

export default Main