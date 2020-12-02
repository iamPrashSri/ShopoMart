import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://lh3.googleusercontent.com/proxy/88Pb_Hj_CjbBbGW0jO1WPLu554hb
                    6fxefEOkPDqj2WaXlv3TrmcYJs42-rW5dlBQkSDdevilmVAwoxtBFTsK6Zs0j8JFNN-Zfrc3A
                    fVzdY3c8ZPgSMFUyUuvKirlXzrzOZ1c7gIJuVqtsfMysUif7tKIaRwOBnQ"
        alt=""
      />

      <div className="header__search">
          <input type="text" className="header__searchIn"/>
          {/* Logo */}
      </div>
      <div className="header__nav">
          <div className="header__option">
              Hello, Sign In
          </div>

          <div className="header__option">
              Hello, Sign In
          </div>

          <div className="header__option">
              Hello, Sign In
          </div>
      </div>
    </div>
  );
}

export default Header;
