


// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Eye, Search, Filter, Star, Calendar, Save, X, ChevronDown, ChevronRight } from 'lucide-react';

// const BlogManagement = () => {
//   // State management
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [activeTab, setActiveTab] = useState('basic');
//   const [expandedSections, setExpandedSections] = useState({
//     basic: true,
//     content: false,
//     pricing: false,
//     images: false,
//     location: false,
//     tour: false,
//     policies: false,
//     nested: false
//   });

//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     status: 'published',
//     featured: '',
//     difficulty: ''
//   });

//   // Complete form state with all schema fields
//   const [formData, setFormData] = useState({
//     // Basic Information
//     title: '',
//     content: '',
//     author: 'Admin',
//     slug: '',
    
//     // Pricing
//     price: '',
//     priceNumber: '',
//     pricePerPerson: '',
//     currency: 'USD',
    
//     // Categories & Tags
//     category: '',
//     tags: [],
    
//     // Status Management
//     status: 'published',
//     featured: false,
//     views: 0,
    
//     // Images - Multiple support
//     imageUrl: '',
//     images: [],
//     coverImage: '',
    
//     // Location Information
//     prefecture: '',
    
//     // Multi-language Names
//     nameJp: '',
    
//     // Duration & Timing
//     duration: '',
//     durationHours: 8,
    
//     // Descriptions
//     about: '',
//     details: '',
//     description: '',
//     fullDescription: '',
//     summary: '',
    
//     // Activity Details
//     highlights: [],
//     includes: [],
//     notSuitableFor: [],
//     rules: [],
//     guides: [],
//     explorationWays: [],
    
//     // Travel Information
//     bestTime: '',
//     difficulty: 'Easy',
//     meetingPoint: '',
//     importantInformation: [],
    
//     // Nearby Services
//     nearbyAttractions: [],
//     dining: [],
//     accommodation: [],
//     tips: [],
    
//     // Languages
//     languages: [],
//     languagesDetailed: [],
    
//     // Policies
//     freeCancellation: {
//       available: true,
//       deadlineHours: 24,
//       note: ''
//     },
//     reserveNowPayLater: {
//       available: true,
//       note: ''
//     },
    
//     // Guide Information
//     liveTourGuide: {
//       available: true,
//       languages: []
//     },
    
//     // Rating System
//     rating: {
//       average: 0,
//       count: 0
//     },
//     averageRating: 0,
//     totalReviews: 0,
    
//     // Reviews
//     reviews: [],
//     extendedReviews: [],
    
//     // Tour Guide Specific Fields
//     availableDates: [],
//     groupSize: {
//       min: 1,
//       max: 20
//     },
//     tourType: 'Group',
    
//     // Age & Requirements
//     minAge: 0,
//     maxAge: 99,
//     physicalRequirements: '',
//     equipmentProvided: [],
//     equipmentRequired: [],
    
//     // Nested Complex Data
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
    
//     // Features
//     features: {
//       comfortableTransport: false,
//       authenticMeals: false,
//       expertGuides: false,
//       photoOpportunities: false,
//       culturalExperience: false
//     },
    
//     // Booking & Management
//     bookingStatus: 'Available',
    
//     // Seasonal Info
//     bestSeasons: [],
//     weatherConsiderations: '',
    
//     // Emergency Contact
//     emergencyContact: {
//       name: '',
//       phone: '',
//       email: ''
//     },
    
//     // Business Logic
//     cancellationPolicy: 'Free cancellation up to 24 hours before the tour',
//     refundPolicy: 'Full refund for cancellations made 24+ hours in advance',
    
//     // Admin Fields
//     createdBy: '',
//     lastUpdatedBy: '',
//     isActive: true,
//     isFeatured: false,
//     isPopular: false,
//     priority: 0
//   });

//   const API_BASE_URL = 'http://localhost:5000/api/posts';

//   // Options arrays
//   const categories = [
//     'blog', 'tour', 'mountain', 'urban', 'cultural', 'nature', 'temple', 
//     'modern', 'adventure', 'food', 'accommodation', 'Cultural', 'Nature', 
//     'Adventure', 'Food', 'Shopping', 'Historical', 'Spiritual'
//   ];

//   const difficulties = ['Easy', 'Moderate', 'Challenging', 'Hard', 'Expert'];
//   const statuses = ['draft', 'published', 'archived', 'active', 'inactive'];
//   const tourTypes = ['Group', 'Private', 'Premium'];
//   const bookingStatuses = ['Available', 'Limited', 'Sold Out', 'Suspended'];
//   const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
//   const languageLevels = ['Native', 'Fluent', 'Conversational', 'Basic'];
//   const accommodationTypes = ['Hotel', 'Hostel', 'Resort', 'Homestay', 'Camping'];
//   const transportTypes = ['Bus', 'Car', 'Train', 'Flight', 'Boat', 'Bicycle', 'Walking'];
//   const activityCategories = ['Adventure', 'Cultural', 'Relaxation', 'Food', 'Shopping'];

//   // API Functions
//   const fetchPosts = async (page = 1) => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         page: page.toString(),
//         limit: '10',
//         ...filters
//       });

//       const response = await fetch(`${API_BASE_URL}?${queryParams}`);
//       const data = await response.json();

//       if (data.success) {
//         setPosts(data.data);
//         setTotalPages(data.pagination.totalPages);
//         setCurrentPage(data.pagination.currentPage);
//       } else {
//         setError(data.message || 'Failed to fetch posts');
//       }
//     } catch (err) {
//       setError('Network error while fetching posts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createPost = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_BASE_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess('Post created successfully!');
//         setShowModal(false);
//         resetForm();
//         fetchPosts();
//       } else {
//         setError(data.message || 'Failed to create post');
//       }
//     } catch (err) {
//       setError('Network error while creating post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updatePost = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/${editingPost._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess('Post updated successfully!');
//         setShowModal(false);
//         setEditingPost(null);
//         resetForm();
//         fetchPosts();
//       } else {
//         setError(data.message || 'Failed to update post');
//       }
//     } catch (err) {
//       setError('Network error while updating post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deletePost = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this post?')) return;

