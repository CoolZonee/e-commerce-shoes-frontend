import { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import GenericNotFound from './components/GenericNotFound';
import ProductPage from './components/Product/ProductPage';
import Login from './components/Login/Login';
import useToken from './components/Global/useToken';
import NavigationBar from './components/NavigationBar/NavigationBar';


function App() {
  // check if token is valid
  const { token, setToken } = useToken();
  let history = useHistory();
  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token, history]);

  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:upc" component={ProductPage} />
        <Route exact path="/login" component={() => (<Login setToken={setToken} />)} />
        <Route exact path="/404" component={GenericNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
}

export default App;
