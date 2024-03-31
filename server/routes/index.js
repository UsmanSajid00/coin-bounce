import express from "express";
import authController from "../controllers/authController.js";
import blogController from "../controllers/blogController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

//user authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.get("/refresh", authController.refresh);

//blog routes
router.post("/blog", auth, blogController.create);
router.get("/blog/all", auth, blogController.getAll);
router.get("/blog/:id", auth, blogController.getById);
router.put("/blog", auth, blogController.update);
router.delete("/blog", auth, blogController.delete);

//comment
// create comment
// read comment by blog id

export default router;
