import React from "react";
import "./style.css";

function StudentList(props) {
    return (
        <tr>
            <td>{props.studentNumber}</td>
            <td>{props.name}</td>
            <td><button className = "btn red" onClick={() => props.removeStudent(props.id)}>X</button></td>
        </tr>
    )
}

export default StudentList;