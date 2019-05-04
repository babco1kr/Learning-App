import React from "react";
import "./style.css";

function UnitButton(props) {
    if (!props.active) {
    return (
        <div className = "row">
            <div className = "col s7">
            <button className = "waves-effect waves-light btn-large" onClick={() => props.selectUnit(props.id)}>{props.name}</button>
            </div>
            <div className = "col s3">
            <button className = "waves-effect waves-light btn-large" onClick={() => props.changeActive(props.id)}>SetActive</button>
            </div>
            <div className = "col s2">
            <button className = "waves-effect waves-light btn-large" onClick={() => props.removeUnit(props.id)}>X</button>
            </div>
        </div>
    )
    } else {
        return (
        <div className = "row">
            <div className = "col s7">
            <button className = "waves-effect waves-light btn-large" onClick={() => props.selectUnit(props.id)}>{props.name}</button>
            </div>
            <div className = "col s3">
            <button className = "waves-effect waves-light btn-large" onClick={() => props.changeActive(props.id)}>SetInactive</button>
            </div>
            <div className = "col s2">
            <button className = "waves-effect waves-light btn-large"onClick={() => props.removeUnit(props.id)}>X</button>
            </div>
        </div>
        )
    }
}

export default UnitButton;