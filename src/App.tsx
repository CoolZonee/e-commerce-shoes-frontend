import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import GenericNotFound from './components/GenericNotFound';
import Product from './components/Product/Product';
import NavigationBar from './components/NavigationBar/NavigationBar';


function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:upc" component={Product} />
        <Route exact path="/404" component={GenericNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
}

export default App;