//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/${id}`, {
//         method: 'DELETE'
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess('Post deleted successfully!');
//         fetchPosts();
//       } else {
//         setError(data.message || 'Failed to delete post');
//       }
//     } catch (err) {
//       setError('Network error while deleting post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Utility functions
//   const resetForm = () => {
//     setFormData({
//       title: '',
//       content: '',
//       author: 'Admin',
//       slug: '',
//       price: '',
//       priceNumber: '',
//       pricePerPerson: '',
//       currency: 'USD',
//       category: '',
//       tags: [],
//       status: 'published',
//       featured: false,
//       views: 0,
//       imageUrl: '',
//       images: [],
//       coverImage: '',
//       prefecture: '',
//       nameJp: '',
//       duration: '',
//       durationHours: 8,
//       about: '',
//       details: '',
//       description: '',
//       fullDescription: '',
//       summary: '',
//       highlights: [],
//       includes: [],
//       notSuitableFor: [],
//       rules: [],
//       guides: [],
//       explorationWays: [],
//       bestTime: '',
//       difficulty: 'Easy',
//       meetingPoint: '',
//       importantInformation: [],
//       nearbyAttractions: [],
//       dining: [],
//       accommodation: [],
//       tips: [],
//       languages: [],
//       languagesDetailed: [],
//       freeCancellation: {
//         available: true,
//         deadlineHours: 24,
//         note: ''
//       },
//       reserveNowPayLater: {
//         available: true,
//         note: ''
//       },
//       liveTourGuide: {
//         available: true,
//         languages: []
//       },
//       rating: {
//         average: 0,
//         count: 0
//       },
//       averageRating: 0,
//       totalReviews: 0,
//       reviews: [],
//       extendedReviews: [],
//       availableDates: [],
//       groupSize: {
//         min: 1,
//         max: 20
//       },
//       tourType: 'Group',
//       minAge: 0,
//       maxAge: 99,
//       physicalRequirements: '',
//       equipmentProvided: [],
//       equipmentRequired: [],
//       destinations: [],
//       itinerary: [],
//       pickupPoints: [],
//       faqs: [],
//       foods: [],
//       activities: [],
//       events: [],
//       accommodations: [],
//       transport: [],
//       safetyInfo: [],
//       shopping: [],
//       localGuides: [],
//       photoSpots: [],
//       culture: [],
//       medical: [],
//       insurance: [],
//       packingList: [],
//       features: {
//         comfortableTransport: false,
//         authenticMeals: false,
//         expertGuides: false,
//         photoOpportunities: false,
//         culturalExperience: false
//       },
//       bookingStatus: 'Available',
//       bestSeasons: [],
//       weatherConsiderations: '',
//       emergencyContact: {
//         name: '',
//         phone: '',
//         email: ''
//       },
//       cancellationPolicy: 'Free cancellation up to 24 hours before the tour',
//       refundPolicy: 'Full refund for cancellations made 24+ hours in advance',
//       createdBy: '',
//       lastUpdatedBy: '',
//       isActive: true,
//       isFeatured: false,
//       isPopular: false,
//       priority: 0
//     });
//   };

//   const handleEditClick = (post) => {
//     setEditingPost(post);
//     setFormData({
//       ...post,
//       highlights: post.highlights || [],
//       includes: post.includes || [],
//       tags: post.tags || [],
//       languages: post.languages || [],
//       images: post.images || [],
//       notSuitableFor: post.notSuitableFor || [],
//       rules: post.rules || [],
//       guides: post.guides || [],
//       explorationWays: post.explorationWays || [],
//       importantInformation: post.importantInformation || [],
//       nearbyAttractions: post.nearbyAttractions || [],
//       dining: post.dining || [],
//       accommodation: post.accommodation || [],
//       tips: post.tips || [],
//       languagesDetailed: post.languagesDetailed || [],
//       equipmentProvided: post.equipmentProvided || [],
//       equipmentRequired: post.equipmentRequired || [],
//       destinations: post.destinations || [],
//       itinerary: post.itinerary || [],
//       pickupPoints: post.pickupPoints || [],
//       faqs: post.faqs || [],
//       foods: post.foods || [],
//       activities: post.activities || [],
//       events: post.events || [],
//       accommodations: post.accommodations || [],
//       transport: post.transport || [],
//       safetyInfo: post.safetyInfo || [],
//       shopping: post.shopping || [],
//       localGuides: post.localGuides || [],
//       photoSpots: post.photoSpots || [],
//       culture: post.culture || [],
//       medical: post.medical || [],
//       insurance: post.insurance || [],
//       packingList: post.packingList || [],
//       availableDates: post.availableDates || [],
//       bestSeasons: post.bestSeasons || [],
//       groupSize: post.groupSize || { min: 1, max: 20 },
//       freeCancellation: post.freeCancellation || { available: true, deadlineHours: 24, note: '' },
//       reserveNowPayLater: post.reserveNowPayLater || { available: true, note: '' },
//       liveTourGuide: post.liveTourGuide || { available: true, languages: [] },
//       rating: post.rating || { average: 0, count: 0 },
//       features: post.features || {
//         comfortableTransport: false,
//         authenticMeals: false,
//         expertGuides: false,
//         photoOpportunities: false,
//         culturalExperience: false
//       },
//       emergencyContact: post.emergencyContact || { name: '', phone: '', email: '' }
//     });
//     setShowModal(true);
//   };

//   // Array field handlers
//   const handleArrayFieldChange = (fieldName, index, value) => {
//     const newArray = [...formData[fieldName]];
//     newArray[index] = value;
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   const addArrayField = (fieldName) => {
//     setFormData({
//       ...formData,
//       [fieldName]: [...formData[fieldName], '']
//     });
//   };

//   const removeArrayField = (fieldName, index) => {
//     const newArray = formData[fieldName].filter((_, i) => i !== index);
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   // Complex object handlers
//   const addComplexField = (fieldName, template) => {
//     setFormData({
//       ...formData,
//       [fieldName]: [...formData[fieldName], template]
//     });
//   };

//   const updateComplexField = (fieldName, index, field, value) => {
//     const newArray = [...formData[fieldName]];
//     newArray[index] = { ...newArray[index], [field]: value };
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   const removeComplexField = (fieldName, index) => {
//     const newArray = formData[fieldName].filter((_, i) => i !== index);
//     setFormData({ ...formData, [fieldName]: newArray });
//   };

//   // Section toggle
//   const toggleSection = (section) => {
//     setExpandedSections({
//       ...expandedSections,
//       [section]: !expandedSections[section]
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingPost) {
//       updatePost();
//     } else {
//       createPost();
//     }
//   };

//   // Effects
//   useEffect(() => {
//     fetchPosts();
//   }, [filters]);

//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => {
//         setSuccess('');
//         setError('');
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, error]);

