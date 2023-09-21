import express from "express";
import {
  deleteCoverLetter,
  getAllLetters,
  getUsersAllLetter,
  saveNewLetter,
} from "../controller/coverLettersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllLetters);
router.get("/user", jwtAuth, getUsersAllLetter);
router.post("/new", jwtAuth, saveNewLetter);
router.delete("/:id", jwtAuth, deleteCoverLetter);

export default router;
