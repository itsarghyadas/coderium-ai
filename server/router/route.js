import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";

// Importing the controllers
import * as userController from "../controller/user.controller.js";

//! All the POST Methods
router.route("/register").post(userController.register);
router.route("/registerEmail").post(userController.registerEmail);
router.route("/authenticate").post(userController.authenticate);
router.route("/login").post(userController.login);

//! All the GET Methods
router.route("/user/:username").get(userController.getUser);
router.route("/generateOTP").get(userController.generateOTP);
router.route("/verifyOTP").get(userController.verifyOTP);
router.route("/resetSession").get(userController.resetSession);
router.route("/totalTokens").get(userController.totalTokens);
router.route("/loggeduser").get(userController.loggedUser);

//!PUT Methods
router.route("/updateuser").put(Auth, userController.updateUser);
router.route("/resetpassword").put(userController.resetPassword);
router.route("/totalTokens").put(userController.totalTokens);

export default router;
