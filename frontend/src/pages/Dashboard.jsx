import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Building2, PlusCircle, Trash2, LogOut, Home } from 'lucide-react';

const Dashboard = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken') || localStorage.getItem('jwt');
        
        // Fixed: Changed from '/properties/my-listings' to '/properties/my/listings' to match backend routes
        const res = await API.get('/properties/my/listings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserProperties(res.data.properties || res.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load your portfolio listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken') || localStorage.getItem('jwt');
        
        await API.delete(`/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserProperties(userProperties.filter((p) => p._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete property.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        .dash-page {
          min-height: 100vh;
          background: #090602;
          background-image: 
            radial-gradient(circle at 12% 18%, rgba(12, 45, 30, 0.55) 0%, transparent 48%),
            radial-gradient(circle at 88% 82%, rgba(223, 177, 91, 0.1) 0%, transparent 42%);
          color: #fcf9f2;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 40px 30px;
        }
        .dash-container {
          max-width: 1300px;
          margin: 0 auto;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(18, 13, 4, 0.8);
          border: 1px solid rgba(212, 163, 60, 0.2);
          padding: 30px 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          backdrop-filter: blur(10px);
          flex-wrap: wrap;
          gap: 20px;
        }
        .dash-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: #fcf9f2;
        }
        .dash-title span {
          color: #e5b865;
        }
        .dash-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .dash-btn {
          background: #d4a33c;
          color: #090602;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
          text-decoration: none;
          font-size: 14px;
        }
        .dash-btn:hover {
          background: #e5b865;
          transform: translateY(-1px);
        }
        .dash-btn.outline {
          background: transparent;
          border: 1px solid rgba(212, 163, 60, 0.4);
          color: #e5b865;
        }
        .dash-btn.outline:hover {
          background: rgba(212, 163, 60, 0.1);
        }
        .dash-btn.logout {
          background: rgba(185, 56, 45, 0.2);
          color: #ff6b6b;
          border: 1px solid rgba(185, 56, 45, 0.4);
        }
        .dash-btn.logout:hover {
          background: rgba(185, 56, 45, 0.3);
        }
        .dash-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .dash-card {
          background: rgba(18, 13, 4, 0.6);
          border: 1px solid rgba(212, 163, 60, 0.15);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          transition: transform 0.3s ease;
        }
        .dash-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 163, 60, 0.4);
        }
        .dash-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          background: #080f0b;
        }
        .dash-card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .dash-card h3 {
          font-size: 20px;
          margin-bottom: 8px;
          color: #fcf9f2;
          font-family: 'Playfair Display', serif;
        }
        .dash-card p {
          color: rgba(252, 249, 242, 0.6);
          font-size: 14px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dash-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 16px;
        }
        .price {
          font-size: 18px;
          font-weight: 700;
          color: #e5b865;
        }
        .delete-btn {
          background: rgba(185, 56, 45, 0.2);
          color: #ff6b6b;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          transition: 0.2s;
        }
        .delete-btn:hover {
          background: rgba(185, 56, 45, 0.35);
        }
      `}</style>

      <div className="dash-page">
        <div className="dash-container">
          <div className="dash-header">
            <div>
              <h1 className="dash-title">Executive <span>Dashboard</span></h1>
              <p style={{ color: 'rgba(252,249,242,0.5)', marginTop: '4px' }}>Manage your real estate portfolio and submissions</p>
            </div>
            <div className="dash-actions">
              <button className="dash-btn outline" onClick={() => navigate('/')}>
                <Home size={18} /> Home Portal
              </button>
              <button className="dash-btn" onClick={() => navigate('/add-property')}>
                <PlusCircle size={18} /> Post Property
              </button>
              <button className="dash-btn logout" onClick={handleLogout}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {loading && <div style={{ textAlign: 'center', padding: '60px', color: '#8c7e66' }}>Loading portfolio data...</div>}
          {error && <div style={{ textAlign: 'center', padding: '60px', color: '#ff6b6b' }}>{error}</div>}

          {!loading && !error && userProperties.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(18,13,4,0.4)', borderRadius: '20px', border: '1px solid rgba(212,163,60,0.1)' }}>
              <Building2 size={48} style={{ color: '#d4a33c', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No properties listed yet</h3>
              <p style={{ color: 'rgba(252,249,242,0.5)', marginBottom: '20px' }}>Publish your first luxury asset to begin tracking performance.</p>
              <button className="dash-btn" style={{ margin: '0 auto' }} onClick={() => navigate('/add-property')}>
                <PlusCircle size={18} /> Post New Listing
              </button>
            </div>
          )}

          <div className="dash-grid">
            {userProperties.map((property) => (
              <div className="dash-card" key={property._id}>
                <img 
                  src={property.image?.startsWith('http') ? property.image : `http://localhost:5002${property.image}`} 
                  alt={property.title} 
                />
                <div className="dash-card-content">
                  <div>
                    <h3>{property.title}</h3>
                    <p>📍 {property.location}</p>
                  </div>
                  <div className="dash-card-footer">
                    <span className="price">₹ {Number(property.price || 0).toLocaleString('en-IN')}</span>
                    <button className="delete-btn" onClick={() => handleDelete(property._id)}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;