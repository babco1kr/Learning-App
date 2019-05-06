import React from "react";

export function FormBtn(props) {
    return (
      <button className = "waves-effect waves-light btn-large" {...props}>
        {props.children}
      </button>
    );
  }

  export function FloatBtn(props) {
    return (
      <span onClick={() => props.handleLetterSubmit(props.letter)}>
      <button className = "btn-floating btn-large waves-effect waves-light red">
                  
        {props.children}

      </button>
      </span>
    );
  }