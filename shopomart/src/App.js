import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './Checkout/Checkout';
import Login from './Login/Login';

function App() {
  // npm install -g firebase-tools
  // Understand React Router (TO ADD MORE WEB PAGES TO THE APPLICATION)
  return (
    <Router>
      <div className="app">        
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
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
