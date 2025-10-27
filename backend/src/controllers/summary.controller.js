import summaryModel from "../models/summary.model.js";
import axios from "axios";

export const summarizedText = async (req, res) => {
    try {
        const { text, wordLimit } = req.body;

        if (!text) {
            return res.status(400).json({
                error: "Text is rquired"
            });
        }

        // HF API
        const HF_API_URL = "https://api-inference.huggingface.co/models/Falconsai/text_summarization";

        const responce = await axios.post(
            HF_API_URL,
            {
                inputs: text
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINFACE_API_KEY}`,

                },
            }
        );

        const summaryText = responce.data[0]?.summary_text || "No summary genrated.";

        const words = summaryText.split(" ");
        let finalSummary = summaryText;
        if (wordLimit && words.length > wordLimit) {
            finalSummary = words.slice(0, wordLimit).join(" ") + "...";
        } 

        const summary = await summaryModel.create({
            orignalText: text,
            summarizedText: finalSummary,
            wordLimit,
        })

        res.json({
            summaryText: summary.summarizedText
        });

    } catch (error) {
        console.error("Summarization error:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to summarize text",
            details: error.response?.data || error.message,
        });

    }
}