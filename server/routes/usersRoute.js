import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controller/usersController.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.post("/new", createUser);

export default router;
