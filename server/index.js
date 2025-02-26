import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import dalleRoutes from "./routes/dalle.routes.js"; // ✅ Import DALL·E AI route

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/dalle", dalleRoutes); // ✅ Use DALL·E AI route

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER HAS STARTED ON PORT ${PORT}`));
