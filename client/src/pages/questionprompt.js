import React, { Component } from "react";
import { FormBtn, FloatBtn, AnswerBtn } from "../components/Form";
import Footer from "../components/Footer";
import Prompt from "../components/Prompt"
import API from "../utils/API";
import Nav from "../components/StudentNav";
import moment from 'moment';

import ls from 'local-storage';

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
        guessBank: [],
        response: [],
        guessCount: 0,
        random: [],
        pronunciation: ""
    }

    componentDidMount() {
        this.getQuestions();
    }

    getQuestions = () => {
        //Get the active questions that the student has not already answered. 
        API.getQuestions({
            studentNumber: ls.get("stuNum"),
            school: ls.get("school"),
            intStuNum: ls.get("intStuNum")
        })
            .then(res => {
                console.log(res.data);
                if (res.data.length !== 0) {
                    this.setState({ questions: res.data });
                } else {
                    this.props.history.push("/noquestions");
                    // needed so the rest of the function does not crash if there are no questions. 
                    this.setState({ questions: [{questionId: 0, word:"", image: "", teacherId: "", unitId: ""}]});
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


                let runningBlanks = [];

                for (let d = 0; d < this.state.letters.length; d++) {
                    let object = {
                        id: "blank",
                        character: "__"
                    };
                    runningBlanks.push(object);
                }
                this.setState({ guessBank: runningBlanks });






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
                this.setState({ letterBank: running });

                let wordPronounce = this.state.questions[this.state.count].word.toLowerCase().split("");
                console.log(wordPronounce);
                let one = wordPronounce[0];
                console.log(one);

                let three = [];
                if (wordPronounce.length >= 3) {
                    for (let q = 0; q < 3; q++) {
                        three.push(wordPronounce[q])
                    }
                    three = three.join("");
                }
                else if (wordPronounce.length === 2) {
                    for (let q = 0; q < 2; q++) {
                        three.push(wordPronounce[q])
                    }
                    three.push("_");
                    three = three.join("");
                }
                else if (wordPronounce.length === 1) {
                    for (let q = 0; q < 1; q++) {
                        three.push(wordPronounce[q])
                    }
                    three.push("__");
                    three = three.join("");
                }
                console.log(three);

                let five = [];
                if (wordPronounce.length >= 5) {
                    for (let q = 0; q < 5; q++) {
                        five.push(wordPronounce[q])
                    }
                    five = five.join("");
                }
                else if (wordPronounce.length === 4) {
                    for (let q = 0; q < 4; q++) {
                        five.push(wordPronounce[q])
                    }
                    five.push("_");
                    five = five.join("");
                }
                else if (wordPronounce.length === 3) {
                    for (let q = 0; q < 3; q++) {
                        five.push(wordPronounce[q])
                    }
                    five.push("__");
                    five = five.join("");
                }
                else if (wordPronounce.length === 2) {
                    for (let q = 0; q < 2; q++) {
                        five.push(wordPronounce[q])
                    }
                    five.push("___");
                    five = five.join("");
                }
                else if (wordPronounce.length === 1) {
                    for (let q = 0; q < 1; q++) {
                        five.push(wordPronounce[q])
                    }
                    five.push("____");
                    five = five.join("");
                }
                console.log(five);

                let pronounceURL = "https://dictionary.cambridge.org/us/media/english/us_pron/" + one + "/" + three + "/" + five + "/" + this.state.questions[this.state.count].word.toLowerCase() + ".mp3";
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
            .then(() => {
                this.setState({ loading: false });
            })
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

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
                then(res => {
                    let nextCount = this.state.count + 1;
                    this.setState({ count: nextCount });
                    this.setState({ loading: true });
                    this.setState({ clicked: false });
                    this.setState({ playing: false });
                    this.setState({ guessCount: 0 });
                    this.setState({ letterBank: [] });
                    this.setState({ pronunciation: "" })
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
                    this.setState({ letterBank: running });

                    let wordPronounce = this.state.questions[this.state.count].word.toLowerCase().split("");
                    let one = wordPronounce[0];
                    console.log(one);

                    let three = [];
                    if (wordPronounce.length >= 3) {
                        for (let q = 0; q < 3; q++) {
                            three.push(wordPronounce[q])
                        }
                        three = three.join("");
                    }
                    else if (wordPronounce.length === 2) {
                        for (let q = 0; q < 2; q++) {
                            three.push(wordPronounce[q])
                        }
                        three.push("_");
                        three = three.join("");
                    }
                    else if (wordPronounce.length === 1) {
                        for (let q = 0; q < 1; q++) {
                            three.push(wordPronounce[q])
                        }
                        three.push("__");
                        three = three.join("");
                    }
                    console.log(three);

                    let five = [];
                    if (wordPronounce.length >= 5) {
                        for (let q = 0; q < 5; q++) {
                            five.push(wordPronounce[q])
                        }
                        five = five.join("");
                    }
                    else if (wordPronounce.length === 4) {
                        for (let q = 0; q < 4; q++) {
                            five.push(wordPronounce[q])
                        }
                        five.push("_");
                        five = five.join("");
                    }
                    else if (wordPronounce.length === 3) {
                        for (let q = 0; q < 3; q++) {
                            five.push(wordPronounce[q])
                        }
                        five.push("__");
                        five = five.join("");
                    }
                    else if (wordPronounce.length === 2) {
                        for (let q = 0; q < 2; q++) {
                            five.push(wordPronounce[q])
                        }
                        five.push("___");
                        five = five.join("");
                    }
                    else if (wordPronounce.length === 1) {
                        for (let q = 0; q < 1; q++) {
                            five.push(wordPronounce[q])
                        }
                        five.push("____");
                        five = five.join("");
                    }
                    console.log(five);

                    let pronounceURL = "https://dictionary.cambridge.org/us/media/english/us_pron/" + one + "/" + three + "/" + five + "/" + this.state.questions[this.state.count].word.toLowerCase() + ".mp3";
                    // let pronounceURL = "http://packs.shtooka.net/eng-wcp-us/mp3/En-us-"+ this.state.questions[this.state.count].word.toLowerCase()+ ".mp3";
                    // let pronounceURL = "https://ssl.gstatic.com/dictionary/static/sounds/oxford/" + this.state.questions[this.state.count].word.toLowerCase() +"--_us_1.mp3"
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
                .then(() => {
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
                then(res => {
                    API.logEnd({
                        studentNumber: ls.get("stuNum"),
                        school: ls.get("school"),
                        startTime: moment().format()
                    }
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
                    <header>
                    <Nav />
                    </header>
                    <main>
                    <div className="container">
                        <div className="content-area">
                            {/* <ReactPlayer
                            ref={this.ref}
                            url={soundfile}
                            height={"10px"}
                            playing={this.state.playing} /> */}
                            <div className="row center-align" style={{ margin: "15px 0px 0px 0px" }}>
                                <Prompt
                                    question={this.state.questions[this.state.count].word}
                                    image={this.state.questions[this.state.count].image}
                                >
                                </Prompt>
                            </div>
                            <div className="row center-align">
                                <FormBtn
                                    // onClick={this.handleFormSubmit}
                                    onClick={this.playAudio.bind(this)}
                                >
                                    SAY WORD
                        </FormBtn>
                            </div>
                            <div className="row center-align">
                                <h2>{this.state.response}</h2>
                            </div>

                            <div className="row center-align">

                                {this.state.guessBank.map(letter => (
                                    <AnswerBtn
                                        key={letter.id}
                                        id={letter.id}
                                        letter={letter.character}
                                        handleLetterSubmit={this.handleLetterSubmit}
                                    >
                                        {letter.character}
                                    </AnswerBtn>
                                ))}
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
                    </main>
                    <Footer />
                </div>
            )
        }
    }
}

export default QuestionPrompt;