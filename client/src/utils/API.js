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

  //   checkUser: async ({ name, password, school}) => {
  //     return await axios.get("/api/user", { name, password, school});;
  // }

  };