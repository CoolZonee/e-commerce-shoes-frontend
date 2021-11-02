import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import GenericNotFound from './components/GenericNotFound';
import ProductPage from './components/Product/ProductPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import './App.css'


function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:upc" component={ProductPage} />
        <Route exact path="/404" component={GenericNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
}

export default App;
