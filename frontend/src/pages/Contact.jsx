import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-page {
          min-height: calc(100vh - 70px);
          background: #090602;
          background-image: 
            radial-gradient(circle at 15% 20%, rgba(212, 163, 60, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(185, 140, 50, 0.05) 0%, transparent 45%);
          color: #fcf9f2;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 60px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-container {
          width: 100%;
          max-width: 900px;
          background: rgba(18, 13, 4, 0.8);
          border: 1px solid rgba(212, 163, 60, 0.25);
          border-radius: 24px;
          padding: 50px;
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.7);
        }

        .contact-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .contact-badge {
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
          margin-bottom: 16px;
        }

        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          color: #fcf9f2;
          margin-bottom: 10px;
        }

        .contact-title span {
          color: #e5b865;
        }

        .contact-subtitle {
          color: rgba(252, 249, 242, 0.6);
          font-size: 15px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-container { padding: 30px 20px; }
        }

        .contact-info-box {
          display: flex;
          flex-direction: column;
          gap: 24px;
          justify-content: center;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .info-icon-wrap {
          background: rgba(212, 163, 60, 0.1);
          border: 1px solid rgba(212, 163, 60, 0.3);
          padding: 12px;
          border-radius: 12px;
          color: #e5b865;
          flex-shrink: 0;
        }

        .info-item h4 {
          font-size: 16px;
          color: #fcf9f2;
          margin-bottom: 4px;
        }

        .info-item p {
          color: rgba(252, 249, 242, 0.6);
          font-size: 14px;
          line-height: 1.5;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: rgba(252, 249, 242, 0.8);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-input, .form-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(212, 163, 60, 0.2);
          border-radius: 12px;
          padding: 14px 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: #fcf9f2;
          outline: none;
          transition: 0.2s;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #d4a33c;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 3px rgba(212, 163, 60, 0.15);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .send-btn {
          background: linear-gradient(135deg, #d4a33c 0%, #b8922a 100%);
          color: #090602;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
          box-shadow: 0 10px 25px rgba(212, 163, 60, 0.25);
        }

        .send-btn:hover {
          background: linear-gradient(135deg, #e5b865 0%, #d4a33c 100%);
          transform: translateY(-1px);
        }
      `}</style>

      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-header">
            <div className="contact-badge">
              <ShieldCheck size={14} /> Executive Concierge
            </div>
            <h1 className="contact-title">Get in <span>Touch</span></h1>
            <p className="contact-subtitle">Connect with our luxury real estate specialists for inquiries and private viewings.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ color: '#e5b865', fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Message Dispatched Successfully</div>
              <p style={{ color: 'rgba(252,249,242,0.6)', marginBottom: '24px' }}>Our concierge team will respond to your inquiry shortly.</p>
              <button className="send-btn" style={{ maxWidth: '220px', margin: '0 auto' }} onClick={() => navigate('/')}>
                <Home size={16} /> Return to Home
              </button>
            </div>
          ) : (
            <div className="contact-grid">
              <div className="contact-info-box">
                <div className="info-item">
                  <div className="info-icon-wrap"><MapPin size={22} /></div>
                  <div>
                    <h4>Global Headquarters</h4>
                    <p>Baruipur, Kolkata-700144, South 24 Pargana, India</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon-wrap"><Phone size={22} /></div>
                  <div>
                    <h4>Direct Line</h4>
                    <p>+91 7063506741</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon-wrap"><Mail size={22} /></div>
                  <div>
                    <h4>Secure Email</h4>
                    <p>ghoshayan721201@gmail.com</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ayan Ghosh" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="ayan@realestate.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Message / Inquiry</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Inquire about property viewings..." 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    required 
                  />
                </div>
                <button type="submit" className="send-btn">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;