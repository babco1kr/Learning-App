import React from "react";

function Prompt(props) {
  return (
    <div className="center-align">
      <img alt={props.question} className="img-fluid" src={props.image} style={{ margin: "0 auto" }} />
    </div>
  );
}

export default Prompt;