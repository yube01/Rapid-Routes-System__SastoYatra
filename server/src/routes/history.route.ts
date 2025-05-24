import express, { Router } from "express";
import {
  createHistory,
  getUserHistory,
} from "../controller/history.controller";

const router: Router = express.Router();

router.post("/createHistory", createHistory);
router.get("/getHistory/:id", getUserHistory);

export default router;
