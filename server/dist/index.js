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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const auth_route_1 = __importDefault(require("../src/routes/auth.route"));
const location_route_1 = __importDefault(require("../src/routes/location.route"));
const history_route_1 = __importDefault(require("../src/routes/history.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/auth", auth_route_1.default);
app.use("/location", location_route_1.default);
app.use("/history", history_route_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Server is running on port ${port}`);
        console.log(db_1.default.query);
        app.get("/", (req, res) => {
            res.send("server running !!");
        });
    }
    catch (error) {
        console.log("Error");
    }
}));
