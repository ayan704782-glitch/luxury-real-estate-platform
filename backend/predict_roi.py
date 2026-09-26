import sys
import json

def calculate_roi(sqft, price, location):
    # Base appreciation factor based on location tier
    location_multiplier = 1.2 if "mumbai" in location.lower() or "delhi" in location.lower() else 1.1
    
    # Calculate estimated 5-year future value & annual ROI percentage
    current_price = float(price)
    estimated_future_value = current_price * (location_multiplier ** 5)
    projected_roi_percent = ((estimated_future_value - current_price) / current_price) * 100
    
    # Risk score assessment
    risk_score = "Low Risk (High Demand Area)" if projected_roi_percent > 40 else "Moderate Risk"

    result = {
        "currentPrice": current_price,
        "estimatedFutureValue": round(estimated_future_value, 2),
        "projectedRoi": round(projected_roi_percent, 2),
        "riskAssessment": risk_score
    }
    return result

if __name__ == "__main__":
    # Expecting inputs: sqft, price, location from Node.js
    input_sqft = sys.argv[1]
    input_price = sys.argv[2]
    input_location = sys.argv[3]
    
    output = calculate_roi(input_sqft, input_price, input_location)
    print(json.dumps(output))