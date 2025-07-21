import Property from '../models/Property.js';
import cloudinary from '../config/cloudinary.js';

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      user: req.user._id, // Attach user
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all properties
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('user', '_id username email');
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get properties for the logged-in user
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ user: req.user._id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single property by ID
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Authorization check: only admin or owner can update
    if (req.user.role !== 'admin' && property.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to update this property' });
    }
    
    // Update fields from request body
    const { title, description, price, location, area, bhk, listingType, propertyType, carpetArea, builtUpArea } = req.body;
    property.title = title;
    property.description = description;
    property.price = price;
    property.location = location;
    property.area = area;
    property.bhk = bhk;
    property.listingType = listingType;
    property.propertyType = propertyType;

    // Handle conditional fields
    if (listingType === 'Sale') {
      property.carpetArea = carpetArea;
      property.builtUpArea = builtUpArea;
    } else {
      property.carpetArea = undefined;
      property.builtUpArea = undefined;
    }

    // If new images were uploaded, replace the old ones.
    // The upload middleware puts the new URLs in req.body.images.
    if (typeof req.body.images === 'string') {
      property.images = [req.body.images];
    } else if (Array.isArray(req.body.images)) {
      property.images = req.body.images;
    }

    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);

  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error while updating property.' });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check if the user is an admin or the owner of the property
        if (req.user.role !== 'admin' && property.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this property' });
        }

        await property.remove();
        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};