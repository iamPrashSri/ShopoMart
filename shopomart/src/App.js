import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './Checkout/Checkout';

function App() {
  // npm install -g firebase-tools
  // Understand React Router (TO ADD MORE WEB PAGES TO THE APPLICATION)
  return (
    <Router>
      <div className="app">
        <Header />
        
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
