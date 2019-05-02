import React, { Component } from "react";
import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { FormBtn } from "../components/Form";
import API from "../utils/API";
import { Link } from "react-router-dom";
import Nav from "../components/Nav/nav";

import M from "materialize-css";

import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'



class SignUp extends Component {

  state = {
    name: "",
    password: "",
    schoolNumber: "",
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSchoolChange = event => {
    this.setState({
      schoolNumber: event,

    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.schoolNumber.value);
    if (this.state.name && this.state.password && this.state.schoolNumber) {
      // Go to utils/API.js and run saveUser. 
      API.saveUser({
        name: this.state.name,
        password: this.state.password,
        school: this.state.schoolNumber.value
      })
        .then(res => {
          console.log("user created")
          this.props.history.push("/teacherlogin");
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          <form>
          <SchoolSelect 
                value={this.state.schoolNumber}
                name="schoolNumber"
                handleInputChange={this.handleSchoolChange.bind(this)}
                />
            <label>
              Username:
                    <input value={this.state.name} onChange={this.handleInputChange} type="text" name="name" id="userName"></input>
            </label>
            <label>
              Password:
                    <input value={this.state.password} onChange={this.handleInputChange} type="password" name="password" id="password"></input>
            </label>
            {/* Submit button w/ props passed through */}
            <div className="center-align">
              <FormBtn
                disabled={!(this.state.name && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Sign Up
              </FormBtn>
              <Link to={"/teacherlogin"}>
                <button className="waves-effect waves-light btn-large" type="submit">Admin</button>
              </Link>
              <Link to={"/"}>
                <button className="waves-effect waves-light btn-large">Student</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;