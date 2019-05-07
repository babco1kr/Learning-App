import React, { Component } from "react";
import ls from 'local-storage';
import Nav from "../components/Nav/nav";
import API from "../utils/API";
import StudentResults from "../components/StudentResults";

class Results extends Component {
    state = {
        students: [],
        results: [],
        activeUnit: [],
        studentsAndResults: []
    }

    componentDidMount() {
        this.findStudents();
        this.getActiveResults();
    }

    findStudents() {
        API.findStudents({
            UserId: ls.get("teacherID"),
            school: ls.get("school")
        }).then(res => {
            this.setState({ students: res.data });
        })
    }

    getActiveResults() {
        API.getActiveUnit({
            UserId: ls.get("teacherID"),
            school: ls.get("school")
        }).then(res => {
            // console.log("Working");
            // console.log(res.data.length);
            let units = [];
            let numberofunits = res.data.length;
            for (let i = 0; i < numberofunits; i++) {
                units.push(res.data[i].id);
            }
            this.setState({ activeUnit: units });
            // console.log(this.state.activeUnit);
            this.getResults();
        })
    }

    getResults() {
        API.getResults({
            UserId: ls.get("teacherID"),
            unitId: this.state.activeUnit
        }).then(res => {
            this.setState({ results: res.data });
            // console.log(this.state.results);
            this.makeResultsList();
        })
    }

    makeResultsList() {
        let length = this.state.students.length;
        // console.log("Students: " + length);
        // console.log(this.state.students);
        let student = this.state.students;
        let studentScores = [];
        for (let i = 0; i < length; i++) {
            let questions = "";
            let results = this.state.results;
            let questionsLength = this.state.results.length;
            for (let j = 0; j < questionsLength; j++) {
                // console.log(student.id[i]);
                if (student[i].id === results[j].StudentId) {
                    let answer;
                    if (results[j].correct === false) {
                        answer = results[j].answer;
                    } else {
                        answer = "Correct";
                    }
                    let currentQuestion = results[j].id + " " + answer;
                    questions+= currentQuestion + " ";
                }
            }
            // console.log(student[i].name);
            let object = {
                id: student[i].id,
                name: student[i].name,
                // timeOnline: student.timeOnline[i],
                timeOnline: 0,
                questions: questions
            }
            studentScores.push(object);
        }
        this.setState({ studentsAndResults: studentScores });
        console.log(this.state.studentsAndResults);
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="row">
                    <h3 className = "center-align">Students</h3>
                    <hr></hr>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Time Online</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.studentsAndResults.map(student => (
                               <StudentResults
                                key={student.id}
                                name={student.name}
                                timeOnline={student.timeOnline}
                                questions={student.questions}
                               />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Results;