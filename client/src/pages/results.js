import React, { Component } from "react";
import ls from 'local-storage';
import Nav from "../components/Nav/nav";
import API from "../utils/API";

class Results extends Component {
    state = {
        students: [],
        results: [],
        activeUnit: []
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
            this.setState({activeUnit: units});
        })
    }

    render() {
        return (
            <div>
                <Nav />
                    <div className = "row">
                        <div className = "center-align col s6">
                            <h3>Students</h3>
                            <hr></hr>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Time Online</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Results;