import React, { Component } from "react";
import ls from 'local-storage';
import Nav from "../components/TeacherNav";
import API from "../utils/API";
import Footer from "../components/Footer";
import StudentList from "../components/StudentList";

class Addstudent extends Component {
    state = {
        loading: true,
        studentID: "",
        studentName: "",
        students: []
    }

    componentDidMount() {
        this.setToken();
        this.findStudents();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

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

    // Finds students that belong to this teacher to display on the page
    findStudents() {
        API.findStudents({
            UserId: ls.get("teacherID"),
            school: ls.get("school")
        }).then(res => {
            this.setState({ students: res.data });
        })
    }

    // Adds Student to the database by attatching it to the teacher for reference later
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.studentID && this.state.studentName) {
            API.addStudent({
                studentNumber: this.state.studentID,
                name: this.state.studentName,
                UserId: ls.get("teacherID"),
                school: ls.get("school")
            }).then(res => {
                this.setState({ studentID: "" });
                this.setState({ studentName: "" });
                this.findStudents();
            })
        }
    }

    // Removes student from the database
    removeStudent = id => {
        API.deleteStudent({
            id: id
        }).then(res => {
            this.findStudents();
        })
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
                            <div className="center-align col s6">
                                <h3>Current Students</h3>
                                <hr></hr>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Student Number</th>
                                            <th>Student Name</th>
                                            <th>Remove Student</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.students.map(student => (
                                            <StudentList
                                                key={student.id}
                                                id={student.id}
                                                studentNumber={student.studentNumber}
                                                name={student.name}
                                                removeStudent={this.removeStudent}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="center-align col s6">
                                <h3>Add Student</h3>
                                <hr></hr>
                                <div className="row">
                                    <div className="col s5">
                                        <label>
                                            Student ID:
                                <input value={this.state.studentID} onChange={this.handleInputChange} type="text" name="studentID" id="studentID"></input>
                                        </label>
                                    </div>
                                    <div className="col s5">
                                        <label>
                                            Student Name:
                                <input value={this.state.studentName} onChange={this.handleInputChange} type="text" name="studentName" id="studentName"></input>
                                        </label>
                                    </div>
                                    <div className="col s2">
                                        <button className="waves-effect waves-light btn-large" type="submit" onClick={this.handleFormSubmit}>Add</button>
                                    </div>
                                </div>
                            </div>
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

export default Addstudent;