import express from "express";
import { getAllLetters } from "../controller/coverLettersController.js";

// import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllLetters);

export default router;
