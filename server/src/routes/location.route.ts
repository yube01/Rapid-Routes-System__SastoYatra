import express, { Router } from "express";
import {
  addLocation,
  deleteDestination,
  getAllLocations,
  updateInfo,
  updateSearchInfo,
} from "../controller/destination.controller";

const router: Router = express.Router();

router.post("/addLocation", addLocation);
router.get("/getLocation", getAllLocations);
router.put("/updateLocation/:did", updateSearchInfo);
router.put("/updateLocationInfo/:did", updateInfo);
router.delete("/deleteLocation/:did", deleteDestination);

export default router;
