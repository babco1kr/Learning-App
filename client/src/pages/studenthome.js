import React, { Component } from "react";
import { FormBtn } from "../components/Form";
import Footer from "../components/Footer";
import API from "../utils/API";
import Nav from "../components/StudentNav";
import ls from 'local-storage';
import moment from 'moment';

class StudentHome extends Component {

    state = {
        loading: true,
        name: ""
    }

    componentDidMount() {

        this.studentLoginCheck()
    }

    studentLoginCheck = () => {

        API.checkStudentLogin({
            studentNumber: ls.get("stuNum"),
            school: ls.get("school")
        })
            .then(res => {
                if (res.data.length !== 0) {
                    let loadName = res.data[0].name;
                    this.setState({ name: loadName});
                    this.setState({ loading: false })
                } else {
                    this.props.history.push("/")
                }
            })
            .catch(err => { console.log(err) })
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
            startTime: moment().format()
        }
        )
            .then(res => {
                this.props.history.push("/question");
            })
            .catch(err => console.log(err));
    };

    render() {
        if (this.state.loading) {
            return null
        }
        else {
            return (
                <div>
                    <div className="page">
                    <Nav />
                    <main>
                    <div className="container">
                        <div className="row center-align">
                            <div className="content-area">
                            <h2>Welcome {this.state.name}!</h2>
                            <h3>Please click the button below to begin.</h3>
                                <FormBtn
                                    onClick={this.handleFormSubmit}
                                >
                                    START
                                </FormBtn>
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
}

export default StudentHome;