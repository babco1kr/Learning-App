import React from "react";

export function FormBtn(props) {
    return (
      <button className = "btn-large" {...props}>
        {props.children}
      </button>
    );
  }

  export function FloatBtn(props) {
    return (
      <span onClick={() => props.handleLetterSubmit(props.letter, props.id)}>
      <button className = "btn-floating btn-large red">
                  
        {props.children}

      </button>
      </span>
    );
  }