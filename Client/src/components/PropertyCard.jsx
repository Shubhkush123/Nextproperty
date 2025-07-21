import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../assets/pexels-binyaminmellish-186077.jpg';
import { FaBed, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property, onDelete, onEdit, showActions }) => {
  const { _id, title, images, listingType, propertyType, price, bhk, area, location } = property;
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = images && images.length > 0 ? images : [placeholder];

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIdx(idx => (idx === 0 ? imgs.length - 1 : idx - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgIdx(idx => (idx === imgs.length - 1 ? 0 : idx + 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300">
      <Link to={`/property/${_id}`} className="block relative">
        {/* Image Slider */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={imgs[imgIdx]}
            alt={title}
            className="w-full h-52 object-cover bg-gray-200 transition-all duration-500"
          />
          {imgs.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={nextImg}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {imgs.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${imgIdx === idx ? 'bg-orange-500' : 'bg-gray-300'} inline-block`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Link>
      {/* Existing card content below */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${listingType === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            For {listingType}
          </span>
          <span className="text-xs font-semibold text-gray-500">{propertyType}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-purple-600 transition-colors">{title}</h3>
        <p className="text-2xl font-extrabold text-purple-700 mb-3">
          ₹{new Intl.NumberFormat('en-IN').format(price)}
        </p>
        <div className="flex items-center text-gray-600 mb-4 text-sm">
          <FaMapMarkerAlt className="mr-2 text-gray-400" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 border-t pt-3 mt-auto">
          <div className="flex items-center">
            <FaBed className="mr-2 text-purple-500" /> {bhk} BHK
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="mr-2 text-purple-500" /> {area} sqft
          </div>
        </div>
      </div>
      {showActions && (
        <div className="p-3 bg-gray-50 border-t flex justify-end gap-2">
          <button onClick={() => onEdit(_id)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
          <button onClick={() => onDelete(_id)} className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PropertyCard; 