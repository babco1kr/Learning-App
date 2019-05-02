import React, { Component } from "react";
// import SchoolSelect from "../components/schoolSelect/schoolSelect";
// import { FormBtn } from "../components/Form";
// import API from "../utils/API";
// import { Link } from "react-router-dom";
import Nav from "../components/Nav/nav";

class StudentHome extends Component {

    state = {
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
          <Nav />
          <div className = "container">
                hey
            </div>
        </div>
    )
}
}

export default StudentHome;