//   // Render array field component
//   const renderArrayField = (fieldName, label, placeholder = '') => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       {formData[fieldName].map((item, index) => (
//         <div key={index} className="flex items-center space-x-2 mb-2">
//           <input
//             type="text"
//             value={item}
//             onChange={(e) => handleArrayFieldChange(fieldName, index, e.target.value)}
//             className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder={placeholder}
//           />
//           <button
//             type="button"
//             onClick={() => removeArrayField(fieldName, index)}
//             className="text-red-600 hover:text-red-800"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => addArrayField(fieldName)}
//         className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//       >
//         <Plus size={16} className="mr-1" />
//         Add {label}
//       </button>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
//         <button
//           onClick={() => {
//             setEditingPost(null);
//             resetForm();
//             setShowModal(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
//         >
//           <Plus size={20} />
//           Add New Post
//         </button>
//       </div>

//       {/* Notifications */}
//       {success && (
//         <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//           {success}
//         </div>
//       )}
      
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={filters.search}
//               onChange={(e) => setFilters({...filters, search: e.target.value})}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <select
//             value={filters.category}
//             onChange={(e) => setFilters({...filters, category: e.target.value})}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Categories</option>
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>

//           <select
//             value={filters.status}
//             onChange={(e) => setFilters({...filters, status: e.target.value})}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Status</option>
//             {statuses.map(status => (
//               <option key={status} value={status}>{status}</option>
//             ))}
//           </select>

//           <select
//             value={filters.difficulty}
//             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Difficulties</option>
//             {difficulties.map(diff => (
//               <option key={diff} value={diff}>{diff}</option>
//             ))}
//           </select>

//           <select
//             value={filters.featured}
//             onChange={(e) => setFilters({...filters, featured: e.target.value})}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">All Posts</option>
//             <option value="true">Featured Only</option>
//             <option value="false">Non-Featured</option>
//           </select>
//         </div>
//       </div>

//       {/* Posts Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {loading ? (
//           <div className="p-8 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading posts...</p>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {posts.map((post) => (
//                     <tr key={post._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             {post.imageUrl || post.coverImage ? (
//                               <img
//                                 className="h-10 w-10 rounded object-cover"
//                                 src={post.imageUrl || post.coverImage}
//                                 alt={post.title}
//                               />
//                             ) : (
//                               <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
//                                 <span className="text-gray-400 text-xs">No Image</span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{post.title}</div>
//                             {post.featured && (
//                               <div className="flex items-center">
//                                 <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                                 <span className="text-xs text-yellow-600 ml-1">Featured</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                           {post.category}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {post.price}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           post.status === 'published' ? 'bg-green-100 text-green-800' :
//                           post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {post.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <div className="flex items-center">
//                           <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
//                           {post.rating?.average?.toFixed(1) || '0.0'} ({post.rating?.count || 0})
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <div className="flex items-center">
//                           <Eye className="h-4 w-4 text-gray-400 mr-1" />
//                           {post.views || 0}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                         <button
//                           onClick={() => handleEditClick(post)}
//                           className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           onClick={() => deletePost(post._id)}
//                           className="text-red-600 hover:text-red-900 inline-flex items-center"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                 <div className="flex-1 flex justify-between sm:hidden">
//                   <button
//                     onClick={() => fetchPosts(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={() => fetchPosts(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Next
//                   </button>
//                 </div>
//                 <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Page <span className="font-medium">{currentPage}</span> of{' '}
//                       <span className="font-medium">{totalPages}</span>
//                     </p>
//                   </div>
//                   <div>
//                     <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                       <button
//                         onClick={() => fetchPosts(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Previous
//                       </button>
//                       <button
//                         onClick={() => fetchPosts(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Next
//                       </button>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Complete Modal for Add/Edit Post */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//           <div className="relative top-4 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
//             <div className="mt-3">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   {editingPost ? 'Edit Post' : 'Add New Post'}
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowModal(false);
//                     setEditingPost(null);
//                     resetForm();
//                   }}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Basic Information Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('basic')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
//                     {expandedSections.basic ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.basic && (
//                     <div className="p-4 space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
//                           <input
//                             type="text"
//                             required
//                             value={formData.title}
//                             onChange={(e) => setFormData({...formData, title: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Japanese Name</label>
//                           <input
//                             type="text"
//                             value={formData.nameJp}
//                             onChange={(e) => setFormData({...formData, nameJp: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//                           <input
//                             type="text"
//                             value={formData.author}
//                             onChange={(e) => setFormData({...formData, author: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                           <select
//                             required
//                             value={formData.category}
//                             onChange={(e) => setFormData({...formData, category: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             <option value="">Select Category</option>
//                             {categories.map(cat => (
//                               <option key={cat} value={cat}>{cat}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                           <select
//                             value={formData.status}
//                             onChange={(e) => setFormData({...formData, status: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             {statuses.map(status => (
//                               <option key={status} value={status}>{status}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <div className="flex items-center space-x-4">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.featured}
//                               onChange={(e) => setFormData({...formData, featured: e.target.checked})}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Featured</span>
//                           </label>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.isActive}
//                               onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Active</span>
//                           </label>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.isPopular}
//                               onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Popular</span>
//                           </label>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                           <input
//                             type="number"
//                             value={formData.priority}
//                             onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 0})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>

//                       {renderArrayField('tags', 'Tags', 'Enter tag')}
//                     </div>
//                   )}
//                 </div>

