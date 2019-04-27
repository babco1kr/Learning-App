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
                <button type = "submit">Login</button>
                <a href = "/teacherLogin">Admin</a>
            </form>
        </div>
    )
}

export default TeacherLogin;