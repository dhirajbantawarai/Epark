const express = require("express");
const userrouter = express.Router();
const usersController = require("../controllers/usercontroller");

userrouter.get("/:id",usersController.getusersbyid);

module.exports = userrouter;