//                 {/* Content Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('content')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Content & Descriptions</h4>
//                     {expandedSections.content ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.content && (
//                     <div className="p-4 space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
//                         <textarea
//                           required
//                           rows={6}
//                           value={formData.content}
//                           onChange={(e) => setFormData({...formData, content: e.target.value})}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
//                           <textarea
//                             rows={3}
//                             value={formData.summary}
//                             onChange={(e) => setFormData({...formData, summary: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                           <textarea
//                             rows={3}
//                             value={formData.description}
//                             onChange={(e) => setFormData({...formData, description: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
//                           <textarea
//                             rows={3}
//                             value={formData.about}
//                             onChange={(e) => setFormData({...formData, about: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
//                           <textarea
//                             rows={3}
//                             value={formData.details}
//                             onChange={(e) => setFormData({...formData, details: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
//                         <textarea
//                           rows={4}
//                           value={formData.fullDescription}
//                           onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Pricing Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('pricing')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Pricing Information</h4>
//                     {expandedSections.pricing ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.pricing && (
//                     <div className="p-4 space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//                           <input
//                             type="text"
//                             required
//                             value={formData.price}
//                             onChange={(e) => setFormData({...formData, price: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="e.g., $50 or ¥5000"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Price (Numeric)</label>
//                           <input
//                             type="number"
//                             value={formData.priceNumber}
//                             onChange={(e) => setFormData({...formData, priceNumber: parseFloat(e.target.value) || ''})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Person</label>
//                           <input
//                             type="number"
//                             value={formData.pricePerPerson}
//                             onChange={(e) => setFormData({...formData, pricePerPerson: parseFloat(e.target.value) || ''})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
//                           <select
//                             value={formData.currency}
//                             onChange={(e) => setFormData({...formData, currency: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             <option value="USD">USD</option>
//                             <option value="EUR">EUR</option>
//                             <option value="JPY">JPY</option>
//                             <option value="GBP">GBP</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Images Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('images')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Images</h4>
//                     {expandedSections.images ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.images && (
//                     <div className="p-4 space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
//                           <input
//                             type="url"
//                             value={formData.imageUrl}
//                             onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
//                           <input
//                             type="url"
//                             value={formData.coverImage}
//                             onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>
//                       {renderArrayField('images', 'Additional Images', 'https://example.com/image.jpg')}
//                     </div>
//                   )}
//                 </div>

//                 {/* Location & Tour Details Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('tour')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Tour & Location Details</h4>
//                     {expandedSections.tour ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.tour && (
//                     <div className="p-4 space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
//                           <input
//                             type="text"
//                             required
//                             value={formData.duration}
//                             onChange={(e) => setFormData({...formData, duration: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
//                           <input
//                             type="number"
//                             value={formData.durationHours}
//                             onChange={(e) => setFormData({...formData, durationHours: parseInt(e.target.value) || 8})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
//                           <select
//                             value={formData.difficulty}
//                             onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             {difficulties.map(diff => (
//                               <option key={diff} value={diff}>{diff}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type</label>
//                           <select
//                             value={formData.tourType}
//                             onChange={(e) => setFormData({...formData, tourType: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             {tourTypes.map(type => (
//                               <option key={type} value={type}>{type}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Prefecture</label>
//                           <input
//                             type="text"
//                             value={formData.prefecture}
//                             onChange={(e) => setFormData({...formData, prefecture: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Point</label>
//                           <input
//                             type="text"
//                             value={formData.meetingPoint}
//                             onChange={(e) => setFormData({...formData, meetingPoint: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Best Time</label>
//                           <input
//                             type="text"
//                             value={formData.bestTime}
//                             onChange={(e) => setFormData({...formData, bestTime: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
//                           <input
//                             type="number"
//                             min="0"
//                             value={formData.minAge}
//                             onChange={(e) => setFormData({...formData, minAge: parseInt(e.target.value) || 0})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
//                           <input
//                             type="number"
//                             min="0"
//                             value={formData.maxAge}
//                             onChange={(e) => setFormData({...formData, maxAge: parseInt(e.target.value) || 99})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Min Group Size</label>
//                           <input
//                             type="number"
//                             min="1"
//                             value={formData.groupSize.min}
//                             onChange={(e) => setFormData({
//                               ...formData,
//                               groupSize: { ...formData.groupSize, min: parseInt(e.target.value) || 1 }
//                             })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Max Group Size</label>
//                           <input
//                             type="number"
//                             min="1"
//                             value={formData.groupSize.max}
//                             onChange={(e) => setFormData({
//                               ...formData,
//                               groupSize: { ...formData.groupSize, max: parseInt(e.target.value) || 20 }
//                             })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Physical Requirements</label>
//                         <textarea
//                           rows={2}
//                           value={formData.physicalRequirements}
//                           onChange={(e) => setFormData({...formData, physicalRequirements: e.target.value})}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {renderArrayField('highlights', 'Highlights', 'Enter highlight')}
//                         {renderArrayField('includes', 'Includes', 'What\'s included')}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {renderArrayField('notSuitableFor', 'Not Suitable For', 'Not suitable for...')}
//                         {renderArrayField('rules', 'Rules', 'Enter rule')}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {renderArrayField('guides', 'Guides', 'Guide information')}
//                         {renderArrayField('explorationWays', 'Exploration Ways', 'Ways to explore')}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {renderArrayField('importantInformation', 'Important Information', 'Important info')}
//                         {renderArrayField('languages', 'Languages', 'Language')}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {renderArrayField('nearbyAttractions', 'Nearby Attractions', 'Attraction name')}
//                         {renderArrayField('dining', 'Dining Options', 'Restaurant/cafe')}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {renderArrayField('accommodation', 'Accommodation', 'Hotel/lodge name')}
//                         {renderArrayField('tips', 'Tips', 'Helpful tip')}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {renderArrayField('equipmentProvided', 'Equipment Provided', 'Equipment item')}
//                         {renderArrayField('equipmentRequired', 'Equipment Required', 'Required item')}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Features Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('features')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Features & Booking</h4>
//                     {expandedSections.features ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.features && (
//                     <div className="p-4 space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Booking Status</label>
//                         <select
//                           value={formData.bookingStatus}
//                           onChange={(e) => setFormData({...formData, bookingStatus: e.target.value})}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                           {bookingStatuses.map(status => (
//                             <option key={status} value={status}>{status}</option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <h5 className="text-md font-medium text-gray-700 mb-2">Tour Features</h5>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.features.comfortableTransport}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 features: { ...formData.features, comfortableTransport: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Comfortable Transport</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.features.authenticMeals}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 features: { ...formData.features, authenticMeals: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Authentic Meals</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.features.expertGuides}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 features: { ...formData.features, expertGuides: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Expert Guides</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.features.photoOpportunities}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 features: { ...formData.features, photoOpportunities: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Photo Opportunities</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.features.culturalExperience}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 features: { ...formData.features, culturalExperience: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Cultural Experience</span>
//                           </label>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Weather Considerations</label>
//                           <textarea
//                             rows={3}
//                             value={formData.weatherConsiderations}
//                             onChange={(e) => setFormData({...formData, weatherConsiderations: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Best Seasons</label>
//                           <div className="space-y-2">
//                             {seasons.map(season => (
//                               <label key={season} className="flex items-center">
//                                 <input
//                                   type="checkbox"
//                                   checked={formData.bestSeasons.includes(season)}
//                                   onChange={(e) => {
//                                     if (e.target.checked) {
//                                       setFormData({
//                                         ...formData,
//                                         bestSeasons: [...formData.bestSeasons, season]
//                                       });
//                                     } else {
//                                       setFormData({
//                                         ...formData,
//                                         bestSeasons: formData.bestSeasons.filter(s => s !== season)
//                                       });
//                                     }
//                                   }}
//                                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                 />
//                                 <span className="ml-2 text-sm text-gray-900">{season}</span>
//                               </label>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Policies Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('policies')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Policies & Contact</h4>
//                     {expandedSections.policies ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.policies && (
//                     <div className="p-4 space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
//                           <textarea
//                             rows={3}
//                             value={formData.cancellationPolicy}
//                             onChange={(e) => setFormData({...formData, cancellationPolicy: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Refund Policy</label>
//                           <textarea
//                             rows={3}
//                             value={formData.refundPolicy}
//                             onChange={(e) => setFormData({...formData, refundPolicy: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>

