import React from "react";

function Nav() {
    return (
        <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Logout</a></li>
          </ul>
        </div>
      </nav>
    )
}

export default Nav;