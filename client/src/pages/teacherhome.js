import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from 'local-storage';

import Nav from "../components/Nav/nav";

class TeacherHome extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        this.setToken()
    }


    setToken() {
        // Saves user token to localStorage
        fetch("/user/data", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + ls.get("token")
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ loading: false })
                } else {
                    this.props.history.push("/teacherlogin");
                    // const error = new Error(res.error);
                    // throw error;
                }
            }).then(res => res.json())
            .catch(err => { console.log(err) })
    };

    render() {
        return (
            <div>
                <Nav />
                <div className = "container">
                <Link to={"/addstudent"}>
                <button className = "waves-effect waves-light btn-large">Add Student</button>
                </Link>
                </div>
            </div>
        )
    }

}

export default TeacherHome;