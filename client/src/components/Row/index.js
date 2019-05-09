import React, { Component } from "react";
import styled from "styled-components";
import LetterChoice from "../LetterChoice";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
text-align: center;
min-height: 10px;
`;
const Title = styled.h5`
padding: 8px;
`;
const LetterList = styled.div`
padding 8px;
transition: background-color 0.2s ease;
min-height: 75px;
background-color: ${props => (props.isDraggingOver ? "#f6f9a6" : "#fafcd2")}
`


export default class Row extends Component {
    render() {
        return (
            <Container>
                <Title>{this.props.row.title}</Title>
                <Droppable droppableId={this.props.row.id} direction="horizontal">
                    {(provided, snapshot) => (
                    <LetterList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        innerRef={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {this.props.letterBank.map((letterChoice, index) => <LetterChoice key={letterChoice.id} letterChoice={letterChoice} index={index} />)}
                        {provided.placeholder}
                    </LetterList>
                        
                    )}
                </Droppable>
            </Container>
        );
    }
}