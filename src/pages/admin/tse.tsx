















// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Eye, Search, Star, ChevronDown, ChevronRight, Save, X, MapPin, Clock, Users, Calendar, Image, DollarSign, Globe, Shield, Heart, Accessibility } from 'lucide-react';
// import axios from 'axios';

// const BlogManagement = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
  
//   const [expandedSections, setExpandedSections] = useState({
//     basic: true,
//     content: false,
//     pricing: false,
//     images: false,
//     location: false,
//     tour: false,
//     policies: false,
//     itinerary: false,
//     destinations: false,
//     languages: false,
//     faqs: false,
//     foods: false,
//     activities: false,
//     events: false,
//     accommodations: false,
//     transport: false,
//     safety: false,
//     shopping: false,
//     guides: false,
//     photos: false,
//     culture: false,
//     medical: false,
//     insurance: false,
//     packing: false,
//     seasonal: false,
//     accessibility: false,
//     sustainability: false,
//     social: false,
//     admin: false
//   });

//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     status: '',
//     featured: '',
//     difficulty: ''
//   });

//   // Complete initial form data with ALL fields
//   const initialFormData = {
//     // ============ BASIC INFORMATION ============
//     title: '',
//     content: '',
//     author: 'Admin',
//     slug: '',
    
//     // ============ PRICING ============
//     price: '',
//     priceNumber: 0,
//     pricePerPerson: 0,
//     currency: 'USD',
//     pricingTiers: [],
//     discount: {
//       percentage: 0,
//       amount: 0,
//       validUntil: '',
//       description: ''
//     },
//     paymentMethods: [],
//     depositRequired: false,
//     depositAmount: 0,
    
//     // ============ CATEGORIES & TAGS ============
//     category: '',
//     tags: [],
//     status: 'published',
//     featured: false,
//     views: 0,
    
//     // ============ IMAGES ============
//     imageUrl: '',
//     images: [],
//     coverImage: '',
//     gallery: [],
    
//     // ============ LOCATION ============
//     prefecture: '',
//     location: {
//       address: '',
//       city: '',
//       country: '',
//       coordinates: { lat: 0, lng: 0 },
//       meetingPoint: '',
//       area: ''
//     },
    
//     // ============ MULTI-LANGUAGE NAMES ============
//     nameJp: '',
//     nameEn: '',
//     nameLocal: '',
    
//     // ============ DURATION & TIMING ============
//     duration: '',
//     durationHours: 8,
//     durationDays: 0,
//     startTime: '',
//     endTime: '',
//     operatingHours: '',
//     bestTimeToVisit: '',
//     bestTime: '',
    
//     // ============ DESCRIPTIONS ============
//     about: '',
//     details: '',
//     description: '',
//     fullDescription: '',
//     summary: '',
//     quickFacts: [],
//     keyFeatures: [],
    
//     // ============ ACTIVITY DETAILS ============
//     highlights: [],
//     includes: [],
//     excludes: [],
//     notSuitableFor: [],
//     rules: [],
//     guides: [],
//     explorationWays: [],
//     requirements: [],
//     preparationTips: [],
//     whatToBring: [],
    
//     // ============ TRAVEL INFORMATION ============
//     difficulty: 'Easy',
//     meetingPoint: '',
//     importantInformation: [],
    
//     // ============ NEARBY SERVICES ============
//     nearbyAttractions: [],
//     dining: [],
//     accommodation: [],
//     tips: [],
//     shoppingAreas: [],
//     emergencyServices: [],
    
//     // ============ LANGUAGES ============
//     languages: [],
//     languagesDetailed: [],
    
//     // ============ POLICIES ============
//     freeCancellation: {
//       available: true,
//       deadlineHours: 24,
//       note: ''
//     },
//     reserveNowPayLater: {
//       available: true,
//       note: ''
//     },
//     cancellationPolicy: 'Free cancellation up to 24 hours before the tour',
//     refundPolicy: 'Full refund for cancellations made 24+ hours in advance',
//     termsConditions: '',
//     privacyPolicy: '',
    
//     // ============ GUIDE INFORMATION ============
//     liveTourGuide: {
//       available: true,
//       languages: [],
//       certification: [],
//       experience: ''
//     },
    
//     // ============ RATING SYSTEM ============
//     rating: {
//       average: 0,
//       count: 0
//     },
//     averageRating: 0,
//     totalReviews: 0,
//     reviewSummary: {
//       excellent: 0,
//       good: 0,
//       average: 0,
//       poor: 0,
//       terrible: 0
//     },
    
//     // ============ REVIEWS ============
//     reviews: [],
//     extendedReviews: [],
    
//     // ============ TOUR GUIDE SPECIFIC FIELDS ============
//     availableDates: [],
//     groupSize: {
//       min: 1,
//       max: 20
//     },
//     tourType: 'Group',
//     capacity: 0,
//     currentBookings: 0,
//     bookingDeadline: 24,
//     confirmationTime: '',
    
//     // ============ AGE & REQUIREMENTS ============
//     minAge: 0,
//     maxAge: 99,
//     physicalRequirements: '',
//     fitnessLevel: '',
//     equipmentProvided: [],
//     equipmentRequired: [],
//     skillLevel: '',
    
