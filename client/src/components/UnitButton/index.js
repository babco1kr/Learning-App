import React from "react";
import "./style.css";

function UnitButton(props) {
    if (!props.active) {
    return (
        <tr>
            <td>
            <button className = "btn" onClick={() => props.selectUnit(props.id)}>{props.name}</button>
           </td>
           <td>
            <button className = "waves-effect waves-light btn grey darken-4" onClick={() => props.changeActive(props.id)}>InActive</button>
            </td>
            <td>
            <button className = "btn red" onClick={() => props.removeUnit(props.id)}>X</button>
            </td>
        </tr>
    )
    } else {
        return (
            <tr>
            <td>
            <button className = "btn" onClick={() => props.selectUnit(props.id)}>{props.name}</button>
            </td>
            <td>
            <button className = "waves-effect waves-light btn blue" onClick={() => props.changeActive(props.id)}>Active</button>
            </td>
            <td>
            <button className = "btn red"onClick={() => props.removeUnit(props.id)}>X</button>
            </td>
        </tr>
        )
    }
}

export default UnitButton;