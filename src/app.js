const express = require("express");
const connectDB = require("./config/database");

const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auht");
const app = express();


app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });


app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    console.log(userEmail);

    // const user = await User.findOne({ email: userEmail });//find only one documents
    // if (!user) {
    //   res.send("User Not found with email Id");
    // } else {
    //   res.send(user);
    // }

    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});

    if (feed.length === 0) {
      res.status(404).send("No data is found");
    } else {
      res.send(feed);
    }
  } catch (err) {
    res.send("Unable to get feed", err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log("userId", userId);

  try {
    await User.findByIdAndDelete(userId);
    // OR  await User.findByIdAndDelete({_id : userId});

    res.send("User deleted succesully");
  } catch (err) {
    res.send("Unable to delete user", err.message);
  }
});

app.post("/signup", async (req, res) => {
  // console.log("req", req.body);

  try {
    // Validation
    validateSignupData(req);
    // creating new instance of user model

    const { firstName, lastName, email, password } = req.body;

    //Encrypted password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword ", hashedPassword);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/login", async (req, res) => {

  const { email, password } = req.body;
  try {

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      
      //Create token 
      const token = await jwt.sign({_id:user._id},"TinderApp$790", { expiresIn: "7d" })
      res.cookie("token", token, {
      expires: new Date(Date.now() + 8 *3600000) ,});
      res.send("User logged in successfully");
    }
   else{
    throw new Error("Invalid credentials");
   }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

app.get("/profile", userAuth, async(req,res)=>{

  try{
  res.send(req.user);
  }catch(err){
     res.send("ERROR :" + err.message);
  }
})

app.post("/sendConnectionreq",userAuth, async (req,res)=>{

  try{
   
   res.send(`Connection request sent to ${req.user}`);

  }catch(err){
     res.send("ERROR :" + err.message);
  }
})

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const userDetails = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!userDetails) {
      return res.status(404).send("User not found");
    }
    console.log("userDetails", userDetails);
    res.send("user updated successfully");
  } catch (err) {
    res.send("UPDATE FAIL !!!!!!!!" + err.message);
  }
});

app.patch("/user/updateByEmailId", async (req, res) => {
  const emaiId = req.body.email;
  const updateData = req.body;

  try {
    await User.findOneAndUpdate({ email: emaiId }, updateData);
    res.send("user updated successfully by Email Id");
  } catch (err) {
    res.send("Unable to update user" + err.message);
  }
});

// wild card error handling

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
