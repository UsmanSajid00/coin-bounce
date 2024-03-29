import express from "express";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

//user
//register
router.post("/register", authController.register);

//login
router.post("/login", authController.login);

//logout
router.post("/logout", auth, authController.logout);

//refresh
router.post("/refresh", authController.refresh);

//blog
//crud
//create
//read all blog
//read blogs by Id
//update
//delete

//comment
// create comment
// read comment by blog id

export default router;
