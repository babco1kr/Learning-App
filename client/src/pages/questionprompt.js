import React, { Component } from "react";
// import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { FormBtn } from "../components/Form";
// import { Link } from "react-router-dom";
import Prompt from "../components/Prompt"
import API from "../utils/API";
import Nav from "../components/Nav/nav";
import ls from 'local-storage';

class QuestionPrompt extends Component {

    state = {
        loading: true,
        questions: [],
        count: 0,
        url: "./audio/" + ls.get("school") + "." + ls.get("stuNum") + ".mp3" 
    }

    componentDidMount() {
        this.getQuestions();
        console.log(this.state.url);
    }

    // studentLoginCheck = () => {

    //    API.checkStudentLogin({
    //         studentNumber: ls.get("stuNum"),
    //         school: ls.get("school")
    //    })
    //     .then(res => {
    //         // console.log(res);
    //         if (res.data.length !== 0) {
    //             this.setState({loading: false})
    //         } else {
    //             this.props.history.push("/");
    //         }
    //     })
    //     .catch(err => {console.log(err)})
    // };

    getQuestions = () => {
        API.getQuestions({
            studentNumber: ls.get("stuNum"),
            school: ls.get("school")
        })
            .then(res => {
                if (res.data.length !== 0) {
                    this.setState({ questions: res.data });
                    this.setState({ loading: false });
                } else {
                    this.props.history.push("/");
                }
            })

    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    playAudio = () => {
        let audio = this.state.url;
        audio.play();
    }

    handleFormSubmit = event => {
        event.preventDefault();
        API.sayWord({
            word: this.state.questions[this.state.count].word,
            studentNumber: ls.get("stuNum"),
            school: ls.get("school")
        })
            .then(
                this.playAudio()
            )
    };

    render() {
        if (this.state.loading) {
            return null
        }
        else {
            return (
                <div>
                    <audio>
                        <source src={this.state.url} type="audio/mpeg" >
                        </source>
                    </audio>
                    <Nav />
                    <div className="container">

                        <Prompt
                            question={this.state.questions[this.state.count].word}
                            image={this.state.questions[this.state.count].image}
                        >
                        </Prompt>
                        <FormBtn
                            onClick={this.handleFormSubmit}
                        >
                            SAY WORD
                  </FormBtn>
                    </div>
                </div>
            )
        }
    }
}

export default QuestionPrompt;