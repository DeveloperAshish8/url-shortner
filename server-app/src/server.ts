import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";
import user from "./routes/user";
import cookieParser from "cookie-parser";
dotenv.config();

connectDb();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/", shortUrl);
app.use("/api/user", user);

app.listen(port, () => {
  console.log("Server is up");
});
