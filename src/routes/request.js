const expires = require("express");
const { userAuth } = require("../middlewares/auht");

const requestRouter = expires.Router();



requestRouter.post("/sendConnectionreq", userAuth, async (req, res) => {
  try {
    res.send(`Connection request sent to ${req.user.firstName}`);
  } catch (err) {
    res.send("ERROR :" + err.message);
  }
});


module.exports = requestRouter;