import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import usersRouter from "../server/routes/usersRoute.js";
import coverLettersRouter from "../server/routes/coverLettersRoute.js";
import { passportConfig } from "./config/passport.js";
import cloudinaryConfig from "./config/cloudinary.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

passportConfig();
cloudinaryConfig();

app.use("/api/users", usersRouter);
app.use("/api/c-l", coverLettersRouter);

app.listen(port, () => {
  console.log("server running on port:", port);
});
