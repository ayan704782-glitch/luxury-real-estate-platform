import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  Home,
  Menu,
  X,
  ShieldCheck,
  Mail
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Reactive state for authentication token
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);

  // Sync token state on location change or storage updates
  useEffect(() => {
    setToken(localStorage.getItem('token') || localStorage.getItem('accessToken'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    setToken(null);
    setMenuOpen(false);
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .elite-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(9, 7, 4, 0.95);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(212, 163, 60, 0.25);
          padding: 8px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.85);
          position: relative;
          gap: 20px;
        }

        .elite-navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4a33c, transparent);
        }

        .realestate-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .realestate-logo {
          width: 160px;
          height: auto;
          max-height: 38px;
          object-fit: contain;
          object-position: left center;
          display: block;
          filter: drop-shadow(0 2px 8px rgba(212, 163, 60, 0.2));
        }

        .elite-search-form {
          display: flex;
          align-items: center;
          background: rgba(18, 13, 6, 0.85);
          border: 1px solid rgba(212, 163, 60, 0.3);
          border-radius: 30px;
          padding: 4px 4px 4px 16px;
          width: 100%;
          max-width: 380px;
          transition: all 0.2s ease;
        }

        .elite-search-form:focus-within {
          border-color: #d4a33c;
          box-shadow: 0 0 0 3px rgba(212, 163, 60, 0.15);
          background: rgba(24, 18, 9, 0.95);
        }

        .elite-search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #fcf9f2;
          font-size: 13px;
          width: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .elite-search-input::placeholder {
          color: rgba(252, 249, 242, 0.4);
        }

        .elite-search-btn {
          background: linear-gradient(135deg, #f3d085 0%, #d4a33c 100%);
          color: #090704;
          border: none;
          padding: 7px 18px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          transition: 0.15s ease;
          box-shadow: 0 4px 12px rgba(212, 163, 60, 0.3);
          flex-shrink: 0;
        }

        .elite-search-btn:hover {
          background: #f1c875;
          transform: translateY(-1px);
        }

        .elite-nav-links {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }

        .elite-nav-item {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(252, 249, 242, 0.75);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .elite-nav-item:hover {
          color: #e5b865;
          background: rgba(212, 163, 60, 0.06);
        }

        .elite-nav-item.active {
          color: #090704;
          background: linear-gradient(135deg, #f3d085 0%, #d4a33c 100%);
          box-shadow: 0 4px 12px rgba(212, 163, 60, 0.25);
        }

        .menu-dropdown-wrapper {
          position: relative;
        }

        .elite-menu-btn {
          width: 38px;
          height: 38px;
          background: rgba(18, 13, 6, 0.9);
          border: 1px solid rgba(212, 163, 60, 0.4);
          border-radius: 12px;
          color: #e5b865;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .elite-menu-btn:hover {
          background: rgba(212, 163, 60, 0.15);
          border-color: #e5b865;
        }

        .elite-dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 300px;
          background: #0e0a05;
          border: 1px solid rgba(212, 163, 60, 0.35);
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.9);
          z-index: 1050;
        }

        .dropdown-section-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(212, 163, 60, 0.7);
          padding: 6px 12px;
          font-weight: 700;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(252, 249, 242, 0.85);
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          transition: 0.15s;
        }

        .dropdown-item:hover {
          background: rgba(212, 163, 60, 0.1);
          color: #e5b865;
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(212, 163, 60, 0.15);
          margin: 10px 0;
        }

        @media (max-width: 900px) {
          .elite-navbar { padding: 8px 16px; flex-wrap: wrap; }
          .elite-search-form { order: 3; max-width: 100%; margin-top: 8px; }
          .elite-nav-item span { display: none; }
        }
      `}</style>

      <nav className="elite-navbar">
        <Link to="/" className="realestate-brand">
          <img
            src="/logo-1.png"
            alt="RealEstate"
            className="realestate-logo"
          />
        </Link>

        <form onSubmit={handleSearchSubmit} className="elite-search-form">
          <Search size={15} style={{ color: '#d4a33c', marginRight: '8px', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search elite villas, penthouses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="elite-search-input"
          />
          <button type="submit" className="elite-search-btn">
            Search
          </button>
        </form>

        <div className="elite-nav-links">
          <Link to="/" className={`elite-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={16} />
            <span>Home</span>
          </Link>

          <Link to="/add-property" className={`elite-nav-item ${location.pathname === '/add-property' ? 'active' : ''}`}>
            <PlusCircle size={16} />
            <span>Post Property</span>
          </Link>

          {token && (
            <Link to="/dashboard" className={`elite-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Link>
          )}

          <div className="menu-dropdown-wrapper" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="elite-menu-btn"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {menuOpen && (
              <div className="elite-dropdown-menu">
                <div className="dropdown-section-title">Navigation</div>
                <Link to="/" onClick={() => setMenuOpen(false)} className="dropdown-item">
                  <Home size={16} style={{ color: '#d4a33c' }} /> Home Page
                </Link>
                <Link to="/add-property" onClick={() => setMenuOpen(false)} className="dropdown-item">
                  <PlusCircle size={16} style={{ color: '#d4a33c' }} /> Post New Property
                </Link>
                {token && (
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="dropdown-item">
                    <LayoutDashboard size={16} style={{ color: '#d4a33c' }} /> User Dashboard
                  </Link>
                )}

                {/* Admin Approvals Console */}
                <Link to="/admin/approvals" onClick={() => setMenuOpen(false)} className="dropdown-item">
                  <ShieldCheck size={16} style={{ color: '#d4a33c' }} /> Admin Approvals
                </Link>

                {/* Added Contact Us Link */}
                <Link to="/contact" onClick={() => setMenuOpen(false)} className="dropdown-item">
                  <Mail size={16} style={{ color: '#d4a33c' }} /> Contact Us
                </Link>

                <div className="dropdown-divider" />

                {/* Authentication Controls */}
                {token ? (
                  <button 
                    onClick={handleLogout} 
                    className="dropdown-item" 
                    style={{ width: '100%', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)', color: '#ff6b6b', cursor: 'pointer', fontWeight: '600', borderRadius: '10px', textAlign: 'left' }}
                  >
                    <LogOut size={16} /> Logout Session
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="dropdown-item">
                      <LogIn size={16} style={{ color: '#d4a33c' }} /> Sign In / Login
                    </Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="dropdown-item">
                      <UserPlus size={16} style={{ color: '#d4a33c' }} /> Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;