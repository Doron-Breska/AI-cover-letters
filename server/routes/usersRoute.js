import express from "express";
import {
  createUser,
  getActiveUser,
  getAllUsers,
  getUserById,
  logIn,
  updateUser,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/id/:id", getUserById);
router.post("/new", multerUpload.single("img"), createUser);
router.post("/login", logIn);
router.put("/update/:id", multerUpload.single("img"), jwtAuth, updateUser);
router.get("/active", jwtAuth, getActiveUser);

export default router;
