import React, { Component } from "react";
// import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { FormBtn } from "../components/Form";
// import { Link } from "react-router-dom";
import API from "../utils/API";
import Nav from "../components/Nav/nav";
import ls from 'local-storage';
import moment from 'moment';

class StudentHome extends Component {

    state = {
        loading: true
    }
    componentDidMount() {
        this.studentLoginCheck()
    }

    studentLoginCheck = () => {

       API.checkStudent({
            studentNumber: ls.get("stuNum"),
            school: ls.get("school")
       })
        .then(res => {
            console.log(res.results);
            if (res.results) {
                this.setState({loading: false})
            } else {
                this.props.history.push("/")
            }
        })
        .catch(err => {console.log(err)})
    };


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
            // Go to utils/API.js and run 
            API.logStart({
                studentNumber: ls.get("stuNum"),
                school: ls.get("school"),
                startTime: moment().format()}
                )
                .then(res => {
                    console.log("start time saved")
                    this.props.history.push("/studenthome");  
                })
                .catch(err => console.log(err));
    };

    render() {
        if (!this.state.loading) {
            return null
        }
        else {
            return (
                <div>
                    <Nav />
                    <div className="container">
                        
                    <FormBtn
                            onClick={this.handleFormSubmit}
                        >
                           START
                  </FormBtn>
                    </div>
                </div>
            )
        }
    }
}

export default StudentHome;