const express = require("express");
const userRouter = express.Router();

const LoginUser = require("../controller/Users/LoginUser");
userRouter.post("/login", LoginUser);

const NewUser = require("../controller/Users/NewUser");
userRouter.post("/create-user", NewUser);

module.exports = userRouter;