//     // ============ NESTED COMPLEX DATA ============
//     destinations: [],
//     itinerary: [],
//     pickupPoints: [],
//     faqs: [],
//     foods: [],
//     activities: [],
//     events: [],
//     accommodations: [],
//     transport: [],
//     safetyInfo: [],
//     shopping: [],
//     localGuides: [],
//     photoSpots: [],
//     culture: [],
//     medical: [],
//     insurance: [],
//     packingList: [],
//     seasonalInfo: [],
    
//     // ============ FEATURES ============
//     features: {
//       comfortableTransport: false,
//       authenticMeals: false,
//       expertGuides: false,
//       photoOpportunities: false,
//       culturalExperience: false,
//       wifi: false,
//       mealsIncluded: false,
//       hotelPickup: false,
//       insuranceIncluded: false,
//       equipmentProvided: false
//     },
    
//     // ============ BOOKING & MANAGEMENT ============
//     bookingStatus: 'Available',
//     bestSeasons: [],
//     weatherConsiderations: '',
//     seasonalPricing: false,
    
//     // ============ EMERGENCY CONTACT ============
//     emergencyContact: {
//       name: '',
//       phone: '',
//       email: '',
//       alternatePhone: ''
//     },
    
//     // ============ BUSINESS LOGIC ============
//     commissionRate: 0,
//     partnerInfo: {
//       name: '',
//       contact: '',
//       commission: 0
//     },
//     revenue: 0,
//     popularityScore: 0,
    
//     // ============ ACCESSIBILITY ============
//     accessibility: {
//       wheelchair: false,
//       visuallyImpaired: false,
//       hearingImpaired: false,
//       notes: ''
//     },
    
//     // ============ SUSTAINABILITY ============
//     sustainability: {
//       ecoFriendly: false,
//       localCommunitySupport: false,
//       carbonNeutral: false,
//       certifications: [],
//       practices: []
//     },
    
//     // ============ SOCIAL MEDIA & MARKETING ============
//     socialMedia: {
//       instagram: '',
//       facebook: '',
//       twitter: '',
//       website: ''
//     },
//     seo: {
//       metaTitle: '',
//       metaDescription: '',
//       keywords: []
//     },
    
//     // ============ ADMIN FIELDS ============
//     isActive: true,
//     isFeatured: false,
//     isPopular: false,
//     isRecommended: false,
//     priority: 0,
//     lastBooked: '',
//     createdFrom: 'admin'
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // Axios configuration
//   const api = axios.create({
//     baseURL: 'https://tour-backend-eight.vercel.app/api',
//     headers: { 'Content-Type': 'application/json' }
//   });

//   api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });

//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         setError('Please login first. Session expired.');
//       }
//       return Promise.reject(error);
//     }
//   );

//   // Constants for dropdowns
//   const categories = ['blog', 'tour', 'mountain', 'urban', 'cultural', 'nature', 'temple', 'modern', 'adventure', 'food', 'accommodation', 'Cultural', 'Nature', 'Adventure', 'Food', 'Shopping', 'Historical', 'Spiritual', 'Beach', 'Wildlife', 'City'];
//   const difficulties = ['Easy', 'Moderate', 'Challenging', 'Hard', 'Expert'];
//   const statuses = ['draft', 'published', 'archived', 'active', 'inactive'];
//   const tourTypes = ['Group', 'Private', 'Premium', 'Custom'];
//   const bookingStatuses = ['Available', 'Limited', 'Sold Out', 'Suspended', 'Coming Soon'];
//   const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
//   const languageLevels = ['Native', 'Fluent', 'Conversational', 'Basic'];
//   const accommodationTypes = ['Hotel', 'Hostel', 'Resort', 'Homestay', 'Camping', 'Villa', 'Apartment'];
//   const transportTypes = ['Bus', 'Car', 'Train', 'Flight', 'Boat', 'Bicycle', 'Walking', 'Taxi', 'Metro'];
//   const activityCategories = ['Adventure', 'Cultural', 'Relaxation', 'Food', 'Shopping', 'Historical', 'Nature'];
//   const comfortLevels = ['Economy', 'Standard', 'Premium', 'Luxury'];
//   const severityLevels = ['Low', 'Medium', 'High', 'Critical'];
//   const importanceLevels = ['Low', 'Medium', 'High'];
//   const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash', 'Digital Wallet'];

//   // Utility functions
//   const cleanFormData = (data) => {
//     const clean = { ...data };
//     delete clean._id;
//     delete clean.__v;
//     delete clean.createdAt;
//     delete clean.updatedAt;
//     delete clean.reviewCount;
//     delete clean.extendedReviewCount;
//     delete clean.createdBy;
//     delete clean.lastUpdatedBy;
//     delete clean.durationInHours;
//     delete clean.remainingSpots;
//     return clean;
//   };

