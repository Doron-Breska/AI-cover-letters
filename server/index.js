import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import usersRouter from "../server/routes/usersRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log("server running on port:", port);
});
