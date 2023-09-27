const express = require("express");
const router = express.Router();

const userRouter = require("./UsersRoute");
const roomRouter = require("./RoomsRoute");

router.get("/", function (req, res) {
    res.send("Hello World");
});

router.use(userRouter);

router.use(roomRouter);

module.exports = router;
