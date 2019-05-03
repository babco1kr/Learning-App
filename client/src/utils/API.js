import axios from "axios";

export default {
    // Save new user to a database. Goes to routes/index.js
    saveUser: function(userData) {
      return axios.post("/api/user", userData);
    },

    checkUser: function(userData) {
      console.log(userData);
      return axios.post("/api/user/lookup", userData);
    },


    checkStudent: function(input) {
      console.log(input);
      return axios.post("/api/student/", input);
    },

    login: function() {
      return axios.get("/user/data")
    },

    addStudent: function(studentData) {
      return axios.post("/api/teacher", studentData);
    },

    //
    findStudents: function(teacherInfo) {
      return axios.post("/api/teacher/lookup", teacherInfo)
    },

    logStart: function(input) {
      return axios.post("/api/student/start", input);
    },

    addUnit: function(unitInfo) {
      return axios.post("/api/teacher/addUnit", unitInfo);
    },

    addSpelling: function(question) {
      return axios.post("/api/teacher/addSpelling", question);
    }



  };