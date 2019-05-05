import React, { Component } from "react";
// import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { FormBtn } from "../components/Form";
// import { Link } from "react-router-dom";
import Prompt from "../components/Prompt"
import API from "../utils/API";
import Nav from "../components/Nav/nav";
import ls from 'local-storage';
import soundfile from "../audio/audio.mp3";
import ReactPlayer from 'react-player'


class QuestionPrompt extends Component {

    state = {
        loading: true,
        questions: [],
        count: 0,
        clicked: false,
        playing: false,
    }

    componentDidMount() {
        this.getQuestions();
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
            .then(() => {
                API.sayWord({
                    word: this.state.questions[this.state.count].word,
                    studentNumber: ls.get("stuNum"),
                    school: ls.get("school")
                })
            })
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // playAudio = () => {
    //     console.log("audio trying to play");
    //     this.myRef = React.createRef();
    //     return (
    //         <ReactPlayer url={this.state.url} playing />
    //     )
    // }

    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({ playing: false })
        console.log(this.state.playing);
        if (this.state.clicked === false) {
            this.setState({ clicked: true });
            this.setState({ playing: true });
        }
        else {
            this.player.seekTo(0);
            this.setState({ playing: true })
        }
    };

    ref = player => {
        this.player = player
    }

    render() {
        if (this.state.loading) {
            return null
        }
        else {
            return (
                <div>
                    <Nav />
                    <div className="container">
                        <ReactPlayer
                            ref={this.ref}
                            url={soundfile}
                            height={"10px"}
                            playing={this.state.playing} />
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