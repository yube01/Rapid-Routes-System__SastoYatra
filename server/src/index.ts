import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import db from "./db";
import authRoute from "../src/routes/auth.route";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);

app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    console.log(db.query);

    app.get("/", (req, res) => {
      res.send("server running !!");
    });
  } catch (error) {
    console.log("Error");
  }
});
