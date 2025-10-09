



import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X, Edit, Eye, Save } from 'lucide-react';

const TourBookingForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [viewingTour, setViewingTour] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: '',
    category: '',
    tagline: '',
    tourType: '',
    description: '',
    transportType: '',
    transportModal: '',
    makeVariant: '',
    mainImage: null,
    additionalImages: [],
    galleryImages: [],
    pickupLocation: '',
    bestTime: '',
    locationDetails: '',
    city: '',
    hotel: '',
    includes: '',
    excludes: '',
    languages: '',
    nearbyAttractions: '',
    freeCancellation: false,
    deadlineHours: '',
    cancellationNote: '',
    reserveNowPayLater: false,
    reserveNote: '',
    wheelchairAccessible: false,
    infantSeats: false,
    strollerAccessible: false,
    serviceAnimals: false,
    accessibilityNotes: '',
    bookingType: 'single',
    singlePersonName: '',
    singlePersonAge: '',
    singlePersonNationality: '',
    singlePersonPreferences: '',
    groupName: '',
    groupLeaderName: '',
    groupSize: '',
    groupType: '',
    groupSpecialRequests: '',
    itineraryItems: [],
    includedDestinations: [],
    faqs: [],
    activities: [],
    pricingSchedule: [],
    highlightsList: [],
    taglinesList: [],
    sameDropOff: true,
    dropArea: '',
    dropLocation: '',
    dropPoint: '',
    dropDetails: '',
    themesList: [],
    selectedSellingPoints: [],
    thingsToBring: [],
    discountPercentage: '',
    validUntil: '',
    minGroup: '',
    maxGroup: '',
    capacity: '',
    duration: '',
    durationHours: '',
    startTime: '',
    endTime: '',
    operatingHours: '',
    price: '',
    priceNumber: '',
    pricePerPerson: '',
    currency: 'USD',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [currentHighlight, setCurrentHighlight] = useState('');
  const [currentTagline, setCurrentTagline] = useState('');
  const [currentTheme, setCurrentTheme] = useState('');
  const [currentItinerary, setCurrentItinerary] = useState({
    time: '',
    activity: '',
    description: '',
    duration: '',
    included: false,
    additionalCost: '',
    image: null
  });

  const [currentDestination, setCurrentDestination] = useState({
    name: '',
    description: '',
    duration: '',
    bestTimeToVisit: '',
    entryFee: '',
    openingHours: ''
  });

  const [currentFaq, setCurrentFaq] = useState({
    question: '',
    answer: '',
  });

  const [currentActivity, setCurrentActivity] = useState({
    title: '',
    description: '',
    duration: '',
    category: ''
  });

  const [currentPricing, setCurrentPricing] = useState({
    days: [],
    timeSlots: [],
    duration: '',
    actualPrice: '',
    netPrice: '',
    currency: 'USD'
  });

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

  // Load tours from localStorage on component mount
  useEffect(() => {
    const savedTours = localStorage.getItem('tours');
    if (savedTours) {
      setTours(JSON.parse(savedTours));
    }
  }, []);

  // Save tours to localStorage whenever tours state changes
  useEffect(() => {
    localStorage.setItem('tours', JSON.stringify(tours));
  }, [tours]);

  // Options arrays (same as before)
  const categories = ['Tour', 'Transport', 'Hotel'];
  const tourTypes = ['Private', 'Group', 'Shared', 'Custom'];
  const transportTypes = ['Bus', 'Car', 'Van', 'Boat', 'Train', 'Airplane', 'Other'];
  const transportModals = Array.from({ length: 10 }, (_, i) => (2001 + i).toString());
  const japanCities = ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Yokohama', 'Sapporo', 'Fukuoka', 'Nagoya', 'Kobe', 'Sendai', 'Kawasaki', 'Saitama', 'Chiba', 'Kitakyushu', 'Sakai', 'Niigata', 'Hamamatsu'];
  const japanHotels = ['Park Hyatt Tokyo', 'The Ritz-Carlton, Tokyo', 'Imperial Hotel Tokyo', 'Hotel New Otani Tokyo', 'ANA InterContinental Tokyo', 'Grand Hyatt Tokyo', 'Conrad Tokyo', 'Four Seasons Hotel Tokyo', 'The Peninsula Tokyo', 'Mandarin Oriental, Tokyo'];
  const sellingPointOptions = ['Hiking', 'Adventure', 'Experience', 'Tour', 'Cultural', 'Historical', 'Nature', 'Wildlife', 'Photography', 'Food', 'Luxury', 'Budget', 'Family', 'Romantic', 'Educational'];
  const thingsToBringOptions = ['Comfortable walking shoes', 'Water bottle', 'Sunscreen', 'Hat/Cap', 'Camera', 'Rain jacket/Umbrella', 'Snacks', 'Medications', 'Swimwear', 'Extra clothes'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlotsOptions = ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
  const durationOptions = ['2 Hours', '4 Hours', '6 Hours', '1 Day', '2 Days', '3 Days'];
  const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  const groupTypes = ['Family', 'Friends', 'Corporate', 'School', 'Other'];

  // CRUD Operations
  const createTour = (tourData) => {
    const newTour = {
      ...tourData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedTours = [...tours, newTour];
    setTours(updatedTours);
    return newTour;
  };

  const readTour = (id) => {
    return tours.find(tour => tour.id === id);
  };

  const updateTour = (id, updatedData) => {
    const updatedTours = tours.map(tour => 
      tour.id === id 
        ? { ...updatedData, updatedAt: new Date().toISOString() }
        : tour
    );
    setTours(updatedTours);
  };

  const deleteTour = (id) => {
    const updatedTours = tours.filter(tour => tour.id !== id);
    setTours(updatedTours);
  };

  // Form handlers (same as before, but updated for CRUD)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditing && editingTour) {
      // Update existing tour
      updateTour(editingTour.id, formData);
      alert('Tour updated successfully!');
    } else {
      // Create new tour
      createTour(formData);
      alert('Tour created successfully!');
    }
    
    // Reset form and state
    resetForm();
    setShowForm(false);
    setIsEditing(false);
    setEditingTour(null);
  };

  const handleEdit = (tour) => {
    setFormData(tour);
    setEditingTour(tour);
    setIsEditing(true);
    setShowForm(true);
    setViewingTour(null);
  };

  const handleView = (tour) => {
    setViewingTour(tour);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      deleteTour(id);
      alert('Tour deleted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      id: Date.now(),
      title: '',
      category: '',
      tagline: '',
      tourType: '',
      description: '',
      transportType: '',
      transportModal: '',
      makeVariant: '',
      mainImage: null,
      additionalImages: [],
      galleryImages: [],
      pickupLocation: '',
      bestTime: '',
      locationDetails: '',
      city: '',
      hotel: '',
      includes: '',
      excludes: '',
      languages: '',
      nearbyAttractions: '',
      freeCancellation: false,
      deadlineHours: '',
      cancellationNote: '',
      reserveNowPayLater: false,
      reserveNote: '',
      wheelchairAccessible: false,
      infantSeats: false,
      strollerAccessible: false,
      serviceAnimals: false,
      accessibilityNotes: '',
      bookingType: 'single',
      singlePersonName: '',
      singlePersonAge: '',
      singlePersonNationality: '',
      singlePersonPreferences: '',
      groupName: '',
      groupLeaderName: '',
      groupSize: '',
      groupType: '',
      groupSpecialRequests: '',
      itineraryItems: [],
      includedDestinations: [],
      faqs: [],
      activities: [],
      pricingSchedule: [],
      highlightsList: [],
      taglinesList: [],
      sameDropOff: true,
      dropArea: '',
      dropLocation: '',
      dropPoint: '',
      dropDetails: '',
      themesList: [],
      selectedSellingPoints: [],
      thingsToBring: [],
      discountPercentage: '',
      validUntil: '',
      minGroup: '',
      maxGroup: '',
      capacity: '',
      duration: '',
      durationHours: '',
      startTime: '',
      endTime: '',
      operatingHours: '',
      price: '',
      priceNumber: '',
      pricePerPerson: '',
      currency: 'USD',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setCurrentHighlight('');
    setCurrentTagline('');
    setCurrentTheme('');
    setCurrentItinerary({
      time: '',
      activity: '',
      description: '',
      duration: '',
      included: false,
      additionalCost: '',
      image: null
    });
    setCurrentDestination({
      name: '',
      description: '',
      duration: '',
      bestTimeToVisit: '',
      entryFee: '',
      openingHours: ''
    });
    setCurrentFaq({
      question: '',
      answer: '',
    });
    setCurrentActivity({
      title: '',
      description: '',
      duration: '',
      category: ''
    });
    setCurrentPricing({
      days: [],
      timeSlots: [],
      duration: '',
      actualPrice: '',
      netPrice: '',
      currency: 'USD'
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingTour(null);
    resetForm();
    setShowForm(false);
  };

  // All other handlers remain the same (addTheme, removeTheme, etc.)
  const addTheme = () => {
    if (currentTheme.trim()) {
      setFormData(prev => ({
        ...prev,
        themesList: [...prev.themesList, currentTheme.trim()]
      }));
      setCurrentTheme('');
    }
  };

  const removeTheme = (index) => {
    setFormData(prev => ({
      ...prev,
      themesList: prev.themesList.filter((_, i) => i !== index)
    }));
  };

  const handleSellingPointsChange = (e) => {
    const value = e.target.value;
    if (value && !formData.selectedSellingPoints.includes(value)) {
      setFormData(prev => ({
        ...prev,
        selectedSellingPoints: [...prev.selectedSellingPoints, value]
      }));
    }
    e.target.value = '';
  };

  const removeSellingPoint = (pointToRemove) => {
    setFormData(prev => ({
      ...prev,
      selectedSellingPoints: prev.selectedSellingPoints.filter(point => point !== pointToRemove)
    }));
  };

  const handleThingsToBringChange = (e) => {
    const value = e.target.value;
    if (value && !formData.thingsToBring.includes(value)) {
      setFormData(prev => ({
        ...prev,
        thingsToBring: [...prev.thingsToBring, value]
      }));
    }
    e.target.value = '';
  };

  const removeThingToBring = (itemToRemove) => {
    setFormData(prev => ({
      ...prev,
      thingsToBring: prev.thingsToBring.filter(item => item !== itemToRemove)
    }));
  };

  const addHighlight = () => {
    if (currentHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlightsList: [...prev.highlightsList, currentHighlight.trim()]
      }));
      setCurrentHighlight('');
    }
  };

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlightsList: prev.highlightsList.filter((_, i) => i !== index)
    }));
  };

  const addTagline = () => {
    if (currentTagline.trim()) {
      setFormData(prev => ({
        ...prev,
        taglinesList: [...prev.taglinesList, currentTagline.trim()]
      }));
      setCurrentTagline('');
    }
  };

  const removeTagline = (index) => {
    setFormData(prev => ({
      ...prev,
      taglinesList: prev.taglinesList.filter((_, i) => i !== index)
    }));
  };

  const handleDaySelection = (day) => {
    setCurrentPricing(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleTimeSlotSelection = (timeSlot) => {
    setCurrentPricing(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(timeSlot)
        ? prev.timeSlots.filter(t => t !== timeSlot)
        : [...prev.timeSlots, timeSlot]
    }));
  };

  const handleSelectAllDays = () => {
    setCurrentPricing(prev => ({
      ...prev,
      days: prev.days.length === weekDays.length ? [] : [...weekDays]
    }));
  };

  const handleSelectAllTimeSlots = () => {
    setCurrentPricing(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.length === timeSlotsOptions.length ? [] : [...timeSlotsOptions]
    }));
  };

  const calculateNetPrice = (actualPrice, discountPercentage) => {
    if (!actualPrice || !discountPercentage) return '';
    const price = parseFloat(actualPrice);
    const discount = parseFloat(discountPercentage);
    const netPrice = (price - (price * discount / 100)).toFixed(2);
    return netPrice;
  };

  const handleActualPriceChange = (e) => {
    const price = e.target.value;
    const netPrice = calculateNetPrice(price, formData.discountPercentage);
    setCurrentPricing(prev => ({
      ...prev,
      actualPrice: price,
      netPrice: netPrice
    }));
  };

  useEffect(() => {
    if (currentPricing.actualPrice && formData.discountPercentage) {
      const netPrice = calculateNetPrice(currentPricing.actualPrice, formData.discountPercentage);
      setCurrentPricing(prev => ({
        ...prev,
        netPrice: netPrice
      }));
    }
  }, [formData.discountPercentage, currentPricing.actualPrice]);

  const addPricingSchedule = () => {
    if (currentPricing.days.length > 0 && currentPricing.timeSlots.length > 0 && currentPricing.actualPrice && currentPricing.duration) {
      const newSchedule = {
        days: [...currentPricing.days],
        timeSlots: [...currentPricing.timeSlots],
        duration: currentPricing.duration,
        actualPrice: currentPricing.actualPrice,
        netPrice: currentPricing.netPrice || calculateNetPrice(currentPricing.actualPrice, formData.discountPercentage),
        currency: currentPricing.currency
      };

      setFormData(prev => ({
        ...prev,
        pricingSchedule: [...prev.pricingSchedule, newSchedule]
      }));

      setCurrentPricing({
        days: [],
        timeSlots: [],
        duration: '',
        actualPrice: '',
        netPrice: '',
        currency: 'USD'
      });
    } else {
      alert('Please fill all required fields: Days, Time Slots, Duration, and Actual Price');
    }
  };

  const removePricingSchedule = (index) => {
    setFormData(prev => ({
      ...prev,
      pricingSchedule: prev.pricingSchedule.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (field === 'mainImage') {
      setFormData(prev => ({ ...prev, mainImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [field]: files }));
    }
  };

  const handleItineraryImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentItinerary(prev => ({
      ...prev,
      image: file
    }));
  };

  const addItinerary = () => {
    if (currentItinerary.activity) {
      setFormData(prev => ({
        ...prev,
        itineraryItems: [...prev.itineraryItems, { ...currentItinerary }]
      }));
      setCurrentItinerary({
        time: '',
        activity: '',
        description: '',
        duration: '',
        included: false,
        additionalCost: '',
        image: null
      });
    }
  };

  const removeItinerary = (index) => {
    setFormData(prev => ({
      ...prev,
      itineraryItems: prev.itineraryItems.filter((_, i) => i !== index)
    }));
  };

  const addDestination = () => {
    if (currentDestination.name) {
      setFormData(prev => ({
        ...prev,
        includedDestinations: [...prev.includedDestinations, { ...currentDestination }]
      }));
      setCurrentDestination({
        name: '',
        description: '',
        duration: '',
        bestTimeToVisit: '',
        entryFee: '',
        openingHours: ''
      });
    }
  };

  const removeDestination = (index) => {
    setFormData(prev => ({
      ...prev,
      includedDestinations: prev.includedDestinations.filter((_, i) => i !== index)
    }));
  };

  const addFaq = () => {
    if (currentFaq.question && currentFaq.answer) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...currentFaq }]
      }));
      setCurrentFaq({
        question: '',
        answer: '',
      });
    }
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const addActivity = () => {
    if (currentActivity.title) {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, { ...currentActivity }]
      }));
      setCurrentActivity({
        title: '',
        description: '',
        duration: '',
        category: ''
      });
    }
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section }) => (
    <div 
      className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all"
      onClick={() => toggleSection(section)}
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {expandedSections[section] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </div>
  );

  // Tour Details View Component
  const TourDetailsView = ({ tour, onClose }) => {
    if (!tour) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-6 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Tour Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-semibold text-blue-600">{tour.title}</h3>
              <p className="text-gray-600">{tour.category} • {tour.tourType}</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Basic Information</h4>
                <p><strong>Title:</strong> {tour.title}</p>
                <p><strong>Category:</strong> {tour.category}</p>
                <p><strong>Tour Type:</strong> {tour.tourType}</p>
                <p><strong>Description:</strong> {tour.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Location Details</h4>
                <p><strong>City:</strong> {tour.city}</p>
                <p><strong>Hotel:</strong> {tour.hotel}</p>
                <p><strong>Pickup Location:</strong> {tour.pickupLocation}</p>
              </div>
            </div>

            {/* Pricing */}
            {tour.pricingSchedule && tour.pricingSchedule.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Pricing Schedule</h4>
                {tour.pricingSchedule.map((schedule, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                    <p><strong>Days:</strong> {schedule.days.join(', ')}</p>
                    <p><strong>Time Slots:</strong> {schedule.timeSlots.join(', ')}</p>
                    <p><strong>Duration:</strong> {schedule.duration}</p>
                    <p><strong>Price:</strong> {schedule.currency} {schedule.actualPrice} 
                      {schedule.netPrice && <span> (Net: {schedule.currency} {schedule.netPrice})</span>}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Includes</h4>
                <p>{tour.includes || 'No information'}</p>
                
                <h4 className="font-semibold text-gray-700 mt-4 mb-2">Excludes</h4>
                <p>{tour.excludes || 'No information'}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Accessibility</h4>
                <div className="space-y-1">
                  <p>Wheelchair Accessible: {tour.wheelchairAccessible ? 'Yes' : 'No'}</p>
                  <p>Infant Seats: {tour.infantSeats ? 'Yes' : 'No'}</p>
                  <p>Stroller Accessible: {tour.strollerAccessible ? 'Yes' : 'No'}</p>
                  <p>Service Animals: {tour.serviceAnimals ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="text-sm text-gray-500 border-t pt-4">
              <p>Created: {new Date(tour.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(tour.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-white border-t p-4 rounded-b-xl">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(tour)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit size={16} /> Edit Tour
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tours List Component
  const ToursList = () => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Tours ({tours.length})</h2>
      
      {tours.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No tours created yet.</p>
          <p className="text-gray-400 mt-2">Create your first tour to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tour.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {tour.tourType}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {tour.city}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-600 line-clamp-2">{tour.description}</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span>Created: {new Date(tour.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Updated: {new Date(tour.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleView(tour)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(tour)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                    title="Edit Tour"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete Tour"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {!showForm ? (
          <div>
            <div className="text-center mb-8">
              <div className="bg-white rounded-xl shadow-2xl p-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Product Management System
                </h1>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  <Plus size={24} className="inline mr-2" />
                  Create New Tour
                </button>
              </div>
            </div>
            
            <ToursList />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {isEditing ? 'Edit Tour' : 'Create New Tour'}
                </h1>
                {isEditing && (
                  <p className="text-gray-600 mt-2">Editing: {formData.title}</p>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing && (
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setEditingTour(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  ← Back to List
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your existing form sections here - they remain exactly the same */}
              {/* Product Management Section */}
              <div>
                <SectionHeader title="Product Management - Create a Product" section="basic" />
                {expandedSections.basic && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={formData.title} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                          name="category" 
                          value={formData.category} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                      
                      {/* ... rest of your form sections remain exactly the same ... */}
                    </div>

                    {/* Continue with all your existing form sections */}
                    {/* Taglines, Selling Points, Description & Highlights, etc. */}
                    
                  </div>
                )}
              </div>

              {/* All other sections remain exactly as in your original code */}
              {/* Description & Highlights */}
              <div>
                <SectionHeader title="Description & Highlights" section="description" />
                {expandedSections.description && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        rows="4" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    
                    {/* Highlights */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={currentHighlight} 
                          onChange={(e) => setCurrentHighlight(e.target.value)}
                          placeholder="Enter a highlight"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button 
                          type="button" 
                          onClick={addHighlight}
                          className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                          <Plus size={16} /> Add
                        </button>
                      </div>
                      {formData.highlightsList.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {formData.highlightsList.map((highlight, index) => (
                            <div key={index} className="flex items-center justify-between bg-purple-50 p-3 rounded-md border border-purple-200">
                              <span className="text-purple-800">{highlight}</span>
                              <button 
                                type="button" 
                                onClick={() => removeHighlight(index)}
                                className="text-purple-600 hover:text-purple-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Continue with all your existing form sections... */}
              {/* Transport Details, Images, Location, Booking Type & Pricing, etc. */}

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset Form
                </button>
                <button 
                  type="submit" 
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 font-medium shadow-lg transition-all"
                >
                  {isEditing ? (
                    <>
                      <Save size={20} /> Update Tour
                    </>
                  ) : (
                    'Create Tour'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tour Details Modal */}
        {viewingTour && (
          <TourDetailsView 
            tour={viewingTour} 
            onClose={() => setViewingTour(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default TourBookingForm;