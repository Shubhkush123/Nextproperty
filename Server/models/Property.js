import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  area: { type: Number, required: true },
  bhk: { type: Number, required: true },
  images: [String], // Array of image URLs
  listingType: {
    type: String,
    enum: ['Rent', 'Sale'],
    required: true
  },
  propertyType: {
    type: String,
    enum: ['Flats', 'Builder Floors', 'House Villas', 'Plots', 'Farmhouses', 'Hotels', 'Lands', 'Office Spaces', 'Hostels', 'Shops Showrooms'],
    required: true
  },
  // Fields only for 'Sale'
  carpetArea: {
    type: Number,
    required: function() { return this.listingType === 'Sale'; }
  },
  builtUpArea: {
    type: Number,
    required: function() { return this.listingType === 'Sale'; }
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // owner
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);