import React from "react";
import SchoolSelect from "../schoolSelect/schoolSelect";

function TeacherLogin() {
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
                <a href = "/">Student</a>
                <a href = "/signup">Sign Up</a>
            </form>
        </div>
    )
}

export default TeacherLogin;