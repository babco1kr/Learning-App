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

    // Finds all the students for this teacher
    findStudents() {
        API.findStudents({
            UserId: ls.get("teacherID"),
            school: ls.get("school")
        }).then(res => {
            this.setState({ students: res.data });
        })
    }

    // Finds the current active unit to get the correct results
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

    // Finds all scores for questions that match this teacher
    getResults() {
        API.getResults({
            UserId: ls.get("teacherID"),
            unitId: this.state.activeUnit
        }).then(res => {
            this.setState({ results: res.data });
            this.makeResultsList();
        })
    }

    // Goes through all of the results and checks for matching student ID's, if they match they get pushed to an array and then later an object is made
    // containing the student ID, their time online, calculated below, and all of their results to be passed through a component
    makeResultsList() {
        let length = this.state.students.length;
        let student = this.state.students;
        let studentScores = [];
        // For loop for all of the students
        for (let i = 0; i < length; i++) {
            let questions = "";
            let results = this.state.results;
            let questionsLength = this.state.results.length;
            // For loop that checks all results against the student ID
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
            // Calculating their time online with some moment
            let start = moment(student[i].startTime);
            let end = moment(student[i].endTime);
            let duration = moment.duration(end.diff(start));
            let minutesOnline = duration.asMinutes();
            let hours;
            let minutes;
            let timeOnline;
            if (!student[i].endTime) {
                timeOnline = "0:00"
            } else if(minutesOnline > 60) {
                hours = Math.floor(minutesOnline/60);
                minutes = Math.floor(minutesOnline % 60);
                minutes = (minutes).toLocaleString(undefined, {minimumIntegerDigits: 2});
                timeOnline = hours + ":" + minutes;
            } else {
                hours = 0;
                minutes = Math.floor(minutesOnline % 60);
                minutes = (minutes).toLocaleString(undefined, {minimumIntegerDigits: 2});
                timeOnline = hours + ":" + minutes;
            }
            // Creating an object out of all the info we created and pushing it to an array
            let object = {
                id: student[i].id,
                name: student[i].name,
                timeOnline: timeOnline,
                questions: questions
            }
            studentScores.push(object);
        }
        // The array of student objects is set to be passed through a component
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