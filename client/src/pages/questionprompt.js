import React, { Component } from "react";
import { FormBtn } from "../components/Form";
import Footer from "../components/Footer";
import Prompt from "../components/Prompt"
import API from "../utils/API";
import Nav from "../components/StudentNav";
import moment from 'moment';
import Row from "../components/Row";
import { DragDropContext } from "react-beautiful-dnd";

import ls from 'local-storage';

const btnStyle = {
    margin: '5px',
};

class QuestionPrompt extends Component {

    state = {
        loading: true,
        questions: [],
        count: 0,
        letters: [],
        letterBank: [],
        random: [],
        pronunciation: "",
        rows: {},
        rowOrder: ["row-2", "row-1"],
    }

    componentDidMount() {
        this.getQuestions();
    }

    getQuestions = () => {
        //Get the active questions that the student has not already answered. 
        API.getQuestions({
            studentNumber: ls.get("stuNum"),
            school: ls.get("school"),
            intStuNum: ls.get("intStuNum"),
            startTime: moment().format()
        })
            .then(res => {
                console.log(res.data);
                if (res.data.length !== 0) {
                    this.setState({ questions: res.data });
                } else {
                    // needed so the rest of the function does not crash if there are no questions. 
                    this.setState({ questions: [{ questionId: 0, word: "null", image: "", teacherId: "", unitId: "" }] });

                    //send to noquestions page
                    this.props.history.push("/noquestions");
                }
            })
            .then(() => {
                // set this.state.letters to array of letters for the first word
                let currentWord = this.state.questions[this.state.count].word;
                let wordToSplit = currentWord.toUpperCase();
                let arr = wordToSplit.split("");
                this.setState({ letters: arr });
            })
            .then(() => {
                let currentWord = this.state.questions[this.state.count].word;
                let wordToSplit = currentWord.toUpperCase();
                //get random order for letters to appear
                function func(a, b) {
                    return 0.5 - Math.random();
                }
                //make sure the random order of letters does not match the actual word
                let randomLetters = this.state.letters.sort(func);
                let stateLetters = this.state.letters;
                //function to shuffle letters for tiles, and make sure shuffle does not return original word
                function shuffle() {
                    let randomLettersJoined = randomLetters.join("").toUpperCase();
                    if (randomLettersJoined === wordToSplit) {
                        randomLetters = stateLetters.sort(func);
                        shuffle();
                    }
                    else {
                        return randomLetters;
                    }
                }
                shuffle();
                this.setState({ random: randomLetters });

                //make an object to render the letter buttons
                let running = {};
                //needed to create rows for dnd
                let letterIdArray = [];
                for (let d = 0; d < randomLetters.length; d++) {
                    let numString = d.toString();
                    running["letter-" + numString] = {
                        id: "letter-" + numString,
                        character: randomLetters[d]
                    };
                    letterIdArray.push("letter-" + numString);
                }
                this.setState({ letterBank: running });

                let rowState = {
                    "row-2" : {
                        id: "row-2",
                        title: "Answer",
                        letterIds: [],
                    },
                    "row-1": {
                        id: "row-1",
                        title: "Available Letters",
                        letterIds: letterIdArray,
                    },
                }
                this.setState({ rows: rowState });
            })
            .then(() => {

                let wordPronounceAPI = this.state.questions[this.state.count].word.toLowerCase();
                    API.tts({
                        word: wordPronounceAPI
                    })
                    .then(res => {
                        let merrianFile = res.data;
                        // assign Merrian-Webster (MW) subdirectory.
                        // Per Merrian-Webster dictionary docs, there are three excepts to subdirectory being first letter of word. 
                        let merrianSub;
                        if (merrianFile.indexOf("bix") === 0) {
                            merrianSub = "bix";
                        }
                        else if (merrianFile.indexOf("gg") === 0) {
                            merrianSub = "gg";
                        }
                        else if (!isNaN(merrianFile.charAt(0))) {
                            merrianSub = "number";
                        }
                        else {
                            merrianSub = merrianFile.charAt(0);
                        }
                        let pronounceURL = "https://media.merriam-webster.com/soundc11/" + merrianSub + "/" + merrianFile + ".wav";
                        this.setState({ pronunciation: pronounceURL })
                    });
            })
            .then(() => {
                //allow the entire page to load
                this.setState({ loading: false });
            })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleAnswerSubmit = event => {
        event.preventDefault();

        if (this.state.count < this.state.questions.length - 1) {

            let answer = [];
            for (let a = 0; a < this.state.questions[this.state.count].word.length; a++) {
                for (let prop in this.state.letterBank)  {
                    if (this.state.rows["row-2"].letterIds[a] === this.state.letterBank[prop].id) {
                        answer.push(this.state.letterBank[prop].character);
                    }
                }
            }

            let word = this.state.questions[this.state.count].word.toUpperCase();

            let answerToLog = answer.join("").replace(/\s/g, '');

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
                    this.setState({ letterBank: [] });
                    this.setState({ pronunciation: "" })
                    this.setState({ rows: {} })
                })
                .then(() => {
                // set this.state.letters to array of letters for the first word
                let currentWord = this.state.questions[this.state.count].word;
                let wordToSplit = currentWord.toUpperCase();
                let arr = wordToSplit.split("");
                this.setState({ letters: arr });
            })
            .then(() => {
                let currentWord = this.state.questions[this.state.count].word;
                let wordToSplit = currentWord.toUpperCase();
                //get random order for letters to appear
                function func(a, b) {
                    return 0.5 - Math.random();
                }

                //make sure the random order of letters does not match the actual word
                let randomLetters = this.state.letters.sort(func);
                let stateLetters = this.state.letters;

                function shuffle() {
                    let randomLettersJoined = randomLetters.join("").toUpperCase();
                    if (randomLettersJoined === wordToSplit) {
                        randomLetters = stateLetters.sort(func);
                        shuffle();
                    }
                    else {
                        return randomLetters;
                    }
                }
                shuffle();
                this.setState({ random: randomLetters });

                //make an object to render the letter buttons
                let running = {};
                //needed to create rows
                let letterIdArray = [];
                for (let d = 0; d < randomLetters.length; d++) {
                    let numString = d.toString();
                    running["letter-" + numString] = {
                        id: "letter-" + numString,
                        character: randomLetters[d]
                    };
                    letterIdArray.push("letter-" + numString);
                }
                this.setState({ letterBank: running });

                let rowState = {
                    "row-2" : {
                        id: "row-2",
                        title: "Answer",
                        letterIds: [],
                    },
                    "row-1": {
                        id: "row-1",
                        title: "Available Letters",
                        letterIds: letterIdArray,
                    },
                }
                this.setState({ rows: rowState });
            })
            .then(() => {
                let wordPronounceAPI = this.state.questions[this.state.count].word.toLowerCase();
                    API.tts({
                        word: wordPronounceAPI
                    })
                    .then(res => {
                        let merrianFile = res.data;
                        let merrianSub;
                        if (merrianFile.indexOf("bix") === 0) {
                            merrianSub = "bix";
                        }
                        else if (merrianFile.indexOf("gg") === 0) {
                            merrianSub = "gg";
                        }
                        else if (!isNaN(merrianFile.charAt(0))) {
                            merrianSub = "number";
                        }
                        else {
                            merrianSub = merrianFile.charAt(0);
                        }
                        let pronounceURL = "https://media.merriam-webster.com/soundc11/" + merrianSub + "/" + merrianFile + ".wav";
                        this.setState({ pronunciation: pronounceURL })
                    });
            })
            .then(() => {
                //allow the entire page to load
                this.setState({ loading: false });
            })
        }
        // If there are no more questions, log answer and end time, and go to end page
        else {
            let answer = [];
            for (let a = 0; a < this.state.questions[this.state.count].word.length; a++) {
                for (let prop in this.state.letterBank)  {
                    if (this.state.rows["row-2"].letterIds[a] === this.state.letterBank[prop].id) {
                        answer.push(this.state.letterBank[prop].character);
                    }
                }
            }
            let word = this.state.questions[this.state.count].word.toUpperCase();

            let answerToLog = answer.join("").replace(/\s/g, '');

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

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.rows[source.droppableId];
        const finish = this.state.rows[destination.droppableId];

        if (start === finish) {
            const newLetterIds = Array.from(start.letterIds);
            newLetterIds.splice(source.index, 1);
            newLetterIds.splice(destination.index, 0, draggableId);
    
            const newRow = {
                ...start,
                letterIds: newLetterIds,
            };
    
            const newState = {
                ...this.state,
                rows: {
                    ...this.state.rows,
                    [newRow.id]: newRow,
                },
            };
    
            this.setState(newState);
            return;
        }

        // moving to another row
        const startLetterIds = Array.from(start.letterIds);
        startLetterIds.splice(source.index, 1);
        const newStart = {
            ...start,
            letterIds: startLetterIds,
        };

        const finishLetterIds = Array.from(finish.letterIds);
        finishLetterIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            letterIds: finishLetterIds,
        };

