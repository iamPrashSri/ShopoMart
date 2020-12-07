import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './Checkout/Checkout';
import Login from './Login/Login';
import { useEffect } from 'react';
import { auth } from './Hosting/Firebase';
import { useStateValue } from './DataLayerConfig/StateProvider';
import Payment from './Payment/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders/Orders';

const promise = loadStripe(
  'pk_test_51Hv5opKowoFdwyoNtA5RcJyhbr8deSqKzaQIDOIBp81UmTMtueml1SSMVxUyKECf0tMFTdffaLh6UFctfddcFxaO00zGvkRqk1'
);

function App() {
  // npm install -g firebase-tools
  // Understand React Router (TO ADD MORE WEB PAGES TO THE APPLICATION)
  
  const [{}, dispatch] = useStateValue();

  // Create a Listener - To keep a track of who is signed in
  useEffect(() => {
    // This will only run when the App component loads/reloads
    auth.onAuthStateChanged((authUser) => {

      if(authUser){
        // The user just logged in / already logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        // The user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">        
        <Switch>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>   {/* Higher Order function */}
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
