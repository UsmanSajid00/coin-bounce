import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

//user
//register
router.post("/register", authController.register);

//login
router.post("/login", authController.login);

//logout

//refresh

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
