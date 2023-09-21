import express from "express";
import {
  deleteCoverLetter,
  getAllLetters,
  saveNewLetter,
} from "../controller/coverLettersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

// import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllLetters);
router.post("/new", jwtAuth, saveNewLetter);
router.delete("/:id", jwtAuth, deleteCoverLetter);

export default router;
