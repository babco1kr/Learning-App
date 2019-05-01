import React from "react";

export function FormBtn(props) {
    return (
      <button className = "waves-effect waves-light btn-large" {...props}>
        {props.children}
      </button>
    );
  }