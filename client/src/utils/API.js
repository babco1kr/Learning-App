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

    login: function() {
      // fetch('/user/data', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': 'Bearer' + localstorage.getItem('token')
      //   }
      // })
      // .then(res => res.json())
      // .then(data => { console.log(data) })
      // .catch(err => { console.log(err) })
      return axios.get("/user/data")
    }


  };