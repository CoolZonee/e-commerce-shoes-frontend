import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import GenericNotFound from './components/GenericNotFound';
import ProductPage from './components/Product/ProductPage';
import Login from './components/Login/Login';
import NavigationBar from './components/NavigationBar/NavigationBar';
import GenderProduct from './components/Gender/GenderProduct';
import Profile from './components/Profile/Profile';
import * as API from './services/api'
import Cart from './components/Cart/Cart';
// import history from './history'

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  let history = useHistory();

  useEffect(() => {
    API.getUserDetails().then((resp: any) => {
      console.log("user details")
      setAuthenticated(true)
    }).catch((error: any) => {
      console.log(error.response)
      if (error.response.data.code === "token_not_valid") {
        API.refreshToken().then((resp: any) => {
          console.log(resp)
          setAuthenticated(true)
        }).catch((error) => {
          history.push('/login')
          setAuthenticated(false);
        })
        setAuthenticated(false);
      }
      else {
        setAuthenticated(false);
      }
    })
  })

  return (
    <div className="App">
      <NavigationBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        <Route exact path="/"><Home authenticated={authenticated} /></Route>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/men" component={GenderProduct} />
        <Route exact path="/women" component={GenderProduct} />
        <Route exact path="/kid" component={GenderProduct} />
        <Route exact path="/product/:upc" component={ProductPage} />
        <Route exact path="/login"><Login setAuthenticated={setAuthenticated} authenticated={authenticated} /> </Route>
        <Route exact path="/404" component={GenericNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
}

export default App;
