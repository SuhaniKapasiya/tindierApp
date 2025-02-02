const mongoose = require("mongoose");
const validator  = require("validator")

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
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is not Valid")
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password must be strong (min 8 chars, 1 letter, 1 number, 1 special character)");
        }
      }
      
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
      max :120,
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
      validate(value){
         if(!validator.isURL(value))
         {
            throw new Error("photURL is not valid");
         }
         
      },
      default:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchem);
