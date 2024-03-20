import express from "express";
import dbConnect from "./databse/index.js";
import { PORT } from "./config/index.js"; // Assuming PORT is exported as named export

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

dbConnect();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
