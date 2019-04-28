import React from "react";
import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { Link } from "react-router-dom";

function TeacherLogin() {
    return (
        <div>
            <form>
                <SchoolSelect />
                <label>
                    Username:
                    <input type = "text" name = "username" id = "userName"></input>
                </label>
                <button type = "submit">Login</button>
                <Link to={"/teacherlogin"}>
                <button>Admin</button>
                </Link>
            </form>
        </div>
    )
}

export default TeacherLogin;