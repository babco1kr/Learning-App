import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TeacherLogin from "./pages/teacherlogin";
import StudentLogin from "./pages/studentlogin";
import TeacherHome from "./pages/teacherhome";
import Addstudent from "./pages/addstudent";
import SignUp from "./pages/signup";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Switch>
          <Route exact path ="/" component = {StudentLogin} />
          <Route exact path ="/teacherLogin" component = {TeacherLogin} />
          <Route exact path ="/signup" component = {SignUp} />
          <Route exact path ="/teacherhome" component = {TeacherHome} />
          <Route exact path ="/addstudent" component = {Addstudent} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
