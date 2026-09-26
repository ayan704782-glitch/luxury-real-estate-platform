import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: String,
    details: String,
    propertyType: String,
    price: Number,
    address: String,
    location: String,
    image: String,

    bedrooms: Number,
    livingRooms: Number,
    bathrooms: Number,
    kitchen: Number,

    parking: Number,
    floorSpace: Number,

    agentId: String,
    approved: {
      type: Boolean,
      default: false,
    },

    propertyFor: {
      type: String,
      enum: ['sale', 'rent', 'both'],
      default: 'sale',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'Property',
  propertySchema
);