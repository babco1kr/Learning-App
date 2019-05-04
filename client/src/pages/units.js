import React, { Component } from "react";
// import { Link } from "react-router-dom";
import ls from 'local-storage';
import Nav from "../components/Nav/nav";
import API from "../utils/API";
import UnitButton from "../components/UnitButton";
import SpellingList from "../components/SpellingList";

class Units extends Component {
    state = {
        loading: true,
        name: "",
        subject: 1,
        units: [],
        question: "",
        unit: 0,
        imageLink: "",
        questions: []
    }

    componentDidMount() {
        this.setToken();
        this.getUnits();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getUnits() {
        API.findUnits({
            teacherID: ls.get("teacherID"),
            school: ls.get("school")
        }).then(res => {
            this.setState({ units: res.data });
        })
    }

    setToken() {
        // Saves user token to localStorage
        fetch("/user/data", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + ls.get("token")
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ loading: false })
                } else {
                    this.props.history.push("/teacherlogin");
                }
            })
            .catch(err => { console.log(err) })
    };

    handleUnitSubmit = event => {
        event.preventDefault();
        if (this.state.name && this.state.subject) {
            API.addUnit({
                name: this.state.name,
                subject: this.state.subject,
                teacherID: ls.get("teacherID"),
                school: ls.get("school")
            }).then(res => {
                console.log("Unit Added");
                this.setState({ unit: "" });
                this.setState({ subject: 1 });
                this.setState({ name: "" });
                this.getUnits();
            })
        }
    }

    handleQuestionSubmit = event => {
        event.preventDefault();
        if (this.state.question && this.state.unit) {
            API.addSpelling({
                question: this.state.question,
                pictureLink: this.state.imageLink,
                teacherID: ls.get("teacherID"),
                school: ls.get("school"),
                UnitId: this.state.unit
            }).then(res => {
                this.setState({ imageLink: "" });
                this.setState({ question: "" });
                this.getQuestions();
            })
        }
    }

    changeActive = id => {
        API.updateActive({
            unitId: id,
            teacherID: ls.get("teacherID"),
            school: ls.get("school")
        }).then(res => {
            this.getUnits();
        })
    }

    removeUnit = id => {
        API.deleteUnit({
            id: id
        }).then(res => {
            this.getUnits();
        })
    }

    selectUnit = id => {
        console.log("ID: " + id)

        API.findQuestions({
            UnitId: id
        }).then(res => {
            this.setState({ questions: res.data });
            this.setState({ unit: id })
        })
        this.setState({ unit: id })
    }

    getQuestions() {
        API.findQuestions({
            UnitId: this.state.unit
        }).then(res => {
            this.setState({ questions: res.data });
        })
    }

    removeQuestion = id => {
        API.deleteQuestion({
            id: id
        }).then(res => {
            this.getQuestions();
        })
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="row">
                        <div className="center-align col s6">
                            <h3>Units</h3>
                            <hr></hr>
                            <div className="row">
                                <div className="col s5">
                                    <label>
                                        Unit Name:
                                <input value={this.state.name} onChange={this.handleInputChange} type="text" name="name" id="unitName"></input>
                                    </label>
                                </div>
                                <div className="col s5">
                                    <label>
                                        Subject:
                                <input value={this.state.subject} onChange={this.handleInputChange} type="checkbox" className="filled-in" checked="checked" />
                                        <span>Spelling</span>
                                    </label>
                                </div>
                                <div className="col s2">
                                    <button className="waves-effect waves-light btn-large" type="submit" onClick={this.handleUnitSubmit}>Add</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    {this.state.units.map(unit => (
                                        <UnitButton
                                            key={unit.id}
                                            id={unit.id}
                                            name={unit.name}
                                            active={unit.active}
                                            changeActive={this.changeActive}
                                            removeUnit={this.removeUnit}
                                            selectUnit={this.selectUnit}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="center-align col s6">
                            <div className="row">
                                <h3>Questions</h3>
                                <hr></hr>
                                <div className="row">
                                    <div className="col s5">
                                        <label>
                                            Spelling Word:
                                        <input value={this.state.question} onChange={this.handleInputChange} type="text" name="question" id="question"></input>
                                        </label>
                                    </div>
                                    <div className="col s5">
                                        <label>
                                            Image Link:
                                        <input value={this.state.imageLink} onChange={this.handleInputChange} type="text" name="imageLink" id="imageLink"></input>
                                        </label>
                                    </div>
                                    <div className="col s2">
                                        <button className="waves-effect waves-light btn-large" type="submit" onClick={this.handleQuestionSubmit}>Add</button>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Number</th>
                                            <th>Word</th>
                                            <th>Picture</th>
                                            <th>Remove Question</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.questions.map(question => (
                                            <SpellingList
                                                key={question.id}
                                                id={question.id}
                                                question={question.question}
                                                pictureLink={question.pictureLink}
                                                removeQuestion={this.removeQuestion}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Units;