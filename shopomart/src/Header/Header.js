import React from "react";
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "../DataLayerConfig/StateProvider";
import { auth } from "../Hosting/Firebase";

function Header() {

  // Again Pull state
  let [ {basket, user}, dispatch ] = useStateValue();

  const handleAuthentication = () => {
    // Once clicked, send back to login page
    auth.signOut();
  };

  return (
    <div className="header">
      <Link to="/"> {/* TO create the image redirect to homepage */}
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchIn" />
        <SearchIcon  className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={ !user && "/login" }>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              {user ? user.email : 'Hello Guest'}
            </span>

            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>

            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
            <span className="header__optionLineOne">Your</span>

            <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}  {/* Optional Chaining in operators */}
              </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
