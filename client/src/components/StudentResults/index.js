import React from "react";
import "./style.css";

function StudentResults(props) {
    return (
        <tr>
            <td>{props.studentNumber}</td>
            <td>{props.name}</td>
            <td><button className = "btn red">X</button></td>
        </tr>
    )
}

export default StudentResults;