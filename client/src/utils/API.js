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


    checkStudentLogin: function(input) {
      console.log(input);
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
    }




  };