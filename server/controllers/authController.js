import Joi from "joi";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const authController = {
  async register(req, res, next) {
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { username, name, email, password } = req.body;
    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });
      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email already in use",
        };
        return next(error);
      }
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username already in use",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userToRegister = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });

    const user = await userToRegister.save();
    return res.status(200).json({ user });
  },

  async login() {},

  async logout() {},

  async refresh() {},
};

export default authController;
