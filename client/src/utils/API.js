import axios from "axios";

export default {
    // Save new user to a database. Goes to routes/index.js
    saveUser: function(userData) {
      return axios.post("/api/user", userData);
    },

    checkUser: function(userData) {
      console.log(userData);
      return axios.post("/api/userlookup", userData);
    },

    login: function(token) {
      return axios.post("/api/login/test", token)
    }


  };