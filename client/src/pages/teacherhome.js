// import React from "react";

// function TeacherHome() {
//     return (
//         <div>
//             Welcome!
//         </div>
//     )
// }

// export default TeacherHome;

import React, { Component } from 'react';

class TeacherHome extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.props.auth);
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in!
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}>
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default TeacherHome;
