import Joi from "joi";
import fs from "fs";
import Blog from "../models/blog.js";
import BlogDto from "../dto/blog.js";
import { BACKEND_SERVER_PATH } from "../config/index.js";

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
  async create(req, res, next) {
    const createBlogSchema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
      content: Joi.string().required(),
      photo: Joi.string().required(),
    });
    const { error } = createBlogSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { title, author, content, photo } = req.body;
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${author}`;
    try {
      fs.writeFileSync("storage/${imagePath}", buffer);
    } catch (error) {
      return next(error);
    }
    let newBlog;
    try {
      newBlog = new Blog({
        title,
        author,
        content,
        photo: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      });
      await newBlog.save();
    } catch (error) {
      return next(error);
    }
    const blogDto = new BlogDto(newBlog);
    res.status(201).json({ blog: blogDto });
  },
  async getAll(req, res, next) {},
  async getById(req, res, next) {},
  async update(req, res, next) {},
  async delete(req, res, next) {},
};
export default blogController;
