import Joi from "joi";
import fs from "fs";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import BlogDto from "../dto/blog.js";
import BlogDetailsDto from "../dto/blogDetails.js";
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
    //read as buffer
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${author}.png`;
    // save locally
    try {
      fs.writeFileSync(`storage/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }
    //save blog in DB
    let newBlog;
    try {
      newBlog = new Blog({
        title,
        author,
        content,
        photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      });
      await newBlog.save();
    } catch (error) {
      return next(error);
    }
    const blogDto = new BlogDto(newBlog);
    return res.status(201).json({ blog: blogDto });
  },
  async getAll(req, res, next) {
    try {
      const blogs = await Blog.find({});
      const blogDto = [];
      for (let i = 0; i < blogs.length; i++) {
        const dto = new BlogDto(blogs[i]);
        blogDto.push(dto);
      }
      return res.status(200).json({ blogs: blogDto });
    } catch (error) {
      return next(error);
    }
  },
  async getById(req, res, next) {
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });
    const { error } = getByIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const { id } = req.params;
    try {
      const blog = await Blog.findOne({ _id: id }).populate("author");
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      const blogDto = new BlogDetailsDto(blog);
      return res.status(200).json({ blog: blogDto });
    } catch (error) {
      return next(error);
    }
  },
  async update(req, res, next) {
    const updateBlogSchema = Joi.object({
      title: Joi.string(),
      content: Joi.string(),
      author: Joi.string().regex(mongodbIdPattern).required(),
      blogId: Joi.string().regex(mongodbIdPattern).required(),
      photo: Joi.string(),
    });
    const { error } = updateBlogSchema.validate(req.body);
    if (error) return res.status(400).json(error);

    const { title, content, author, blogId, photo } = req.body;

    let blog;
    try {
      blog = await Blog.findOne({ _id: blogId });
    } catch (error) {
      return next(error);
    }

    if (photo) {
      let previousPhoto = blog.photoPath;
      if (previousPhoto) {
        previousPhoto = previousPhoto.split("/").at(-1);
        fs.unlinkSync(`storage/${previousPhoto}`);
      }
      // read as buffer
      const buffer = Buffer.from(
        photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );
      const imagePath = `${Date.now()}-${author}.png`;
      // save locally
      try {
        fs.writeFileSync(`storage/${imagePath}`, buffer);
      } catch (error) {
        return next(error);
      }

      await Blog.updateOne(
        { _id: blogId },
        {
          title,
          content,
          photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
        }
      );
    } else {
      await Blog.updateOne(
        { _id: blogId },
        {
          title,
          content,
        }
      );
    }
    return res.status(200).json({ message: "Blog updated successfully" });
  },
  async delete(req, res, next) {
    const deleteBlogSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });
    const { error } = deleteBlogSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    try {
      await Blog.deleteOne({ _id: id });
      await Comment.deleteMany({ blog: id });
    } catch (error) {
      return next(error);
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  },
};
export default blogController;
