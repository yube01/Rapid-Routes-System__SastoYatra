"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const location_route_1 = __importDefault(require("./routes/location.route"));
const history_route_1 = __importDefault(require("./routes/history.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true,
}));
// Root / Health check route
app.get("/", (req, res) => {
    res.send("server running !!");
});
app.use("/auth", auth_route_1.default);
app.use("/location", location_route_1.default);
app.use("/history", history_route_1.default);
// Only listen locally, Vercel runs serverless functions without app.listen
if (!process.env.VERCEL) {
    app.listen(port || 5005, () => {
        console.log(`Server is running on port ${port || 5005}`);
    });
}
exports.default = app;
