import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route";
import locationRoute from "./routes/location.route";
import historyRoute from "./routes/history.route";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Root / Health check route
app.get("/", (req, res) => {
  res.send("server running !!");
});

app.use("/auth", authRoute);
app.use("/location", locationRoute);
app.use("/history", historyRoute);

// Only listen locally, Vercel runs serverless functions without app.listen
if (!process.env.VERCEL) {
  app.listen(port || 5005, () => {
    console.log(`Server is running on port ${port || 5005}`);
  });
}

export default app;

