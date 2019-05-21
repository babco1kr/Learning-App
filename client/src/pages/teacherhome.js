import React, { Component } from "react";
import ls from 'local-storage';
import API from "../utils/API";
import Footer from "../components/Footer";
import Chart from "chart.js";
import Nav from "../components/TeacherNav";

class TeacherHome extends Component {
    state = {
        loading: true,
        students: [],
        units: [],
        results: [],
        questions: 0,
        complete: 0,
        incomplete: 0
    }
    componentDidMount() {
        this.setToken();
        this.findStudents();
        
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
                    this.setState({ loading: false });
                } else {
                    this.props.history.push("/teacherlogin");
                }
            })
            .catch(err => { console.log(err) })
    };

    findStudents() {
        API.findStudents({
            UserId: ls.get("teacherID"),
            school: ls.get("school")
        }).then(res => {
            this.setState({ students: res.data });
            this.getActiveResults();
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
            this.setState({ units: units });
            this.findNumberofQuestions();
        })
    }

    findNumberofQuestions() {
        API.findTotalQuestions({
            unitId: this.state.units
        }).then(res => {
            this.setState({questions: res.data.length});
            this.getResults();
        })
    }

    getResults() {
        API.getResults({
            UserId: ls.get("teacherID"),
            unitId: this.state.units
        }).then(res => {
            this.setState({ results: res.data });
            this.makeChartInfo();
        })
    }

    makeChartInfo() {
        let studentLength = this.state.students.length;
        let questionsLength = this.state.results.length;
        let complete = 0;
        let incomplete = 0;
        for(let i = 0; i < studentLength; i++) {
            let count = 0;
            for (let j = 0; j < questionsLength; j++) {
                if (this.state.students[i].id === this.state.results[j].StudentId)
                count++;
            }
            if (count === this.state.questions) {
                complete++;
            } else {
                incomplete++;
            }
        }
        this.setState({complete: complete});
        this.setState({incomplete: incomplete});
        this.createChart();
    
    }

    createChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Completed', 'Incomplete'],
                datasets: [{
                    label: 'Students Finished',
                    data: [this.state.complete, this.state.incomplete],
                    backgroundColor: [
                        'rgb(0, 0, 255, .75)',
                        'rgb(255, 0, 0, .75)'
                    ],
                    borderColor: [
                        'rgb(0, 0, 255, 1)',
                        'rgb(255, 0, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            }
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
                            <div className="col m4">
                                <h3 className="center-align">Current Students</h3>
                                <h3 className="center-align">{this.state.students.length}</h3>
                            </div>
                            <div className="col m4">
                                <h3 className="center-align">Active Unit(s)</h3>
                                <h3 className="center-align">{this.state.units}</h3>
                            </div>
                            <div className="col m4">
                            <h3 className="center-align">Completion Graph</h3>
                                <canvas id="myChart" width="400" height="400"></canvas>
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

export default TeacherHome;