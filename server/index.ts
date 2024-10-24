import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// default middleware for any mern project
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));


  app.use("/api/user", userRoute);


  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  }).catch(err => {
    console.error("Failed to connect to the database", err);
  });