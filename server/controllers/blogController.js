import Joi from "joi";
import fs from "fs";

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
      photo.replaced(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${author}`;
    try {
      fs.writeFileSync("storages/${imagePath}", buffer);
    } catch (error) {}
  },
  async getAll(req, res, next) {},
  async getById(req, res, next) {},
  async update(req, res, next) {},
  async delete(req, res, next) {},
};
export default blogController;
