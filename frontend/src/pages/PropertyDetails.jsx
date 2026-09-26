import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { MapPin, Bed, Bath, Maximize, ArrowLeft, CheckCircle } from 'lucide-react';
import { curatedVillasAndPenthouses } from './propertiesData';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tourRequested, setTourRequested] = useState(false);

  useEffect(() => {
    // 1. Check if it matches a static fallback item
    const found = curatedVillasAndPenthouses?.find((v) => v._id === id || v._id === `villa-${id}`);
    
    if (found) {
      setProperty(found);
      setLoading(false);
    } else {
      // 2. Fetch live database property from your backend
      API.get(`/properties/${id}`)
        .then((res) => {
          const fetchedData = res.data.property || res.data;
          
          if (fetchedData.image && !fetchedData.image.startsWith('http')) {
            fetchedData.image = `http://localhost:5002${fetchedData.image}`;
          } else if (fetchedData.images && fetchedData.images.length > 0) {
            fetchedData.image = fetchedData.images[0].startsWith('http') 
              ? fetchedData.images[0] 
              : `http://localhost:5002${fetchedData.images[0]}`;
          }
          
          setProperty(fetchedData);
        })
        .catch((err) => {
          console.error('Failed to fetch property details:', err);
          // Fallback to first item if not found
          setProperty(curatedVillasAndPenthouses?.[0] || null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: '#070502', color: '#fcf9f2', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        Loading Estate Details...
      </div>
    );
  }

  return (
    <div style={{ background: '#070502', color: '#fcf9f2', minHeight: '100vh', padding: '40px 80px', boxSizing: 'border-box', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: 'transparent', border: '1px solid rgba(212,163,60,0.4)', color: '#e5b865', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}
      >
        <ArrowLeft size={16} /> Back to Listings
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'start' }}>
        <div>
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(212,163,60,0.3)', height: '480px', background: '#110d06' }}>
            <img 
              src={property?.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'} 
              alt={property?.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

        <div>
          <span style={{ background: 'rgba(212,163,60,0.15)', border: '1px solid rgba(212,163,60,0.4)', color: '#e5b865', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {property?.propertyType || 'Luxury Estate'}
          </span>

          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '38px', fontWeight: '800', margin: '15px 0 10px 0', color: '#fcf9f2' }}>
            {property?.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(252,249,242,0.65)', fontSize: '16px', marginBottom: '25px' }}>
            <MapPin size={18} style={{ color: '#d4a33c' }} /> {property?.location}
          </div>

          <div style={{ fontSize: '32px', fontWeight: '800', color: '#e5b865', marginBottom: '30px' }}>
            ₹ {Number(property?.price || 0).toLocaleString('en-IN')}
          </div>

          <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid rgba(212,163,60,0.2)', borderBottom: '1px solid rgba(212,163,60,0.2)', padding: '20px 0', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              <Bed size={20} style={{ color: '#d4a33c' }} /> {property?.bedrooms || 4} Beds
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              <Bath size={20} style={{ color: '#d4a33c' }} /> {property?.bathrooms || 5} Baths
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              <Maximize size={20} style={{ color: '#d4a33c' }} /> {property?.floorSpace || property?.area || '5,200'} sqft
            </div>
          </div>

          <p style={{ fontSize: '15.5px', color: 'rgba(252,249,242,0.75)', lineHeight: '1.8', marginBottom: '35px' }}>
            {property?.description || 'An extraordinary property offering magnificent architectural design, premium bespoke finishes, and supreme privacy.'}
          </p>

          {tourRequested ? (
            <div style={{ background: 'rgba(46, 204, 113, 0.1)', border: '1px solid rgba(46, 204, 113, 0.4)', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: '#2ecc71' }}>
              <CheckCircle size={24} />
              <div>
                <strong>Viewing Request Confirmed!</strong>
                <p style={{ fontSize: '13.5px', margin: '4px 0 0 0', color: 'rgba(252,249,242,0.7)' }}>Our elite luxury consultant will connect with you within 2 hours.</p>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setTourRequested(true)} 
              style={{ background: 'linear-gradient(135deg, #f3d085 0%, #d4a33c 100%)', color: '#070502', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', width: '100%', boxShadow: '0 10px 25px rgba(212,163,60,0.3)' }}
            >
              Schedule Private Viewing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;