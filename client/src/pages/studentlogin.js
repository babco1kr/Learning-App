import React, { Component } from "react";
import { FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import SchoolSelect from "../components/schoolSelect/schoolSelect";
import Nav from "../components/Nav/nav";
import API from "../utils/API";
import ls from 'local-storage'

class StudentLogin extends Component {

    state = {
        studentNumber: "",
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
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
            .then(res => res.json())
            .then(data => { console.log(data) })
            .catch(err => { console.log(err) })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.studentNumber) {
            // Go to utils/API.js and run 
            API.checkStudent(this.state.studentNumber)
                // .then(res => console.log("user confirmed"))
                .then(res => {
                    if (res.data.length === 0) {
                        console.log("login failed")
                    }
                    else {
                        // ls.set("stuNum", res.data);
                        // this.props.history.push("/studenthome");
                    }
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
                        <SchoolSelect />
                        <label>
                            Student ID:
                    <input value={this.state.name} onChange={this.handleInputChange} type="text" name="studentNumber" id="studentNumber"></input>
                        </label>
                        <div className="center-align">

                            <FormBtn
                                disabled={!(this.state.studentNumber)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit
              </FormBtn>

                            <Link to={"/signup"}>
                                <button className="waves-effect waves-light btn-large" >Sign Up</button>
                            </Link>
                            <Link to={"/teacherLogin"}>
                                <button className="waves-effect waves-light btn-large" >Teacher Login</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default StudentLogin;