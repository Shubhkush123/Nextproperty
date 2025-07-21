import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, patch } from '../utils/api';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    area: '',
    bhk: '',
    listingType: 'Rent',
    propertyType: 'Flats',
    carpetArea: '',
    builtUpArea: '',
    images: [],
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const propertyTypes = ['Flats', 'Builder Floors', 'House Villas', 'Plots', 'Farmhouses', 'Hotels', 'Lands', 'Office Spaces', 'Hostels', 'Shops Showrooms'];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await get(`/properties/${id}`);
        setForm({
            title: data.title || '',
            description: data.description || '',
            price: data.price || '',
            location: data.location || '',
            area: data.area || '',
            bhk: data.bhk || '',
            listingType: data.listingType || 'Rent',
            propertyType: data.propertyType || 'Flats',
            carpetArea: data.carpetArea || '',
            builtUpArea: data.builtUpArea || '',
        });
        setExistingImages(data.images || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch property details.');
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const handleFileChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    // Append text fields
    Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
    });

    // Append new images if any
    if (newImages.length > 0) {
        for (let i = 0; i < newImages.length; i++) {
            formData.append('images', newImages[i]);
        }
    }
    
    try {
      await patch(`/properties/${id}`, formData, true); // true = isFormData
      setSuccess('Property updated successfully!');
      setTimeout(() => navigate('/properties'), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update property');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 relative animate-fadeIn">
        <h2 className="text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-orange-500 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow">
          Edit Property
        </h2>
        <div className="text-center text-gray-500 mb-6 text-base font-medium">Update the details of your property</div>
        <div className="border-b border-gray-200 mb-8"></div>
        {success && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center font-semibold">{success}</div>}
        {error && <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Enter property title" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the property" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price (INR)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input name="area" value={form.area} onChange={handleChange} placeholder="Area (sqft)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input name="bhk" value={form.bhk} onChange={handleChange} placeholder="BHK" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="listingType" value={form.listingType} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="Rent">For Rent</option>
              <option value="Sale">For Sale</option>
            </select>
            <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400">
              {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          {form.listingType === 'Sale' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="carpetArea" value={form.carpetArea} onChange={handleChange} placeholder="Carpet Area (sqft)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input name="builtUpArea" value={form.builtUpArea} onChange={handleChange} placeholder="Built-up Area (sqft)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Existing Images</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {existingImages.map((img, index) => (
                <img key={index} src={img} alt="Existing" className="w-24 h-24 object-cover rounded-lg" />
              ))}
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Images (optional)</label>
            <input name="images" type="file" accept="image/*" onChange={handleFileChange} multiple className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-3 rounded-xl">Update Property</button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty; 