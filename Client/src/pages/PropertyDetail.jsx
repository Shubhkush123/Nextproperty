import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../utils/api';
import placeholder from '../assets/pexels-binyaminmellish-186077.jpg';
import { FaBed, FaRulerCombined, FaMapMarkerAlt, FaBuilding, FaHome } from 'react-icons/fa';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await get(`/properties/${id}`);
        setProperty(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      } catch (err) {
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!property) return <div className="text-center py-20 text-gray-500">Property not found.</div>;
  
  const { title, description, price, location, area, bhk, images, listingType, propertyType, carpetArea, builtUpArea } = property;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Image Gallery */}
            <div className="lg:col-span-3">
              <img
                src={mainImage || placeholder}
                alt={title}
                className="w-full h-[500px] object-cover"
              />
              <div className="grid grid-cols-5 gap-2 p-2 bg-gray-100">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${title} thumbnail ${index + 1}`}
                    onClick={() => setMainImage(img)}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer border-4 ${mainImage === img ? 'border-purple-500' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="lg:col-span-2 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${listingType === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                  FOR {listingType.toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-gray-500 flex items-center"><FaHome className="mr-2"/>{propertyType}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{title}</h1>
              <div className="flex items-center text-gray-500 text-lg mb-4">
                <FaMapMarkerAlt className="mr-2"/>
                <span>{location}</span>
              </div>
              <p className="text-5xl font-bold text-purple-700 my-4">
                ₹{new Intl.NumberFormat('en-IN').format(price)}
              </p>
              <p className="text-gray-600 mb-6 flex-grow">{description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-center border-t border-b py-4">
                <div className="flex flex-col items-center">
                  <FaBed size={24} className="text-purple-500 mb-1"/>
                  <span className="font-bold">{bhk} BHK</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaRulerCombined size={24} className="text-purple-500 mb-1"/>
                  <span className="font-bold">{area} sqft</span>
                  <span className="text-xs text-gray-500">Total Area</span>
                </div>
                {listingType === 'Sale' && (
                  <>
                    <div className="flex flex-col items-center">
                      <FaBuilding size={24} className="text-purple-500 mb-1"/>
                      <span className="font-bold">{builtUpArea} sqft</span>
                      <span className="text-xs text-gray-500">Built-up Area</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaRulerCombined size={24} className="text-purple-500 mb-1"/>
                      <span className="font-bold">{carpetArea} sqft</span>
                      <span className="text-xs text-gray-500">Carpet Area</span>
                    </div>
                  </>
                )}
              </div>
              
              <button className="w-full mt-8 bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-lg">
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 