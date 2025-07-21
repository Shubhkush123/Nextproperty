import React, { useState } from 'react';
import { post } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    area: '',
    bhk: '',
    listingType: 'Rent', // 'Rent' or 'Sale'
    propertyType: 'Flats', // Default value
    carpetArea: '',
    builtUpArea: '',
    images: [], // To handle multiple files
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const propertyTypes = ['Flats', 'Builder Floors', 'House Villas', 'Plots', 'Farmhouses', 'Hotels', 'Lands', 'Office Spaces', 'Hostels', 'Shops Showrooms'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setForm({ ...form, images: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    // Append all form fields to formData
    for (const key in form) {
      if (key === 'images') {
        for (let i = 0; i < form.images.length; i++) {
          formData.append('images', form.images[i]);
        }
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      await post('/properties', formData, true); // true = isFormData
      setSuccess('Property added successfully!');
      // Reset form after submission
      setForm({
        title: '', description: '', price: '', location: '', area: '', bhk: '',
        listingType: 'Rent', propertyType: 'Flats', carpetArea: '', builtUpArea: '', images: []
      });
      navigate('/properties');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to add property');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 relative animate-fadeIn">
        <h2 className="text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-orange-500 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow">
          Add New Property
        </h2>
        <div className="text-center text-gray-500 mb-6 text-base font-medium">Fill in the details to list your property</div>
        <div className="border-b border-gray-200 mb-8"></div>
        {success && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center font-semibold">{success}</div>}
        {error && <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-center font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Enter property title" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the property" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price (INR)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
            <input name="area" value={form.area} onChange={handleChange} placeholder="Area (sqft)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
            <input name="bhk" value={form.bhk} onChange={handleChange} placeholder="BHK" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="listingType" value={form.listingType} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition shadow-sm">
              <option value="Rent">For Rent</option>
              <option value="Sale">For Sale</option>
            </select>
            <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition shadow-sm">
              {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          {form.listingType === 'Sale' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              <input name="carpetArea" value={form.carpetArea} onChange={handleChange} placeholder="Carpet Area (sqft)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
              <input name="builtUpArea" value={form.builtUpArea} onChange={handleChange} placeholder="Built-up Area (sqft)" type="number" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 shadow-sm" required />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Images</label>
            <input name="images" type="file" accept="image/*" onChange={handleChange} multiple className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition" required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-lg mt-2">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty; 