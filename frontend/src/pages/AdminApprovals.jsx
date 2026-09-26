import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { ShieldAlert, CheckCircle, Trash2, Building2, Sparkles, Home, LogOut } from 'lucide-react';

const AdminApprovals = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token') || localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch all properties for admin verification
        const res = await API.get('/properties/admin/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(res.data.properties || res.data);
      } catch (err) {
        console.error(err);
        // Fallback to general properties endpoint if admin route isn't configured on backend yet
        try {
          const fallbackRes = await API.get('/properties');
          setProperties(fallbackRes.data);
        } catch (fallbackErr) {
          setError(err.response?.data?.message || 'Unable to load properties for administration.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [token]);

  const handleApprove = async (propertyId) => {
    try {
      await API.put(`/properties/admin/approve/${propertyId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((prev) =>
        prev.map((p) => (p._id === propertyId ? { ...p, approved: true } : p))
      );
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Approval sequence failed.');
    }
  };

  const handleDelete = async (propertyId) => {
    if (!window.confirm('Are you sure you want to purge and delete this luxury asset?')) {
      return;
    }

    setDeletingId(propertyId);
    setError('');

    try {
      await API.delete(`/properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((prev) => prev.filter((property) => property._id !== propertyId));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Deletion sequence failed.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#070502', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5b865', fontFamily: 'Plus Jakarta Sans' }}>
        Loading administrative console...
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .admin-page {
          min-height: 100vh;
          background: #070502;
          color: #fcf9f2;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 60px 40px;
        }

        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          background: rgba(18, 13, 4, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 60, 0.25);
          padding: 35px 40px;
          border-radius: 24px;
          margin-bottom: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(212, 163, 60, 0.1);
          border: 1px solid rgba(212, 163, 60, 0.3);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #e5b865;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }

        .admin-title {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          color: #fcf9f2;
          font-weight: 800;
        }

        .admin-title span {
          color: #e5b865;
        }

        .admin-nav-actions {
          display: flex;
          gap: 12px;
        }

        .admin-nav-btn {
          background: rgba(212, 163, 60, 0.15);
          color: #e5b865;
          border: 1px solid rgba(212, 163, 60, 0.4);
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
          text-decoration: none;
          font-size: 13.5px;
        }

        .admin-nav-btn:hover {
          background: rgba(212, 163, 60, 0.25);
        }

        .admin-nav-btn.logout {
          background: rgba(185, 56, 45, 0.2);
          color: #ff6b6b;
          border-color: rgba(185, 56, 45, 0.4);
        }

        .admin-nav-btn.logout:hover {
          background: rgba(185, 56, 45, 0.35);
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 30px;
        }

        .admin-card {
          background: rgba(18, 13, 4, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 163, 60, 0.2);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .admin-card:hover {
          border-color: #d4a33c;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
        }

        .admin-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          background: #080f0b;
        }

        .admin-card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .admin-card h2 {
          font-size: 20px;
          font-family: 'Playfair Display', serif;
          color: #fcf9f2;
          margin-bottom: 8px;
        }

        .admin-meta {
          color: rgba(252, 249, 242, 0.6);
          font-size: 14px;
          margin-bottom: 6px;
        }

        .admin-price {
          font-size: 18px;
          font-weight: 700;
          color: #e5b865;
          margin: 12px 0 20px 0;
        }

        .admin-actions {
          display: flex;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 16px;
        }

        .approve-btn {
          flex: 1;
          background: linear-gradient(135deg, #d4a33c 0%, #b8922a 100%);
          color: #070502;
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
        }

        .approve-btn:hover {
          background: #e5b865;
        }

        .delete-btn {
          background: rgba(185, 56, 45, 0.2);
          color: #ff6b6b;
          border: 1px solid rgba(185, 56, 45, 0.4);
          padding: 12px 18px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 14px;
          transition: 0.2s;
        }

        .delete-btn:hover {
          background: rgba(185, 56, 45, 0.35);
        }

        .error-banner {
          background: rgba(185, 56, 45, 0.15);
          border: 1px solid rgba(185, 56, 45, 0.3);
          color: #ff6b6b;
          padding: 14px;
          border-radius: 12px;
          font-size: 14px;
          margin-bottom: 24px;
          text-align: center;
          font-weight: 500;
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-header">
            <div>
              <div className="admin-badge">
                <Sparkles size={14} /> System Administration
              </div>
              <h1 className="admin-title">Property <span>Management Console</span></h1>
              <p style={{ color: 'rgba(252,249,242,0.5)', marginTop: '6px' }}>
                Review, authenticate, and manage all luxury real estate submissions across the network.
              </p>
            </div>
            <div className="admin-nav-actions">
              <button className="admin-nav-btn" onClick={() => navigate('/')}>
                <Home size={16} /> Home Portal
              </button>
              <button className="admin-nav-btn logout" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {error && <div className="error-banner">{error}</div>}

          {properties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(18,13,4,0.4)', borderRadius: '24px', border: '1px solid rgba(212,163,60,0.2)' }}>
              <Building2 size={48} style={{ color: '#d4a33c', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '22px', marginBottom: '8px', fontFamily: 'Playfair Display' }}>No properties found</h3>
              <p style={{ color: 'rgba(252,249,242,0.5)' }}>The database currently contains no real estate listings.</p>
            </div>
          ) : (
            <div className="admin-grid">
              {properties.map((property) => (
                <div className="admin-card" key={property._id}>
                  <img 
                    src={property.image?.startsWith('http') ? property.image : `http://localhost:5002${property.image}`} 
                    alt={property.title} 
                  />
                  <div className="admin-card-content">
                    <div>
                      <h2>{property.title}</h2>
                      <p className="admin-meta">📍 {property.location}</p>
                      <p className="admin-meta">
                        Status: <span style={{ color: property.approved ? '#4ade80' : '#facc15', fontWeight: '600' }}>
                          {property.approved ? 'Verified & Active' : 'Pending Review'}
                        </span>
                      </p>
                      <div className="admin-price">
                        ₹ {Number(property.price || 0).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="admin-actions">
                      {!property.approved && (
                        <button className="approve-btn" onClick={() => handleApprove(property._id)}>
                          <CheckCircle size={16} /> Approve
                        </button>
                      )}
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(property._id)}
                        disabled={deletingId === property._id}
                      >
                        <Trash2 size={16} /> {deletingId === property._id ? 'Purging...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminApprovals;