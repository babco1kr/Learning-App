import React from "react";

function SpellingList(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.question}</td>
            <td>{props.pictureLink}</td>
            <td><button className = "btn-small red" onClick={() => props.removeQuestion(props.id)}>X</button></td>
        </tr>
    )
}

export default SpellingList;