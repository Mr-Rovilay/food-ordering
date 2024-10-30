import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute";
import restaurantRoute from "./routes/restaurantRoute";
import menuRoute from "./routes/menuRoute";
import orderRoute from "./routes/orderRoute";
import path from "path";

dotenv.config();

const app = express();

const PORT = 5000;

const DIRNAME = path.resolve();

// default middleware for any mern project
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);

app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
