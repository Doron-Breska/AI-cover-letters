import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  logIn,
} from "../controller/usersController.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/id/:id", getUserById);
router.post("/new", createUser);
router.post("/login", logIn);

export default router;
