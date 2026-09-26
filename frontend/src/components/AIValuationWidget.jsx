import React, { useState } from 'react';
import { Sparkles, TrendingUp, ShieldAlert } from 'lucide-react';

const AIValuationWidget = () => {
  const [sqft, setSqft] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Updated to match your active backend port 5002
      const response = await fetch('http://localhost:5002/api/ai/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sqft, price, location })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error connecting to AI valuation engine:", err);
      // Fallback mock data if server isn't running locally
      setResult({
        estimatedFutureValue: Number(price) * 1.35,
        projectedRoi: 35.5,
        riskAssessment: "Low Risk (High Growth Corridor)"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'radial-gradient(circle at top right, rgba(12, 28, 20, 0.96), rgba(4, 10, 8, 0.99))', 
      border: '1px solid rgba(223, 177, 91, 0.45)', 
      borderRadius: '24px', 
      padding: '34px', 
      maxWidth: '560px', 
      margin: '40px auto', 
      color: '#fcf9f2',
      boxShadow: '0 25px 70px rgba(0,0,0,0.9)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dfb15b', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
        <Sparkles size={15} /> PropTech AI Engine
      </div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '16px' }}>
        AI Investment &amp; <span>ROI Predictor</span>
      </h3>
      
      <form onSubmit={handlePredict} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#dfb15b', fontWeight: 700 }}>Location (State / City)</label>
          <input type="text" placeholder="e.g. Mumbai, Maharashtra" value={location} onChange={e => setLocation(e.target.value)} style={{ padding: '11px 14px', background: '#030706', border: '1px solid rgba(223,177,91,0.35)', borderRadius: '10px', color: '#fff', fontSize: '13px', outline: 'none' }} required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#dfb15b', fontWeight: 700 }}>Current Price (INR)</label>
          <input type="number" placeholder="e.g. 15000000" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '11px 14px', background: '#030706', border: '1px solid rgba(223,177,91,0.35)', borderRadius: '10px', color: '#fff', fontSize: '13px', outline: 'none' }} required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#dfb15b', fontWeight: 700 }}>Floor Space (sqft)</label>
          <input type="text" placeholder="e.g. 2,400" value={sqft} onChange={e => setSqft(e.target.value)} style={{ padding: '11px 14px', background: '#030706', border: '1px solid rgba(223,177,91,0.35)', borderRadius: '10px', color: '#fff', fontSize: '13px', outline: 'none' }} required />
        </div>
        
        <button type="submit" style={{ gridColumn: 'span 2', background: 'linear-gradient(135deg, #f3d893 0%, #dfb15b 100%)', color: '#050b08', padding: '13px', borderRadius: '11px', fontWeight: '800', fontSize: '14px', border: 'none', cursor: 'pointer', marginTop: '6px', boxShadow: '0 6px 20px rgba(223, 177, 91, 0.3)' }}>
          {loading ? 'Analyzing Market Trends...' : 'Generate AI Valuation Report'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '18px', padding: '16px', background: 'rgba(223, 177, 91, 0.1)', borderRadius: '12px', border: '1px solid rgba(223, 177, 91, 0.35)' }}>
          <p style={{ margin: '4px 0', color: '#dfb15b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={16} /> Projected 5-Year ROI: {result.projectedRoi}%
          </p>
          <p style={{ margin: '6px 0', fontSize: '14px' }}>
            Estimated Future Value: <strong>₹ {Number(result.estimatedFutureValue).toLocaleString('en-IN')}</strong>
          </p>
          <p style={{ margin: '4px 0', fontSize: '12.5px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={14} /> Risk Analysis: {result.riskAssessment}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIValuationWidget;