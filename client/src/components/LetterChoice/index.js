import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.span`
border: 2px solid black;
font-size: 50px;
width: 80px;
height: 80px
padding: 0px 8px;
border-radius: 2px;
margin: 0px 4px 0 4px;
text-align: center;
background: ${props => (props.isDragging ? "#23b9b9" : "#9ebafc")};
`

export default class LetterChoice extends Component {
    render() {
        return (
        <Draggable draggableId={this.props.letterChoice.id} index={this.props.index}>
        {(provided, snapshot) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                innerRef={provided.innerRef}
                isDragging={snapshot.isDragging}
            >
            {this.props.letterChoice.character}
            </Container> 
        )}
        </Draggable>
        );
    }
}