import { useState } from 'react';

export const useTourForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    description: false,
    transport: false,
    pricing: false,
    images: false,
    location: false,
    inclusion: false,
    additional: false,
    cancellation: false,
    accessibility: false,
    itinerary: false,
    faqs: false,
    activities: false,
    destinations: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setExpandedSections({
      basic: true,
      description: false,
      transport: false,
      pricing: false,
      images: false,
      location: false,
      inclusion: false,
      additional: false,
      cancellation: false,
      accessibility: false,
      itinerary: false,
      faqs: false,
      activities: false,
      destinations: false
    });
  };

  return {
    formData,
    setFormData,
    expandedSections,
    handleInputChange,
    toggleSection,
    resetForm
  };
};