//                       {/* Free Cancellation */}
//                       <div className="border border-gray-200 rounded-lg p-4">
//                         <h5 className="text-md font-medium text-gray-700 mb-2">Free Cancellation</h5>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.freeCancellation.available}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 freeCancellation: { ...formData.freeCancellation, available: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Available</span>
//                           </label>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Deadline (Hours)</label>
//                             <input
//                               type="number"
//                               value={formData.freeCancellation.deadlineHours}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 freeCancellation: { ...formData.freeCancellation, deadlineHours: parseInt(e.target.value) || 24 }
//                               })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
//                             <input
//                               type="text"
//                               value={formData.freeCancellation.note}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 freeCancellation: { ...formData.freeCancellation, note: e.target.value }
//                               })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Reserve Now Pay Later */}
//                       <div className="border border-gray-200 rounded-lg p-4">
//                         <h5 className="text-md font-medium text-gray-700 mb-2">Reserve Now Pay Later</h5>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.reserveNowPayLater.available}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 reserveNowPayLater: { ...formData.reserveNowPayLater, available: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Available</span>
//                           </label>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
//                             <input
//                               type="text"
//                               value={formData.reserveNowPayLater.note}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 reserveNowPayLater: { ...formData.reserveNowPayLater, note: e.target.value }
//                               })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Live Tour Guide */}
//                       <div className="border border-gray-200 rounded-lg p-4">
//                         <h5 className="text-md font-medium text-gray-700 mb-2">Live Tour Guide</h5>
//                         <div className="grid grid-cols-1 gap-4">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.liveTourGuide.available}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 liveTourGuide: { ...formData.liveTourGuide, available: e.target.checked }
//                               })}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-900">Available</span>
//                           </label>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Guide Languages</label>
//                             {formData.liveTourGuide.languages.map((lang, index) => (
//                               <div key={index} className="flex items-center space-x-2 mb-2">
//                                 <input
//                                   type="text"
//                                   value={lang}
//                                   onChange={(e) => {
//                                     const newLangs = [...formData.liveTourGuide.languages];
//                                     newLangs[index] = e.target.value;
//                                     setFormData({
//                                       ...formData,
//                                       liveTourGuide: { ...formData.liveTourGuide, languages: newLangs }
//                                     });
//                                   }}
//                                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     const newLangs = formData.liveTourGuide.languages.filter((_, i) => i !== index);
//                                     setFormData({
//                                       ...formData,
//                                       liveTourGuide: { ...formData.liveTourGuide, languages: newLangs }
//                                     });
//                                   }}
//                                   className="text-red-600 hover:text-red-800"
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </div>
//                             ))}
//                             <button
//                               type="button"
//                               onClick={() => setFormData({
//                                 ...formData,
//                                 liveTourGuide: { 
//                                   ...formData.liveTourGuide, 
//                                   languages: [...formData.liveTourGuide.languages, ''] 
//                                 }
//                               })}
//                               className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                             >
//                               <Plus size={16} className="mr-1" />
//                               Add Language
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Emergency Contact */}
//                       <div className="border border-gray-200 rounded-lg p-4">
//                         <h5 className="text-md font-medium text-gray-700 mb-2">Emergency Contact</h5>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                             <input
//                               type="text"
//                               value={formData.emergencyContact.name}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 emergencyContact: { ...formData.emergencyContact, name: e.target.value }
//                               })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                             <input
//                               type="tel"
//                               value={formData.emergencyContact.phone}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
//                               })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                             <input
//                               type="email"
//                               value={formData.emergencyContact.email}
//                               onChange={(e) => setFormData({
//                                 ...formData,
//                                 emergencyContact: { ...formData.emergencyContact, email: e.target.value }
//                               })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Complex Nested Data Section */}
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('nested')}
//                     className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">Additional Information</h4>
//                     {expandedSections.nested ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                   </button>
//                   {expandedSections.nested && (
//                     <div className="p-4 space-y-6">
//                       {/* FAQ Section */}
//                       <div className="border border-gray-200 rounded p-4">
//                         <h5 className="text-md font-medium text-gray-700 mb-3">Frequently Asked Questions</h5>
//                         {formData.faqs.map((faq, index) => (
//                           <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 border border-gray-100 rounded">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
//                               <input
//                                 type="text"
//                                 value={faq.question || ''}
//                                 onChange={(e) => updateComplexField('faqs', index, 'question', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
//                               <textarea
//                                 rows={2}
//                                 value={faq.answer || ''}
//                                 onChange={(e) => updateComplexField('faqs', index, 'answer', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div className="col-span-2 flex justify-end">
//                               <button
//                                 type="button"
//                                 onClick={() => removeComplexField('faqs', index)}
//                                 className="text-red-600 hover:text-red-800"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() => addComplexField('faqs', { question: '', answer: '' })}
//                           className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                         >
//                           <Plus size={16} className="mr-1" />
//                           Add FAQ
//                         </button>
//                       </div>

