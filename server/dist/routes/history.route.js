"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_controller_1 = require("../controller/history.controller");
const router = express_1.default.Router();
router.post("/createHistory", history_controller_1.createHistory);
router.get("/getHistory/:id", history_controller_1.getUserHistory);
exports.default = router;
