import React, { Component } from "react";
import ls from 'local-storage';
import { Link } from "react-router-dom";

class Nav extends Component {

  clear = () => {
    ls.set("intStuNum", "");
    ls.set("stuNum", "");
    ls.set("school", "");
    ls.set("token", "");
    ls.set("teacherID", "");
  }

  render() {
    return (
      <header>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to={"/addstudent"}>
                Students
              </Link>
            </li>
            <li>
              <Link to ={"/units"}>
                Units
              </Link>
            </li>
            <li>
              <Link to={"/results"}>
                Scores
              </Link>
            </li>
            <li>
                <Link to={"/"} onClick={this.clear}>
                  Logout
                </Link>
            </li>
          </ul>
        </div>
      </nav>
      </header>
    )
  }

}


export default Nav;