import express, { Router } from "express";
import {
  addLocation,
  getAllLocations,
  updateSearchInfo,
} from "../controller/destination.controller";

const router: Router = express.Router();

router.post("/addLocation", addLocation);
router.get("/getLocation", getAllLocations);
router.put("/updateLocation/:did", updateSearchInfo);

export default router;
