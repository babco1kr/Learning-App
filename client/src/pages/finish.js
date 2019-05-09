import React, { Component } from "react";
import Footer from "../components/Footer";
import API from "../utils/API";
import Nav from "../components/StudentNav";
import ls from 'local-storage';

const imgStyle = {
    margin: '0 auto',
    maxWidth: "300px",
    height: "auto", 
  };

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
                    <div className="page">
                        <Nav />
                        <main>
                            <div className="container">
                                <div className="row center-align" style={{ margin: "15px 0px 0px 0px" }}>
                                <img alt="celebration" className="img-fluid" src="https://media1.giphy.com/media/YTbZzCkRQCEJa/giphy.gif" style={imgStyle} />
                                </div>
                                <div className="row center-align">
                                    <h2>All Done! See You In Class!</h2>
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

export default Finish;