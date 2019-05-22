import React, { Component } from "react";
import Footer from "../components/Footer";
import API from "../utils/API";
import Nav from "../components/StudentNav";
import ls from 'local-storage';

class NoQuestions extends Component {

    state = {
        loading: true
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
                console.log(res);
                if (res.data.length !== 0) {
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
                                    <h2>You have no questions to answer.</h2>
                                    <h2>See you in class!</h2>
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

export default NoQuestions;