import React, { Component } from "react";
// import SchoolSelect from "../components/schoolSelect/schoolSelect";
import { FormBtn, FloatBtn } from "../components/Form";
// import { Link } from "react-router-dom";
import Prompt from "../components/Prompt"
import API from "../utils/API";
import Nav from "../components/Nav/nav";
import moment from 'moment';

import ls from 'local-storage';
import ReactPlayer from 'react-player'

const btnStyle = {
    margin: '5px',
};

class QuestionPrompt extends Component {

    state = {
        loading: true,
        questions: [],
        count: 0,
        clicked: false,
        playing: false,
        letters: [],
        letterBank: [],
        response: [],
        guessCount: 0,
        random: [],
        pronunciation: ""
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
                } else {
                    this.props.history.push("/");
                }
            })
            .then(() => {
                let currentWord = this.state.questions[this.state.count].word;
                let wordToSplit = currentWord.toUpperCase();
                let arr = wordToSplit.split("");
                this.setState({ letters: arr });
                console.log(this.state.letters);




                let blanks = [];
                for (let i = 0; i < this.state.letters.length; i++) {
                    blanks.push(" _ ");
                }
                this.setState({ response: blanks });

                function func(a, b) {
                    return 0.5 - Math.random();
                }
                let randomLetters = this.state.letters.sort(func);
                this.setState({ random: randomLetters });
                console.log(this.state.random);

                let running = [];

                for (let d = 0; d < randomLetters.length; d++) {
                    let object = {
                        id: d,
                        character: randomLetters[d]
                    };
                    running.push(object);
                }
                this.setState({letterBank: running});

                let pronounceURL = "https://ssl.gstatic.com/dictionary/static/sounds/oxford/" + this.state.questions[this.state.count].word +"--_us_1.mp3"
                this.setState({ pronunciation: pronounceURL })

                // API.sayWord({
                //     word: this.state.questions[this.state.count].word,
                //     studentNumber: ls.get("stuNum"),
                //     school: ls.get("school")
                // })
                //     .then(res => {
                //         this.setState({ loading: false });
                //     })
            })
            .then(() =>{
                this.setState({ loading: false });
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

    handleLetterSubmit = (letter, id) => {
        // event.preventDefault();
        console.log(letter);
        console.log(id);

        let currentAnswer = [];
        for (let j = 0; j < this.state.letters.length; j++) {
            if (j !== this.state.guessCount) {
                currentAnswer.push(this.state.response[j]);
            }

            else {
                currentAnswer.push(" " + letter + " ");
            }
        }

        // to remove letters once selected
        let tempLetterBank = [];

         for (let l = 0; l < this.state.letterBank.length; l++) {
             if (this.state.letterBank[l].id !== id) {
                tempLetterBank.push(this.state.letterBank[l]);
             }
         }

         this.setState({ letterBank: tempLetterBank });

        let upOne = this.state.guessCount + 1;
        console.log(currentAnswer);
        this.setState({ guessCount: upOne });
        this.setState({ response: currentAnswer });

    };

    handleAnswerSubmit = event => {
        event.preventDefault();


        if (this.state.count < this.state.questions.length - 1) {

        let word = this.state.questions[this.state.count].word.toUpperCase();
        console.log(word);
        let answerToLog = this.state.response.join("").replace(/\s/g, '');
        console.log(answerToLog);
        let ansCorrect = false;
        if (word === answerToLog) {
            ansCorrect = true;
        }

        API.logAnswer({
            question: this.state.questions[this.state.count].word,
            correct: ansCorrect,
            answer: answerToLog,
            questionID: this.state.questions[this.state.count].questionId,
            teacherID: this.state.questions[this.state.count].teacherId,
            unitID: this.state.questions[this.state.count].unitId,
            StudentId: Number(ls.get("intStuNum"))
        }).
        then( res => {
            let nextCount = this.state.count + 1;
            this.setState({count: nextCount});
            this.setState({ loading: true });
            this.setState({ clicked: false });
            this.setState({ playing: false });
            this.setState({ guessCount: 0 });
            this.setState({letterBank: []});
            this.setState({ pronunciation: ""})
        })
        .then(() => {
            let currentWord = this.state.questions[this.state.count].word;
            let wordToSplit = currentWord.toUpperCase();
            let arr = wordToSplit.split("");
            this.setState({ letters: arr });
            console.log(this.state.letters);

            let blanks = [];
            for (let i = 0; i < this.state.letters.length; i++) {
                blanks.push(" _ ");
            }
            this.setState({ response: blanks });

            function func(a, b) {
                return 0.5 - Math.random();
            }
            let randomLetters = this.state.letters.sort(func);
            this.setState({ random: randomLetters });
            console.log(this.state.random);

            let running = [];

            for (let d = 0; d < randomLetters.length; d++) {
                let object = {
                    id: d,
                    character: randomLetters[d]
                };
                running.push(object);
            }
            this.setState({letterBank: running});

            let pronounceURL = "https://ssl.gstatic.com/dictionary/static/sounds/oxford/" + this.state.questions[this.state.count].word +"--_us_1.mp3"
            this.setState({ pronunciation: pronounceURL })
            // this.setState({ loading: false });

            // API.sayWord({
            //     word: this.state.questions[this.state.count].word,
            //     studentNumber: ls.get("stuNum"),
            //     school: ls.get("school")
            // })
            //     .then(res => {
            //         this.setState({ loading: false });
            //     })
        })
        .then(() =>{
            this.setState({ loading: false });
        })

    }

    // If there are no more questions, log answer and end time, and go to end page
    else {
        let word = this.state.questions[this.state.count].word.toUpperCase();
        console.log(word);
        let answerToLog = this.state.response.join("").replace(/\s/g, '');
        console.log(answerToLog);
        let ansCorrect = false;
        if (word === answerToLog) {
            ansCorrect = true;
        }
        API.logAnswer({
            question: this.state.questions[this.state.count].word,
            correct: ansCorrect,
            answer: answerToLog,
            questionID: this.state.questions[this.state.count].questionId,
            teacherID: this.state.questions[this.state.count].teacherId,
            unitID: this.state.questions[this.state.count].unitId,
            StudentId: Number(ls.get("intStuNum"))
        }).
        then( res => {
            API.logEnd({
                studentNumber: ls.get("stuNum"),
                school: ls.get("school"),
                startTime: moment().format()}
                )
                .then(res => {
                    this.props.history.push("/finish")
                })
                .catch(err => console.log(err));
        })
    }

    };

    ref = player => {
        this.player = player
    }

    playAudio() {
        this.refs.audioRef.play();
      }

    render() {
        if (this.state.loading) {
            return null
        }
        else {
            return (
                <div>
                    <audio ref="audioRef" src={this.state.pronunciation} type="mp3"></audio>
                    <Nav />
                    <div className="container">
                        {/* <ReactPlayer
                            ref={this.ref}
                            url={soundfile}
                            height={"10px"}
                            playing={this.state.playing} /> */}
                        <Prompt
                            question={this.state.questions[this.state.count].word}
                            image={this.state.questions[this.state.count].image}
                        >
                        </Prompt>
                        <FormBtn
                            // onClick={this.handleFormSubmit}
                            onClick={this.playAudio.bind(this)}
                        >
                            SAY WORD
                        </FormBtn>
                        <div className="row center-align">
                            <h2>{this.state.response}</h2>
                        </div>
                        <div className="row center-align" style={btnStyle}>
                            {this.state.letterBank.map(letter => (
                                <FloatBtn
                                    key={letter.id}
                                    id={letter.id}
                                    letter={letter.character}
                                    handleLetterSubmit={this.handleLetterSubmit}
                                >
                                    {letter.character}
                                </FloatBtn>
                            ))}
                        </div>
                        <div className="row center-align" style={btnStyle}>
                        <FormBtn
                            onClick={this.handleAnswerSubmit}
                        >
                            SUBMIT
                        </FormBtn>
                        </div>
  

                    </div>
                </div>
            )
        }
    }
}

export default QuestionPrompt;