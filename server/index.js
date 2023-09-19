import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import router from "./routes/testRoute.js";
// import router from "./routes/testroute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log("server running on port:", port);
});
