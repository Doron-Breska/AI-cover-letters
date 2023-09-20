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

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/id/:id", getUserById);
router.post("/new", createUser);
router.post("/login", logIn);
router.put("/update/:id", updateUser);
router.get("/active", jwtAuth, getActiveUser);

export default router;