        const newState = {
            ...this.state,
            rows: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        this.setState(newState);
        return;
    };



    render() {
        if (this.state.loading) {
            return (
                <div {...this.props} ref={this.props.innerRef}>
                Loading...
              </div>
            )
        }
        else {
            return (
                <div>
                    <audio ref="audioRef" src={this.state.pronunciation} type="wav"></audio>
                    <header>
                        <Nav />
                    </header>
                    <main>
                        <div className="container">
                            <div className="content-area">
                                <div className="row center-align" style={{ margin: "15px 0px 0px 0px" }}>
                                    <Prompt
                                        question={this.state.questions[this.state.count].word}
                                        image={this.state.questions[this.state.count].image}
                                    >
                                    </Prompt>
                                </div>
                                <div className="row center-align">
                                    <FormBtn
                                        onClick={this.playAudio.bind(this)}
                                    >
                                        SAY WORD
                                    </FormBtn>
                                </div>
                            <DragDropContext
                                onDragEnd={this.onDragEnd}
                            >
                                {this.state.rowOrder.map(rowId => {
                                    const row = this.state.rows[rowId];
                                    const letterBank = row.letterIds.map(letterId => this.state.letterBank[letterId]);

                                    return <Row key={row.id} row={row} letterBank={letterBank} />
                                })}
                            </DragDropContext>
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