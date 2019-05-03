import React from "react";
import "./style.css";

function StudentList(props) {
    return (
        <tr>
            <td>{props.studentNumber}</td>
            <td>{props.name}</td>
            <td><button>X</button></td>
        </tr>
    )
}

export default StudentList;