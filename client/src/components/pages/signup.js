import React, { Component } from "react";
import SchoolSelect from "../schoolSelect/schoolSelect";
import { Link } from "react-router-dom";

class SignUp extends Component {

    state = {
        name: "",
        password: ""
    }

    login = () => {
        let object = {
            name: this.state.name,
            password: this.state.password
        };

        // post("/register", object).then(
        //     console.log("Ok")
        // )
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
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
                <button type = "submit">SignUp</button>
                <Link to={"/"}>
                <button>Student</button>
                </Link>
            </form>
        </div>
    )
}
}

export default SignUp;