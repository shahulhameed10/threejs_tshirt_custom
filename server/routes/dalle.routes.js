import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt,
                n: 1, // Number of images to generate
                size: "1024x1024" // Image size options: 256x256, 512x512, or 1024x1024
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Extract image URL from response
        const imageUrl = response.data?.data?.[0]?.url;

        if (!imageUrl) {
            return res.status(500).json({ error: "Failed to retrieve image URL" });
        }

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("DALL·E Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || "Failed to generate image" });
    }
});

export default router;
