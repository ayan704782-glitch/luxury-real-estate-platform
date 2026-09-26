import axios from 'axios';

// Forward request to Python FastAPI microservice
export const getAiValuation = async (req, res) => {
    try {
        const { sqft, bedrooms, bathrooms } = req.body;

        if (!sqft || !bedrooms) {
            return res.status(400).json({ error: "Square footage and bedrooms are required for AI valuation." });
        }

        // Call your running Python FastAPI microservice on port 8000
        const pythonResponse = await axios.post('http://127.0.0.1:8000/predict-price', {
            sqft: Number(sqft),
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms || 2)
        });

        return res.status(200).json(pythonResponse.data);
    } catch (error) {
        console.error("AI Service Bridge Error:", error.message);
        return res.status(500).json({ error: "Failed to connect to Python AI valuation microservice." });
    }
};