//                       {/* Itinerary Section */}
//                       <div className="border border-gray-200 rounded p-4">
//                         <h5 className="text-md font-medium text-gray-700 mb-3">Itinerary</h5>
//                         {formData.itinerary.map((item, index) => (
//                           <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-3 border border-gray-100 rounded">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                               <input
//                                 type="text"
//                                 value={item.time || ''}
//                                 onChange={(e) => updateComplexField('itinerary', index, 'time', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
//                               <input
//                                 type="text"
//                                 value={item.activity || ''}
//                                 onChange={(e) => updateComplexField('itinerary', index, 'activity', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
//                               <input
//                                 type="text"
//                                 value={item.duration || ''}
//                                 onChange={(e) => updateComplexField('itinerary', index, 'duration', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                               <input
//                                 type="text"
//                                 value={item.location || ''}
//                                 onChange={(e) => updateComplexField('itinerary', index, 'location', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div className="col-span-4">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                               <textarea
//                                 rows={2}
//                                 value={item.description || ''}
//                                 onChange={(e) => updateComplexField('itinerary', index, 'description', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                               <div className="flex justify-end mt-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => removeComplexField('itinerary', index)}
//                                   className="text-red-600 hover:text-red-800"
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() => addComplexField('itinerary', { time: '', activity: '', description: '', duration: '', location: '' })}
//                           className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                         >
//                           <Plus size={16} className="mr-1" />
//                           Add Itinerary Item
//                         </button>
//                       </div>

//                       {/* Pickup Points Section */}
//                       <div className="border border-gray-200 rounded p-4">
//                         <h5 className="text-md font-medium text-gray-700 mb-3">Pickup Points</h5>
//                         {formData.pickupPoints.map((point, index) => (
//                           <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 border border-gray-100 rounded">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                               <input
//                                 type="text"
//                                 value={point.location || ''}
//                                 onChange={(e) => updateComplexField('pickupPoints', index, 'location', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                               <input
//                                 type="text"
//                                 value={point.time || ''}
//                                 onChange={(e) => updateComplexField('pickupPoints', index, 'time', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
//                               <input
//                                 type="text"
//                                 value={point.landmark || ''}
//                                 onChange={(e) => updateComplexField('pickupPoints', index, 'landmark', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
//                               <textarea
//                                 rows={2}
//                                 value={point.instructions || ''}
//                                 onChange={(e) => updateComplexField('pickupPoints', index, 'instructions', e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div className="col-span-2 flex justify-end">
//                               <button
//                                 type="button"
//                                 onClick={() => removeComplexField('pickupPoints', index)}
//                                 className="text-red-600 hover:text-red-800"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() => addComplexField('pickupPoints', { location: '', time: '', landmark: '', instructions: '' })}
//                           className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                         >
//                           <Plus size={16} className="mr-1" />
//                           Add Pickup Point
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Form Actions */}
//                 <div className="flex justify-end space-x-3 pt-6 border-t sticky bottom-0 bg-white">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditingPost(null);
//                       resetForm();
//                     }}
//                     className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         {editingPost ? 'Updating...' : 'Creating...'}
//                       </>
//                     ) : (
//                       <>
//                         <Save size={16} className="mr-2" />
//                         {editingPost ? 'Update Post' : 'Create Post'}
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogManagement;










import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Star, ChevronDown, ChevronRight, Save, X } from 'lucide-react';

