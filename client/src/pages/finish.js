import React, { Component } from "react";
// import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { FormBtn } from "../components/Form";
// import { Link } from "react-router-dom";
import API from "../utils/API";
import Nav from "../components/StudentNav";
import ls from 'local-storage';
import moment from 'moment';

class Finish extends Component {

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
        //...
    };

    render() {
        if (this.state.loading) {
            return null
        }
        else {
            return (
                <div>
                    <Nav />
                    <div className="container">
                    ALL DONE
                    </div>
                </div>
            )
        }
    }
}

export default Finish;