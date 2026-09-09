"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHistory = exports.createHistory = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema/schema");
const drizzle_orm_1 = require("drizzle-orm");
const createHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = req.body;
        const newHistory = {
            id: location.id,
            source: location.source,
            destination: location.destination,
        };
        const insert = yield db_1.default.insert(schema_1.SearchHistoryTable).values(newHistory);
        if (insert) {
            res.status(200).json({ msg: "Location added Sucessfully!" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.createHistory = createHistory;
const getUserHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const history = yield db_1.default
            .select()
            .from(schema_1.SearchHistoryTable)
            .where((0, drizzle_orm_1.eq)(schema_1.SearchHistoryTable.id, id)); // Compare with user ID
        if (history.length === 0) {
            res.status(404).json({ message: "No history found for this user" });
            return;
        }
        res.status(200).json(history);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getUserHistory = getUserHistory;
