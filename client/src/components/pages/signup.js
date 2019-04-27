import React from "react";

function SignUp () {
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
                <button type = "submit">SignUp</button>
                <a href = "/">Login</a>
            </form>
        </div>
    )
}

export default SignUp;