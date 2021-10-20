import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import GenericNotFound from './components/GenericNotFound';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/404" component={ GenericNotFound } />
        <Redirect from="*" to="/404" />
      </Switch>
    </div>  
  );
}

export default App;
