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
exports.checkUserExists = void 0;
const schema_1 = require("../schema/schema");
const db_1 = __importDefault(require("../db"));
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
// Middleware to check if user exists
const checkUserExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const jwTtoken = jsonwebtoken_1.default.verify(id, JWT_SECRET);
        if (!jwTtoken) {
            res.status(500).json({ message: "Token Expired !" });
            return;
        }
        // Query the database to check if the user exists
        const user = yield db_1.default
            .select()
            .from(schema_1.UserTable)
            .where((0, drizzle_orm_1.eq)(schema_1.UserTable.id, parseInt(jwTtoken.userId)));
        if (user.length === 0) {
            // If no user is found, send a response and skip further processing
            res.status(400).json({ msg: "No user found" });
            return;
        }
        next(); // Move to the next middleware or route handler
    }
    catch (error) {
        res.status(500).json({ message: "Token Expired!" });
    }
});
exports.checkUserExists = checkUserExists;
