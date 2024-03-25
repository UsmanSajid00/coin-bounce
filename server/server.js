import express from "express";
import dbConnect from "./databse/index.js";
import { PORT } from "./config/index.js"; // Assuming PORT is exported as named export
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(router);

dbConnect();

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
