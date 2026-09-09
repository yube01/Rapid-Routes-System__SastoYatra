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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = require("../schema/schema");
const JWT_SECRET = process.env.JWT_SECRET;
const tokenExpires = new Date(Date.now() + 10 * 60 * 1000);
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const users = yield db_1.default
            .select()
            .from(schema_1.UserTable)
            .where((0, drizzle_orm_1.eq)(schema_1.UserTable.email, newUser.email));
        const hashedPassword = yield bcrypt_1.default.hash(newUser.password, 5);
        if (users.length > 0) {
            const user = users[0];
            res.status(400).json({ msg: "Email is already registered" });
            return;
        }
        const newUserData = {
            fullName: newUser.fullName,
            email: newUser.email,
            password: hashedPassword,
        };
        const [insertedUser] = yield db_1.default
            .insert(schema_1.UserTable)
            .values(newUserData)
            .returning({ insertedId: schema_1.UserTable.id });
        const userId = insertedUser;
        if (insertedUser) {
            res
                .status(200)
                .json({ msg: "User added Sucessfully!", users: insertedUser });
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
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Fetch user with the given email
        const users = yield db_1.default
            .select()
            .from(schema_1.UserTable)
            .where((0, drizzle_orm_1.eq)(schema_1.UserTable.email, email));
        // Check if a user exists with the given email
        if (users.length === 0) {
            res.status(401).json({ message: "User doesn't exist!" });
            return;
        }
        const user = users[0];
        // Compare the password with the stored password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Incorrect Password!" });
            return;
        }
        // Generate JWT token for the user
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "30d",
        });
        // Return the token as a response
        res
            .status(200)
            .json({
            token: token,
            user: user.fullName,
            id: user.id,
            isAdmin: user.isAdmin,
        });
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
exports.login = login;
