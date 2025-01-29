const express = require("express");
const connectDB = require("./config/database");

const User = require("./models/user");
const app = express();

app.use(express.json());

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
  console.log("req", req.body);
  // creating new instance of user model
  const user = new User(req.body);
  try {
    await user.save();

    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    } 
    if(data?.skills.length >10){
      throw new Error("Skill cannot be more than 10");
    }
    else {
      const userDetails = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "after",
        runValidators: true,
      });
      if (!userDetails) {
        return res.status(404).send("User not found");
      }
      console.log("userDetails", userDetails);
      res.send("user updated successfully");
    }
  } catch (err) {
    res.send("Unable to update user " + err.message);
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
