const mongoose = require("mongoose");
const validator  = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
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
      enum:{
        values:["male","female","others"],
        message:`{VALUE} is not a valid gender type`
      },
      // validate(value){
      //   if(!["male","female","others"].includes(value)){
      //     throw new Error("Gender data is not valid")
      //   }
      // }
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

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id }, "TinderApp$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.comparepassword = async function (InputPassword) {
  
  const user = this;
  const Passwordhashe = user.password;

  const isValidPassword = await bcrypt.compare(InputPassword, Passwordhashe);

  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
