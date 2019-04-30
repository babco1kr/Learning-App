import React, { Component } from "react";
import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { Link } from "react-router-dom";
import { FormBtn } from "../components/Form";
import API from "../utils/API";



class TeacherLogin extends Component {

    state = {
        name: "",
        password: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.name && this.state.password) {
            // Go to utils/API.js and run 
          API.checkUser({
            name: this.state.name,
            password: this.state.password,
            school: 1
          })
            .then(res => console.log("user created"))
            .catch(err => console.log(err));
        }
      };

    render() {
    return (
        <div>
            <form>
                <SchoolSelect />
                <label>
                    Username:
                    <input value = {this.state.name} onChange = {this.handleInputChange} type = "text" name = "name" id = "userName"></input>
                </label>
                <label>
                    Password:
                    <input value = {this.state.password} onChange = {this.handleInputChange} type = "password" name = "password" id = "password"></input>
                </label>
                <FormBtn
                disabled={!(this.state.name && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
                <Link to={"/"}>
                <button>Student</button>
                </Link>
                <Link to={"/signup"}>
                <button>Sign Up</button>
                </Link>
            </form>
        </div>
    );
    }
}

export default TeacherLogin;