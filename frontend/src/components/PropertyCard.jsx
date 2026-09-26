import React from "react";
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const formatPrice = (price) =>
    "₹" + Number(price).toLocaleString("en-IN");

  return (
    <>
      <style>{`
        .property-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          min-height: 650px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.15);
        }

        .property-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
        }

        .property-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .property-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .property-location {
          color: #64748b;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .property-info {
          display: grid;
          gap: 8px;
          margin-bottom: 18px;
        }

        .property-info p {
          margin: 0;
          font-size: 15px;
          color: #374151;
        }

        .property-info strong {
          color: #111827;
        }

        .property-details {
          color: #6b7280;
          line-height: 1.7;
          margin-top: 12px;
          flex-grow: 1;
          display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
        }

        .view-btn {
          margin-top: auto;
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #ef4444;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .view-btn:hover {
          background: #dc2626;
        }

        @media (max-width: 768px) {
          .property-card {
            min-height: auto;
          }

          .property-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="property-card">
        <img
          src={`http://localhost:5000${property.image}`}
          alt={property.title}
          className="property-image"
        />

        <div className="property-content">
          <h2 className="property-title">{property.title}</h2>

          <p className="property-location">
            <FaMapMarkerAlt style={{ marginRight: '8px', verticalAlign: 'middle', color: '#ef4444' }} />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#64748b', textDecoration: 'none' }}
            >
              {property.location}
            </a>
          </p>

          <div className="property-info">
            <p><strong>Type:</strong> {property.propertyType}</p>
            <p><strong>For:</strong> {property.propertyFor}</p>
            <p><strong>Price:</strong> {formatPrice(property.price)}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Living Rooms:</strong> {property.livingRooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p><strong>Kitchen:</strong> {property.kitchen}</p>
            <p><strong>Parking:</strong> {property.parking}</p>
            <p><strong>Floor Space:</strong> {property.floorSpace} sqft</p>
            <p><strong>Agent ID:</strong> {property.agentId}</p>
          </div>

          <p className="property-details">
            {property.details}
          </p>

          <button
            className="view-btn"
            onClick={() => navigate(`/property/${property._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;