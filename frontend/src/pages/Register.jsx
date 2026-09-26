import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/register', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration sequence failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tech-auth-wrapper {
          min-height: 100vh;
          background: #090602;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(212, 163, 60, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(185, 140, 50, 0.05) 0%, transparent 40%),
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .tech-auth-card {
          width: min(480px, 100%);
          background: rgba(18, 13, 4, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 60, 0.2);
          border-radius: 28px;
          padding: 40px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .tech-auth-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4a33c, transparent);
        }

        .tech-badge {
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
          margin-bottom: 20px;
        }

        .tech-title {
          font-size: 30px;
          font-weight: 800;
          color: #fcf9f2;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .tech-subtitle {
          font-size: 13px;
          color: rgba(252, 249, 242, 0.5);
          margin-bottom: 28px;
          font-weight: 300;
        }

        .tech-input-group {
          margin-bottom: 18px;
        }

        .tech-input-group label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: rgba(252, 249, 242, 0.8);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tech-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .tech-input-icon {
          position: absolute;
          left: 16px;
          color: rgba(212, 163, 60, 0.6);
          width: 18px;
          height: 18px;
        }

        .tech-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(212, 163, 60, 0.2);
          border-radius: 14px;
          padding: 13px 16px 13px 48px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: #fcf9f2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tech-input:focus {
          outline: none;
          border-color: #d4a33c;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 4px rgba(212, 163, 60, 0.15);
        }

        .tech-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #d4a33c 0%, #b8922a 100%);
          color: #090602;
          border: none;
          padding: 15px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          margin-top: 8px;
          box-shadow: 0 10px 25px rgba(212, 163, 60, 0.25);
        }

        .tech-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(212, 163, 60, 0.4);
          background: linear-gradient(135deg, #e5b865 0%, #d4a33c 100%);
        }

        .tech-error {
          background: rgba(185, 56, 45, 0.15);
          border: 1px solid rgba(185, 56, 45, 0.3);
          color: #ff6b6b;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 500;
        }

        .tech-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: rgba(252, 249, 242, 0.5);
        }

        .tech-footer a {
          color: #e5b865;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px dotted #e5b865;
        }
      `}</style>

      <div className="tech-auth-wrapper">
        <div className="tech-auth-card">
          <div className="tech-badge">
            <ShieldCheck size={14} /> Account Initialization
          </div>
          <h1 className="tech-title">Create Account</h1>
          <p className="tech-subtitle">Join our elite real estate management network</p>

          {error && <div className="tech-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="tech-input-group">
              <label>Full Name</label>
              <div className="tech-input-wrapper">
                <User className="tech-input-icon" />
                <input
                  type="text"
                  name="name"
                  className="tech-input"
                  placeholder="Ayan Ghosh"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="tech-input-group">
              <label>Email Address</label>
              <div className="tech-input-wrapper">
                <Mail className="tech-input-icon" />
                <input
                  type="email"
                  name="email"
                  className="tech-input"
                  placeholder="ayan@realestate.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="tech-input-group">
              <label>Phone Number</label>
              <div className="tech-input-wrapper">
                <Phone className="tech-input-icon" />
                <input
                  type="text"
                  name="phone"
                  className="tech-input"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="tech-input-group">
              <label>Password</label>
              <div className="tech-input-wrapper">
                <Lock className="tech-input-icon" />
                <input
                  type="password"
                  name="password"
                  className="tech-input"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="tech-submit-btn" disabled={loading}>
              {loading ? 'Initializing...' : <>Complete Registration <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="tech-footer">
            Already authenticated? <Link to="/login">Access Portal</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;