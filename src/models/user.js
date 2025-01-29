const mongoose = require("mongoose");

const userSchem = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },

    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value){
        if(!["male","female","others"].includes(value)){
          throw new Error("Gender data is not valid")
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    about: {
      type: String,
      default: "I am honest person",
    },

    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchem);
