import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Meeting from './Components/Meeting/Meeting';
import Add from './Components/AddMeeting/AddLayout';
import NotFound from './Components/NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Layout}/>
      <Route path='/add' component={Add}/>
      <Route path='/meeting/:id' component={Meeting}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
)

export default Main