import React, { Component } from "react";
import ls from 'local-storage'

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
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .then(data => { console.log(data) })
            .catch(err => { console.log(err) })
    };

    render() {
        const { loading } = this.state;
        if (loading) {
            return (
                <div>
                    nope
                </div>
            )
        }
        return (
            <div>
                <Nav />
                Welcome!
            </div>
        )
    }

}

export default TeacherHome;