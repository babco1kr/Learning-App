import React, { Component } from "react";
import { FormBtn } from "../components/Form";
import Footer from "../components/Footer";
import API from "../utils/API";
import Nav from "../components/StudentNav";
import ls from 'local-storage';
import moment from 'moment';

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

    handleFormSubmit = event => {
        event.preventDefault();
        //...
    };

    render() {
        if (this.state.loading) {
            return null
        }
        else {
            return (
                <div>
                    <header>
                    <Nav />
                    </header>
                    <main>
                    <div className="container">
                        <div classNane="content-area">
                            No Questions To Answer
                        </div>
                    </div>
                    </main>
                    <Footer />
                </div>
            )
        }
    }
}

export default NoQuestions;