import React from "react";
import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { Link } from "react-router-dom";
import Nav from "../components/Nav/nav";

function TeacherLogin() {
    return (
        <div>
            <Nav />
            <div className = "container">
            <form>
                <SchoolSelect />
                <label>
                    Username:
                    <input type = "text" name = "username" id = "userName"></input>
                </label>
                <div className = "center-align">
                <button className = "waves-effect waves-light btn-large" type = "submit">Login</button>
                <Link to={"/teacherlogin"}>
                <button className = "waves-effect waves-light btn-large">Admin</button>
                </Link>
                </div>
            </form>
            </div>
        </div>
    )
}

export default TeacherLogin;