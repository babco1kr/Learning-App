import React from "react";
import "./style.css";

function SpellingList(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.question}</td>
            <td>{props.pictureLink}</td>
            <td><button onClick={() => props.removeQuestion(props.id)}>X</button></td>
        </tr>
    )
}

export default SpellingList;