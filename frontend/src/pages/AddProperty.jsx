import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { PlusCircle, CheckCircle2, Crown, AlertCircle } from 'lucide-react';

const AddProperty = () => {
  const navigate = useNavigate();
  const [propTitle, setPropTitle] = useState('');
  const [propDetails, setPropDetails] = useState(''); // Fixed: Renamed from propDesc to propDetails
  const [propPrice, setPropPrice] = useState('');
  const [propAddress, setPropAddress] = useState('');   // Added: Required by backend
  const [propLocation, setPropLocation] = useState('');
  const [propType, setPropType] = useState('Luxury Villa');
  const [propBeds, setPropBeds] = useState('');
  const [propBaths, setPropBaths] = useState('');
  const [propLivingRooms, setPropLivingRooms] = useState('1'); // Added default
  const [propKitchen, setPropKitchen] = useState('1');         // Added default
  const [propParking, setPropParking] = useState('1');         // Added default
  const [propSqft, setPropSqft] = useState('');
  const [propImageFile, setPropImageFile] = useState(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken') || localStorage.getItem('jwt');
      
      const formData = new FormData();
      formData.append('title', propTitle);
      formData.append('details', propDetails); // Fixed: Matches backend required 'details' field
      formData.append('price', propPrice);
      formData.append('address', propAddress || propLocation); // Fallback to location if address empty
      formData.append('location', propLocation);
      formData.append('propertyType', propType);
      formData.append('bedrooms', propBeds || 1);
      formData.append('livingRooms', propLivingRooms);
      formData.append('bathrooms', propBaths || 1);
      formData.append('kitchen', propKitchen);
      formData.append('parking', propParking);
      formData.append('floorSpace', propSqft || 1000);
      
      if (propImageFile) {
        formData.append('image', propImageFile);
      } else {
        // Fallback default high-end image if none selected
        formData.append('image', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
      }

      // Submit to backend properties endpoint with authorization header
      await API.post('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard to view your new listing
      }, 1800);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to publish property listing. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .add-property-page {
          background-color: #030706;
          background-image: 
            radial-gradient(circle at 15% 20%, rgba(12, 45, 30, 0.45) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(223, 177, 91, 0.08) 0%, transparent 40%),
            linear-gradient(to right, rgba(223, 177, 91, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(223, 177, 91, 0.03) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 55px 55px, 55px 55px;
          color: #fcf9f2;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          width: 100%;
          padding: 40px 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .submit-container {
          width: 100%;
          max-width: 650px;
          background: radial-gradient(circle at top right, rgba(12, 28, 20, 0.96), rgba(3, 8, 6, 0.99));
          backdrop-filter: blur(25px);
          border: 1px solid rgba(223, 177, 91, 0.4);
          border-radius: 24px;
          padding: 32px 38px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(223, 177, 91, 0.04);
          box-sizing: border-box;
        }

        .page-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 800;
          color: #fcf9f2;
          margin-bottom: 4px;
        }

        .page-title span {
          color: #dfb15b;
          font-style: italic;
        }

        .page-subtitle {
          font-size: 12px;
          color: rgba(252, 249, 242, 0.65);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-group label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.1px;
          color: #dfb15b;
          font-weight: 700;
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
          background: rgba(3, 7, 6, 0.92);
          border: 1px solid rgba(223, 177, 91, 0.35);
          border-radius: 10px;
          padding: 10px 14px;
          color: #fcf9f2;
          font-size: 13px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
          width: 100%;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 60px;
        }

        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          border-color: #dfb15b;
          box-shadow: 0 0 12px rgba(223, 177, 91, 0.3);
        }

        .form-group select option {
          background: #050b08;
          color: #fcf9f2;
        }

        .file-upload-box {
          grid-column: span 2;
          border: 1px dashed rgba(223, 177, 91, 0.4);
          border-radius: 10px;
          padding: 10px 14px;
          background: rgba(3, 7, 6, 0.6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(252, 249, 242, 0.7);
        }

        .file-upload-box input[type="file"] {
          color: #dfb15b;
          font-size: 12px;
        }

        .submit-btn {
          grid-column: span 2;
          background: linear-gradient(135deg, #f3d893 0%, #dfb15b 100%);
          color: #050b08;
          border: none;
          padding: 13px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.3s;
          box-shadow: 0 6px 20px rgba(223, 177, 91, 0.3);
          margin-top: 4px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          background: #f7e2a6;
          box-shadow: 0 10px 30px rgba(223, 177, 91, 0.5);
        }

        .success-banner {
          background: rgba(46, 133, 64, 0.2);
          border: 1px solid #2e8540;
          color: #7ee094;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 13px;
        }

        .error-banner {
          background: rgba(185, 56, 45, 0.2);
          border: 1px solid rgba(185, 56, 45, 0.4);
          color: #ff6b6b;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 13px;
        }
      `}</style>

      <div className="add-property-page">
        <div className="submit-container">
          <div className="page-header">
            <span style={{ color: '#dfb15b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
              <Crown size={14} /> Admin Asset Portal
            </span>
            <h1 className="page-title">List a New <span>Estate</span></h1>
            <p className="page-subtitle">Publish your architectural masterpiece or modern residence live.</p>
          </div>

          {isSubmitted && (
            <div className="success-banner">
              <CheckCircle2 size={18} />
              <span>Success! Your property listing has been published to the database.</span>
            </div>
          )}

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group full-width">
              <label>Property Title</label>
              <input 
                type="text" 
                placeholder="e.g. The Grand Royale Skyline Residence" 
                value={propTitle}
                onChange={(e) => setPropTitle(e.target.value)}
                required 
              />
            </div>

            <div className="form-group full-width">
              <label>Details / Description</label>
              <textarea 
                placeholder="Provide architectural highlights and amenities..." 
                value={propDetails}
                onChange={(e) => setPropDetails(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Price (INR)</label>
              <input 
                type="number" 
                placeholder="e.g. 65000000" 
                value={propPrice}
                onChange={(e) => setPropPrice(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Location / City</label>
              <input 
                type="text" 
                placeholder="e.g. Mumbai, Maharashtra" 
                value={propLocation}
                onChange={(e) => setPropLocation(e.target.value)}
                required 
              />
            </div>

            <div className="form-group full-width">
              <label>Street Address</label>
              <input 
                type="text" 
                placeholder="e.g. 42 Luxury Avenue, Bandra West" 
                value={propAddress}
                onChange={(e) => setPropAddress(e.target.value)}
                required 
              />
            </div>

            <div className="form-group full-width">
              <label>Property Type</label>
              <select value={propType} onChange={(e) => setPropType(e.target.value)}>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Apartment">Modern Apartment</option>
                <option value="Independent House">Independent House</option>
              </select>
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <input 
                type="number" 
                placeholder="e.g. 4" 
                value={propBeds}
                onChange={(e) => setPropBeds(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input 
                type="number" 
                placeholder="e.g. 5" 
                value={propBaths}
                onChange={(e) => setPropBaths(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Living Rooms</label>
              <input 
                type="number" 
                placeholder="e.g. 2" 
                value={propLivingRooms}
                onChange={(e) => setPropLivingRooms(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Kitchens</label>
              <input 
                type="number" 
                placeholder="e.g. 1" 
                value={propKitchen}
                onChange={(e) => setPropKitchen(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Parking Spaces</label>
              <input 
                type="number" 
                placeholder="e.g. 3" 
                value={propParking}
                onChange={(e) => setPropParking(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Floor Space (Sqft)</label>
              <input 
                type="number" 
                placeholder="e.g. 3500" 
                value={propSqft}
                onChange={(e) => setPropSqft(e.target.value)}
                required
              />
            </div>

            <div className="file-upload-box">
              <span>Property Image File</span>
              <input 
                type="file" 
                onChange={(e) => setPropImageFile(e.target.files[0])} 
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              <PlusCircle size={17} /> {loading ? 'Publishing to Database...' : 'Publish Listing'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;