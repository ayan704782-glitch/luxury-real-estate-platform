import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AIValuationWidget from '../components/AIValuationWidget';
import {
  MapPin,
  DollarSign,
  Search,
  ShieldCheck,
  Headphones,
  Heart,
  ArrowRight,
  Home as HomeIcon,
  Bed,
  Bath,
  Maximize,
  Crown,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const resultsRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const urlType = queryParams.get('type') || '';
  const urlLocation = queryParams.get('location') || '';
  const urlPrice = queryParams.get('price') || '';

  // Local state for instant, lag-free UI interaction
  const [filterType, setFilterType] = useState(urlType);
  const [filterLocation, setFilterLocation] = useState(urlLocation);
  const [filterPrice, setFilterPrice] = useState(urlPrice);
  
  const [activeTab, setActiveTab] = useState('all');
  const [apartmentTab, setApartmentTab] = useState('All');
  const [villaIndex, setVillaIndex] = useState(0);
  const [apartmentIndex, setApartmentIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Sync inputs if URL changes externally
  useEffect(() => {
    setFilterType(urlType);
    setFilterLocation(urlLocation);
    setFilterPrice(urlPrice);
  }, [urlType, urlLocation, urlPrice]);

  // Background image rotation slider
  const heroImages = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(sliderTimer);
  }, [heroImages.length]);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
  ];

  const [curatedVillasAndPenthouses] = useState([
    {
      _id: 'villa-1',
      title: 'The Azure Horizon Luxury Villa',
      location: 'Goa, India',
      price: 185000000,
      propertyType: 'Luxury Villa',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 5,
      bathrooms: 6,
      floorSpace: '6,200'
    },
    {
      _id: 'villa-2',
      title: 'The Imperial Sky Penthouse',
      location: 'Mumbai, Maharashtra',
      price: 240000000,
      propertyType: 'Penthouse',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 5,
      floorSpace: '5,100'
    },
    {
      _id: 'villa-3',
      title: 'Palacio de Sol Contemporary Estate',
      location: 'Bengaluru, Karnataka',
      price: 450000,
      propertyType: 'Luxury Villa',
      listingType: 'For Rent',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 6,
      bathrooms: 7,
      floorSpace: '7,500'
    },
    {
      _id: 'villa-4',
      title: 'The Obsidian Grand Pinnacle',
      location: 'Delhi, New Delhi',
      price: 310000000,
      propertyType: 'Penthouse',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 5,
      bathrooms: 6,
      floorSpace: '6,800'
    },
    {
      _id: 'villa-5',
      title: 'Serene Haven Waterfront Villa',
      location: 'Kochi, Kerala',
      price: 350000,
      propertyType: 'Luxury Villa',
      listingType: 'For Rent',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 4,
      floorSpace: '4,600'
    },
    {
      _id: 'villa-6',
      title: 'The Crown Jewel Sky Mansion',
      location: 'Hyderabad, Telangana',
      price: 160000000,
      propertyType: 'Penthouse',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 5,
      floorSpace: '5,500'
    },
    {
      _id: 'villa-7',
      title: 'Elysian Hilltop Royal Villa',
      location: 'Udaipur, Rajasthan',
      price: 145000000,
      propertyType: 'Luxury Villa',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 5,
      bathrooms: 6,
      floorSpace: '6,100'
    },
    {
      _id: 'villa-8',
      title: 'Aura Glass Sanctuary Estate',
      location: 'Pune, Maharashtra',
      price: 280000,
      propertyType: 'Luxury Villa',
      listingType: 'For Rent',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 5,
      floorSpace: '4,900'
    },
    {
      _id: 'villa-9',
      title: 'The Sovereign Presidential Penthouse',
      location: 'Kolkata, West Bengal',
      price: 190000000,
      propertyType: 'Penthouse',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 5,
      bathrooms: 6,
      floorSpace: '6,300'
    }
  ]);

  const [curatedApartmentsAndHouses] = useState([
    {
      _id: 'house-apt-1',
      title: 'The Grand Royale Skyline Apartment',
      location: 'Mumbai, Maharashtra',
      price: 65000000,
      propertyType: 'Apartment',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 3,
      bathrooms: 3,
      floorSpace: '2,800'
    },
    {
      _id: 'house-apt-2',
      title: 'Emerald Heritage Independent House',
      location: 'Bengaluru, Karnataka',
      price: 85000000,
      propertyType: 'Independent House',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 4,
      floorSpace: '4,200'
    },
    {
      _id: 'house-apt-3',
      title: 'The Metropolis Luxury Suite',
      location: 'Gurugram, Haryana',
      price: 180000,
      propertyType: 'Apartment',
      listingType: 'For Rent',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 3,
      bathrooms: 3,
      floorSpace: '2,400'
    },
    {
      _id: 'house-apt-4',
      title: 'Lotus Grand Independent Villa-House',
      location: 'Hyderabad, Telangana',
      price: 92000000,
      propertyType: 'Independent House',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 5,
      floorSpace: '4,800'
    },
    {
      _id: 'house-apt-5',
      title: 'The Residency Skyline Flat',
      location: 'Kolkata, West Bengal',
      price: 150000,
      propertyType: 'Apartment',
      listingType: 'For Rent',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 3,
      bathrooms: 2,
      floorSpace: '2,100'
    },
    {
      _id: 'house-apt-6',
      title: 'Azure Coast Independent Duplex',
      location: 'Goa, India',
      price: 78000000,
      propertyType: 'Independent House',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 4,
      floorSpace: '3,900'
    },
    {
      _id: 'house-apt-7',
      title: 'The Grand Vista Urban Apartment',
      location: 'Pune, Maharashtra',
      price: 120000,
      propertyType: 'Apartment',
      listingType: 'For Rent',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 3,
      bathrooms: 3,
      floorSpace: '2,300'
    },
    {
      _id: 'house-apt-8',
      title: 'Royal Oak Independent Estate',
      location: 'Chennai, Tamil Nadu',
      price: 88000000,
      propertyType: 'Independent House',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 5,
      bathrooms: 5,
      floorSpace: '5,000'
    },
    {
      _id: 'house-apt-9',
      title: 'The Apex Skyline Residence',
      location: 'Ahmedabad, Gujarat',
      price: 58000000,
      propertyType: 'Apartment',
      listingType: 'For Sale',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 3,
      bathrooms: 3,
      floorSpace: '2,600'
    }
  ]);

  // Handle Smooth Filter Submission & Scroll
  const handleFilterSubmit = () => {
    const params = new URLSearchParams();
    if (filterType) params.set('type', filterType);
    if (filterLocation) params.set('location', filterLocation);
    if (filterPrice) params.set('price', filterPrice);
    if (searchQuery) params.set('search', searchQuery);

    navigate(`/?${params.toString()}`);

    if (resultsRef.current) {
      setVillaIndex(0);
      setApartmentIndex(0);
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProperties = curatedVillasAndPenthouses.filter((property) => {
    if (!property) return false;
    const matchesSearch = searchQuery 
      ? property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesType = urlType ? property.propertyType?.toLowerCase().includes(urlType.toLowerCase()) : true;
    const matchesLocation = urlLocation ? property.location?.toLowerCase().includes(urlLocation.toLowerCase()) : true;
    
    const listingType = (property.listingType || 'For Sale').toLowerCase();
    let matchesTab = true;
    if (activeTab === 'sale') matchesTab = listingType.includes('sale');
    if (activeTab === 'rent') matchesTab = listingType.includes('rent');

    let matchesPrice = true;
    const priceNum = Number(property.price || 0);
    if (urlPrice === '5l-25l') matchesPrice = priceNum >= 500000 && priceNum <= 2500000;
    else if (urlPrice === '25l-50l') matchesPrice = priceNum > 2500000 && priceNum <= 5000000;
    else if (urlPrice === '50l-1cr') matchesPrice = priceNum > 5000000 && priceNum <= 10000000;
    else if (urlPrice === '1cr-3cr') matchesPrice = priceNum > 10000000 && priceNum <= 30000000;
    else if (urlPrice === '3cr-7cr') matchesPrice = priceNum > 30000000 && priceNum <= 70000000;
    else if (urlPrice === '7cr-plus') matchesPrice = priceNum > 70000000;

    return matchesSearch && matchesType && matchesLocation && matchesPrice && matchesTab;
  });

  const filteredApartments = curatedApartmentsAndHouses.filter((property) => {
    if (!property) return false;
    const matchesSearch = searchQuery 
      ? property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = apartmentTab === 'All' ? true : property.propertyType.toLowerCase() === apartmentTab.toLowerCase();
    
    const listingType = (property.listingType || 'For Sale').toLowerCase();
    let matchesTab = true;
    if (activeTab === 'sale') matchesTab = listingType.includes('sale');
    if (activeTab === 'rent') matchesTab = listingType.includes('rent');

    return matchesSearch && matchesCategory && matchesTab;
  });

  const nextVillaSlide = () => setVillaIndex((prev) => (prev + 3 >= filteredProperties.length ? 0 : prev + 3));
  const prevVillaSlide = () => setVillaIndex((prev) => (prev - 3 < 0 ? Math.max(0, filteredProperties.length - 3) : prev - 3));
  const nextApartmentSlide = () => setApartmentIndex((prev) => (prev + 3 >= filteredApartments.length ? 0 : prev + 3));
  const prevApartmentSlide = () => setApartmentIndex((prev) => (prev - 3 < 0 ? Math.max(0, filteredApartments.length - 3) : prev - 3));

  const displayedVillas = filteredProperties.slice(villaIndex, villaIndex + 3);
  const displayedApartments = filteredApartments.slice(apartmentIndex, apartmentIndex + 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Dancing+Script:wght@700&display=swap');

        .home-page {
          background-color: #030706;
          background-image: 
            radial-gradient(circle at 12% 18%, rgba(12, 45, 30, 0.55) 0%, transparent 48%),
            radial-gradient(circle at 88% 82%, rgba(223, 177, 91, 0.1) 0%, transparent 42%),
            linear-gradient(to right, rgba(223, 177, 91, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(223, 177, 91, 0.035) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 55px 55px, 55px 55px;
          color: #fcf9f2;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .hero-section {
          position: relative;
          height: 85vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 80px;
          overflow: visible;
          background: transparent;
          width: 100%;
          box-sizing: border-box;
        }

        .hero-slider-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          will-change: opacity;
          pointer-events: none;
        }

        .hero-slide.active {
          opacity: 1;
          z-index: 2;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(3, 7, 6, 0.92) 0%, rgba(3, 7, 6, 0.65) 35%, rgba(3, 7, 6, 0.25) 65%, rgba(3, 7, 6, 0.60) 100%),
                      linear-gradient(to bottom, rgba(3, 7, 6, 0.2) 0%, rgba(3, 7, 6, 0.92) 100%);
          z-index: 3;
          pointer-events: none;
        }

        .hero-content {
          max-width: 650px;
          z-index: 5;
          margin-bottom: 80px;
        }

        .hero-subtitle-tag {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          letter-spacing: 3px;
          color: #dfb15b;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .hero-subtitle-tag::after {
          content: '';
          width: 50px;
          height: 1.5px;
          background: #dfb15b;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 58px;
          font-weight: 800;
          line-height: 1.1;
          color: #fcf9f2;
          margin-bottom: 20px;
          text-shadow: 0 8px 30px rgba(0,0,0,0.35);
        }

        .hero-title span {
          color: #dfb15b;
          font-style: italic;
        }

        .hero-desc {
          font-size: 16px;
          color: rgba(252, 249, 242, 0.8);
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #f3d893 0%, #dfb15b 100%);
          color: #050b08;
          border: none;
          padding: 14px 28px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 10px 25px rgba(223, 177, 91, 0.3);
        }

        .explore-btn:hover {
          transform: translateY(-2px);
          background: #f7e2a6;
        }

        .hero-cursive-slogan {
          position: absolute;
          bottom: 110px;
          right: 80px;
          font-family: 'Dancing Script', cursive;
          font-size: 38px;
          color: #dfb15b;
          z-index: 6;
          text-shadow: 0 4px 15px rgba(0,0,0,0.8);
        }

        .search-filter-bar {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 160px);
          max-width: 1200px;
          background: rgba(8, 15, 12, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(223, 177, 91, 0.35);
          border-radius: 20px;
          padding: 24px 35px;
          display: grid;
          grid-template-columns: repeat(3, 1fr) auto;
          gap: 20px;
          align-items: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
          z-index: 10;
          box-sizing: border-box;
        }

        .filter-item { display: flex; align-items: center; gap: 16px; padding-right: 20px; border-right: 1px solid rgba(223, 177, 91, 0.2); }
        .filter-item:last-of-type { border-right: none; }
        .filter-icon-box { width: 45px; height: 45px; background: rgba(223, 177, 91, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dfb15b; flex-shrink: 0; }
        .filter-content label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(252, 249, 242, 0.5); margin-bottom: 4px; }
        .filter-content select { background: transparent; border: none; color: #fcf9f2; font-size: 15px; font-weight: 600; outline: none; width: 100%; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; }
        .filter-content select option { background: #050b08; color: #fcf9f2; }
        .search-action-btn { background: linear-gradient(135deg, #f3d893 0%, #dfb15b 100%); color: #050b08; border: none; padding: 16px 36px; border-radius: 14px; font-weight: 700; font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
        .search-action-btn:hover { background: #f7e2a6; }

        .trust-badges-section { max-width: 1200px; margin: 100px auto 60px auto; padding: 0 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; box-sizing: border-box; }
        .trust-badge-card { display: flex; align-items: center; gap: 18px; }
        .trust-icon-circle { width: 60px; height: 60px; border: 1px solid rgba(223, 177, 91, 0.35); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dfb15b; background: rgba(223, 177, 91, 0.04); flex-shrink: 0; }
        .trust-text h4 { font-size: 16px; font-weight: 700; color: #fcf9f2; margin-bottom: 4px; }
        .trust-text p { font-size: 13px; color: rgba(252, 249, 242, 0.55); }

        .property-tabs-container {
          max-width: 1200px;
          margin: 40px auto 20px auto;
          padding: 0 40px;
          display: flex;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        .property-tabs-pill {
          background: rgba(10, 18, 14, 0.9);
          border: 1px solid rgba(223, 177, 91, 0.3);
          border-radius: 40px;
          padding: 6px;
          display: inline-flex;
          gap: 6px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .property-tab-btn {
          background: transparent;
          border: none;
          color: rgba(252, 249, 242, 0.7);
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .property-tab-btn:hover { color: #dfb15b; }
        .property-tab-btn.active {
          background: linear-gradient(135deg, #f3d893 0%, #dfb15b 100%);
          color: #050b08;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(223, 177, 91, 0.3);
        }

        .showcase-section {
          max-width: 1200px;
          margin: 50px auto 90px auto;
          padding: 0 40px;
          box-sizing: border-box;
        }

        .showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(223, 177, 91, 0.25);
          padding-bottom: 22px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .showcase-subtitle-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          letter-spacing: 3px;
          color: #dfb15b;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .showcase-main-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 800;
          color: #fcf9f2;
        }

        .showcase-main-title span {
          color: #dfb15b;
          font-style: italic;
        }

        .spotlight-nav-btns {
          display: flex;
          gap: 12px;
        }

        .spotlight-nav-btn {
          width: 46px;
          height: 46px;
          background: rgba(10, 18, 14, 0.85);
          border: 1px solid rgba(223, 177, 91, 0.4);
          border-radius: 50%;
          color: #dfb15b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(0,0,0,0.5);
        }

        .spotlight-nav-btn:hover {
          background: linear-gradient(135deg, #f3d893 0%, #dfb15b 100%);
          color: #050b08;
          border-color: transparent;
          transform: translateY(-2px);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
        }

        .luxury-card {
          background: rgba(10, 18, 14, 0.92);
          border: 1px solid rgba(223, 177, 91, 0.25);
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
          cursor: pointer;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
        }

        .luxury-card:hover {
          transform: translateY(-8px);
          border-color: rgba(223, 177, 91, 0.7);
          box-shadow: 0 30px 60px rgba(223, 177, 91, 0.15);
        }

        .card-img-container {
          position: relative;
          height: 260px;
          width: 100%;
          overflow: hidden;
          background: #080f0b;
        }

        .card-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .luxury-card:hover .card-img-container img {
          transform: scale(1.08);
        }

        .card-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(5, 11, 8, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(223, 177, 91, 0.4);
          color: #dfb15b;
          padding: 6px 14px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 2;
        }

        .card-fav-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          background: rgba(5, 11, 8, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(223, 177, 91, 0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fcf9f2;
          cursor: pointer;
          transition: 0.25s;
          z-index: 2;
        }

        .card-fav-btn:hover {
          background: #dfb15b;
          color: #050b08;
          transform: scale(1.1);
        }

        .card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
        }

        .card-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(252, 249, 242, 0.65);
          font-size: 13.5px;
          margin-bottom: 8px;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #fcf9f2;
          margin-bottom: 16px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-specs {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(223, 177, 91, 0.2);
          border-bottom: 1px solid rgba(223, 177, 91, 0.2);
          padding: 12px 0;
          margin-bottom: 18px;
          color: rgba(252, 249, 242, 0.85);
          font-size: 13px;
        }

        .card-spec-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-price {
          font-size: 20px;
          font-weight: 800;
          color: #dfb15b;
          letter-spacing: -0.5px;
        }

        .card-explore-btn {
          background: linear-gradient(135deg, #f3d893 0%, #dfb15b 100%);
          color: #050b08;
          border: none;
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: 0.3s;
          box-shadow: 0 6px 15px rgba(223, 177, 91, 0.25);
        }

        .card-explore-btn:hover {
          transform: translateY(-2px);
          background: #f7e2a6;
        }

        ::-webkit-scrollbar {
          display: none;
        }
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
          .search-filter-bar { position: relative; bottom: auto; left: auto; transform: none; width: 90%; margin: 40px auto; grid-template-columns: 1fr; }
          .hero-section { height: auto; min-height: 85vh; padding: 60px 20px; }
          .trust-badges-section { grid-template-columns: repeat(2, 1fr); }
          .property-tabs-container { padding: 0 20px; }
        }

        @media (max-width: 768px) {
          .cards-grid { grid-template-columns: 1fr; }
          .showcase-section { padding: 0 15px; }
          .showcase-main-title { font-size: 28px; }
          .property-tabs-pill { width: 100%; display: flex; justify-content: space-between; }
          .property-tab-btn { padding: 10px 12px; font-size: 12.5px; }
        }
      `}</style>

      <div className="home-page">
        <div className="hero-section">
          <div className="hero-slider-container">
            {heroImages.map((image, index) => (
              <div
                key={image}
                className={`hero-slide ${index === currentBgIndex ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>

          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="hero-subtitle-tag">Your Dream Home Awaits</div>
            <h1 className="hero-title">
              Find Your Perfect <br />
              <span>Home</span> Today
            </h1>
            <p className="hero-desc">
              Discover the best properties across India. Buy, sell or rent with ease — because your dream home is closer than you think.
            </p>
            <button className="explore-btn" onClick={() => navigate('/add-property')}>
              Explore Properties <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-cursive-slogan">Better Homes &amp; Brighter Futures</div>

          <div className="search-filter-bar">
            <div className="filter-item">
              <div className="filter-icon-box"><HomeIcon size={20} /></div>
              <div className="filter-content">
                <label>Property Type</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="apartment">Modern Apartment</option>
                  <option value="independent house">Independent House</option>
                </select>
              </div>
            </div>

            <div className="filter-item">
              <div className="filter-icon-box"><MapPin size={20} /></div>
              <div className="filter-content">
                <label>Location (India States)</label>
                <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
                  <option value="">All Locations</option>
                  {indianStates.map((state, idx) => (<option key={idx} value={state}>{state}</option>))}
                </select>
              </div>
            </div>

            <div className="filter-item">
              <div className="filter-icon-box"><DollarSign size={20} /></div>
              <div className="filter-content">
                <label>Price Range</label>
                <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                  <option value="">All Prices</option>
                  <option value="5l-25l">₹5 Lakh - ₹25 Lakh</option>
                  <option value="25l-50l">₹25 Lakh - ₹50 Lakh</option>
                  <option value="50l-1cr">₹50 Lakh - ₹1 Crore</option>
                  <option value="1cr-3cr">₹1 Crore - ₹3 Crore</option>
                  <option value="3cr-7cr">₹3 Crore - ₹7 Crore</option>
                  <option value="7cr-plus">₹7 Crore+</option>
                </select>
              </div>
            </div>

            <button className="search-action-btn" onClick={handleFilterSubmit}>
              <Search size={18} /> Filter
            </button>
          </div>
        </div>

        <div className="trust-badges-section">
          <div className="trust-badge-card">
            <div className="trust-icon-circle"><HomeIcon size={24} /></div>
            <div className="trust-text"><h4>Verified Properties</h4><p>100% genuine listings</p></div>
          </div>
          <div className="trust-badge-card">
            <div className="trust-icon-circle"><ShieldCheck size={24} /></div>
            <div className="trust-text"><h4>Trusted &amp; Secure</h4><p>Safe transactions</p></div>
          </div>
          <div className="trust-badge-card">
            <div className="trust-icon-circle"><Headphones size={24} /></div>
            <div className="trust-text"><h4>24/7 Support</h4><p>Always here for you</p></div>
          </div>
          <div className="trust-badge-card">
            <div className="trust-icon-circle"><Heart size={24} /></div>
            <div className="trust-text"><h4>Customer First</h4><p>Your happiness matters</p></div>
          </div>
        </div>

        <div className="property-tabs-container">
          <div className="property-tabs-pill">
            <button 
              className={`property-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => { setActiveTab('all'); setVillaIndex(0); setApartmentIndex(0); }}
            >
              All Properties
            </button>
            <button 
              className={`property-tab-btn ${activeTab === 'sale' ? 'active' : ''}`}
              onClick={() => { setActiveTab('sale'); setVillaIndex(0); setApartmentIndex(0); }}
            >
              For Sale
            </button>
            <button 
              className={`property-tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
              onClick={() => { setActiveTab('rent'); setVillaIndex(0); setApartmentIndex(0); }}
            >
              For Rent
            </button>
          </div>
        </div>

        {/* SECTION 1: LUXURY VILLAS & PENTHOUSES - resultsRef attached here */}
        <div className="showcase-section" ref={resultsRef}>
          <div className="showcase-header">
            <div>
              <div className="showcase-subtitle-tag"><Crown size={16} /> Exclusive Masterpieces</div>
              <h2 className="showcase-main-title">Luxury Villas &amp; <span>Penthouses</span></h2>
            </div>
            
            <div className="spotlight-nav-btns">
              <button className="spotlight-nav-btn" onClick={prevVillaSlide} aria-label="Previous Properties">
                <ChevronLeft size={22} />
              </button>
              <button className="spotlight-nav-btn" onClick={nextVillaSlide} aria-label="Next Properties">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="cards-grid">
            {displayedVillas.length > 0 ? (
              displayedVillas.map((property) => (
                <div 
                  key={property._id}
                  className="luxury-card"
                  onClick={() => navigate(`/property/${property._id}`)}
                >
                  <div className="card-img-container">
                    <span className="card-badge">{property.propertyType}</span>
                    <button className="card-fav-btn" onClick={(e) => { e.stopPropagation(); alert('Added to favorites!'); }}>
                      <Heart size={16} />
                    </button>
                    <img src={property.image} alt={property.title} />
                  </div>

                  <div className="card-content">
                    <div>
                      <div className="card-location">
                        <MapPin size={14} style={{ color: '#dfb15b' }} /> {property.location}
                      </div>
                      <h3 className="card-title">{property.title}</h3>
                    </div>

                    <div>
                      <div className="card-specs">
                        <div className="card-spec-item"><Bed size={15} style={{ color: '#dfb15b' }} /> {property.bedrooms || 4} Beds</div>
                        <div className="card-spec-item"><Bath size={15} style={{ color: '#dfb15b' }} /> {property.bathrooms || 5} Baths</div>
                        <div className="card-spec-item"><Maximize size={15} style={{ color: '#dfb15b' }} /> {property.floorSpace || '5,200'} sqft</div>
                      </div>

                      <div className="card-footer">
                        <span className="card-price">₹ {Number(property.price || 0).toLocaleString('en-IN')}</span>
                        <button className="card-explore-btn">
                          Explore <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(252, 249, 242, 0.6)' }}>
                No matching villas or penthouses found for this tab.
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: MODERN APARTMENTS & INDEPENDENT HOUSES */}
        <div className="showcase-section">
          <div className="showcase-header">
            <div>
              <div className="showcase-subtitle-tag"><Sparkles size={16} /> Curated Living Spaces</div>
              <h2 className="showcase-main-title">Modern Apartments &amp; <span>Independent Houses</span></h2>
            </div>

            <div className="spotlight-nav-btns">
              <button className="spotlight-nav-btn" onClick={prevApartmentSlide} aria-label="Previous Properties">
                <ChevronLeft size={22} />
              </button>
              <button className="spotlight-nav-btn" onClick={nextApartmentSlide} aria-label="Next Properties">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'flex-start' }}>
            <div className="property-tabs-pill">
              {['All', 'Apartment', 'Independent House'].map((tab) => (
                <button
                  key={tab}
                  className={`property-tab-btn ${apartmentTab === tab ? 'active' : ''}`}
                  onClick={() => {
                    setApartmentTab(tab);
                    setApartmentIndex(0);
                  }}
                >
                  {tab === 'All' ? 'All Spaces' : `${tab}s`}
                </button>
              ))}
            </div>
          </div>

          <div className="cards-grid">
            {displayedApartments.length > 0 ? (
              displayedApartments.map((property) => (
                <div 
                  key={property._id}
                  className="luxury-card"
                  onClick={() => navigate(`/property/${property._id}`)}
                >
                  <div className="card-img-container">
                    <span className="card-badge">{property.propertyType}</span>
                    <button className="card-fav-btn" onClick={(e) => { e.stopPropagation(); alert('Added to favorites!'); }}>
                      <Heart size={16} />
                    </button>
                    <img src={property.image} alt={property.title} />
                  </div>

                  <div className="card-content">
                    <div>
                      <div className="card-location">
                        <MapPin size={14} style={{ color: '#dfb15b' }} /> {property.location}
                      </div>
                      <h3 className="card-title">{property.title}</h3>
                    </div>

                    <div>
                      <div className="card-specs">
                        <div className="card-spec-item"><Bed size={15} style={{ color: '#dfb15b' }} /> {property.bedrooms} Beds</div>
                        <div className="card-spec-item"><Bath size={15} style={{ color: '#dfb15b' }} /> {property.bathrooms} Baths</div>
                        <div className="card-spec-item"><Maximize size={15} style={{ color: '#dfb15b' }} /> {property.floorSpace} sqft</div>
                      </div>

                      <div className="card-footer">
                        <span className="card-price">₹ {Number(property.price || 0).toLocaleString('en-IN')}</span>
                        <button className="card-explore-btn">
                          Explore <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(252, 249, 242, 0.6)' }}>
                No matching spaces found for this tab.
              </div>
            )}
          </div>
        </div>

        <AIValuationWidget />
      </div>
    </>
  );
};

export default Home;