const BlogManagement = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    featured: '',
    difficulty: ''
  });

  // Complete form state with all necessary fields
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    content: '',
    price: '',
    priceNumber: '',
    category: '',
    duration: '',
    difficulty: 'Easy',
    status: 'published',
    featured: false,
    
    // Images
    imageUrl: '',
    images: [],
    coverImage: '',
    
    // Location & Details
    prefecture: '',
    meetingPoint: '',
    bestTime: '',
    nameJp: '',
    
    // Descriptions
    description: '',
    about: '',
    details: '',
    summary: '',
    
    // Arrays for tour details
    highlights: [],
    includes: [],
    tags: [],
    languages: [],
    notSuitableFor: [],
    rules: [],
    importantInformation: [],
    guides: [],
    explorationWays: [],
    
    // Services & Attractions
    nearbyAttractions: [],
    dining: [],
    accommodation: [],
    tips: [],
    
    // Group settings
    minAge: 0,
    maxAge: 99,
    groupSize: { min: 1, max: 20 },
    tourType: 'Group',
    currency: 'USD',
    
    // Additional fields
    author: 'Admin',
    views: 0,
    rating: {
      average: 0,
      count: 0
    }
  });

  const API_BASE_URL = 'http://localhost:5000/api/posts';

  // Options arrays
  const categories = [
    'blog', 'tour', 'mountain', 'urban', 'cultural', 'nature', 'temple', 
    'modern', 'adventure', 'food', 'accommodation', 'Cultural', 'Nature', 
    'Adventure', 'Food', 'Shopping', 'Historical', 'Spiritual'
  ];

  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Hard', 'Expert'];
  const statuses = ['draft', 'published', 'archived', 'active', 'inactive'];
  const tourTypes = ['Group', 'Private', 'Premium'];

  // API Functions with complete error handling
  const fetchPosts = async (page = 1) => {
    setLoading(true);
    setError('');
    
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });

      // Add filters only if they have values
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success) {
        setPosts(Array.isArray(data.data) ? data.data : []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
      } else {
        setError(data.message || 'Failed to fetch posts');
        setPosts([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to fetch posts. Please check your internet connection.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSuccess('Post created successfully!');
        setShowModal(false);
        resetForm();
        await fetchPosts(currentPage);
      } else {
        setError(data.message || 'Failed to create post');
      }
    } catch (err) {
      console.error('Create error:', err);
      setError('Unable to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async () => {
    if (!editingPost?._id) {
      setError('No post selected for editing');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/${editingPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSuccess('Post updated successfully!');
        setShowModal(false);
        setEditingPost(null);
        resetForm();
        await fetchPosts(currentPage);
      } else {
        setError(data.message || 'Failed to update post');
      }
    } catch (err) {
      console.error('Update error:', err);
      setError('Unable to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSuccess('Post deleted successfully!');
        await fetchPosts(currentPage);
      } else {
        setError(data.message || 'Failed to delete post');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Unable to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Complete utility functions
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      price: '',
      priceNumber: '',
      category: '',
      duration: '',
      difficulty: 'Easy',
      status: 'published',
      featured: false,
      imageUrl: '',
      images: [],
      coverImage: '',
      prefecture: '',
      meetingPoint: '',
      bestTime: '',
      nameJp: '',
      description: '',
      about: '',
      details: '',
      summary: '',
      highlights: [],
      includes: [],
      tags: [],
      languages: [],
      notSuitableFor: [],
      rules: [],
      importantInformation: [],
      guides: [],
      explorationWays: [],
      nearbyAttractions: [],
      dining: [],
      accommodation: [],
      tips: [],
      minAge: 0,
      maxAge: 99,
      groupSize: { min: 1, max: 20 },
      tourType: 'Group',
      currency: 'USD',
      author: 'Admin',
      views: 0,
      rating: { average: 0, count: 0 }
    });
    setShowAdvanced(false);
  };

  const handleEditClick = (post) => {
    if (!post) return;
    
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      content: post.content || '',
      price: post.price || '',
      priceNumber: post.priceNumber || '',
      category: post.category || '',
      duration: post.duration || '',
      difficulty: post.difficulty || 'Easy',
      status: post.status || 'published',
      featured: Boolean(post.featured),
      imageUrl: post.imageUrl || '',
      images: Array.isArray(post.images) ? post.images : [],
      coverImage: post.coverImage || '',
      prefecture: post.prefecture || '',
      meetingPoint: post.meetingPoint || '',
      bestTime: post.bestTime || '',
      nameJp: post.nameJp || '',
      description: post.description || '',
      about: post.about || '',
      details: post.details || '',
      summary: post.summary || '',
      highlights: Array.isArray(post.highlights) ? post.highlights : [],
      includes: Array.isArray(post.includes) ? post.includes : [],
      tags: Array.isArray(post.tags) ? post.tags : [],
      languages: Array.isArray(post.languages) ? post.languages : [],
      notSuitableFor: Array.isArray(post.notSuitableFor) ? post.notSuitableFor : [],
      rules: Array.isArray(post.rules) ? post.rules : [],
      importantInformation: Array.isArray(post.importantInformation) ? post.importantInformation : [],
      guides: Array.isArray(post.guides) ? post.guides : [],
      explorationWays: Array.isArray(post.explorationWays) ? post.explorationWays : [],
      nearbyAttractions: Array.isArray(post.nearbyAttractions) ? post.nearbyAttractions : [],
      dining: Array.isArray(post.dining) ? post.dining : [],
      accommodation: Array.isArray(post.accommodation) ? post.accommodation : [],
      tips: Array.isArray(post.tips) ? post.tips : [],
      minAge: post.minAge || 0,
      maxAge: post.maxAge || 99,
      groupSize: post.groupSize || { min: 1, max: 20 },
      tourType: post.tourType || 'Group',
      currency: post.currency || 'USD',
      author: post.author || 'Admin',
      views: post.views || 0,
      rating: post.rating || { average: 0, count: 0 }
    });
    setShowModal(true);
  };

  // Complete array field handlers
  const handleArrayFieldChange = (fieldName, index, value) => {
    if (!Array.isArray(formData[fieldName])) {
      const newArray = [];
      newArray[index] = value;
      setFormData(prev => ({ ...prev, [fieldName]: newArray }));
      return;
    }
    
    const newArray = [...formData[fieldName]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [fieldName]: newArray }));
  };

  const addArrayField = (fieldName) => {
    if (!Array.isArray(formData[fieldName])) {
      setFormData(prev => ({ ...prev, [fieldName]: [''] }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }));
  };

  const removeArrayField = (fieldName, index) => {
    if (!Array.isArray(formData[fieldName]) || index < 0) return;
    
    const newArray = formData[fieldName].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [fieldName]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Comprehensive validation
    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.content?.trim()) {
      setError('Content is required');
      return;
    }
    
    if (!formData.category) {
      setError('Category is required');
      return;
    }

    if (!formData.duration?.trim()) {
      setError('Duration is required');
      return;
    }

    if (!formData.price?.trim()) {
      setError('Price is required');
      return;
    }

    if (editingPost) {
      updatePost();
    } else {
      createPost();
    }
  };

  // Effects with proper cleanup
  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const hasFilters = Object.values(filters).some(filter => filter && filter !== '');
      if (hasFilters || filters.search) {
        fetchPosts(1);
      }
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [filters]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Complete array field renderer with enhanced validation
  const renderArrayField = (fieldName, label, placeholder = '', required = false) => {
    const fieldArray = Array.isArray(formData[fieldName]) ? formData[fieldName] : [];
    
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {fieldArray.length === 0 && (
          <p className="text-sm text-gray-500 italic">No {label.toLowerCase()} added yet</p>
        )}
        {fieldArray.map((item, index) => (
          <div key={`${fieldName}-${index}`} className="flex items-center space-x-2">
            <input
              type="text"
              value={item || ''}
              onChange={(e) => handleArrayFieldChange(fieldName, index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => removeArrayField(fieldName, index)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              title={`Remove ${label}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField(fieldName)}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
        >
          <Plus size={16} />
          <span>Add {label}</span>
        </button>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts and tours</p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Add New Post
        </button>
      </div>

      {/* Notifications */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
            <button 
              onClick={() => setSuccess('')} 
              className="text-green-700 hover:text-green-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
            <button 
              onClick={() => setError('')} 
              className="text-red-700 hover:text-red-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Difficulties</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>

          <select
            value={filters.featured}
            onChange={(e) => setFilters({...filters, featured: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Posts</option>
            <option value="true">Featured Only</option>
            <option value="false">Non-Featured</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No posts found</p>
            <p className="text-gray-400 text-sm mt-1">Create your first post to get started</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post, index) => (
                    <tr key={post._id || `post-${index}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {post.imageUrl || post.coverImage ? (
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={post.imageUrl || post.coverImage}
                                alt={post.title || 'Post image'}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  if (e.target.nextElementSibling) {
                                    e.target.nextElementSibling.style.display = 'flex';
                                  }
                                }}
                              />
                            ) : null}
                            <div 
                              className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center text-xs text-gray-400"
                              style={{ display: (post.imageUrl || post.coverImage) ? 'none' : 'flex' }}
                            >
                              No Image
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {post.title || 'Untitled Post'}
                            </div>
                            <div className="flex items-center mt-1 space-x-2">
                              {post.featured && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </span>
                              )}
                              {post.difficulty && (
                                <span className="text-xs text-gray-500">
                                  {post.difficulty}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {post.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {post.price || 'Free'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' :
                          post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          post.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {post.status || 'draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{post.views || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClick(post)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-md transition-colors"
                            title="Edit Post"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deletePost(post._id)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => fetchPosts(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchPosts(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{((currentPage - 1) * 10) + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(currentPage * 10, posts.length)}</span> of{' '}
                      <span className="font-medium">{posts.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => fetchPosts(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => fetchPosts(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                              pageNum === currentPage
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => fetchPosts(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Complete Modal for Add/Edit Post */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 mx-auto p-5 border w-11/12 max-w-5xl shadow-lg rounded-lg bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4 border-b">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {editingPost ? 'Update your post details' : 'Fill in the information below to create a new post'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingPost(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Close"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Essential Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Essential Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter an engaging title for your post"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="e.g., $50, ¥5000, Free"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="e.g., 3 hours, Full day, 2 days"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        {difficulties.map(diff => (
                          <option key={diff} value={diff}>{diff}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tour Type
                      </label>
                      <select
                        value={formData.tourType}
                        onChange={(e) => setFormData({...formData, tourType: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        {tourTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                          />
                          <span className="ml-2 text-sm text-gray-900">Featured Post</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Content & Description
                  </h4>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={8}
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
                        placeholder="Write detailed content about your post. Include what visitors can expect, activities involved, and any other relevant information..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Short Description
                        </label>
                        <textarea
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
                          placeholder="Brief overview of the post (for previews and summaries)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          About This Experience
                        </label>
                        <textarea
                          rows={4}
                          value={formData.about}
                          onChange={(e) => setFormData({...formData, about: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
                          placeholder="Additional details about the experience or tour"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location & Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prefecture/Location
                      </label>
                      <input
                        type="text"
                        value={formData.prefecture}
                        onChange={(e) => setFormData({...formData, prefecture: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="e.g., Tokyo, Kyoto, Osaka"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meeting Point
                      </label>
                      <input
                        type="text"
                        value={formData.meetingPoint}
                        onChange={(e) => setFormData({...formData, meetingPoint: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Where participants should meet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Best Time to Visit
                      </label>
                      <input
                        type="text"
                        value={formData.bestTime}
                        onChange={(e) => setFormData({...formData, bestTime: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="e.g., Spring, Morning, All year round"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Japanese Name
                      </label>
                      <input
                        type="text"
                        value={formData.nameJp}
                        onChange={(e) => setFormData({...formData, nameJp: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Japanese name or translation"
                      />
                    </div>
                  </div>

                  {/* Age and Group Size */}
                  <div className="mt-6">
                    <h5 className="text-md font-medium text-gray-800 mb-3">Group Settings</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Min Age
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="99"
                          value={formData.minAge}
                          onChange={(e) => setFormData({...formData, minAge: parseInt(e.target.value) || 0})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Age
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="150"
                          value={formData.maxAge}
                          onChange={(e) => setFormData({...formData, maxAge: parseInt(e.target.value) || 99})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Min Group Size
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.groupSize.min}
                          onChange={(e) => setFormData({
                            ...formData,
                            groupSize: { ...formData.groupSize, min: parseInt(e.target.value) || 1 }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Group Size
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.groupSize.max}
                          onChange={(e) => setFormData({
                            ...formData,
                            groupSize: { ...formData.groupSize, max: parseInt(e.target.value) || 20 }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Images
                  </h4>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="https://example.com/main-image.jpg"
                      />
                      {formData.imageUrl && (
                        <div className="mt-3">
                          <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="w-32 h-24 object-cover rounded-lg border"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Images
                      </label>
                      {Array.isArray(formData.images) && formData.images.map((image, index) => (
                        <div key={`image-${index}`} className="flex items-center space-x-3 mb-3">
                          <input
                            type="url"
                            value={image || ''}
                            onChange={(e) => handleArrayFieldChange('images', index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="https://example.com/additional-image.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayField('images', index)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove image"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField('images')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Plus size={16} />
                        <span>Add Additional Image</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                      <span className="text-lg font-medium text-gray-900">Advanced Options</span>
                    </div>
                    {showAdvanced ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                  </button>

                  {showAdvanced && (
                    <div className="px-6 pb-6 space-y-8">
                      {/* Tour Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {renderArrayField('highlights', 'Tour Highlights', 'What makes this special?')}
                        {renderArrayField('includes', 'What\'s Included', 'What is included in the price?')}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {renderArrayField('tags', 'Tags', 'Add relevant tags')}
                        {renderArrayField('languages', 'Languages', 'Languages available')}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {renderArrayField('notSuitableFor', 'Not Suitable For', 'Who should avoid this?')}
                        {renderArrayField('rules', 'Rules & Guidelines', 'Important rules to follow')}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {renderArrayField('importantInformation', 'Important Information', 'Critical info for participants')}
                        {renderArrayField('nearbyAttractions', 'Nearby Attractions', 'What else is nearby?')}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {renderArrayField('dining', 'Dining Options', 'Restaurants or food options')}
                        {renderArrayField('accommodation', 'Accommodation', 'Places to stay')}
                      </div>

                      {renderArrayField('tips', 'Tips & Advice', 'Helpful tips for participants')}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200 bg-white sticky bottom-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingPost(null);
                      resetForm();
                    }}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {editingPost ? 'Updating Post...' : 'Creating Post...'}
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        {editingPost ? 'Update Post' : 'Create Post'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;