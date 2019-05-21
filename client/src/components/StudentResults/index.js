import React from "react";

function StudentResults(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.timeOnline}</td>
            <td>{props.questions}</td>
        </tr>
    )
}

export default StudentResults;