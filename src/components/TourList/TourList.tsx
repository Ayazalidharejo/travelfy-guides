import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { tourService } from '../../services/tourService';
import TourCard from './TourCard';

const TourList = ({ onEditTour, onCreateTour }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      setLoading(true);
      const toursData = await tourService.getAllTours();
      setTours(toursData);
    } catch (error) {
      console.error('Error loading tours:', error);
      // Fallback to localStorage
      const localTours = tourService.localStorage.getTours();
      setTours(localTours);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await tourService.deleteTour(id);
        setTours(prev => prev.filter(tour => tour.id !== id));
        alert('Tour deleted successfully!');
      } catch (error) {
        console.error('Error deleting tour:', error);
        tourService.localStorage.deleteTour(id);
        setTours(prev => prev.filter(tour => tour.id !== id));
        alert('Tour deleted successfully!');
      }
    }
  };

  const handleView = (tour) => {
    setSelectedTour(tour);
  };

  if (loading) {
    return <div className="text-center py-8">Loading tours...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tour Management</h1>
        <button
          onClick={onCreateTour}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Create New Tour
        </button>
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No tours found</h3>
          <p className="text-gray-500 mb-4">Create your first tour to get started</p>
          <button
            onClick={onCreateTour}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Tour
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map(tour => (
            <TourCard
              key={tour.id}
              tour={tour}
              onEdit={() => onEditTour(tour)}
              onDelete={() => handleDelete(tour.id)}
              onView={() => handleView(tour)}
            />
          ))}
        </div>
      )}

      {/* Tour Details Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{selectedTour.title}</h3>
                <button
                  onClick={() => setSelectedTour(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <p><strong>Category:</strong> {selectedTour.category}</p>
                <p><strong>Tour Type:</strong> {selectedTour.tourType}</p>
                <p><strong>Description:</strong> {selectedTour.description}</p>
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourList;