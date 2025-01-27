const mongoose = require("mongoose");

const userSchem = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchem);
