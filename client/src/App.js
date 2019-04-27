import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TeacherLogin from "./components/pages/teacherlogin";
import StudentLogin from "./components/pages/studentlogin";
import SignUp from "./components/pages/signup";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path ="/" component = {StudentLogin} />
        <Route exact path ="/teacherLogin" component = {TeacherLogin} />
        <Route exact path ="/signup" component = {SignUp} />
      </div>
      </Router>
    )
  }
}

export default App;
