import React from "react";
import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { Link } from "react-router-dom";

import Auth from '../Auth/Auth';

const auth = new Auth();


function TeacherLogin() {
    auth.login();
    return (
        <div>
            <form>
                <SchoolSelect />
                <label>
                    Username:
                    <input type = "text" name = "username" id = "userName"></input>
                </label>
                <label>
                    Password:
                    <input type = "password" name = "password" id = "password"></input>
                </label>
                <button type = "submit">Login</button>
                <Link to={"/"}>
                <button>Student</button>
                </Link>
                <Link to={"/signup"}>
                <button>Sign Up</button>
                </Link>
            </form>
        </div>
    )
}

export default TeacherLogin;