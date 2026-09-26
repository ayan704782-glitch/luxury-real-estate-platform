import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Phone, Mail, ArrowUpRight, Cpu } from 'lucide-react';

const Footer = () => {
  const [engineStatus, setEngineStatus] = useState('Syncing Neural Core...');

  useEffect(() => {
    // Ping local backend engine for live telemetry status
    fetch('http://localhost:5002/')
      .then(res => {
        if (res.ok) setEngineStatus('AI Valuation Engine Online (v2.5)');
        else setEngineStatus('Core Standby');
      })
      .catch(() => setEngineStatus('Offline / Local Mode'));
  }, []);

  return (
    <footer style={{
      background: 'radial-gradient(circle at bottom center, rgba(10, 26, 18, 0.98), rgba(2, 6, 4, 1))',
      borderTop: '1px solid rgba(223, 177, 91, 0.4)',
      color: '#fcf9f2',
      padding: '80px 50px 30px 50px',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 30px 60px rgba(0,0,0,0.9)'
    }}>
      {/* High-Tech Architectural Grid Overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.035, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(#dfb15b 1px, transparent 1px), linear-gradient(90deg, #dfb15b 1px, transparent 1px)',
        backgroundSize: '45px 45px'
      }} />

      <div style={{
        maxWidth: '1280px', margin: '0 auto', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '45px', position: 'relative', zIndex: 1
      }}>
        
        {/* Column 1: Brand, Live Telemetry & Vector Social Nodes */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(223, 177, 91, 0.15)', padding: '10px', borderRadius: '14px', border: '1px solid rgba(223, 177, 91, 0.45)' }}>
              <Sparkles size={22} color="#dfb15b" />
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: '#fcf9f2', letterSpacing: '0.5px' }}>
              Real<span style={{ color: '#dfb15b' }}>Estate</span>
            </h2>
          </div>
          <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: 'rgba(252, 249, 242, 0.7)', marginBottom: '20px' }}>
            Next-generation PropTech marketplace powered by live Python machine learning algorithms, spatial intelligence, and automated ROI forecasting.
          </p>
          
          {/* Live System Telemetry Status Pill with High-Tech CPU Icon */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(3, 15, 10, 0.9)', border: '1px solid rgba(223, 177, 91, 0.35)',
            padding: '9px 16px', borderRadius: '30px', fontSize: '11.5px', color: '#dfb15b', fontWeight: 700,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)', marginBottom: '20px'
          }}>
            <Cpu size={15} color="#dfb15b" style={{ filter: 'drop-shadow(0 0 6px #dfb15b)' }} />
            <span>{engineStatus}</span>
          </div>

          {/* High-Tech Vector Social Connection Nodes with Your Exact LinkedIn Link */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              {
                name: 'Instagram',
                link: 'https://instagram.com',
                svg: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                )
              },
              {
                name: 'Twitter',
                link: 'https://twitter.com',
                svg: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                )
              },
              {
                name: 'LinkedIn',
                link: 'https://www.linkedin.com/in/ayan-ghosh-8b564842a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
                svg: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                )
              }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link} 
                target="_blank" 
                rel="noreferrer"
                title={social.name}
                style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'rgba(223, 177, 91, 0.08)', border: '1px solid rgba(223, 177, 91, 0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dfb15b',
                  transition: 'all 0.3s ease', textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = '#dfb15b'; 
                  e.currentTarget.style.color = '#050b08'; 
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(223, 177, 91, 0.4)';
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'rgba(223, 177, 91, 0.08)'; 
                  e.currentTarget.style.color = '#dfb15b'; 
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
                }}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: PropTech Navigation */}
        <div>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2.5px', color: '#dfb15b', fontWeight: 800, marginBottom: '22px' }}>
            Neural Architecture
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px', fontSize: '13.5px' }}>
            {['AI ROI Valuation Predictor', 'Market Analytics Matrix', 'Verified State Portfolios', 'Smart Contract Escrow', 'Global Property Sync'].map((item, idx) => (
              <li key={idx}>
                <a href="#link" style={{ color: 'rgba(252, 249, 242, 0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: '0.3s' }}
                   onMouseEnter={(e) => { e.currentTarget.style.color = '#dfb15b'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(252, 249, 242, 0.75)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  <span>{item}</span>
                  <ArrowUpRight size={14} opacity={0.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Prime Economic Hubs */}
        <div>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2.5px', color: '#dfb15b', fontWeight: 800, marginBottom: '22px' }}>
            Primary Economic Hubs
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px', fontSize: '13.5px' }}>
            {['Baruipur Tech Corridor, South 24 Pgs', 'Salt Lake Sector V, Kolkata', 'New Town Action Area', 'Park Street Corporate Zone', 'Alipore Elite Enclave'].map((hub, idx) => (
              <li key={idx} style={{ color: 'rgba(252, 249, 242, 0.75)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dfb15b', boxShadow: '0 0 8px #dfb15b' }}></span>
                {hub}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Secure Telemetry & Personal Contacts */}
        <div>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2.5px', color: '#dfb15b', fontWeight: 800, marginBottom: '22px' }}>
            Secure Telemetry
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px', color: 'rgba(252, 249, 242, 0.75)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin size={16} color="#dfb15b" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Baruipur, Kolkata - 700144, South 24 Parganas, West Bengal</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={16} color="#dfb15b" style={{ flexShrink: 0 }} />
              <span>+91 96797-13360</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={16} color="#dfb15b" style={{ flexShrink: 0 }} />
              <span>ghoshayan721201@gmail.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div style={{
        maxWidth: '1280px', margin: '60px auto 0 auto', paddingTop: '25px',
        borderTop: '1px solid rgba(223, 177, 91, 0.15)', display: 'flex',
        flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'rgba(252, 249, 242, 0.5)'
      }}>
        <p style={{ margin: 0 }}>© 2026 RealEstate Inc. Developed by Ayan Ghosh. Encrypted Neural Architecture.</p>
        <div style={{ display: 'flex', gap: '25px' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#dfb15b'} onMouseLeave={e => e.target.style.color='rgba(252, 249, 242, 0.5)'}>Privacy Matrix</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#dfb15b'} onMouseLeave={e => e.target.style.color='rgba(252, 249, 242, 0.5)'}>Neural Terms</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#dfb15b'} onMouseLeave={e => e.target.style.color='rgba(252, 249, 242, 0.5)'}>Security Audit</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;