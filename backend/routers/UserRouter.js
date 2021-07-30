const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

//Middlewares
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAuth = require("../middlewares/isAuth")

//Post register user
router.post("/api/auth/register", UserController.postRegisterUser);

//Post login user
router.post("/api/auth/login", UserController.postLoginUser)

//Get user information
router.get("/api/user", isLoggedIn, isAuth, UserController.getUserInformation)

//Post send new message
router.post("/api/message/create", isLoggedIn, isAuth, UserController.postStartAnewConveration)

//Get a converastion
router.get("/api/conversation/:id", isLoggedIn, isAuth, UserController.getOneConversation)

module.exports = router;