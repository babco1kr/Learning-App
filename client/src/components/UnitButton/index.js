import React from "react";
import "./style.css";

function UnitButton(props) {
    if (!props.active) {
    return (
        <div className = "row">
            <div className = "col s7">
            <button className = "waves-effect waves-light btn-large">{props.name}</button>
            </div>
            <div className = "col s3">
            <button className = "waves-effect waves-light btn-large">SetActive</button>
            </div>
            <div className = "col s2">
            <button className = "waves-effect waves-light btn-large">X</button>
            </div>
        </div>
    )
    } else {
        return (
        <div className = "row">
            <div className = "col s7">
            <button className = "waves-effect waves-light btn-large">{props.name}</button>
            </div>
            <div className = "col s3">
            <button className = "waves-effect waves-light btn-large">SetInactive</button>
            </div>
            <div className = "col s2">
            <button className = "waves-effect waves-light btn-large">X</button>
            </div>
        </div>
        )
    }
}

export default UnitButton;