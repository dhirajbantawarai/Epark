const express = require("express");
const userrouter = express.Router();
const usersController = require("../controllers/usercontroller");

userrouter.get("/:id",usersController.getusersbyid);
userrouter.post("/login",usersController.authenticate);

module.exports = userrouter;