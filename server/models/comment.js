import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    contnt: { type: String, required: true },
    blog: { type: mongoose.SchemaType.ObjectId, ref: "blogs" },
    author: { type: mongoose.SchemaType.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema, "comments");

export default Comment;
