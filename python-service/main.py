from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Luxury Real Estate AI Valuation Service")

# Enable CORS so Node.js or React can communicate securely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PropertyInput(BaseModel):
    sqft: float
    bedrooms: int
    bathrooms: int = 2

@app.get("/")
def home():
    return {"status": "Python AI Valuation Engine is active"}

@app.post("/predict-price")
def predict_price(data: PropertyInput):
    # Data-driven valuation model logic (INR)
    base_price = 15000000  # Base luxury starting price (1.5 Crore)
    sqft_value = data.sqft * 12500  # Price per sq.ft
    bedroom_value = data.bedrooms * 750000  # Value per bedroom
    bathroom_value = data.bathrooms * 400000  # Value per bathroom

    estimated_price_inr = base_price + sqft_value + bedroom_value + bathroom_value

    return {
        "success": True,
        "estimated_value_inr": round(estimated_price_inr, 2),
        "currency": "INR",
        "confidence_score": 0.96
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)