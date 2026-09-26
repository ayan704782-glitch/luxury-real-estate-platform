import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { curatedApartmentsAndHouses } from '../pages/apartmentsData';

const ModernApartmentsSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filteredProperties = activeTab === 'All' 
    ? curatedApartmentsAndHouses 
    : curatedApartmentsAndHouses.filter(item => item.propertyType === activeTab);

  return (
    <section style={{ background: '#070502', padding: '80px 60px', color: '#fcf9f2', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      
      {/* Header & Tabs */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span style={{ color: '#d4a33c', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
            CURATED LIVING SPACES
          </span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: '800', marginTop: '8px', color: '#fcf9f2' }}>
            Modern Apartments & Independent Houses
          </h2>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '10px', background: '#120d06', padding: '6px', borderRadius: '14px', border: '1px solid rgba(212,163,60,0.2)' }}>
          {['All', 'Apartment', 'Independent House'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'linear-gradient(135deg, #f3d085 0%, #d4a33c 100%)' : 'transparent',
                color: activeTab === tab ? '#070502' : '#fcf9f2',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {tab}s
            </button>
          ))}
        </div>
      </div>

      {/* Grid Cards (9 Items) */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {filteredProperties.map((property) => (
          <div 
            key={property._id}
            style={{
              background: '#110d06',
              border: '1px solid rgba(212,163,60,0.25)',
              borderRadius: '24px',
              overflow: 'hidden',
              transition: 'transform 0.3s, border-color 0.3s',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/property/${property._id}`)}
          >
            {/* Image Box */}
            <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={property.image} 
                alt={property.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} 
              />
              <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(7, 5, 2, 0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(212,163,60,0.4)', color: '#e5b865', padding: '6px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                {property.propertyType}
              </span>
            </div>

            {/* Content Box */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(252,249,242,0.6)', fontSize: '13.5px', marginBottom: '8px' }}>
                <MapPin size={15} style={{ color: '#d4a33c' }} /> {property.location}
              </div>

              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: '700', color: '#fcf9f2', marginBottom: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {property.title}
              </h3>

              {/* Specs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(212,163,60,0.15)', borderBottom: '1px solid rgba(212,163,60,0.15)', padding: '14px 0', marginBottom: '18px', color: 'rgba(252,249,242,0.8)', fontSize: '13px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bed size={16} style={{ color: '#d4a33c' }} /> {property.bedrooms} Beds</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bath size={16} style={{ color: '#d4a33c' }} /> {property.bathrooms} Baths</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Maximize size={16} style={{ color: '#d4a33c' }} /> {property.floorSpace} sqft</span>
              </div>

              {/* Price & Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(252,249,242,0.5)', display: 'block' }}>Offered At</span>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#e5b865' }}>
                    ₹ {Number(property.price).toLocaleString('en-IN')}
                  </span>
                </div>
                <button style={{ background: 'transparent', border: '1px solid #d4a33c', color: '#e5b865', padding: '10px 16px', borderRadius: '12px', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModernApartmentsSection;