import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    contnt: { type: String, required: true },
    blog: { type: mongoose.SchemaType.ObjectId, ref: "Blog" },
    author: { type: mongoose.SchemaType.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema, "comments");

export default Comment;
