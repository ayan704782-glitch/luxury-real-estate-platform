import Property from '../models/propertyModel.js';

// GET ALL APPROVED PROPERTIES (Public Homepage Catalog)
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ approved: true }).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE PROPERTY (Allows admins/owners to view pending properties, public sees approved only)
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // If property is not approved, allow access only if request is from an admin or the owner agent
    if (!property.approved) {
      const isPrivileged = req.user && (req.user.role === 'admin' || property.agentId.toString() === req.user._id.toString());
      if (!isPrivileged) {
        return res.status(404).json({ message: 'Property not found or pending moderation' });
      }
    }

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  try {
    const requiredFields = [
      'title',
      'details',
      'propertyType',
      'price',
      'address',
      'location',
      'bedrooms',
      'livingRooms',
      'bathrooms',
      'kitchen',
      'parking',
      'floorSpace',
    ];

    for (const field of requiredFields) {
      if (!req.body[field] || String(req.body[field]).trim() === '') {
        return res.status(400).json({
          message: `${field.replace(/([A-Z])/g, ' $1')} is required`,
        });
      }
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Property image is required',
      });
    }

    const property = await Property.create({
      title: req.body.title,
      details: req.body.details,
      propertyType: req.body.propertyType,
      price: Number(req.body.price),
      address: req.body.address,
      location: req.body.location,
      image: `/uploads/${req.file.filename}`,
      bedrooms: Number(req.body.bedrooms),
      livingRooms: Number(req.body.livingRooms),
      bathrooms: Number(req.body.bathrooms),
      kitchen: Number(req.body.kitchen),
      parking: Number(req.body.parking),
      floorSpace: Number(req.body.floorSpace),
      agentId: req.user?._id || req.user?.id || req.body.agentId || '',
      approved: false, // Default to pending review for admin moderation
      propertyFor: req.body.propertyFor || 'sale',
    });

    res.status(201).json(property);
  } catch (err) {
    console.log('CREATE PROPERTY ERROR =>', err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PENDING PROPERTIES FOR ADMIN
export const getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({ approved: false }).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PROPERTIES FOR ADMIN
export const getAllPropertiesForAdmin = async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// APPROVE PROPERTY
export const approveProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.approved = true;
    await property.save();

    res.status(200).json({ message: 'Property approved successfully', property });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({
      message: 'Property deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MY PROPERTIES (Dashboard Portfolio)
export const getMyProperties = async (req, res) => {
  try {
    const agentId = req.user?._id || req.user?.id;
    const properties = await Property.find({ agentId }).sort({ createdAt: -1 });

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};