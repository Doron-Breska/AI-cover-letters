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

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://ai-cover-letters-db.vercel.app",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
app.use(cors());

passportConfig();
cloudinaryConfig();

app.use("/api/users", usersRouter);
app.use("/api/c-l", coverLettersRouter);

app.listen(port, () => {
  console.log("server running on port:", port);
});
