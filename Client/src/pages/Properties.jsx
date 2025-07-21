import React, { useState, useEffect } from 'react';
import { get, del } from '../utils/api';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard'; // Import the new card

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }

    const fetchAllProperties = async () => {
      try {
        const data = await get('/properties');
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProperties();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await del(`/properties/${id}`);
        setProperties(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        alert(err?.response?.data?.message || 'Failed to delete property');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Explore Properties</h1>
          <p className="text-lg text-gray-500 mt-2">Find the perfect property that fits your needs.</p>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No properties found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map(property => {
              const showActions = user && (user.role === 'admin' || property.user._id === user.id);
              return (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onDelete={() => handleDelete(property._id)}
                  onEdit={() => handleEdit(property._id)}
                  showActions={showActions}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties; 