//   const fetchPosts = async (page = 1) => {
//     setLoading(true);
//     setError('');
//     try {
//       const params = { page: page.toString(), limit: '10' };
//       Object.keys(filters).forEach(key => {
//         if (filters[key] && filters[key] !== '') params[key] = filters[key];
//       });
//       const response = await api.get('/posts', { params });
//       if (response.data.success) {
//         setPosts(Array.isArray(response.data.data) ? response.data.data : []);
//         setTotalPages(response.data.pagination?.totalPages || 1);
//         setCurrentPage(response.data.pagination?.currentPage || 1);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Unable to fetch posts');
//       setPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createPost = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const cleanData = cleanFormData(formData);
//       const token = localStorage.getItem("token");
      
//       const response = await api.post('/posts', cleanData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setSuccess('Post created successfully!');
//         setShowModal(false);
//         resetForm();
//         await fetchPosts(currentPage);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Unable to create post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updatePost = async () => {
//     if (!editingPost?._id) return;
//     setLoading(true);
//     setError('');
//     try {
//       const cleanData = cleanFormData(formData);
//       const response = await api.put(`/posts/${editingPost._id}`, cleanData);
//       if (response.data.success) {
//         setSuccess('Post updated successfully!');
//         setShowModal(false);
//         setEditingPost(null);
//         resetForm();
//         await fetchPosts(currentPage);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Unable to update post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deletePost = async (id) => {
//     if (!id || !window.confirm('Are you sure?')) return;
//     setLoading(true);
//     try {
//       await api.delete(`/posts/${id}`);
//       setSuccess('Post deleted successfully!');
//       await fetchPosts(currentPage);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Unable to delete post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData(initialFormData);
//   };

//   const handleEditClick = (post) => {
//     if (!post) return;
//     setEditingPost(post);
    
//     const mergedData = { ...initialFormData };
//     const deepMerge = (target, source) => {
//       for (const key in source) {
//         if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
//           if (!target[key]) target[key] = {};
//           deepMerge(target[key], source[key]);
//         } else if (Array.isArray(source[key])) {
//           target[key] = Array.isArray(source[key]) ? [...source[key]] : [];
//         } else {
//           target[key] = source[key];
//         }
//       }
//       return target;
//     };
    
//     setFormData(deepMerge(mergedData, post));
//     setShowModal(true);
//   };

