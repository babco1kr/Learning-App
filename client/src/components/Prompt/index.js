import React from "react";


function Prompt(props) {

  const imgStyle = {
    margin: '0 auto',
    maxWidth: "300px",
    height: "auto", 
  };

  return (
    <div className="center-align">
      <img alt={props.question} className="img-fluid" src={props.image} style={imgStyle} />
    </div>
  );
}

export default Prompt;