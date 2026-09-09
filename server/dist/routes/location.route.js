"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const destination_controller_1 = require("../controller/destination.controller");
const router = express_1.default.Router();
router.post("/addLocation", destination_controller_1.addLocation);
router.get("/getLocation", destination_controller_1.getAllLocations);
router.put("/updateLocation/:did", destination_controller_1.updateSearchInfo);
router.put("/updateLocationInfo/:did", destination_controller_1.updateInfo);
router.delete("/deleteLocation/:did", destination_controller_1.deleteDestination);
exports.default = router;
