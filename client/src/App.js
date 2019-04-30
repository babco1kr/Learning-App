import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TeacherLogin from "./pages/teacherlogin";
import StudentLogin from "./pages/studentlogin";
import TeacherHome from "./pages/teacherhome";
import SignUp from "./pages/signup";
import "./App.css";


class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    
    return (
      <Router>
      <div>
        <Route exact path ="/" component = {StudentLogin} />
        <Route exact path ="/teacherhome" component = {TeacherHome} />
        <Route exact path ="/signup" component = {SignUp} />
      </div>
      </Router>
    )
  }
}

export default App;
