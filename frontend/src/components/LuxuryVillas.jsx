import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import {
  MapPin,
  DollarSign,
  Search,
  ShieldCheck,
  Headphones,
  Heart,
  ArrowRight,
  ArrowLeft,
  Home as HomeIcon,
  Bed,
  Bath,
  Maximize,
  Sparkles,
  Crown
} from 'lucide-react';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search filter states
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  // Property Tab filter state (All Properties, For Sale, For Rent)
  const [activeTab, setActiveTab] = useState('all');

  // Hero background slider state
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const heroImages = [
    '/hero-1.png',
    '/hero-2.png',
    '/hero-3.jpg',
  ];

  // Automatic slider timer (changes every 5 seconds)
  useEffect(() => {
    if (isHeroHovered) return;
    const sliderTimer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(sliderTimer);
  }, [isHeroHovered, heroImages.length]);

  const nextSlide = () => setCurrentBgIndex((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentBgIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const navigate = useNavigate();

  // All Indian States and Union Territories
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", 
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  // Curated 50 Luxury Villa & Penthouse Master Collection
  const curatedVillasAndPenthouses = [
    { _id: 'villa-1', title: 'The Azure Horizon Luxury Villa', location: 'Goa, India', price: 185000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: '/villa-1.jpg', bedrooms: 5, bathrooms: 6, floorSpace: '6,200' },
    { _id: 'villa-2', title: 'The Imperial Sky Penthouse', location: 'Mumbai, Maharashtra', price: 240000000, propertyType: 'Penthouse', listingType: 'For Sale', image: '/villa-2.jpg', bedrooms: 4, bathrooms: 5, floorSpace: '5,100' },
    { _id: 'villa-3', title: 'Palacio de Sol Contemporary Estate', location: 'Bengaluru, Karnataka', price: 125000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: '/villa-3.jpg', bedrooms: 6, bathrooms: 7, floorSpace: '7,500' },
    { _id: 'villa-4', title: 'The Obsidian Grand Pinnacle', location: 'Delhi, New Delhi', price: 310000000, propertyType: 'Penthouse', listingType: 'For Sale', image: '/villa-4.jpg', bedrooms: 5, bathrooms: 6, floorSpace: '6,800' },
    { _id: 'villa-5', title: 'Serene Haven Waterfront Villa', location: 'Kochi, Kerala', price: 95000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: '/villa-5.jpg', bedrooms: 4, bathrooms: 4, floorSpace: '4,600' },
    { _id: 'villa-6', title: 'The Crown Jewel Sky Mansion', location: 'Hyderabad, Telangana', price: 160000000, propertyType: 'Penthouse', listingType: 'For Sale', image: '/villa-6.jpg', bedrooms: 4, bathrooms: 5, floorSpace: '5,500' },
    { _id: 'villa-7', title: 'Elysian Hilltop Royal Villa', location: 'Udaipur, Rajasthan', price: 145000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: '/villa-7.jpg', bedrooms: 5, bathrooms: 6, floorSpace: '6,100' },
    { _id: 'villa-8', title: 'Aura Glass Sanctuary Estate', location: 'Pune, Maharashtra', price: 110000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: '/villa-8.jpg', bedrooms: 4, bathrooms: 5, floorSpace: '4,900' },
    { _id: 'villa-9', title: 'The Sovereign Presidential Penthouse', location: 'Kolkata, West Bengal', price: 190000000, propertyType: 'Penthouse', listingType: 'For Sale', image: '/villa-9.jpg', bedrooms: 5, bathrooms: 6, floorSpace: '6,300' },
    { _id: 'villa-10', title: 'Velvet Sunset Cliffside Villa', location: 'Goa, India', price: 210000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,500' },
    { _id: 'villa-11', title: 'The Luminary Glass Penthouse', location: 'Mumbai, Maharashtra', price: 270000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,400' },
    { _id: 'villa-12', title: 'Cascading Waterfalls Royal Estate', location: 'Bengaluru, Karnataka', price: 135000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '7,800' },
    { _id: 'villa-13', title: 'The Zenith Sky Oasis', location: 'Delhi, New Delhi', price: 340000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '7,100' },
    { _id: 'villa-14', title: 'Emerald Backwaters Villa', location: 'Kochi, Kerala', price: 105000000, propertyType: 'Luxury Villa', listingType: 'For Rent', image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 4, floorSpace: '4,800' },
    { _id: 'villa-15', title: 'The Platinum Cloud Mansion', location: 'Hyderabad, Telangana', price: 175000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,800' },
    { _id: 'villa-16', title: 'Maharaja Heritage Palace Villa', location: 'Udaipur, Rajasthan', price: 160000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '8,000' },
    { _id: 'villa-17', title: 'Sapphire Skyline Sanctuary', location: 'Pune, Maharashtra', price: 900000, propertyType: 'Penthouse', listingType: 'For Rent', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,200' },
    { _id: 'villa-18', title: 'The Golden Riverfront Haven', location: 'Kolkata, West Bengal', price: 140000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,400' },
    { _id: 'villa-19', title: 'Coral Reef Beachfront Villa', location: 'Goa, India', price: 220000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,600' },
    { _id: 'villa-20', title: 'The Diamond Heights Penthouse', location: 'Mumbai, Maharashtra', price: 290000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,600' },
    { _id: 'villa-21', title: 'Silicon Valley Elite Estate', location: 'Bengaluru, Karnataka', price: 150000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '7,600' },
    { _id: 'villa-22', title: 'The Capitol Apex Penthouse', location: 'Delhi, New Delhi', price: 320000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,900' },
    { _id: 'villa-23', title: 'Spice Coast Tropical Sanctuary', location: 'Kochi, Kerala', price: 110000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 4, floorSpace: '4,900' },
    { _id: 'villa-24', title: 'The Pearl Horizon Mansion', location: 'Hyderabad, Telangana', price: 180000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,900' },
    { _id: 'villa-25', title: 'Desert Rose Royal Villa', location: 'Udaipur, Rajasthan', price: 155000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,300' },
    { _id: 'villa-26', title: 'Deccan Plateau Grand Estate', location: 'Pune, Maharashtra', price: 125000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,100' },
    { _id: 'villa-27', title: 'The Victoria Memorial Penthouse', location: 'Kolkata, West Bengal', price: 210000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,400' },
    { _id: 'villa-28', title: 'Palolem Palm Grove Villa', location: 'Goa, India', price: 195000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,300' },
    { _id: 'villa-29', title: 'Bandra Bandstand Sky Villa', location: 'Mumbai, Maharashtra', price: 310000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,800' },
    { _id: 'villa-30', title: 'Whitefield Botanical Estate', location: 'Bengaluru, Karnataka', price: 140000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '7,700' },
    { _id: 'villa-31', title: 'Connaught Heights Penthouse', location: 'Delhi, New Delhi', price: 350000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '7,200' },
    { _id: 'villa-32', title: 'Periyar Lakefront Sanctuary', location: 'Kochi, Kerala', price: 115000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 4, floorSpace: '5,000' },
    { _id: 'villa-33', title: 'Jubilee Hills Imperial Mansion', location: 'Hyderabad, Telangana', price: 190000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '6,000' },
    { _id: 'villa-34', title: 'Lake Pichola Royal Palace', location: 'Udaipur, Rajasthan', price: 170000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '8,200' },
    { _id: 'villa-35', title: 'Koregaon Park Glass Sanctuary', location: 'Pune, Maharashtra', price: 130000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,300' },
    { _id: 'villa-36', title: 'Alipore Grand Presidential Suite', location: 'Kolkata, West Bengal', price: 220000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,600' },
    { _id: 'villa-37', title: 'Anjuna Moonlit Villa', location: 'Goa, India', price: 200000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,400' },
    { _id: 'villa-38', title: 'Worli Sea Face Sky Mansion', location: 'Mumbai, Maharashtra', price: 330000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '6,000' },
    { _id: 'villa-39', title: 'Hebbal Lakefront Contemporary Villa', location: 'Bengaluru, Karnataka', price: 145000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '7,800' },
    { _id: 'villa-40', title: 'Golf Links Elite Penthouse', location: 'Delhi, New Delhi', price: 360000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '7,300' },
    { _id: 'villa-41', title: 'Vembanad Luxury Water Villa', location: 'Kochi, Kerala', price: 120000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 4, floorSpace: '5,100' },
    { _id: 'villa-42', title: 'Banjara Hills Royal Pinnacle', location: 'Hyderabad, Telangana', price: 200000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '6,100' },
    { _id: 'villa-43', title: 'Aravali Hills Heritage Retreat', location: 'Udaipur, Rajasthan', price: 175000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '8,400' },
    { _id: 'villa-44', title: 'Prabhat Road Architectural Masterpiece', location: 'Pune, Maharashtra', price: 135000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '5,400' },
    { _id: 'villa-45', title: 'Salt Lake City Elite Penthouse', location: 'Kolkata, West Bengal', price: 230000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,800' },
    { _id: 'villa-46', title: 'Morjim Sunset Beach Villa', location: 'Goa, India', price: 205000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '6,500' },
    { _id: 'villa-47', title: 'Malabar Hill Grand Sky Villa', location: 'Mumbai, Maharashtra', price: 350000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 5, floorSpace: '6,200' },
    { _id: 'villa-48', title: 'Indiranagar Designer Haven', location: 'Bengaluru, Karnataka', price: 150000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', bedrooms: 6, bathrooms: 7, floorSpace: '8,000' },
    { _id: 'villa-49', title: 'Chanakyapuri Diplomatic Penthouse', location: 'Delhi, New Delhi', price: 380000000, propertyType: 'Penthouse', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', bedrooms: 5, bathrooms: 6, floorSpace: '7,500' },
    { _id: 'villa-50', title: 'Kumarakom Backwater Royal Villa', location: 'Kochi, Kerala', price: 125000000, propertyType: 'Luxury Villa', listingType: 'For Sale', image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80', bedrooms: 4, bathrooms: 4, floorSpace: '5,300' }
  ];

  // Forcefully combine database properties with our 50 master collection so it always totals 50+
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get('/properties');
        const dbProps = res.data.properties || res.data;
        if (dbProps && dbProps.length > 0) {
          setProperties([...curatedVillasAndPenthouses, ...dbProps]);
        } else {
          setProperties(curatedVillasAndPenthouses);
        }
      } catch (err) {
        console.error(err);
        setProperties(curatedVillasAndPenthouses);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const displayProperties = properties.length > 0 ? properties : curatedVillasAndPenthouses;

  // Filter properties dynamically
  const filteredProperties = displayProperties.filter((property) => {
    const matchesType = filterType ? property.propertyType?.toLowerCase().includes(filterType.toLowerCase()) : true;
    const matchesLocation = filterLocation ? property.location?.toLowerCase().includes(filterLocation.toLowerCase()) : true;
    
    const listingType = (property.listingType || property.propertyFor || 'For Sale').toLowerCase();
    let matchesTab = true;
    if (activeTab === 'sale') matchesTab = listingType.includes('sale');
    if (activeTab === 'rent') matchesTab = listingType.includes('rent');

    let matchesPrice = true;
    const priceNum = Number(property.price || 0);
    if (filterPrice === '5l-25l') matchesPrice = priceNum >= 500000 && priceNum <= 2500000;
    else if (filterPrice === '25l-50l') matchesPrice = priceNum > 2500000 && priceNum <= 5000000;
    else if (filterPrice === '50l-1cr') matchesPrice = priceNum > 5000000 && priceNum <= 10000000;
    else if (filterPrice === '1cr-3cr') matchesPrice = priceNum > 10000000 && priceNum <= 30000000;
    else if (filterPrice === '3cr-7cr') matchesPrice = priceNum > 30000000 && priceNum <= 70000000;
    else if (filterPrice === '7cr-plus') matchesPrice = priceNum > 70000000;

    return matchesType && matchesLocation && matchesPrice && matchesTab;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Dancing+Script:wght@700&display=swap');

        .home-page {
          background: #070502;
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
          background: #070502;
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
          transform: scale(1.08);
          transition: opacity 1.4s ease-in-out, transform 7s cubic-bezier(0.2, 0.6, 0.3, 1);
          pointer-events: none;
        }

        .hero-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
          animation: heroKenBurns 6.5s ease-out forwards;
        }

        @keyframes heroKenBurns {
          0% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(7, 5, 2, 0.88) 0%, rgba(7, 5, 2, 0.60) 32%, rgba(7, 5, 2, 0.20) 65%, rgba(7, 5, 2, 0.55) 100%),
                      linear-gradient(to bottom, rgba(7, 5, 2, 0.15) 0%, rgba(7, 5, 2, 0.88) 100%);
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
          color: #e5b865;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .hero-subtitle-tag::after {
          content: '';
          width: 50px;
          height: 1.5px;
          background: #e5b865;
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
          color: #e5b865;
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
          background: linear-gradient(135deg, #f3d085 0%, #d4a33c 100%);
          color: #070502;
          border: none;
          padding: 14px 28px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 10px 25px rgba(212, 163, 60, 0.3);
        }

        .explore-btn:hover {
          transform: translateY(-2px);
          background: #f1c875;
        }

        .hero-slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fcf9f2;
          background: rgba(7, 5, 2, 0.35);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 184, 101, 0.35);
          cursor: pointer;
          z-index: 7;
          transition: 0.3s;
        }

        .hero-slider-arrow:hover { background: rgba(229, 184, 101, 0.18); border-color: #e5b865; }
        .hero-slider-arrow.left { left: 28px; }
        .hero-slider-arrow.right { right: 28px; }

        .hero-slider-controls {
          position: absolute;
          bottom: 58px;
          left: 80px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 8;
        }

        .hero-slider-dot {
          position: relative;
          width: 34px;
          height: 3px;
          border: none;
          background: rgba(252, 249, 242, 0.35);
          cursor: pointer;
          overflow: hidden;
          transition: width 0.3s ease;
        }

        .hero-slider-dot.active { width: 65px; background: rgba(252, 249, 242, 0.35); }
        .hero-slider-dot.active::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #e5b865;
          transform-origin: left;
          animation: sliderProgress 5s linear forwards;
        }

        @keyframes sliderProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .hero-slide-number {
          position: absolute;
          bottom: 55px;
          right: 80px;
          z-index: 8;
          display: flex;
          align-items: baseline;
          gap: 7px;
          font-family: 'Playfair Display', serif;
          color: #fcf9f2;
        }

        .hero-slide-number .current { font-size: 28px; color: #e5b865; font-weight: 700; }
        .hero-slide-number .separator { font-size: 14px; opacity: 0.4; }
        .hero-slide-number .total { font-size: 14px; opacity: 0.65; }
        .hero-cursive-slogan { position: absolute; bottom: 110px; right: 80px; font-family: 'Dancing Script', cursive; font-size: 38px; color: #e5b865; z-index: 6; text-shadow: 0 4px 15px rgba(0,0,0,0.8); }

        /* Floating Search Filter Bar */
        .search-filter-bar {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 160px);
          max-width: 1200px;
          background: rgba(14, 10, 5, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 60, 0.35);
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

        .filter-item { display: flex; align-items: center; gap: 16px; padding-right: 20px; border-right: 1px solid rgba(212, 163, 60, 0.2); }
        .filter-item:last-of-type { border-right: none; }
        .filter-icon-box { width: 45px; height: 45px; background: rgba(212, 163, 60, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #e5b865; flex-shrink: 0; }
        .filter-content label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(252, 249, 242, 0.5); margin-bottom: 4px; }
        .filter-content select { background: transparent; border: none; color: #fcf9f2; font-size: 15px; font-weight: 600; outline: none; width: 100%; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; }
        .filter-content select option { background: #090704; color: #fcf9f2; }
        .search-action-btn { background: linear-gradient(135deg, #f3d085 0%, #d4a33c 100%); color: #070502; border: none; padding: 16px 36px; border-radius: 14px; font-weight: 700; font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
        .search-action-btn:hover { background: #f1c875; }

        /* Trust Badges Section */
        .trust-badges-section { max-width: 1200px; margin: 100px auto 60px auto; padding: 0 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; box-sizing: border-box; }
        .trust-badge-card { display: flex; align-items: center; gap: 18px; }
        .trust-icon-circle { width: 60px; height: 60px; border: 1px solid rgba(212, 163, 60, 0.35); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #e5b865; background: rgba(212, 163, 60, 0.04); flex-shrink: 0; }
        .trust-text h4 { font-size: 16px; font-weight: 700; color: #fcf9f2; margin-bottom: 4px; }
        .trust-text p { font-size: 13px; color: rgba(252, 249, 242, 0.55); }

        /* Property Tabs Pill Bar */
        .property-tabs-container {
          max-width: 1200px;
          margin: 60px auto 30px auto;
          padding: 0 40px;
          display: flex;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        .property-tabs-pill {
          background: rgba(18, 13, 6, 0.9);
          border: 1px solid rgba(212, 163, 60, 0.3);
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

        .property-tab-btn:hover { color: #e5b865; }
        .property-tab-btn.active {
          background: linear-gradient(135deg, #f3d085 0%, #d4a33c 100%);
          color: #070502;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(212, 163, 60, 0.3);
        }

        /* Luxury Villa & Penthouse Section */
        .curated-section {
          max-width: 1200px;
          margin: 30px auto 90px auto;
          padding: 0 40px;
          box-sizing: border-box;
        }

        .curated-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 45px;
          border-bottom: 1px solid rgba(212, 163, 60, 0.25);
          padding-bottom: 22px;
        }

        .curated-subtitle-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          letter-spacing: 3px;
          color: #e5b865;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .curated-main-title {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 800;
          color: #fcf9f2;
        }

        .curated-main-title span {
          color: #e5b865;
          font-style: italic;
        }

        .property-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .property-card {
          background: rgba(18, 13, 4, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 60, 0.25);
          border-radius: 22px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
        }

        .property-card:hover {
          transform: translateY(-8px);
          border-color: #d4a33c;
          box-shadow: 0 25px 50px rgba(212, 163, 60, 0.2);
        }

        .card-img-wrapper {
          position: relative;
          height: 260px;
          width: 100%;
          overflow: hidden;
          background: #110d06;
        }

        .card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .property-card:hover .card-img-wrapper img {
          transform: scale(1.08);
        }

        .card-badge {
          position: absolute;
          top: 18px;
          left: 18px;
          background: rgba(7, 5, 2, 0.88);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 163, 60, 0.45);
          color: #e5b865;
          padding: 6px 14px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .card-fav-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          background: rgba(7, 5, 2, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 163, 60, 0.35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fcf9f2;
          cursor: pointer;
          transition: 0.25s;
        }

        .card-fav-btn:hover {
          background: #d4a33c;
          color: #070502;
          transform: scale(1.1);
        }

        .card-content {
          padding: 26px;
        }

        .property-title {
          font-family: 'Playfair Display', serif;
          font-size: 21px;
          font-weight: 700;
          color: #fcf9f2;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .property-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(252, 249, 242, 0.65);
          font-size: 14px;
          margin-bottom: 20px;
        }

        .property-specs {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(212, 163, 60, 0.15);
          border-bottom: 1px solid rgba(212, 163, 60, 0.15);
          padding: 14px 0;
          margin-bottom: 20px;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(252, 249, 242, 0.85);
          font-size: 13.5px;
          font-weight: 500;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .property-price {
          font-size: 22px;
          font-weight: 800;
          color: #e5b865;
          letter-spacing: -0.5px;
        }

        .details-link-btn {
          background: rgba(212, 163, 60, 0.12);
          border: 1px solid rgba(212, 163, 60, 0.35);
          color: #e5b865;
          padding: 9px 18px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.25s;
        }

        .property-card:hover .details-link-btn {
          background: linear-gradient(135deg, #f3d085 0%, #d4a33c 100%);
          color: #070502;
          border-color: transparent;
        }

        /* Completely hide scrollbars while keeping smooth scrolling */
        ::-webkit-scrollbar {
          display: none;
        }
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (max-width: 1024px) {
          .property-grid { grid-template-columns: repeat(2, 1fr); }
          .search-filter-bar { position: relative; bottom: auto; left: auto; transform: none; width: 90%; margin: 40px auto; grid-template-columns: 1fr; }
          .hero-section { height: auto; min-height: 85vh; padding: 60px 20px; }
          .trust-badges-section { grid-template-columns: repeat(2, 1fr); }
          .property-tabs-container { padding: 0 20px; }
        }

        @media (max-width: 768px) {
          .property-grid { grid-template-columns: 1fr; }
          .curated-section { padding: 0 20px; }
          .curated-main-title { font-size: 32px; }
          .property-tabs-pill { width: 100%; display: flex; justify-content: space-between; }
          .property-tab-btn { padding: 10px 12px; font-size: 12.5px; }
        }
      `}</style>

      <div className="home-page">
        {/* =====================================================
            HERO SECTION WITH CINEMATIC SLIDER
        ===================================================== */}
        <div
          className="hero-section"
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
        >
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

          <button className="hero-slider-arrow left" onClick={prevSlide} aria-label="Previous slide">
            <ArrowLeft size={20} />
          </button>
          <button className="hero-slider-arrow right" onClick={nextSlide} aria-label="Next slide">
            <ArrowRight size={20} />
          </button>

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

          <div className="hero-slider-controls">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`hero-slider-dot ${index === currentBgIndex ? 'active' : ''}`}
                onClick={() => setCurrentBgIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="hero-slide-number">
            <span className="current">{String(currentBgIndex + 1).padStart(2, '0')}</span>
            <span className="separator">/</span>
            <span className="total">{String(heroImages.length).padStart(2, '0')}</span>
          </div>

          <div className="hero-cursive-slogan">Better Homes &amp; Brighter Futures</div>

          {/* Floating Search Filter Bar */}
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

            <button className="search-action-btn" onClick={() => {}}><Search size={18} /> Filter</button>
          </div>
        </div>

        {/* 4 Trust Badges Section */}
        <div className="trust-badges-section">
          <div className="trust-badge-card">
            <div className="trust-icon-circle"><HomeIcon size={24} /></div>
            <div className="trust-text"><h4>Verified Properties</h4><p>100% genuine listings</p></div>
          </div>
          <div className="trust-badge-card">
            <div className="trust-icon-circle"><ShieldCheck size={24} /></div>
            <div className="trust-text"><h4>Trusted & Secure</h4><p>Safe transactions</p></div>
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

        {/* Property Tabs Pill Bar */}
        <div className="property-tabs-container">
          <div className="property-tabs-pill">
            <button 
              className={`property-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Properties
            </button>
            <button 
              className={`property-tab-btn ${activeTab === 'sale' ? 'active' : ''}`}
              onClick={() => setActiveTab('sale')}
            >
              For Sale
            </button>
            <button 
              className={`property-tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              For Rent
            </button>
          </div>
        </div>

        {/* =====================================================
            SECTION: LUXURY VILLAS & PENTHOUSES (50 MASTERPIECES)
        ===================================================== */}
        <div className="curated-section">
          <div className="curated-header">
            <div>
              <div className="curated-subtitle-tag"><Crown size={16} /> Exclusive Masterpieces</div>
              <h2 className="curated-main-title">Luxury Villas &amp; <span>Penthouses</span></h2>
            </div>
            <span style={{ color: '#e5b865', fontWeight: '700', fontSize: '15px' }}>
              {filteredProperties.length} Elite Estates
            </span>
          </div>

          <div className="property-grid">
            {filteredProperties.map((property) => (
              <div 
                className="property-card" 
                key={property._id}
                onClick={() => navigate(`/property/${property._id}`)}
              >
                <div className="card-img-wrapper">
                  <span className="card-badge">{property.propertyType}</span>
                  <button className="card-fav-btn" onClick={(e) => { e.stopPropagation(); alert('Added to favorites!'); }}>
                    <Heart size={17} />
                  </button>
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
                <div className="card-content">
                  <h3 className="property-title">{property.title}</h3>
                  <div className="property-location">
                    <MapPin size={15} style={{ color: '#d4a33c' }} /> {property.location}
                  </div>

                  <div className="property-specs">
                    <div className="spec-item"><Bed size={16} style={{ color: '#d4a33c' }} /> {property.bedrooms || 4} Beds</div>
                    <div className="spec-item"><Bath size={16} style={{ color: '#d4a33c' }} /> {property.bathrooms || 5} Baths</div>
                    <div className="spec-item"><Maximize size={16} style={{ color: '#d4a33c' }} /> {property.floorSpace || '5,200'} sqft</div>
                  </div>

                  <div className="card-footer">
                    <span className="property-price">₹ {Number(property.price || 0).toLocaleString('en-IN')}</span>
                    <div className="details-link-btn">
                      View Estate <ArrowRight size={15} />
                    </div>
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

export default Home;