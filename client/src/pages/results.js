import React, { Component } from "react";
import ls from 'local-storage';
import moment from 'moment';
import Nav from "../components/TeacherNav";
import API from "../utils/API";
import Footer from "../components/Footer";
import StudentResults from "../components/StudentResults";

class Results extends Component {
    state = {
        students: [],
        results: [],
        activeUnit: [],
        studentsAndResults: [],
        count: 1
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
            let units = [];
            let numberofunits = res.data.length;
            for (let i = 0; i < numberofunits; i++) {
                units.push(res.data[i].id);
            }
            this.setState({ activeUnit: units });
            this.getResults();
        })
    }

    getResults() {
        API.getResults({
            UserId: ls.get("teacherID"),
            unitId: this.state.activeUnit
        }).then(res => {
            this.setState({ results: res.data });
            this.makeResultsList();
        })
    }

    makeResultsList() {
        let length = this.state.students.length;
        let student = this.state.students;
        let studentScores = [];
        for (let i = 0; i < length; i++) {
            let questions = "";
            let results = this.state.results;
            let questionsLength = this.state.results.length;
            for (let j = 0; j < questionsLength; j++) {
                if (student[i].id === results[j].StudentId) {
                    let answer;
                    if (results[j].correct === false) {
                        answer = "❌" + results[j].answer;
                    } else {
                        answer = "✔️";
                    }
                    let count = this.state.count;
                    let currentQuestion = count + " " + answer;
                    questions += currentQuestion + " ";
                    count++;
                    this.setState({ count: count });
                }
            }
            this.setState({ count: 1 });
            let start = moment(student[i].startTime);
            let end = moment(student[i].endTime);
            
            let duration = moment.duration(end.diff(start));
            let minutes = duration.asHours();
            let timeOnline = moment(minutes).format('m hh');
            console.log(timeOnline);
            if (timeOnline === "Invalid date") {
                timeOnline = 0;
            }
            // console.log(moment(minutes).format('hh'));
            let object = {
                id: student[i].id,
                name: student[i].name,
                timeOnline: timeOnline,
                questions: questions
            }
            studentScores.push(object);
        }
        this.setState({ studentsAndResults: studentScores });
    }

    render() {
        return (
            <div>
                <div className="page">
                <Nav />
                <main>
                <div className="container">
                    <div className="content-area">
                        <div className="row">
                            <h3 className="center-align">Students</h3>
                            <hr></hr>
                            <table className="striped">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Time Online (HH: MM)</th>
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
                </div>
                </main>
                <Footer />
            </div>
            </div>
        )
    }
}

export default Results;