//   // Field handlers
//   const handleArrayFieldChange = (fieldName, index, value) => {
//     const newArray = [...(formData[fieldName] || [])];
//     newArray[index] = value;
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   const addArrayField = (fieldName, defaultValue = '') => {
//     setFormData({ ...formData, [fieldName]: [...(formData[fieldName] || []), defaultValue] });
//   };

//   const removeArrayField = (fieldName, index) => {
//     const newArray = (formData[fieldName] || []).filter((_, i) => i !== index);
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   const addComplexField = (fieldName, template) => {
//     setFormData({ ...formData, [fieldName]: [...(formData[fieldName] || []), template] });
//   };

//   const updateComplexField = (fieldName, index, field, value) => {
//     const newArray = [...(formData[fieldName] || [])];
//     if (!newArray[index]) newArray[index] = {};
//     newArray[index] = { ...newArray[index], [field]: value };
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   const removeComplexField = (fieldName, index) => {
//     const newArray = (formData[fieldName] || []).filter((_, i) => i !== index);
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   const updateNestedObject = (parentField, childField, value) => {
//     setFormData({ 
//       ...formData, 
//       [parentField]: { 
//         ...formData[parentField], 
//         [childField]: value 
//       } 
//     });
//   };

//   const updateDeepNestedObject = (parentField, childField, grandChildField, value) => {
//     setFormData({ 
//       ...formData, 
//       [parentField]: { 
//         ...formData[parentField], 
//         [childField]: {
//           ...formData[parentField]?.[childField],
//           [grandChildField]: value
//         } 
//       } 
//     });
//   };

//   const toggleSection = (section) => {
//     setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title?.trim() || !formData.content?.trim() || !formData.category || !formData.duration?.trim() || !formData.price?.trim()) {
//       setError('Please fill all required fields');
//       return;
//     }
//     editingPost ? updatePost() : createPost();
//   };

//   // Render functions
//   const renderArrayField = (fieldName, label, placeholder = '', type = 'text') => (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       {(formData[fieldName] || []).map((item, index) => (
//         <div key={index} className="flex items-center space-x-2">
//           {type === 'textarea' ? (
//             <textarea 
//               value={item || ''} 
//               onChange={(e) => handleArrayFieldChange(fieldName, index, e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-md" 
//               placeholder={placeholder}
//               rows={2}
//             />
//           ) : (
//             <input 
//               type={type} 
//               value={item || ''} 
//               onChange={(e) => handleArrayFieldChange(fieldName, index, e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-md" 
//               placeholder={placeholder} 
//             />
//           )}
//           <button type="button" onClick={() => removeArrayField(fieldName, index)} className="p-2 text-red-600 hover:bg-red-50 rounded-md">
//             <Trash2 size={16} />
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={() => addArrayField(fieldName, '')} className="text-blue-600 text-sm flex items-center">
//         <Plus size={16} className="mr-1" /> Add {label}
//       </button>
//     </div>
//   );

//   const renderComplexField = (fieldName, label, fieldsConfig, template) => (
//     <div className="border p-4 rounded space-y-4">
//       <h5 className="font-medium text-lg">{label}</h5>
//       {(formData[fieldName] || []).map((item, index) => (
//         <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded bg-gray-50">
//           {fieldsConfig.map((fieldConfig) => (
//             <div key={fieldConfig.name} className={fieldConfig.fullWidth ? 'col-span-2' : ''}>
//               <label className="block text-sm font-medium mb-1">{fieldConfig.label}</label>
//               {fieldConfig.type === 'textarea' ? (
//                 <textarea
//                   rows={fieldConfig.rows || 2}
//                   value={item[fieldConfig.name] || ''}
//                   onChange={(e) => updateComplexField(fieldName, index, fieldConfig.name, e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md"
//                   placeholder={fieldConfig.placeholder}
//                 />
//               ) : fieldConfig.type === 'select' ? (
//                 <select
//                   value={item[fieldConfig.name] || ''}
//                   onChange={(e) => updateComplexField(fieldName, index, fieldConfig.name, e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md"
//                 >
//                   <option value="">Select {fieldConfig.label}</option>
//                   {fieldConfig.options.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               ) : fieldConfig.type === 'checkbox' ? (
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={item[fieldConfig.name] || false}
//                     onChange={(e) => updateComplexField(fieldName, index, fieldConfig.name, e.target.checked)}
//                     className="h-4 w-4 text-blue-600 rounded"
//                   />
//                   <span className="ml-2 text-sm">{fieldConfig.placeholder}</span>
//                 </label>
//               ) : fieldConfig.type === 'number' ? (
//                 <input
//                   type="number"
//                   value={item[fieldConfig.name] || ''}
//                   onChange={(e) => updateComplexField(fieldName, index, fieldConfig.name, parseFloat(e.target.value) || 0)}
//                   className="w-full px-3 py-2 border rounded-md"
//                   placeholder={fieldConfig.placeholder}
//                 />
//               ) : fieldConfig.type === 'date' ? (
//                 <input
//                   type="date"
//                   value={item[fieldConfig.name] || ''}
//                   onChange={(e) => updateComplexField(fieldName, index, fieldConfig.name, e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md"
//                 />
//               ) : (
//                 <input
//                   type={fieldConfig.type || 'text'}
//                   value={item[fieldConfig.name] || ''}
//                   onChange={(e) => updateComplexField(fieldName, index, fieldConfig.name, e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md"
//                   placeholder={fieldConfig.placeholder}
//                 />
//               )}
//             </div>
//           ))}
//           <div className="col-span-2">
//             <button type="button" onClick={() => removeComplexField(fieldName, index)} className="text-red-600 text-sm flex items-center">
//               <Trash2 size={16} className="mr-1" /> Remove
//             </button>
//           </div>
//         </div>
//       ))}
//       <button type="button" onClick={() => addComplexField(fieldName, template)} className="text-blue-600 text-sm flex items-center">
//         <Plus size={16} className="mr-1" /> Add {label}
//       </button>
//     </div>
//   );

//   // Template objects for complex fields
//   const destinationTemplate = {
//     name: '',
//     description: '',
//     duration: '',
//     difficulty: 'Easy',
//     highlights: [],
//     tips: '',
//     bestTimeToVisit: '',
//     localAttractions: [],
//     nearbyPlaces: [],
//     entryFee: '',
//     location: {
//       address: '',
//       coordinates: { lat: 0, lng: 0 }
//     },
//     images: [],
//     openingHours: '',
//     contactInfo: {
//       phone: '',
//       email: '',
//       website: ''
//     }
//   };

//   const itineraryTemplate = {
//     time: '',
//     activity: '',
//     description: '',
//     duration: '',
//     location: '',
//     images: [],
//     notes: '',
//     included: true,
//     cost: 0
//   };

//   const faqTemplate = {
//     question: '',
//     answer: '',
//     category: '',
//     priority: 0
//   };

//   const foodTemplate = {
//     name: '',
//     description: '',
//     image: '',
//     isVeg: false,
//     recommended: false,
//     priceRange: '',
//     restaurant: '',
//     dietaryInfo: [],
//     tastingNotes: '',
//     bestTimeToEat: ''
//   };

//   const activityTemplate = {
//     title: '',
//     description: '',
//     duration: '',
//     category: 'Adventure',
//     image: '',
//     cost: 0,
//     ageLimit: '',
//     safetyNotes: '',
//     location: '',
//     included: true,
//     requirements: [],
//     bestTime: ''
//   };

//   // Use effects
//   useEffect(() => { fetchPosts(1); }, []);
//   useEffect(() => {
//     const timeoutId = setTimeout(() => { fetchPosts(1); }, 500);
//     return () => clearTimeout(timeoutId);
//   }, [filters]);
//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => { setSuccess(''); setError(''); }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, error]);

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
        
//         <h1 className="text-3xl font-bold">Blog Management</h1>
//         <button onClick={() => { setEditingPost(null); resetForm(); setShowModal(true); }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
//           <Plus size={20} /> Add New Post
//         </button>
//       </div>

//       {success && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}
//       {error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input type="text" placeholder="Search..." value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})}
//               className="w-full pl-10 pr-4 py-2 border rounded-lg" />
//           </div>
//           <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})} className="px-3 py-2 border rounded-lg">
//             <option value="">All Categories</option>
//             {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//           </select>
//           <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-3 py-2 border rounded-lg">
//             <option value="">All Status</option>
//             {statuses.map(status => <option key={status} value={status}>{status}</option>)}
//           </select>
//           <select value={filters.difficulty} onChange={(e) => setFilters({...filters, difficulty: e.target.value})} className="px-3 py-2 border rounded-lg">
//             <option value="">All Difficulties</option>
//             {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
//           </select>
//           <select value={filters.featured} onChange={(e) => setFilters({...filters, featured: e.target.value})} className="px-3 py-2 border rounded-lg">
//             <option value="">All Posts</option>
//             <option value="true">Featured</option>
//             <option value="false">Non-Featured</option>
//           </select>
//         </div>
//       </div>

//       {/* Posts Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {loading ? (
//           <div className="p-12 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading...</p>
//           </div>
//         ) : posts.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">No posts found</div>
//         ) : (
//           <>
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {posts.map((post) => (
//                   <tr key={post._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="text-sm font-medium text-gray-900">{post.title}</div>
//                         {post.featured && <Star className="ml-2 h-4 w-4 text-yellow-400 fill-current" />}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{post.category}</span></td>
//                     <td className="px-6 py-4 text-sm">{post.price}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
//                         {post.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm"><div className="flex items-center"><Eye className="h-4 w-4 text-gray-400 mr-1" />{post.views || 0}</div></td>
//                     <td className="px-6 py-4">
//                       <div className="flex space-x-2">
//                         <button onClick={() => handleEditClick(post)} className="text-indigo-600 hover:text-indigo-900"><Edit size={16} /></button>
//                         <button onClick={() => deletePost(post._id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {totalPages > 1 && (
//               <div className="px-4 py-3 border-t flex justify-between items-center">
//                 <button onClick={() => fetchPosts(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded-md disabled:opacity-50">Previous</button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => fetchPosts(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-md disabled:opacity-50">Next</button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Modal - Complete with ALL sections */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto z-50">
//           <div className="relative top-4 mx-auto p-5 border w-11/12 max-w-7xl shadow-lg rounded-lg bg-white mb-8 max-h-[95vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4 border-b z-10">
//               <h3 className="text-xl font-bold">{editingPost ? 'Edit Post' : 'Create Post'}</h3>
//               <button onClick={() => { setShowModal(false); setEditingPost(null); resetForm(); }} className="text-gray-400 hover:text-gray-600">
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* SECTION 1: Basic Information */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('basic')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg">
//                   <h4 className="text-lg font-medium flex items-center"><Star className="mr-2" size={20} /> Basic Information</h4>
//                   {expandedSections.basic ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.basic && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Title *</label>
//                         <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
                     
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Category *</label>
//                         <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           <option value="">Select</option>
//                           {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                         </select>
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Status</label>
//                         <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           {statuses.map(s => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                       </div>
                   
//                     </div>
//                     <div><label className="block text-sm font-medium mb-1">tagline *</label>
//                       <textarea required rows={6} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                     </div>
                   
//                     <div className="mb-4">
//   <label className="block text-sm font-medium mb-2">Select Tour Type</label>
//   <select
//     value={formData.tourType}
//     onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
//     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//   >
//     <option value="">-- Select --</option>
//     <option value="private">Private</option>
//     <option value="public">Public</option>
//     <option value="shared">Shared</option>
//     <option value="other">Other</option>
//   </select>
// </div>

//                     {renderArrayField('tags', 'Tags', 'Enter tag')}
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 2: Content & Descriptions */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('content')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><Edit className="mr-2" size={20} /> Descriptions</h4>
//                   {expandedSections.content ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.content && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     
//                       <div><label className="block text-sm font-medium mb-1">Description</label>
//                         <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
                     
//                     </div>
                  
//                     {renderArrayField('quickFacts', 'Highlightes', 'Enter quick fact')}
//                     {renderArrayField('keyFeatures', 'Sealing point', 'Enter key feature')}
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 3: Pricing */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('pricing')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><DollarSign className="mr-2" size={20} /> Pricing & Duration</h4>
//                   {expandedSections.pricing ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.pricing && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Transport type</label>
//                         <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           <option value="USD">Bus</option><option value="EUR">when</option><option value="JPY">Car</option><option value="GBP">GBP</option>
//                         </select>
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Transport modal</label>
//                         <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           <option value="USD">2001</option><option value="EUR">2206</option><option value="JPY">2007</option><option value="GBP">2003</option>
//                         </select>
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Make & varitent</label>
//                         <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           <option value="USD">2001</option><option value="EUR">2206</option><option value="JPY">2007</option><option value="GBP">2003</option>
//                         </select>
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Price *</label>
//                         <input type="text" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Price Number</label>
//                         <input type="number" value={formData.priceNumber} onChange={(e) => setFormData({...formData, priceNumber: parseFloat(e.target.value) || 0})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Price Per Person</label>
//                         <input type="number" value={formData.pricePerPerson} onChange={(e) => setFormData({...formData, pricePerPerson: parseFloat(e.target.value) || 0})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Currency</label>
//                         <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           <option value="USD">USD</option><option value="EUR">EUR</option><option value="JPY">JPY</option><option value="GBP">GBP</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Duration *</label>
//                         <input type="text" required value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Duration Hours</label>
//                         <input type="number" value={formData.durationHours} onChange={(e) => setFormData({...formData, durationHours: parseInt(e.target.value) || 8})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Start Time</label>
//                         <input type="text" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">End Time</label>
//                         <input type="text" value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Operating Hours</label>
//                         <input type="text" value={formData.operatingHours} onChange={(e) => setFormData({...formData, operatingHours: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                     </div>
//                     <div className="border p-4 rounded bg-gray-50">
//                       <h5 className="font-medium mb-3">Discount Information</h5>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div><label className="block text-sm font-medium mb-1">Discount Percentage</label>
//                           <input type="number" value={formData.discount.percentage} onChange={(e) => setFormData({...formData, discount: {...formData.discount, percentage: parseFloat(e.target.value) || 0}})} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                         <div><label className="block text-sm font-medium mb-1">Discount Amount</label>
//                           <input type="number" value={formData.discount.amount} onChange={(e) => setFormData({...formData, discount: {...formData.discount, amount: parseFloat(e.target.value) || 0}})} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                         <div><label className="block text-sm font-medium mb-1">Valid Until</label>
//                           <input type="date" value={formData.discount.validUntil} onChange={(e) => setFormData({...formData, discount: {...formData.discount, validUntil: e.target.value}})} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                         <div><label className="block text-sm font-medium mb-1">Description</label>
//                           <input type="text" value={formData.discount.description} onChange={(e) => setFormData({...formData, discount: {...formData.discount, description: e.target.value}})} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.depositRequired}
//                           onChange={(e) => setFormData({...formData, depositRequired: e.target.checked})}
//                           className="h-4 w-4 text-blue-600 rounded"
//                         />
//                         <span className="ml-2 text-sm">Deposit Required</span>
//                       </label>
//                       {formData.depositRequired && (
//                         <div>
//                           <label className="block text-sm font-medium mb-1">Deposit Amount</label>
//                           <input
//                             type="number"
//                             value={formData.depositAmount}
//                             onChange={(e) => setFormData({...formData, depositAmount: parseFloat(e.target.value) || 0})}
//                             className="w-full px-3 py-2 border rounded-md"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 4: Images */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('images')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><Image className="mr-2" size={20} /> Images</h4>
//                   {expandedSections.images ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.images && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Main Image URL</label>
//                         <input type="url" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Cover Image</label>
//                         <input type="url" value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                     </div>
//                     {renderArrayField('images', 'Additional Images', 'https://example.com/image.jpg')}
                    
//                     {/* Gallery */}
//                     <div className="border p-4 rounded">
//                       <h5 className="font-medium mb-3">Gallery</h5>
//                       {(formData.gallery || []).map((item, index) => (
//                         <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 border rounded bg-gray-50">
//                           <div><label className="block text-sm font-medium mb-1">Image URL</label>
//                             <input type="url" value={item.url || ''} onChange={(e) => updateComplexField('gallery', index, 'url', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
//                           </div>
//                           <div><label className="block text-sm font-medium mb-1">Caption</label>
//                             <input type="text" value={item.caption || ''} onChange={(e) => updateComplexField('gallery', index, 'caption', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
//                           </div>
//                           <div className="col-span-2">
//                             <button type="button" onClick={() => removeComplexField('gallery', index)} className="text-red-600 text-sm flex items-center">
//                               <Trash2 size={16} className="mr-1" /> Remove
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                       <button type="button" onClick={() => addComplexField('gallery', {url: '', caption: '', category: ''})} className="text-blue-600 text-sm flex items-center">
//                         <Plus size={16} className="mr-1" /> Add Gallery Item
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 5: Location */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('location')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><MapPin className="mr-2" size={20} /> Location & Tour Details</h4>
//                   {expandedSections.location ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.location && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Pick up Location</label>
//                         <input type="text" value={formData.prefecture} onChange={(e) => setFormData({...formData, prefecture: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Meeting Point</label>
//                         <input type="text" value={formData.meetingPoint} onChange={(e) => setFormData({...formData, meetingPoint: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Best Time</label>
//                         <input type="text" value={formData.bestTime} onChange={(e) => setFormData({...formData, bestTime: e.target.value})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                     </div>
                    
//                     <div className="border p-4 rounded bg-gray-50">
//                       <h5 className="font-medium mb-3">Location Details</h5>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div><label className="block text-sm font-medium mb-1">Address</label>
//                           <input type="text" value={formData.location.address} onChange={(e) => updateNestedObject('location', 'address', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                         <div><label className="block text-sm font-medium mb-1">City</label>
//                           <input type="text" value={formData.location.city} onChange={(e) => updateNestedObject('location', 'city', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                         <div><label className="block text-sm font-medium mb-1">Country</label>
//                           <input type="text" value={formData.location.country} onChange={(e) => updateNestedObject('location', 'country', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                         <div><label className="block text-sm font-medium mb-1">Area</label>
//                           <input type="text" value={formData.location.area} onChange={(e) => updateNestedObject('location', 'area', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
                       
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Difficulty</label>
//                         <select value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
//                         </select>
//                       </div>
                    
//                       <div><label className="block text-sm font-medium mb-1">Booking Status</label>
//                         <select value={formData.bookingStatus} onChange={(e) => setFormData({...formData, bookingStatus: e.target.value})} className="w-full px-3 py-2 border rounded-md">
//                           {bookingStatuses.map(b => <option key={b} value={b}>{b}</option>)}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
//                       <div><label className="block text-sm font-medium mb-1">Min Group</label>
//                         <input type="number" value={formData.groupSize.min} onChange={(e) => setFormData({...formData, groupSize: {...formData.groupSize, min: parseInt(e.target.value) || 1}})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                       <div><label className="block text-sm font-medium mb-1">Max Group</label>
//                         <input type="number" value={formData.groupSize.max} onChange={(e) => setFormData({...formData, groupSize: {...formData.groupSize, max: parseInt(e.target.value) || 20}})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div><label className="block text-sm font-medium mb-1">Capacity</label>
//                         <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
                     
//                       <div><label className="block text-sm font-medium mb-1">Booking Deadline (hours)</label>
//                         <input type="number" value={formData.bookingDeadline} onChange={(e) => setFormData({...formData, bookingDeadline: parseInt(e.target.value) || 24})} className="w-full px-3 py-2 border rounded-md" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 6: Tour Arrays */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('tour')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><Users className="mr-2" size={20} /> Tour Information</h4>
//                   {expandedSections.tour ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.tour && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
//                       {renderArrayField('includes', 'Includes', 'Included item')}
//                       {renderArrayField('excludes', 'Excludes', 'Excluded item')}
                    
//                       {renderArrayField('rules', 'Rules', 'Enter rule')}
                     
//                       {renderArrayField('explorationWays', 'Exploration Ways', 'Way to explore')}
//                       {renderArrayField('thinks to care', 'thinks to care', 'thinks to care')}
                     
//                       {renderArrayField('languages', 'Languages', 'Language')}
//                       {renderArrayField('nearbyAttractions', 'Nearby Attractions', 'Attraction')}
                     
//                       {renderArrayField('tips', 'Tips', 'Tip')}
                 
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 7: Policies */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('policies')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><Shield className="mr-2" size={20} /> Policies & Features</h4>
//                   {expandedSections.policies ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.policies && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     
//                     </div>
                    
//                     <div className="border p-4 rounded bg-gray-50">
//                       <h5 className="font-medium mb-3">Free Cancellation</h5>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <label className="flex items-center">
//                           <input type="checkbox" checked={formData.freeCancellation.available} onChange={(e) => setFormData({...formData, freeCancellation: {...formData.freeCancellation, available: e.target.checked}})} className="h-4 w-4 text-blue-600 rounded" />
//                           <span className="ml-2 text-sm">Available</span>
//                         </label>
//                         <div><label className="block text-sm font-medium mb-1">Deadline Hours</label>
//                           <input type="number" value={formData.freeCancellation.deadlineHours} onChange={(e) => setFormData({...formData, freeCancellation: {...formData.freeCancellation, deadlineHours: parseInt(e.target.value) || 24}})} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                         <div><label className="block text-sm font-medium mb-1">Note</label>
//                           <input type="text" value={formData.freeCancellation.note} onChange={(e) => setFormData({...formData, freeCancellation: {...formData.freeCancellation, note: e.target.value}})} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border p-4 rounded bg-gray-50">
//                       <h5 className="font-medium mb-3">Reserve Now Pay Later</h5>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <label className="flex items-center">
//                           <input type="checkbox" checked={formData.reserveNowPayLater.available} onChange={(e) => setFormData({...formData, reserveNowPayLater: {...formData.reserveNowPayLater, available: e.target.checked}})} className="h-4 w-4 text-blue-600 rounded" />
//                           <span className="ml-2 text-sm">Available</span>
//                         </label>
//                         <div><label className="block text-sm font-medium mb-1">Note</label>
//                           <input type="text" value={formData.reserveNowPayLater.note} onChange={(e) => setFormData({...formData, reserveNowPayLater: {...formData.reserveNowPayLater, note: e.target.value}})} className="w-full px-3 py-2 border rounded-md" />
//                         </div>
//                       </div>
//                     </div>

                 
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 8: Itinerary */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('itinerary')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><Clock className="mr-2" size={20} /> Itinerary</h4>
//                   {expandedSections.itinerary ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.itinerary && (
//                   <div className="p-4">
//                     {renderComplexField('itinerary', 'Itinerary Items', [
//                       { name: 'time', label: 'Time', type: 'text', placeholder: '9:00 AM' },
//                       { name: 'activity', label: 'Activity', type: 'text', placeholder: 'Activity name' },
//                       { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Activity description', fullWidth: true },
//                       { name: 'duration', label: 'Duration', type: 'text', placeholder: '2 hours' },
//                       // { name: 'location', label: 'Location', type: 'text', placeholder: 'Location' },
//                       { name: 'included', label: 'Included', type: 'checkbox', placeholder: 'Included in package' },
//                       { name: 'cost', label: 'Additional Cost', type: 'number', placeholder: '0' }
//                     ], itineraryTemplate)}
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 9: Destinations */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('destinations')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><Globe className="mr-2" size={20} /> Destinations</h4>
//                   {expandedSections.destinations ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.destinations && (
//                   <div className="p-4">
//                     {renderComplexField('destinations', 'Destinations', [
//                       { name: 'name', label: 'Destination Name', type: 'text', placeholder: 'Destination name' },
//                       { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Destination description' },
//                       { name: 'duration', label: 'Duration', type: 'text', placeholder: '2 hours' },
//                       // { name: 'difficulty', label: 'Difficulty', type: 'select', options: ['Easy', 'Moderate', 'Hard'] },
//                       { name: 'bestTimeToVisit', label: 'Best Time to Visit', type: 'text', placeholder: 'Morning' },
//                       { name: 'entryFee', label: 'Entry Fee', type: 'text', placeholder: 'Free' },
//                       { name: 'openingHours', label: 'Opening Hours', type: 'text', placeholder: '9 AM - 5 PM' }
//                     ], destinationTemplate)}
//                   </div>
//                 )}
//               </div>

//               {/* SECTION 10: FAQs */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('faqs')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium">FAQs</h4>
//                   {expandedSections.faqs ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.faqs && (
//                   <div className="p-4">
//                     {renderComplexField('faqs', 'Frequently Asked Questions', [
//                       { name: 'question', label: 'Question', type: 'text', placeholder: 'Enter question', fullWidth: true },
//                       { name: 'answer', label: 'Answer', type: 'textarea', placeholder: 'Enter answer', fullWidth: true },
//                       { name: 'category', label: 'Category', type: 'text', placeholder: 'General' },
//                       { name: 'priority', label: 'Priority', type: 'number', placeholder: '1' }
//                     ], faqTemplate)}
//                   </div>
//                 )}
//               </div>

            

//               {/* SECTION 12: Activities */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('activities')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium">Activities</h4>
//                   {expandedSections.activities ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.activities && (
//                   <div className="p-4">
//                     {renderComplexField('activities', 'Activities', [
//                       { name: 'title', label: 'Activity Title', type: 'text', placeholder: 'Activity title' },
//                       { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Activity description' },
//                       { name: 'duration', label: 'Duration', type: 'text', placeholder: '2 hours' },
//                       { name: 'category', label: 'Category', type: 'select', options: activityCategories },
//                       { name: 'cost', label: 'Cost', type: 'number', placeholder: '0' },
//                       { name: 'ageLimit', label: 'Age Limit', type: 'text', placeholder: '12+' },
//                       { name: 'location', label: 'Location', type: 'text', placeholder: 'Activity location' }
//                     ], activityTemplate)}
//                   </div>
//                 )}
//               </div>

            

//               {/* SECTION 15: Accessibility */}
//               <div className="border rounded-lg">
//                 <button type="button" onClick={() => toggleSection('accessibility')} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
//                   <h4 className="text-lg font-medium flex items-center"><Accessibility className="mr-2" size={20} /> Accessibility</h4>
//                   {expandedSections.accessibility ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                 </button>
//                 {expandedSections.accessibility && (
//                   <div className="p-4 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.accessibility.wheelchair}
//                           onChange={(e) => updateNestedObject('accessibility', 'wheelchair', e.target.checked)}
//                           className="h-4 w-4 text-blue-600 rounded"
//                         />
//                         <span className="ml-2 text-sm">Wheelchair</span>
//                       </label>
             
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.accessibility.wheelchair}
//                           onChange={(e) => updateNestedObject('accessibility', 'wheelchair', e.target.checked)}
//                           className="h-4 w-4 text-blue-600 rounded"
//                         />
//                         <span className="ml-2 text-sm">Infront Seats </span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.accessibility.visuallyImpaired}
//                           onChange={(e) => updateNestedObject('accessibility', 'visuallyImpaired', e.target.checked)}
//                           className="h-4 w-4 text-blue-600 rounded"
//                         />
//                         <span className="ml-2 text-sm">Stroler</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.accessibility.hearingImpaired}
//                           onChange={(e) => updateNestedObject('accessibility', 'hearingImpaired', e.target.checked)}
//                           className="h-4 w-4 text-blue-600 rounded"
//                         />
//                         <span className="ml-2 text-sm">Service Animals</span>
//                       </label>
                      
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Accessibility Notes</label>
//                       <textarea
//                         rows={3}
//                         value={formData.accessibility.notes}
//                         onChange={(e) => updateNestedObject('accessibility', 'notes', e.target.value)}
//                         className="w-full px-3 py-2 border rounded-md"
//                         placeholder="Additional accessibility information..."
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

           

//               {/* Add more sections as needed... */}

//               {/* Form Actions */}
//               <div className="flex justify-end space-x-3 pt-6 border-t sticky bottom-0 bg-white z-10">
//                 <button type="button" onClick={() => { setShowModal(false); setEditingPost(null); resetForm(); }} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center">
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       {editingPost ? 'Updating...' : 'Creating...'}
//                     </>
//                   ) : (
//                     <>
//                       <Save size={16} className="mr-2" />
//                       {editingPost ? 'Update Post' : 'Create Post'}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogManagement;
