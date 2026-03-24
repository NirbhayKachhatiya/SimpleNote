import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json()); //to parse json bodies
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDb().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
});