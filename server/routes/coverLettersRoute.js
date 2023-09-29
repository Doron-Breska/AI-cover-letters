import express from "express";
import {
  createNewLetter,
  deleteCoverLetter,
  getAllLetters,
  getUsersAllLetter,
  saveNewLetter,
} from "../controller/coverLettersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllLetters);
router.get("/user", jwtAuth, getUsersAllLetter); // to get all the cover letters from the active user
router.put("/new", jwtAuth, createNewLetter);
router.post("/save", jwtAuth, saveNewLetter);
router.delete("/:id", jwtAuth, deleteCoverLetter);

export default router;
