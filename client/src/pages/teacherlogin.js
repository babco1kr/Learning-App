import React, { Component } from "react";
import Footer from "../components/Footer";
import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { Link } from "react-router-dom";
import { FormBtn } from "../components/Form";
import API from "../utils/API";
import Nav from "../components/StudentNav";
import ls from 'local-storage'



class TeacherLogin extends Component {

  state = {
    name: "",
    password: "",
    schoolNumber: ""
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

  setToken() {
    // Saves user token to localStorage
    fetch("/user/data", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + ls.get("token")
      }
    })
      .catch(err => { console.log(err) })
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.password) {
      // Go to utils/API.js and run 
      API.checkUser({
        name: this.state.name,
        password: this.state.password,
        school: this.state.schoolNumber.value
      })
        .then(res => {
          ls.set("token", res.data.token);
          ls.set("teacherID", res.data.teacherId);
          ls.set("school", res.data.schoolId);
          this.props.history.push("/teacherhome");
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <div className="page">
        <Nav />
        <main>
        <div className="login container">
          <div className="content-area">
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
              <div className="center-align">
                <FormBtn
                  disabled={!(this.state.name && this.state.password)}
                  onClick={this.handleFormSubmit}
                >
                  Submit
                </FormBtn>
                <Link to={"/"}>
                  <button className="waves-effect waves-light btn-large" >Student</button>
                </Link>
                <Link to={"/signup"}>
                  <button className="waves-effect waves-light btn-large" >Sign Up</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
        </main>
        <Footer />
      </div>
      </div>
    );
  }
}

export default TeacherLogin;