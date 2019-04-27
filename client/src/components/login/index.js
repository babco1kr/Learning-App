import React from "react";
import "./style.css";

function Login() {
    return (
        <div>
            <form>
                <label>
                    Username:
                    <input type = "text" name = "username" id = "userName"></input>
                </label>
                <label>
                    Password:
                    <input type = "password" name = "password" id = "password"></input>
                </label>
                <button type = "submit">Login</button>
            </form>
        </div>
    )
}

export default Login;