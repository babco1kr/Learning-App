import axios from "axios";

export default {
    // Save new user to a database. Goes to routes/index.js
    saveUser: function(userData) {
      return axios.post("/api/user", userData);
    },

    checkUser: function(userData) {
      return axios.post("/api/user/lookup", userData);
    },


    checkStudent: function(input) {
      return axios.post("/api/student/", input);
    },


    checkStudentLogin: function(input) {
      return axios.post("/api/student/lookup", input);
    },

    login: function() {
      return axios.get("/user/data")
    },

    addStudent: function(studentData) {
      return axios.post("/api/teacher", studentData);
    },

  
    findStudents: function(teacherInfo) {
      return axios.post("/api/teacher/lookup", teacherInfo)
    },

    logStart: function(input) {
      return axios.post("/api/student/start", input);
    },

    logEnd: function(input) {
      return axios.post("/api/student/end", input);
    },


    addUnit: function(unitInfo) {
      return axios.post("/api/teacher/addUnit", unitInfo);
    },

    addSpelling: function(question) {
      return axios.post("/api/teacher/addSpelling", question);
    },

    findUnits: function(unitInfo) {
      return axios.post("/api/teacher/getUnits", unitInfo);
    },

    updateActive: function(status) {
      return axios.post("/api/teacher/changestatus", status);
    },

    deleteStudent: function(student) {
      return axios.post("/api/teacher/removestudent", student);
    },

    deleteUnit: function(unit) {
      return axios.post("/api/teacher/removeunit", unit);
    },

    findQuestions: function(questions) {
      return axios.post("/api/teacher/findquestions", questions);
    },

    deleteQuestion: function(question) {
      return axios.post("/api/teacher/removequestion", question);
    },

    getQuestions: function(question) {
      return axios.post("/api/student/getquestions", question);
    },

    // sayWord: function(question) {
    //   return axios.post("/api/texttospeech", question);
    // },

    logAnswer: function(input) {
      return axios.post("/api/student/loganswer", input);
    },

    getActiveUnit: function(teacher) {
      return axios.post("/api/teacher/activeunit", teacher);
    },

    getResults: function(results) {
      return axios.post("/api/teacher/getresults", results);
    },

    findTotalQuestions: function(units) {
      return axios.post("/api/teacher/allquestions", units);
    },
    
    tts: function(word) {
      return axios.post("api/student/tts", word)
    }


  };