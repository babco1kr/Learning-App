import React from "react";

function TeacherLogin() {
    return (
        <div>
            <form>
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