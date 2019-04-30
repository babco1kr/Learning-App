import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
// import Home from './Home/Home';
import TeacherHome from "./pages/teacherhome";
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import StudentLogin from "./pages/studentlogin";
import SignUp from "./pages/signup";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route exact path="/" render={(props) => <SignUp auth={auth} {...props} />} />
        <Route path="/teacherhome" render={(props) => <TeacherHome auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}