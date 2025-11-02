import summaryModel from "../models/summary.model.js";
import axios from "axios";

export const summarizedText = async (req, res) => {
    
    try {
        const { text, wordLimit } = req.body;
        const userId = req.user?._id || req.body.userId;

        if (!text) {
            return res.status(400).json({
                error: "Text is rquired"
            });
        }

        if(!userId){
            return res.status(400).json({
                error: "User Id is missing"
            })
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

        //user id should be added

        const summary = await summaryModel.create({
            orignalText: text,
            summarizedText: summaryText,
            wordLimit,
            user: userId,
        })

        res.json({
            summaryText: summary.summarizedText,
            id: summary._id,
            createdAt: summary.createdAt,
        })

    } catch (error) {
        console.error("Summarization error:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to summarize text",
            details: error.response?.data || error.message,
        });

    }
}

export const getUserSummaries = async (req,res) =>{
    try {
        const userId = req.user?._id || req.params.userId;

        const summaries = await summaryModel
        .find({user: userId})
        .sort({createdAt: -1});

        res.json(summaries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch summaries"});
        
    }
}

export const deleteSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

   
    const summary = await summaryModel.findById(id);

    if (!summary) {
      return res.status(404).json({ error: "Summary not found" });
    }

    
    if (summary.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this summary" });
    }

    await summaryModel.findByIdAndDelete(id);

    res.json({ message: "Summary deleted successfully" });
  } catch (error) {
    console.error("Delete summary error:", error);
    res.status(500).json({ error: "Failed to delete summary" });
  }
};