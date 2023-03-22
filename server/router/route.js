import express from "express";
import * as userController from "../controller/user.controller.js";
import * as chatController from "../controller/chat.controller.js";
import * as paymentController from "../controller/payment.controller.js";
import Auth from "../middleware/auth.js";
import WebhookHandler from "../middleware/expressRaw.js";
import validateRequest from "../middleware/validateReq.js";

const router = express.Router();

//! POST routes
router.post("/register", userController.register);
router.post("/registerEmail", userController.registerEmail);
router.post("/authenticate", userController.authenticate);
router.post("/login", userController.login);
router.post("/webhook", WebhookHandler, paymentController.handleWebhookEvent);
router.post("/checkout", paymentController.createCheckoutSession);
router.post("/chat", validateRequest, chatController.chat);
router.post("/search", chatController.searchGoogle);
router.post("/searchimage", chatController.searchimage);

//! GET routes
router.get("/user/:username", userController.getUser);
router.get("/generateOTP", userController.generateOTP);
router.get("/verifyOTP", userController.verifyOTP);
router.get("/resetSession", userController.resetSession);
router.get("/totalTokens", userController.totalTokens);
router.get("/loggeduser", userController.loggedUser);

//! PUT routes
router.put("/updateuser", Auth, userController.updateUser);
router.put("/resetpassword", userController.resetPassword);
router.put("/totalTokens", userController.totalTokens);

export default router;
