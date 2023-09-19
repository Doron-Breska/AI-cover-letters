import express from "express";
import { createUser, getAllUsers } from "../controller/usersController.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.post("/new", createUser);

export default router;
