







import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X, Edit, Save, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { postsAPI, uploadAPI } from './../../lib/api';

const TourBookingForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [tours, setTours] = useState([]);
  const [currentTourId, setCurrentTourId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [showTourList, setShowTourList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const initialFormData = {
    title: '',
    category: '',
    tagline: '',
    tourType: '',
    description: '',
    transportType: '',
    transportModal: '',
    makeVariant: '',
    mainImage: '',
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
    status: 'draft',
    featured: false
  };

  const [formData, setFormData] = useState(initialFormData);

  // Validation rules and all other existing functions remain the same...
  const validationRules = {
    title: { required: true, minLength: 5, maxLength: 100, message: 'Title must be between 5 and 100 characters' },
    category: { required: true, message: 'Category is required' },
    tagline: { maxLength: 200, message: 'Tagline must be less than 200 characters' },
    tourType: { required: true, message: 'Tour type is required' },
    description: { required: true, minLength: 50, maxLength: 2000, message: 'Description must be between 50 and 2000 characters' },
    transportType: { required: true, message: 'Transport type is required' },
    transportModal: { pattern: /^(19|20)\d{2}$/, message: 'Please select a valid year between 1900-2099' },
    makeVariant: { maxLength: 50, message: 'Make & variant must be less than 50 characters' },
    pickupLocation: { required: true, minLength: 5, message: 'Pickup location is required (min 5 characters)' },
    bestTime: { maxLength: 50, message: 'Best time must be less than 50 characters' },
    locationDetails: { maxLength: 500, message: 'Location details must be less than 500 characters' },
    city: { required: true, message: 'City is required' },
    hotel: { maxLength: 100, message: 'Hotel name must be less than 100 characters' },
    dropArea: { required: (data) => !data.sameDropOff, message: 'Drop-off area is required when different from pickup' },
    dropLocation: { required: (data) => !data.sameDropOff, message: 'Drop-off location is required when different from pickup' },
    dropPoint: { maxLength: 100, message: 'Drop-off point must be less than 100 characters' },
    dropDetails: { maxLength: 500, message: 'Drop-off details must be less than 500 characters' },
    includes: { required: true, minLength: 10, message: 'Please specify what is included in the tour (min 10 characters)' },
    excludes: { required: true, minLength: 10, message: 'Please specify what is not included in the tour (min 10 characters)' },
    languages: { pattern: /^[a-zA-Z,\s]+$/, message: 'Please enter valid languages separated by commas' },
    nearbyAttractions: { maxLength: 500, message: 'Nearby attractions must be less than 500 characters' },
    deadlineHours: { pattern: /^[1-9]\d*$/, min: 1, max: 720, message: 'Deadline hours must be between 1 and 720' },
    cancellationNote: { maxLength: 200, message: 'Cancellation note must be less than 200 characters' },
    reserveNote: { maxLength: 200, message: 'Reservation note must be less than 200 characters' },
    accessibilityNotes: { maxLength: 500, message: 'Accessibility notes must be less than 500 characters' },
    singlePersonName: { required: (data) => data.bookingType === 'single', pattern: /^[a-zA-Z\s]{2,50}$/, message: 'Name must be 2-50 letters only' },
    singlePersonAge: { required: (data) => data.bookingType === 'single', pattern: /^(1[0-9]|[2-9][0-9]|100)$/, message: 'Age must be between 10 and 100' },
    singlePersonNationality: { pattern: /^[a-zA-Z\s]{2,50}$/, message: 'Nationality must be 2-50 letters only' },
    singlePersonPreferences: { maxLength: 200, message: 'Preferences must be less than 200 characters' },
    groupName: { required: (data) => data.bookingType === 'group', minLength: 2, maxLength: 100, message: 'Group name must be between 2 and 100 characters' },
    groupLeaderName: { required: (data) => data.bookingType === 'group', pattern: /^[a-zA-Z\s]{2,50}$/, message: 'Group leader name must be 2-50 letters only' },
    groupSize: { required: (data) => data.bookingType === 'group', pattern: /^[2-9]\d*$/, min: 2, max: 1000, message: 'Group size must be between 2 and 1000' },
    groupType: { required: (data) => data.bookingType === 'group', message: 'Group type is required for group booking' },
    groupSpecialRequests: { maxLength: 500, message: 'Special requests must be less than 500 characters' },
    discountPercentage: { pattern: /^(100|[1-9]?\d)$/, message: 'Discount must be between 0 and 100' },
    validUntil: { validate: (value) => !value || new Date(value) > new Date(), message: 'Valid until date must be in the future' },
    minGroup: { pattern: /^[1-9]\d*$/, message: 'Minimum group size must be a positive number' },
    maxGroup: { pattern: /^[1-9]\d*$/, message: 'Maximum group size must be a positive number' },
    capacity: { pattern: /^[1-9]\d*$/, message: 'Capacity must be a positive number' },
    duration: { required: true, message: 'Duration is required' },
    durationHours: { pattern: /^[1-9]\d*$/, message: 'Duration hours must be a positive number' },
    startTime: { pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, message: 'Please enter a valid start time (HH:MM)' },
    endTime: { pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, message: 'Please enter a valid end time (HH:MM)' },
    operatingHours: { maxLength: 100, message: 'Operating hours must be less than 100 characters' },
    price: { required: true, pattern: /^\$?\d+(\.\d{2})?$/, message: 'Please enter a valid price format (e.g., 100 or $100.00)' },
    priceNumber: { pattern: /^\d+(\.\d{2})?$/, message: 'Please enter a valid price number' },
    pricePerPerson: { pattern: /^\$?\d+(\.\d{2})?$/, message: 'Please enter a valid price per person' },
    highlightsList: { validate: (value) => value.length > 0, message: 'At least one highlight is required' },
    itineraryItems: { validate: (value) => value.length > 0, message: 'At least one itinerary item is required' }
  };

  // All existing validation functions remain the same...
  const validateField = (name, value, formData) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required) {
      const isRequired = typeof rules.required === 'function' 
        ? rules.required(formData) 
        : rules.required;
      
      if (isRequired && (!value || value.toString().trim() === '')) {
        return rules.message || `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      }
    }

    if (!value || value.toString().trim() === '') return '';

    if (rules.minLength && value.length < rules.minLength) {
      return rules.message || `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.message || `Must be less than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value.toString())) {
      return rules.message || 'Invalid format';
    }

    if (rules.min !== undefined && parseFloat(value) < rules.min) {
      return rules.message || `Must be at least ${rules.min}`;
    }

    if (rules.max !== undefined && parseFloat(value) > rules.max) {
      return rules.message || `Must be less than ${rules.max}`;
    }

    if (rules.validate && !rules.validate(value)) {
      return rules.message || 'Invalid value';
    }

    return '';
  };

  const validateForm = (data) => {
    const errors = {};
    
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, data[field], data);
      if (error) {
        errors[field] = error;
      }
    });

    if (data.minGroup && data.maxGroup && parseInt(data.minGroup) > parseInt(data.maxGroup)) {
      errors.minGroup = 'Minimum group size cannot be greater than maximum';
    }

    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      errors.endTime = 'End time must be after start time';
    }

    if (data.discountPercentage && data.price && parseFloat(data.discountPercentage) > 0) {
      const price = parseFloat(data.price.replace(/[^\d.]/g, ''));
      const discount = parseFloat(data.discountPercentage);
      if (discount >= 100) {
        errors.discountPercentage = 'Discount cannot be 100% or more';
      }
    }

    if (data.highlightsList.length === 0) {
      errors.highlightsList = 'At least one highlight is required';
    }

    if (data.itineraryItems.length === 0) {
      errors.itineraryItems = 'At least one itinerary item is required';
    }

    if (!data.mainImage) {
      errors.mainImage = 'Main image is required';
    }

    return errors;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value, formData);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (touchedFields[name]) {
      const error = validateField(name, newValue, { ...formData, [name]: newValue });
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }

    if (name === 'price' && newValue) {
      const priceMatch = newValue.match(/(\d+\.?\d*)/);
      if (priceMatch) {
        setFormData(prev => ({
          ...prev,
          priceNumber: priceMatch[1]
        }));
      }
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts();
      if (response.success) {
        setTours(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching tours:', err);
      setError('Failed to load tours');
    } finally {
      setLoading(false);
    }
  };

  const createTour = async () => {
    try {
      setLoading(true);
      setError('');
      
      const errors = validateForm(formData);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setTouchedFields(Object.keys(validationRules).reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {}));
        setError('Please fix all validation errors before submitting');
        
        const firstErrorField = Object.keys(errors)[0];
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
        return;
      }

      const tourData = cleanFormData(formData);
      const response = await postsAPI.createPost(tourData);
      
      if (response.success) {
        await fetchTours();
        resetForm();
        setShowForm(false);
        alert('Tour created successfully!');
      } else {
        setError(response.message || 'Failed to create tour');
      }
    } catch (err) {
      console.error('Error creating tour:', err);
      setError(err.response?.data?.message || 'Failed to create tour');
    } finally {
      setLoading(false);
    }
  };

  const readTour = async (tourId) => {
    try {
      setLoading(true);
      const response = await postsAPI.getPost(tourId);
      if (response.success) {
        setFormData(response.data);
        setIsViewing(true);
        setShowForm(true);
        setCurrentTourId(tourId);
        setValidationErrors({});
        setTouchedFields({});
      } else {
        setError('Failed to load tour details');
      }
    } catch (err) {
      console.error('Error reading tour:', err);
      setError('Failed to load tour details');
    } finally {
      setLoading(false);
    }
  };

  const updateTour = async () => {
    try {
      if (!currentTourId) return;
      
      setLoading(true);
      setError('');

      const errors = validateForm(formData);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setTouchedFields(Object.keys(validationRules).reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {}));
        setError('Please fix all validation errors before submitting');
        return;
      }

      const tourData = cleanFormData(formData);
      const response = await postsAPI.updatePost(currentTourId, tourData);
      
      if (response.success) {
        await fetchTours();
        resetForm();
        setIsEditing(false);
        setCurrentTourId(null);
        setShowForm(false);
        alert('Tour updated successfully!');
      } else {
        setError(response.message || 'Failed to update tour');
      }
    } catch (err) {
      console.error('Error updating tour:', err);
      setError(err.response?.data?.message || 'Failed to update tour');
    } finally {
      setLoading(false);
    }
  };

  const deleteTour = async (tourId) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;

    try {
      setLoading(true);
      const response = await postsAPI.deletePost(tourId);
      
      if (response.success) {
        await fetchTours();
        if (currentTourId === tourId) {
          resetForm();
        }
        alert('Tour deleted successfully!');
      } else {
        setError(response.message || 'Failed to delete tour');
      }
    } catch (err) {
      console.error('Error deleting tour:', err);
      setError('Failed to delete tour');
    } finally {
      setLoading(false);
    }
  };

  const editTour = async (tourId) => {
    try {
      setLoading(true);
      const response = await postsAPI.getPost(tourId);
      if (response.success) {
        setFormData(response.data);
        setIsEditing(true);
        setIsViewing(false);
        setShowForm(true);
        setCurrentTourId(tourId);
        setValidationErrors({});
        setTouchedFields({});
      } else {
        setError('Failed to load tour for editing');
      }
    } catch (err) {
      console.error('Error loading tour for edit:', err);
      setError('Failed to load tour for editing');
    } finally {
      setLoading(false);
    }
  };

  const cleanFormData = (data) => {
    const cleaned = { ...data };
    
    Object.keys(cleaned).forEach(key => {
      if (Array.isArray(cleaned[key]) && cleaned[key].length === 0) {
        delete cleaned[key];
      }
      if (cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    });

    return cleaned;
  };

  const resetForm = () => {
    setFormData(initialFormData);
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
    setIsEditing(false);
    setIsViewing(false);
    setCurrentTourId(null);
    setError('');
    setValidationErrors({});
    setTouchedFields({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const allTouched = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouchedFields(allTouched);

    if (isEditing) {
      await updateTour();
    } else {
      await createTour();
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const response = await uploadAPI.uploadImage(file);
      return response.data.url || response.data.imageUrl || response.url;
    } catch (err) {
      console.error('Error uploading file:', err);
      return URL.createObjectURL(file);
    }
  };

  const handleFileChange = async (e, field) => {
    const files = Array.from(e.target.files);
    
    if (field === 'mainImage' && files[0]) {
      const imageUrl = await handleFileUpload(files[0]);
      setFormData(prev => ({ ...prev, mainImage: imageUrl }));
      setValidationErrors(prev => ({ ...prev, mainImage: '' }));
    } else if (files.length > 0) {
      const imageUrls = await Promise.all(
        files.map(file => handleFileUpload(file))
      );
      setFormData(prev => ({ ...prev, [field]: imageUrls }));
    }
  };

  const handleItineraryImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await handleFileUpload(file);
      setCurrentItinerary(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  const ValidationMessage = ({ error, touched }) => {
    if (!touched || !error) return null;
    
    return (
      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
        <AlertCircle size={14} />
        <span>{error}</span>
      </div>
    );
  };

  const SuccessMessage = ({ message }) => {
    if (!message) return null;
    
    return (
      <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
        <CheckCircle size={14} />
        <span>{message}</span>
      </div>
    );
  };

  const FieldWrapper = ({ name, label, children, required = false, helperText = '' }) => {
    const error = validationErrors[name];
    const touched = touchedFields[name];
    const isValid = touched && !error;

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        <ValidationMessage error={error} touched={touched} />
        {isValid && helperText && (
          <SuccessMessage message={helperText} />
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-500 mt-1">{helperText}</p>
        )}
      </div>
    );
  };

  // All other state variables and handlers...
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

  // Options arrays
  const categories = ['Tour', 'Transport', 'Hotel'];
  const tourTypes = ['Private', 'Group', 'Shared', 'Custom', ''];
  const transportTypes = ['Bus', 'Car', 'Van', 'Boat', 'Train', 'Airplane', 'Other'];
  const transportModals = Array.from({ length: 10 }, (_, i) => (2001 + i).toString());
  
  const japanCities = [
    'Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Yokohama', 
    'Sapporo', 'Fukuoka', 'Nagoya', 'Kobe', 'Sendai', 'Kawasaki',
    'Saitama', 'Chiba', 'Kitakyushu', 'Sakai', 'Niigata', 'Hamamatsu'
  ];
  
  const japanHotels = [
    'Park Hyatt Tokyo',
    'The Ritz-Carlton, Tokyo',
    'Imperial Hotel Tokyo',
    'Hotel New Otani Tokyo',
    'ANA InterContinental Tokyo',
    'Grand Hyatt Tokyo',
    'Conrad Tokyo',
    'Four Seasons Hotel Tokyo',
    'The Peninsula Tokyo',
    'Mandarin Oriental, Tokyo'
  ];

  const sellingPointOptions = [
    'Hiking', 'Adventure', 'Experience', 'Tour', 'Cultural',
    'Historical', 'Nature', 'Wildlife', 'Photography', 'Food',
    'Luxury', 'Budget', 'Family', 'Romantic', 'Educational'
  ];

  const thingsToBringOptions = [
    'Comfortable walking shoes',
    'Water bottle',
    'Sunscreen',
    'Hat/Cap',
    'Camera',
    'Rain jacket/Umbrella',
    'Snacks',
    'Medications',
    'Swimwear',
    'Extra clothes'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlotsOptions = [
    '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
    '10:00', '10:30', '11:00', '11:30', '12:00'
  ];
  const durationOptions = ['2 Hours', '4 Hours', '6 Hours', '1 Day', '2 Days', '3 Days'];
  const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  const groupTypes = ['Family', 'Friends', 'Corporate', 'School', 'Other'];

  // Section Toggle
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Add Theme
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

  // Selling Points Handlers
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

  // Things to Bring Handlers
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

  // Highlights Handlers
  const addHighlight = () => {
    if (currentHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlightsList: [...prev.highlightsList, currentHighlight.trim()]
      }));
      setCurrentHighlight('');
      setValidationErrors(prev => ({ ...prev, highlightsList: '' }));
    }
  };

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlightsList: prev.highlightsList.filter((_, i) => i !== index)
    }));
  };

  // Taglines Handlers
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

  // Pricing Schedule Handlers
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

  // Calculate Net Price
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

  React.useEffect(() => {
    if (currentPricing.actualPrice && formData.discountPercentage) {
      const netPrice = calculateNetPrice(currentPricing.actualPrice, formData.discountPercentage);
      setCurrentPricing(prev => ({
        ...prev,
        netPrice: netPrice
      }));
    }
  }, [formData.discountPercentage, currentPricing.actualPrice]);

  // Add Pricing Schedule
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

  // Itinerary Handlers with validation
  const addItinerary = () => {
    if (currentItinerary.activity && currentItinerary.activity.trim()) {
      const newItinerary = { ...currentItinerary };
      setFormData(prev => ({
        ...prev,
        itineraryItems: [...prev.itineraryItems, newItinerary]
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
      setValidationErrors(prev => ({ ...prev, itineraryItems: '' }));
    } else {
      alert('Activity name is required for itinerary item');
    }
  };

  const removeItinerary = (index) => {
    setFormData(prev => ({
      ...prev,
      itineraryItems: prev.itineraryItems.filter((_, i) => i !== index)
    }));
  };

  // Destination Handlers
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

  // FAQ Handlers with validation
  const addFaq = () => {
    if (currentFaq.question && currentFaq.answer && currentFaq.question.trim() && currentFaq.answer.trim()) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...currentFaq }]
      }));
      setCurrentFaq({
        question: '',
        answer: '',
      });
    } else {
      alert('Both question and answer are required for FAQ');
    }
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  // Activity Handlers
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

  const SectionHeader = ({ title, section }) => (
    <div 
      className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all"
      onClick={() => toggleSection(section)}
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {expandedSections[section] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </div>
  );

  // Form Progress Indicator
  const calculateFormProgress = () => {
    const requiredFields = Object.keys(validationRules).filter(field => 
      validationRules[field].required
    );
    
    const filledFields = requiredFields.filter(field => {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value && value.toString().trim() !== '';
    });
    
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  const formProgress = calculateFormProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Form Progress */}
        {showForm && !isViewing && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Form Completion</span>
              <span className="text-sm font-bold text-blue-600">{formProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {formProgress < 50 ? 'Keep going! Fill in more required fields.' : 
               formProgress < 80 ? 'Good progress! Almost there.' : 
               'Excellent! Your form is almost complete.'}
            </p>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Processing...</p>
            </div>
          </div>
        )}

        {!showForm ? (
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-2xl p-12 mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tour Management System
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowForm(true);
                    resetForm();
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  <Plus size={24} className="inline mr-2" />
                  Create New Tour
                </button>
                <button
                  onClick={() => setShowTourList(true)}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  <Eye size={24} className="inline mr-2" />
                  View All Tours ({tours.length})
                </button>
              </div>
            </div>

            {/* Tours List */}
            {showTourList && (
              <div className="bg-white rounded-xl shadow-2xl p-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">All Tours ({tours.length})</h2>
                  <button
                    onClick={() => setShowTourList(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
                
                {tours.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No tours found.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {tours.map((tour) => (
                      <div key={tour._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {tour.category}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {tour.tourType}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                tour.status === 'published' ? 'bg-green-100 text-green-800' :
                                tour.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {tour.status}
                              </span>
                              {tour.featured && (
                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              Created: {new Date(tour.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => readTour(tour._id)}
                              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => editTour(tour._id)}
                              className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteTour(tour._id)}
                              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {isEditing ? 'Edit Tour' : isViewing ? 'View Tour' : 'Create New Tour'}
                </h1>
                {currentTourId && (
                  <p className="text-gray-600 mt-2">
                    Tour ID: {currentTourId}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  ← Back to List
                </button>
                {isViewing && (
                  <button
                    onClick={() => {
                      setIsViewing(false);
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Edit size={16} className="inline mr-1" />
                    Edit
                  </button>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Information Section */}
              <div>
                <SectionHeader title="Basic Information" section="basic" />
                {expandedSections.basic && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FieldWrapper name="title" label="Title" required>
                        <input 
                          type="text" 
                          name="title" 
                          value={formData.title} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                          placeholder="Enter tour title"
                        />
                      </FieldWrapper>
                      
                      <FieldWrapper name="category" label="Category" required>
                        <select 
                          name="category" 
                          value={formData.category} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </FieldWrapper>
                      
                      <FieldWrapper name="tourType" label="Tour Type" required>
                        <select 
                          name="tourType" 
                          value={formData.tourType} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Tour Type</option>
                          {tourTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </FieldWrapper>

                      <FieldWrapper name="status" label="Status">
                        <select 
                          name="status" 
                          value={formData.status} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </FieldWrapper>
                    </div>

                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="featured" 
                        checked={formData.featured} 
                        onChange={handleInputChange} 
                        disabled={isViewing}
                        className="w-4 h-4 text-blue-600 disabled:cursor-not-allowed" 
                      />
                      <label className="text-sm font-medium text-gray-700">Featured Tour</label>
                    </div>

                    <FieldWrapper name="tagline" label="Tagline" helperText="A catchy one-line description of your tour">
                      <input 
                        type="text" 
                        name="tagline" 
                        value={formData.tagline} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        placeholder="Enter catchy tagline"
                      />
                    </FieldWrapper>

                    {/* Taglines List */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Taglines</label>
                      {!isViewing && (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={currentTagline} 
                            onChange={(e) => setCurrentTagline(e.target.value)}
                            placeholder="Enter a tagline"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button 
                            type="button" 
                            onClick={addTagline}
                            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <Plus size={16} /> Add
                          </button>
                        </div>
                      )}
                      {formData.taglinesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.taglinesList.map((tagline, index) => (
                            <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {tagline}
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeTagline(index)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Selling Points */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Selling Points</label>
                      {!isViewing && (
                        <div className="space-y-2">
                          <select 
                            onChange={handleSellingPointsChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select selling points...</option>
                            {sellingPointOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      {formData.selectedSellingPoints.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.selectedSellingPoints.map((point, index) => (
                            <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {point}
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeSellingPoint(point)}
                                  className="text-blue-600 hover:text-blue-800 ml-1"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Highlights Section */}
              <div>
                <SectionHeader title="Description & Highlights" section="description" />
                {expandedSections.description && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <FieldWrapper 
                      name="description" 
                      label="Description" 
                      required 
                      helperText="Provide detailed information about your tour (50-2000 characters)"
                    >
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={isViewing}
                        rows="4" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        placeholder="Detailed description of the tour"
                      />
                    </FieldWrapper>
                    
                    {/* Highlights */}
                    <div className="space-y-3">
                      <FieldWrapper 
                        name="highlightsList" 
                        label="Highlights" 
                        required
                        helperText="Add key features that make your tour special"
                      >
                        {!isViewing && (
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
                        )}
                      </FieldWrapper>
                      {formData.highlightsList.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {formData.highlightsList.map((highlight, index) => (
                            <div key={index} className="flex items-center justify-between bg-purple-50 p-3 rounded-md border border-purple-200">
                              <span className="text-purple-800">{highlight}</span>
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeHighlight(index)}
                                  className="text-purple-600 hover:text-purple-800"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Transport Details Section */}
              <div>
                <SectionHeader title="Transport Details" section="transport" />
                {expandedSections.transport && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FieldWrapper name="transportType" label="Transport Type" required>
                        <select 
                          name="transportType" 
                          value={formData.transportType} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Transport Type</option>
                          {transportTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </FieldWrapper>
                      
                      <FieldWrapper name="transportModal" label="Transport Modal" helperText="Select vehicle year">
                        <select 
                          name="transportModal" 
                          value={formData.transportModal} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Year</option>
                          {transportModals.map(modal => <option key={modal} value={modal}>{modal}</option>)}
                        </select>
                      </FieldWrapper>
                      
                      <FieldWrapper name="makeVariant" label="Make & Variant" helperText="e.g., Toyota Hiace">
                        <input 
                          type="text" 
                          name="makeVariant" 
                          value={formData.makeVariant} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., Toyota Hiace" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>
                    </div>
                  </div>
                )}
              </div>

              {/* Images Section */}
              <div>
                <SectionHeader title="Images" section="images" />
                {expandedSections.images && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <FieldWrapper name="mainImage" label="Cover Image" required helperText="Main image for your tour">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'mainImage')} 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                      {formData.mainImage && (
                        <p className="text-sm text-green-600 mt-1">✓ Image selected</p>
                      )}
                    </FieldWrapper>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => handleFileChange(e, 'additionalImages')} 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                      {formData.additionalImages.length > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          ✓ {formData.additionalImages.length} images selected
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => handleFileChange(e, 'galleryImages')} 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                      {formData.galleryImages.length > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          ✓ {formData.galleryImages.length} gallery images selected
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Location Section */}
              <div>
                <SectionHeader title="Pick-up and Drop-off" section="location" />
                {expandedSections.location && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FieldWrapper name="city" label="City" required>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select City</option>
                          {japanCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </FieldWrapper>

                      <FieldWrapper name="hotel" label="Hotels" helperText="Select associated hotel">
                        <select
                          name="hotel"
                          value={formData.hotel}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Hotel</option>
                          {japanHotels.map((hotel) => (
                            <option key={hotel} value={hotel}>{hotel}</option>
                          ))}
                        </select>
                      </FieldWrapper>

                      <FieldWrapper name="pickupLocation" label="Pickup Location" required helperText="Detailed pickup location address">
                        <input
                          type="text"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="Enter pickup location details"
                        />
                      </FieldWrapper>

                      <FieldWrapper name="bestTime" label="Best Time" helperText="e.g., Morning, Evening">
                        <input
                          type="text"
                          name="bestTime"
                          value={formData.bestTime}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., Morning, Evening"
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </FieldWrapper>

                      <FieldWrapper name="locationDetails" label="Location Details" helperText="Additional location information">
                        <textarea
                          name="locationDetails"
                          value={formData.locationDetails}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          rows="3"
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="Additional location details"
                        />
                      </FieldWrapper>

                      {!isViewing && (
                        <div className="md:col-span-2 flex items-center justify-between bg-white px-4 py-3 rounded-md border">
                          <span className="text-sm font-medium text-gray-700">
                            Same Drop-off as Pickup?
                          </span>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={formData.sameDropOff}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  sameDropOff: e.target.checked,
                                  dropArea: e.target.checked ? prev.pickupLocation : "",
                                  dropLocation: e.target.checked ? prev.pickupLocation : "",
                                  dropPoint: e.target.checked ? prev.pickupLocation : "",
                                  dropDetails: e.target.checked ? prev.locationDetails : "",
                                }))
                              }
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>
                      )}

                      {!formData.sameDropOff && (
                        <>
                          <FieldWrapper name="dropArea" label="Drop-off Area" required>
                            <input
                              type="text"
                              name="dropArea"
                              value={formData.dropArea}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              disabled={isViewing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </FieldWrapper>

                          <FieldWrapper name="dropLocation" label="Drop-off Location" required>
                            <input
                              type="text"
                              name="dropLocation"
                              value={formData.dropLocation}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              disabled={isViewing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </FieldWrapper>

                          <FieldWrapper name="dropPoint" label="Drop-off Point">
                            <input
                              type="text"
                              name="dropPoint"
                              value={formData.dropPoint}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              disabled={isViewing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </FieldWrapper>

                          <FieldWrapper name="dropDetails" label="Drop-off Details">
                            <textarea
                              name="dropDetails"
                              value={formData.dropDetails}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              rows="3"
                              disabled={isViewing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </FieldWrapper>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Information Section */}
              <div>
                <SectionHeader title="Additional Information" section="inclusion" />
                {expandedSections.inclusion && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    
                    {/* Things to Bring */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Things to Bring</label>
                      {!isViewing && (
                        <div className="space-y-2">
                          <select 
                            onChange={handleThingsToBringChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select items to bring...</option>
                            {thingsToBringOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      {formData.thingsToBring.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.thingsToBring.map((item, index) => (
                            <div 
                              key={index} 
                              className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                            >
                              {item}
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeThingToBring(item)}
                                  className="text-green-600 hover:text-green-800 ml-1"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <FieldWrapper name="languages" label="Languages" helperText="e.g., English, Urdu, Arabic">
                      <input 
                        type="text" 
                        name="languages" 
                        value={formData.languages} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g., English, Urdu, Arabic" 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>
                    
                    <FieldWrapper name="nearbyAttractions" label="Insider Tips" helperText="Share local insights and tips">
                      <textarea 
                        name="nearbyAttractions" 
                        value={formData.nearbyAttractions} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Insider Tips" 
                        rows="2" 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>

                    <FieldWrapper name="includes" label="Includes" required helperText="What's included in the tour package">
                      <textarea 
                        name="includes" 
                        value={formData.includes} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows="3" 
                        placeholder="What's included in the tour" 
                        disabled={isViewing}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>

                    <FieldWrapper name="excludes" label="Excludes" required helperText="What's not included in the tour package">
                      <textarea 
                        name="excludes" 
                        value={formData.excludes} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows="3" 
                        placeholder="What's not included in the tour" 
                        disabled={isViewing}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>
                  </div>
                )}
              </div>

              {/* Cancellation Policy Section */}
              <div>
                <SectionHeader title="Cancellation Policy" section="cancellation" />
                {expandedSections.cancellation && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="freeCancellation" 
                        checked={formData.freeCancellation} 
                        onChange={handleInputChange} 
                        disabled={isViewing}
                        className="w-4 h-4 text-blue-600 disabled:cursor-not-allowed" 
                      />
                      <label className="text-sm font-medium text-gray-700">Free Cancellation Available</label>
                    </div>

                    <FieldWrapper name="deadlineHours" label="Cancellation Deadline (Hours)" helperText="Hours before tour start when cancellation is allowed">
                      <input 
                        type="number" 
                        name="deadlineHours" 
                        value={formData.deadlineHours} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g., 24" 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>

                    <FieldWrapper name="cancellationNote" label="Cancellation Policy Details">
                      <textarea 
                        name="cancellationNote" 
                        value={formData.cancellationNote} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows="3" 
                        placeholder="Detailed cancellation policy" 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>

                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="reserveNowPayLater" 
                        checked={formData.reserveNowPayLater} 
                        onChange={handleInputChange} 
                        disabled={isViewing}
                        className="w-4 h-4 text-blue-600 disabled:cursor-not-allowed" 
                      />
                      <label className="text-sm font-medium text-gray-700">Reserve Now & Pay Later Available</label>
                    </div>

                    <FieldWrapper name="reserveNote" label="Reservation Policy Details">
                      <textarea 
                        name="reserveNote" 
                        value={formData.reserveNote} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows="2" 
                        placeholder="Reservation policy details" 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>
                  </div>
                )}
              </div>

              {/* Accessibility Section */}
              <div>
                <SectionHeader title="Accessibility Features" section="accessibility" />
                {expandedSections.accessibility && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          name="wheelchairAccessible" 
                          checked={formData.wheelchairAccessible} 
                          onChange={handleInputChange} 
                          disabled={isViewing}
                          className="w-4 h-4 text-blue-600 disabled:cursor-not-allowed" 
                        />
                        <label className="text-sm font-medium text-gray-700">Wheelchair Accessible</label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          name="infantSeats" 
                          checked={formData.infantSeats} 
                          onChange={handleInputChange} 
                          disabled={isViewing}
                          className="w-4 h-4 text-blue-600 disabled:cursor-not-allowed" 
                        />
                        <label className="text-sm font-medium text-gray-700">Infant Seats Available</label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          name="strollerAccessible" 
                          checked={formData.strollerAccessible} 
                          onChange={handleInputChange} 
                          disabled={isViewing}
                          className="w-4 h-4 text-blue-600 disabled:cursor-not-allowed" 
                        />
                        <label className="text-sm font-medium text-gray-700">Stroller Accessible</label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          name="serviceAnimals" 
                          checked={formData.serviceAnimals} 
                          onChange={handleInputChange} 
                          disabled={isViewing}
                          className="w-4 h-4 text-blue-600 disabled:cursor-not-allowed" 
                        />
                        <label className="text-sm font-medium text-gray-700">Service Animals Allowed</label>
                      </div>
                    </div>

                    <FieldWrapper name="accessibilityNotes" label="Additional Accessibility Notes">
                      <textarea 
                        name="accessibilityNotes" 
                        value={formData.accessibilityNotes} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows="3" 
                        placeholder="Additional accessibility information" 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>
                  </div>
                )}
              </div>

              {/* Booking Type Section */}
              <div>
                <SectionHeader title="Booking Type & Details" section="additional" />
                {expandedSections.additional && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    <FieldWrapper name="bookingType" label="Booking Type" required>
                      <select 
                        name="bookingType" 
                        value={formData.bookingType} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={isViewing}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="single">Single Person</option>
                        <option value="group">Group Booking</option>
                      </select>
                    </FieldWrapper>

                    {formData.bookingType === 'single' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldWrapper name="singlePersonName" label="Name" required>
                          <input 
                            type="text" 
                            name="singlePersonName" 
                            value={formData.singlePersonName} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isViewing}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Enter full name"
                          />
                        </FieldWrapper>

                        <FieldWrapper name="singlePersonAge" label="Age" required>
                          <input 
                            type="number" 
                            name="singlePersonAge" 
                            value={formData.singlePersonAge} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isViewing}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Enter age"
                          />
                        </FieldWrapper>

                        <FieldWrapper name="singlePersonNationality" label="Nationality">
                          <input 
                            type="text" 
                            name="singlePersonNationality" 
                            value={formData.singlePersonNationality} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isViewing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Enter nationality"
                          />
                        </FieldWrapper>

                        <FieldWrapper name="singlePersonPreferences" label="Preferences/Special Requirements">
                          <textarea 
                            name="singlePersonPreferences" 
                            value={formData.singlePersonPreferences} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            rows="2"
                            disabled={isViewing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Any special preferences or requirements"
                          />
                        </FieldWrapper>
                      </div>
                    )}

                    {formData.bookingType === 'group' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldWrapper name="groupName" label="Group Name" required>
                          <input 
                            type="text" 
                            name="groupName" 
                            value={formData.groupName} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isViewing}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Enter group name"
                          />
                        </FieldWrapper>

                        <FieldWrapper name="groupLeaderName" label="Group Leader Name" required>
                          <input 
                            type="text" 
                            name="groupLeaderName" 
                            value={formData.groupLeaderName} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isViewing}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Enter group leader name"
                          />
                        </FieldWrapper>

                        <FieldWrapper name="groupSize" label="Group Size" required>
                          <input 
                            type="number" 
                            name="groupSize" 
                            value={formData.groupSize} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isViewing}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Number of people"
                          />
                        </FieldWrapper>

                        <FieldWrapper name="groupType" label="Group Type" required>
                          <select 
                            name="groupType" 
                            value={formData.groupType} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isViewing}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">Select Group Type</option>
                            {groupTypes.map(type => <option key={type} value={type}>{type}</option>)}
                          </select>
                        </FieldWrapper>

                        <FieldWrapper name="groupSpecialRequests" label="Special Requests" className="md:col-span-2">
                          <textarea 
                            name="groupSpecialRequests" 
                            value={formData.groupSpecialRequests} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            rows="3"
                            disabled={isViewing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                            placeholder="Any special requests for the group"
                          />
                        </FieldWrapper>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Itinerary Section */}
              <div>
                <SectionHeader title="Tour Itinerary" section="itinerary" />
                {expandedSections.itinerary && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    <FieldWrapper 
                      name="itineraryItems" 
                      label="Itinerary Items" 
                      required
                      helperText="Add detailed itinerary for your tour"
                    >
                      {!isViewing && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              value={currentItinerary.time} 
                              onChange={(e) => setCurrentItinerary(prev => ({ ...prev, time: e.target.value }))}
                              placeholder="Time (e.g., 09:00 AM)"
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input 
                              type="text" 
                              value={currentItinerary.activity} 
                              onChange={(e) => setCurrentItinerary(prev => ({ ...prev, activity: e.target.value }))}
                              placeholder="Activity name"
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <textarea 
                            value={currentItinerary.description} 
                            onChange={(e) => setCurrentItinerary(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Activity description"
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input 
                              type="text" 
                              value={currentItinerary.duration} 
                              onChange={(e) => setCurrentItinerary(prev => ({ ...prev, duration: e.target.value }))}
                              placeholder="Duration"
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input 
                              type="text" 
                              value={currentItinerary.additionalCost} 
                              onChange={(e) => setCurrentItinerary(prev => ({ ...prev, additionalCost: e.target.value }))}
                              placeholder="Additional cost (if any)"
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={currentItinerary.included} 
                                onChange={(e) => setCurrentItinerary(prev => ({ ...prev, included: e.target.checked }))}
                                className="w-4 h-4 text-blue-600"
                              />
                              <label className="text-sm text-gray-700">Included in price</label>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleItineraryImageChange}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <button 
                              type="button" 
                              onClick={addItinerary}
                              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                              <Plus size={16} /> Add Itinerary
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldWrapper>

                    {formData.itineraryItems.length > 0 && (
                      <div className="space-y-4 mt-4">
                        <h4 className="font-semibold text-gray-700">Added Itinerary Items:</h4>
                        {formData.itineraryItems.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-blue-600">{item.time}</span>
                                  <span className="font-medium">{item.activity}</span>
                                  {item.included && (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                      Included
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <div className="flex gap-4 text-sm text-gray-500">
                                  {item.duration && <span>Duration: {item.duration}</span>}
                                  {item.additionalCost && <span>Extra Cost: {item.additionalCost}</span>}
                                </div>
                              </div>
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeItinerary(index)}
                                  className="text-red-600 hover:text-red-800 ml-4"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Destinations Section */}
              <div>
                <SectionHeader title="Included Destinations" section="destinations" />
                {expandedSections.destinations && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    {!isViewing && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            value={currentDestination.name} 
                            onChange={(e) => setCurrentDestination(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Destination name"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input 
                            type="text" 
                            value={currentDestination.duration} 
                            onChange={(e) => setCurrentDestination(prev => ({ ...prev, duration: e.target.value }))}
                            placeholder="Visit duration"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <textarea 
                          value={currentDestination.description} 
                          onChange={(e) => setCurrentDestination(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Destination description"
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            value={currentDestination.bestTimeToVisit} 
                            onChange={(e) => setCurrentDestination(prev => ({ ...prev, bestTimeToVisit: e.target.value }))}
                            placeholder="Best time to visit"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input 
                            type="text" 
                            value={currentDestination.entryFee} 
                            onChange={(e) => setCurrentDestination(prev => ({ ...prev, entryFee: e.target.value }))}
                            placeholder="Entry fee (if any)"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <input 
                          type="text" 
                          value={currentDestination.openingHours} 
                          onChange={(e) => setCurrentDestination(prev => ({ ...prev, openingHours: e.target.value }))}
                          placeholder="Opening hours"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                        <button 
                          type="button" 
                          onClick={addDestination}
                          className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          <Plus size={16} /> Add Destination
                        </button>
                      </div>
                    )}

                    {formData.includedDestinations.length > 0 && (
                      <div className="space-y-4 mt-4">
                        <h4 className="font-semibold text-gray-700">Included Destinations:</h4>
                        {formData.includedDestinations.map((destination, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-semibold text-lg text-gray-800">{destination.name}</h5>
                                <p className="text-gray-600 mt-1">{destination.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                                  <div>
                                    <span className="font-medium">Duration:</span>
                                    <p className="text-gray-600">{destination.duration}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Best Time:</span>
                                    <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Entry Fee:</span>
                                    <p className="text-gray-600">{destination.entryFee || 'Included'}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Hours:</span>
                                    <p className="text-gray-600">{destination.openingHours}</p>
                                  </div>
                                </div>
                              </div>
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeDestination(index)}
                                  className="text-red-600 hover:text-red-800 ml-4"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* FAQs Section */}
              <div>
                <SectionHeader title="Frequently Asked Questions" section="faqs" />
                {expandedSections.faqs && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    {!isViewing && (
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          value={currentFaq.question} 
                          onChange={(e) => setCurrentFaq(prev => ({ ...prev, question: e.target.value }))}
                          placeholder="Enter question"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                        <textarea 
                          value={currentFaq.answer} 
                          onChange={(e) => setCurrentFaq(prev => ({ ...prev, answer: e.target.value }))}
                          placeholder="Enter answer"
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                        <button 
                          type="button" 
                          onClick={addFaq}
                          className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                          <Plus size={16} /> Add FAQ
                        </button>
                      </div>
                    )}

                    {formData.faqs.length > 0 && (
                      <div className="space-y-4 mt-4">
                        <h4 className="font-semibold text-gray-700">FAQs:</h4>
                        {formData.faqs.map((faq, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-800 mb-2">Q: {faq.question}</h5>
                                <p className="text-gray-600">A: {faq.answer}</p>
                              </div>
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeFaq(index)}
                                  className="text-red-600 hover:text-red-800 ml-4"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Activities Section */}
              <div>
                <SectionHeader title="Activities" section="activities" />
                {expandedSections.activities && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    {!isViewing && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            value={currentActivity.title} 
                            onChange={(e) => setCurrentActivity(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Activity title"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input 
                            type="text" 
                            value={currentActivity.category} 
                            onChange={(e) => setCurrentActivity(prev => ({ ...prev, category: e.target.value }))}
                            placeholder="Activity category"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <textarea 
                          value={currentActivity.description} 
                          onChange={(e) => setCurrentActivity(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Activity description"
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                        <input 
                          type="text" 
                          value={currentActivity.duration} 
                          onChange={(e) => setCurrentActivity(prev => ({ ...prev, duration: e.target.value }))}
                          placeholder="Activity duration"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                        <button 
                          type="button" 
                          onClick={addActivity}
                          className="flex items-center gap-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                        >
                          <Plus size={16} /> Add Activity
                        </button>
                      </div>
                    )}

                    {formData.activities.length > 0 && (
                      <div className="space-y-4 mt-4">
                        <h4 className="font-semibold text-gray-700">Activities:</h4>
                        {formData.activities.map((activity, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                                  <span>Category: {activity.category}</span>
                                  <span>Duration: {activity.duration}</span>
                                </div>
                                <p className="text-gray-600 mt-2">{activity.description}</p>
                              </div>
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeActivity(index)}
                                  className="text-red-600 hover:text-red-800 ml-4"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pricing & Duration Section */}
              <div>
                <SectionHeader title="Pricing & Duration" section="pricing" />
                {expandedSections.pricing && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FieldWrapper name="duration" label="Tour Duration" required>
                        <select 
                          name="duration" 
                          value={formData.duration} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Select Duration</option>
                          {durationOptions.map(duration => <option key={duration} value={duration}>{duration}</option>)}
                        </select>
                      </FieldWrapper>

                      <FieldWrapper name="durationHours" label="Duration (Hours)" helperText="Total tour hours">
                        <input 
                          type="number" 
                          name="durationHours" 
                          value={formData.durationHours} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 4" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>

                      <FieldWrapper name="capacity" label="Tour Capacity" helperText="Maximum number of participants">
                        <input 
                          type="number" 
                          name="capacity" 
                          value={formData.capacity} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 20" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FieldWrapper name="startTime" label="Start Time" helperText="Tour start time (HH:MM)">
                        <input 
                          type="text" 
                          name="startTime" 
                          value={formData.startTime} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 09:00" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>

                      <FieldWrapper name="endTime" label="End Time" helperText="Tour end time (HH:MM)">
                        <input 
                          type="text" 
                          name="endTime" 
                          value={formData.endTime} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 17:00" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>
                    </div>

                    <FieldWrapper name="operatingHours" label="Operating Hours" helperText="General operating hours description">
                      <input 
                        type="text" 
                        name="operatingHours" 
                        value={formData.operatingHours} 
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g., 9:00 AM - 6:00 PM" 
                        disabled={isViewing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                      />
                    </FieldWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FieldWrapper name="price" label="Base Price" required helperText="e.g., $100 or 100">
                        <input 
                          type="text" 
                          name="price" 
                          value={formData.price} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                          placeholder="Enter base price"
                        />
                      </FieldWrapper>

                      <FieldWrapper name="currency" label="Currency">
                        <select 
                          name="currency" 
                          value={formData.currency} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          {currencyOptions.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                        </select>
                      </FieldWrapper>

                      <FieldWrapper name="pricePerPerson" label="Price Per Person" helperText="For group bookings">
                        <input 
                          type="text" 
                          name="pricePerPerson" 
                          value={formData.pricePerPerson} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., $50" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FieldWrapper name="discountPercentage" label="Discount Percentage" helperText="0-100%">
                        <input 
                          type="number" 
                          name="discountPercentage" 
                          value={formData.discountPercentage} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 10" 
                          disabled={isViewing}
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>

                      <FieldWrapper name="validUntil" label="Discount Valid Until">
                        <input 
                          type="date" 
                          name="validUntil" 
                          value={formData.validUntil} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FieldWrapper name="minGroup" label="Minimum Group Size" helperText="For group bookings">
                        <input 
                          type="number" 
                          name="minGroup" 
                          value={formData.minGroup} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 2" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>

                      <FieldWrapper name="maxGroup" label="Maximum Group Size" helperText="For group bookings">
                        <input 
                          type="number" 
                          name="maxGroup" 
                          value={formData.maxGroup} 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 20" 
                          disabled={isViewing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" 
                        />
                      </FieldWrapper>
                    </div>

                    {/* Pricing Schedule */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700">Pricing Schedule</h4>
                      {!isViewing && (
                        <div className="space-y-4 p-4 border rounded-lg bg-white">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Select Days</label>
                              <div className="space-y-2">
                                <button 
                                  type="button" 
                                  onClick={handleSelectAllDays}
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Select All / Clear All
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                  {weekDays.map(day => (
                                    <div key={day} className="flex items-center">
                                      <input 
                                        type="checkbox" 
                                        checked={currentPricing.days.includes(day)}
                                        onChange={() => handleDaySelection(day)}
                                        className="w-4 h-4 text-blue-600 rounded"
                                      />
                                      <label className="ml-2 text-sm text-gray-700">{day}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slots</label>
                              <div className="space-y-2">
                                <button 
                                  type="button" 
                                  onClick={handleSelectAllTimeSlots}
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Select All / Clear All
                                </button>
                                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                                  {timeSlotsOptions.map(timeSlot => (
                                    <div key={timeSlot} className="flex items-center">
                                      <input 
                                        type="checkbox" 
                                        checked={currentPricing.timeSlots.includes(timeSlot)}
                                        onChange={() => handleTimeSlotSelection(timeSlot)}
                                        className="w-4 h-4 text-blue-600 rounded"
                                      />
                                      <label className="ml-2 text-sm text-gray-700">{timeSlot}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FieldWrapper name="pricingDuration" label="Duration">
                              <select 
                                value={currentPricing.duration} 
                                onChange={(e) => setCurrentPricing(prev => ({ ...prev, duration: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select Duration</option>
                                {durationOptions.map(duration => <option key={duration} value={duration}>{duration}</option>)}
                              </select>
                            </FieldWrapper>

                            <FieldWrapper name="pricingActualPrice" label="Actual Price">
                              <input 
                                type="text" 
                                value={currentPricing.actualPrice} 
                                onChange={handleActualPriceChange}
                                placeholder="e.g., 100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </FieldWrapper>

                            <FieldWrapper name="pricingCurrency" label="Currency">
                              <select 
                                value={currentPricing.currency} 
                                onChange={(e) => setCurrentPricing(prev => ({ ...prev, currency: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                {currencyOptions.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                              </select>
                            </FieldWrapper>
                          </div>

                          {currentPricing.netPrice && (
                            <div className="bg-green-50 p-3 rounded-md">
                              <p className="text-sm text-green-800">
                                Net Price after {formData.discountPercentage || 0}% discount: {currentPricing.currency} {currentPricing.netPrice}
                              </p>
                            </div>
                          )}

                          <button 
                            type="button" 
                            onClick={addPricingSchedule}
                            className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                          >
                            <Plus size={16} /> Add to Pricing Schedule
                          </button>
                        </div>
                      )}

                      {formData.pricingSchedule.length > 0 && (
                        <div className="space-y-3 mt-4">
                          <h5 className="font-semibold text-gray-700">Current Pricing Schedule:</h5>
                          {formData.pricingSchedule.map((schedule, index) => (
                            <div key={index} className="border rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <div>
                                      <span className="font-medium text-sm text-gray-600">Days:</span>
                                      <p className="text-gray-800">{schedule.days.join(', ')}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-sm text-gray-600">Time Slots:</span>
                                      <p className="text-gray-800">{schedule.timeSlots.join(', ')}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-sm text-gray-600">Duration:</span>
                                      <p className="text-gray-800">{schedule.duration}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-4 text-sm">
                                    <span className="text-gray-600 line-through">
                                      Actual: {schedule.currency} {schedule.actualPrice}
                                    </span>
                                    <span className="text-green-600 font-semibold">
                                      Net: {schedule.currency} {schedule.netPrice}
                                    </span>
                                  </div>
                                </div>
                                {!isViewing && (
                                  <button 
                                    type="button" 
                                    onClick={() => removePricingSchedule(index)}
                                    className="text-red-600 hover:text-red-800 ml-4"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Themes Section */}
              <div>
                <SectionHeader title="Tour Themes" section="additional" />
                {expandedSections.additional && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Tour Themes</label>
                      {!isViewing && (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={currentTheme} 
                            onChange={(e) => setCurrentTheme(e.target.value)}
                            placeholder="Enter a theme (e.g., Cultural, Adventure)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button 
                            type="button" 
                            onClick={addTheme}
                            className="flex items-center gap-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                          >
                            <Plus size={16} /> Add
                          </button>
                        </div>
                      )}
                      {formData.themesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.themesList.map((theme, index) => (
                            <div key={index} className="flex items-center gap-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                              {theme}
                              {!isViewing && (
                                <button 
                                  type="button" 
                                  onClick={() => removeTheme(index)}
                                  className="text-teal-600 hover:text-teal-800"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              {!isViewing && (
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : isEditing ? (
                      <>
                        <Save size={20} />
                        Update Tour
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Create Tour
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourBookingForm;