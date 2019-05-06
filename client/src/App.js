import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TeacherLogin from "./pages/teacherlogin";
import StudentLogin from "./pages/studentlogin";
import TeacherHome from "./pages/teacherhome";
import Addstudent from "./pages/addstudent";
import StudentHome from "./pages/studenthome";
import SignUp from "./pages/signup";
import Units from "./pages/units";
import QuestionPrompt from "./pages/questionprompt";
import Results from "./pages/results";
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
          <Route exact path ="/studenthome" component = {StudentHome} />
          <Route exact path ="/units" component = {Units} />
          <Route exact path ="/question" component = {QuestionPrompt} />
          <Route exact path ="/results" component = {Results} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
