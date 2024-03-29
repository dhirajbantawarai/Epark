const express = require("express");
const userrouter = express.Router();
const usersController = require("../controllers/usercontroller");

userrouter.get("/id/:id",usersController.getusersbyid);
userrouter.get("/all/",usersController.getAllUsers);
userrouter.put("/:id",usersController.updateUser);
userrouter.post("/",usersController.createuser);
userrouter.post("/login",usersController.authenticate);
userrouter.get("/mail/:mail",usersController.getusersbymail);
userrouter.post("/answer/:id",usersController.checkanswer);
userrouter.delete("/:id",usersController.deleteUserById);

module.exports = userrouter;