
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

// const TourBookingForm = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     status: '',
//     tagline: '',
//     tourType: '',
//     tags: '',
//     description: '',
//     highlights: '',
//     sellingPoint: '',
//     transportType: '',
//     transportModal: '',
//     makeVariant: '',
//     price: '',
//     priceNumber: '',
//     pricePerPerson: '',
//     currency: '',
//     duration: '',
//     durationHours: '',
//     startTime: '',
//     endTime: '',
//     operatingHours: '',
//     discountPercentage: '',
//     validUntil: '',
//     discountDescription: '',
//     mainImage: null,
//     additionalImages: [],
//     galleryImages: [],
//     pickupLocation: '',
//     meetingPoint: '',
//     bestTime: '',
//     locationDetails: '',
//     city: '',
//     country: '',
//     area: '',
//     minGroup: '',
//     maxGroup: '',
//     capacity: '',
//     includes: '',
//     excludes: '',
//     rules: '',
//     explorationWays: '',
//     thingsToCare: '',
//     languages: '',
//     tips: '',
//     nearbyAttractions: '',
//     freeCancellation: false,
//     deadlineHours: '',
//     cancellationNote: '',
//     reserveNowPayLater: false,
//     reserveNote: '',
//     wheelchairAccessible: false,
//     infantSeats: false,
//     strollerAccessible: false,
//     serviceAnimals: false,
//     accessibilityNotes: '',
//     bookingType: '',
//     // Single Person Fields
//     singlePersonName: '',
//     singlePersonAge: '',
//     singlePersonNationality: '',
//     singlePersonPreferences: '',
//     singlePersonDietaryReq: '',
//     // Group Fields
//     groupName: '',
//     groupLeaderName: '',
//     groupSize: '',
//     groupType: '',
//     groupSpecialRequests: '',
//     itineraryItems: [],
//     includedDestinations: [],
//     faqs: [],
//     activities: [],
//     pricingSchedule: [],
//     // Arrays for multiple entries
//     highlightsList: [],
//     taglinesList: [],
//     tagsList: [],
//     sellingPointsList: [],
//     // Drop-off fields
//     sameDropOff: true,
//     dropArea: '',
//     dropLocation: '',
//     dropPoint: '',
//     dropDetails: ''
//   });

//   const [currentHighlight, setCurrentHighlight] = useState('');
//   const [currentTagline, setCurrentTagline] = useState('');
//   const [currentTag, setCurrentTag] = useState('');
//   const [currentSellingPoint, setCurrentSellingPoint] = useState('');

//   const [expandedSections, setExpandedSections] = useState({
//     basic: true,
//     description: false,
//     transport: false,
//     pricing: false,
//     timing: false,
//     images: false,
//     location: false,
//     group: false,
//     inclusion: false,
//     additional: false,
//     cancellation: false,
//     accessibility: false,
//     booking: false,
//     itinerary: false,
//     destinations: false,
//     faqs: false,
//     activities: false
//   });

//   const [currentItinerary, setCurrentItinerary] = useState({
//     time: '',
//     activity: '',
//     description: '',
//     duration: '',
//     included: false,
//     additionalCost: '',
//     image: null
//   });

//   const [currentDestination, setCurrentDestination] = useState({
//     name: '',
//     description: '',
//     duration: '',
//     bestTimeToVisit: '',
//     entryFee: '',
//     openingHours: ''
//   });

//   const [currentFaq, setCurrentFaq] = useState({
//     question: '',
//     answer: '',
    
    
//   });

//   const [currentActivity, setCurrentActivity] = useState({
//     title: '',
//     description: '',
//     duration: '',
//     category: ''
//   });

//   const [currentPricing, setCurrentPricing] = useState({
//     days: [],
//     time: [],
//     duration: '',
//     price: '',
//     currency: 'USD'
//   });

//   // Add Highlight
//   const addHighlight = () => {
//     if (currentHighlight.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         highlightsList: [...prev.highlightsList, currentHighlight.trim()]
//       }));
//       setCurrentHighlight('');
//     }
//   };

//   const removeHighlight = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       highlightsList: prev.highlightsList.filter((_, i) => i !== index)
//     }));
//   };

//   // Add Tagline
//   const addTagline = () => {
//     if (currentTagline.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         taglinesList: [...prev.taglinesList, currentTagline.trim()]
//       }));
//       setCurrentTagline('');
//     }
//   };

//   const removeTagline = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       taglinesList: prev.taglinesList.filter((_, i) => i !== index)
//     }));
//   };

//   // Add Tag
//   const addTag = () => {
//     if (currentTag.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         tagsList: [...prev.tagsList, currentTag.trim()]
//       }));
//       setCurrentTag('');
//     }
//   };

//   const removeTag = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       tagsList: prev.tagsList.filter((_, i) => i !== index)
//     }));
//   };

//   // Add Selling Point
//   const addSellingPoint = () => {
//     if (currentSellingPoint.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         sellingPointsList: [...prev.sellingPointsList, currentSellingPoint.trim()]
//       }));
//       setCurrentSellingPoint('');
//     }
//   };

//   const removeSellingPoint = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       sellingPointsList: prev.sellingPointsList.filter((_, i) => i !== index)
//     }));
//   };

//   // Simplified categories
//   const categories = ['Tour', 'Transport', 'Hotel'];
//   const statuses = ['Active', 'Inactive', 'Draft', 'Archived'];
//   const tourTypes = ['Private', 'Group', 'Shared', 'Custom'];
//   const currencies = ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'JPY', 'CAD', 'AUD'];
//   const japanCities = ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Yokohama', 'Sapporo', 'Fukuoka', 'Nagoya', 'Kobe'];
//   const countries = ['Pakistan', 'UAE', 'UK', 'USA', 'Saudi Arabia', 'Japan', 'China', 'India', 'Turkey', 'Malaysia', 'Singapore', 'Thailand', 'France', 'Germany', 'Italy', 'Spain', 'Canada', 'Australia'];
//   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'All'];
  
//   // Transport Type Options
//   const transportTypes = ['Bus', 'Car', 'Van', 'Boat', 'Train', 'Airplane', 'Other'];
  
//   // Transport Modal Options (2001 to 2010)
//   const transportModals = Array.from({ length: 10 }, (_, i) => (2001 + i).toString());
  
//   const timeSlots = [];
//   for (let hour = 6; hour <= 12; hour++) {
//     timeSlots.push(`${hour}:00`);
//     if (hour < 12) timeSlots.push(`${hour}:30`);
//   }

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e, field) => {
//     const files = Array.from(e.target.files);
//     if (field === 'mainImage') {
//       setFormData(prev => ({ ...prev, mainImage: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [field]: files }));
//     }
//   };

//   const handleItineraryImageChange = (e) => {
//     const file = e.target.files[0];
//     setCurrentItinerary(prev => ({
//       ...prev,
//       image: file
//     }));
//   };

//   const addItinerary = () => {
//     if (currentItinerary.activity) {
//       setFormData(prev => ({
//         ...prev,
//         itineraryItems: [...prev.itineraryItems, { ...currentItinerary }]
//       }));
//       setCurrentItinerary({
//         time: '',
//         activity: '',
//         description: '',
//         duration: '',
//         included: false,
//         additionalCost: '',
//         image: null
//       });
//     }
//   };

//   const removeItinerary = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       itineraryItems: prev.itineraryItems.filter((_, i) => i !== index)
//     }));
//   };

//   const addDestination = () => {
//     if (currentDestination.name) {
//       setFormData(prev => ({
//         ...prev,
//         includedDestinations: [...prev.includedDestinations, { ...currentDestination }]
//       }));
//       setCurrentDestination({
//         name: '',
//         description: '',
//         duration: '',
//         bestTimeToVisit: '',
//         entryFee: '',
//         openingHours: ''
//       });
//     }
//   };

//   const removeDestination = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       includedDestinations: prev.includedDestinations.filter((_, i) => i !== index)
//     }));
//   };

//   const addFaq = () => {
//     if (currentFaq.question && currentFaq.answer) {
//       setFormData(prev => ({
//         ...prev,
//         faqs: [...prev.faqs, { ...currentFaq }]
//       }));
//       setCurrentFaq({
//         question: '',
//         answer: '',
//         category: '',
        
//       });
//     }
//   };

//   const removeFaq = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       faqs: prev.faqs.filter((_, i) => i !== index)
//     }));
//   };

//   const addActivity = () => {
//     if (currentActivity.title) {
//       setFormData(prev => ({
//         ...prev,
//         activities: [...prev.activities, { ...currentActivity }]
//       }));
//       setCurrentActivity({
//         title: '',
//         description: '',
//         duration: '',
//         category: ''
//       });
//     }
//   };

//   const removeActivity = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       activities: prev.activities.filter((_, i) => i !== index)
//     }));
//   };

//   const handleDaySelection = (e) => {
//     const selectedDays = Array.from(e.target.selectedOptions, option => option.value);
//     setCurrentPricing(prev => ({
//       ...prev,
//       days: selectedDays
//     }));
//   };

//   const addPricingSchedule = () => {
//     if (currentPricing.days.length > 0 && currentPricing.time.length > 0 && currentPricing.price) {
//       setFormData(prev => ({
//         ...prev,
//         pricingSchedule: [...prev.pricingSchedule, { ...currentPricing }]
//       }));
//       setCurrentPricing({ days: [], time: [], duration: '', price: '', currency: 'USD' });
//     }
//   };

//   const removePricingSchedule = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       pricingSchedule: prev.pricingSchedule.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('=== TOUR BOOKING FORM DATA ===');
//     console.log('Basic Information:', {
//       title: formData.title,
//       category: formData.category,
//       status: formData.status,
//       taglinesList: formData.taglinesList,
//       tourType: formData.tourType,
//       tagsList: formData.tagsList
//     });
    
//     console.log('Description & Highlights:', {
//       description: formData.description,
//       highlightsList: formData.highlightsList,
//       sellingPointsList: formData.sellingPointsList
//     });
    
//     console.log('Transport Details:', {
//       transportType: formData.transportType,
//       transportModal: formData.transportModal,
//       makeVariant: formData.makeVariant
//     });
    
//     console.log('Pricing:', {
//       price: formData.price,
//       priceNumber: formData.priceNumber,
//       pricePerPerson: formData.pricePerPerson,
//       currency: formData.currency,
//       discountPercentage: formData.discountPercentage,
//       validUntil: formData.validUntil,
//       pricingSchedule: formData.pricingSchedule
//     });
    
//     console.log('Timing:', {
//       duration: formData.duration,
//       durationHours: formData.durationHours,
//       startTime: formData.startTime,
//       endTime: formData.endTime,
//       operatingHours: formData.operatingHours
//     });
    
//     console.log('Location:', {
//       city: formData.city,
//       country: formData.country,
//       area: formData.area,
//       pickupLocation: formData.pickupLocation,
//       meetingPoint: formData.meetingPoint,
//       bestTime: formData.bestTime,
//       locationDetails: formData.locationDetails,
//       sameDropOff: formData.sameDropOff,
//       dropArea: formData.dropArea,
//       dropLocation: formData.dropLocation,
//       dropPoint: formData.dropPoint,
//       dropDetails: formData.dropDetails
//     });

//     console.log('Booking Type:', formData.bookingType);
    
//     if (formData.bookingType === 'single') {
//       console.log('Single Person Booking:', {
//         name: formData.singlePersonName,
//         age: formData.singlePersonAge,
//         nationality: formData.singlePersonNationality,
//         preferences: formData.singlePersonPreferences,
//         dietaryRequirements: formData.singlePersonDietaryReq
//       });
//     } else if (formData.bookingType === 'group') {
//       console.log('Group Booking:', {
//         groupName: formData.groupName,
//         leaderName: formData.groupLeaderName,
//         groupSize: formData.groupSize,
//         groupType: formData.groupType,
//         specialRequests: formData.groupSpecialRequests
//       });
//     }
    
//     console.log('Inclusion/Exclusion:', {
//       includes: formData.includes,
//       excludes: formData.excludes,
//       rules: formData.rules
//     });
    
//     console.log('Additional Info:', {
//       explorationWays: formData.explorationWays,
//       thingsToCare: formData.thingsToCare,
//       languages: formData.languages,
//       tips: formData.tips,
//       nearbyAttractions: formData.nearbyAttractions
//     });
    
//     console.log('Cancellation Policy:', {
//       freeCancellation: formData.freeCancellation,
//       deadlineHours: formData.deadlineHours,
//       cancellationNote: formData.cancellationNote
//     });
    
//     console.log('Reservation:', {
//       reserveNowPayLater: formData.reserveNowPayLater,
//       reserveNote: formData.reserveNote
//     });
    
//     console.log('Accessibility:', {
//       wheelchairAccessible: formData.wheelchairAccessible,
//       infantSeats: formData.infantSeats,
//       strollerAccessible: formData.strollerAccessible,
//       serviceAnimals: formData.serviceAnimals,
//       accessibilityNotes: formData.accessibilityNotes
//     });
    
//     console.log('Itinerary Items:', formData.itineraryItems);
//     console.log('Included Destinations:', formData.includedDestinations);
//     console.log('FAQs:', formData.faqs);
//     console.log('Activities:', formData.activities);
    
//     console.log('Images:', {
//       mainImage: formData.mainImage?.name,
//       additionalImages: formData.additionalImages.map(f => f.name),
//       galleryImages: formData.galleryImages.map(f => f.name)
//     });

//     try {
//       const formDataToSend = new FormData();
      
//       Object.keys(formData).forEach(key => {
//         if (key === 'mainImage' && formData[key]) {
//           formDataToSend.append('mainImage', formData[key]);
//         } else if ((key === 'additionalImages' || key === 'galleryImages') && formData[key].length > 0) {
//           formData[key].forEach(file => {
//             formDataToSend.append(key, file);
//           });
//         } else if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
//           formDataToSend.append(key, JSON.stringify(formData[key]));
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       console.log('=== Sending data via Axios ===');
//       // Uncomment and update URL when backend is ready
//       // const response = await axios.post('YOUR_API_ENDPOINT', formDataToSend, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data'
//       //   }
//       // });
//       // console.log('Response:', response.data);
      
//       alert('Form data logged to console! Check console for details.');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const SectionHeader = ({ title, section }) => (
//     <div 
//       className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all"
//       onClick={() => toggleSection(section)}
//     >
//       <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//       {expandedSections[section] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//     </div>
//   );

//   // Reset form function
//   const resetForm = () => {
//     setFormData({
//       title: '',
//       category: '',
//       status: '',
//       tagline: '',
//       tourType: '',
//       tags: '',
//       description: '',
//       highlights: '',
//       sellingPoint: '',
//       transportType: '',
//       transportModal: '',
//       makeVariant: '',
//       price: '',
//       priceNumber: '',
//       pricePerPerson: '',
//       currency: '',
//       duration: '',
//       durationHours: '',
//       startTime: '',
//       endTime: '',
//       operatingHours: '',
//       discountPercentage: '',
//       validUntil: '',
//       discountDescription: '',
//       mainImage: null,
//       additionalImages: [],
//       galleryImages: [],
//       pickupLocation: '',
//       meetingPoint: '',
//       bestTime: '',
//       locationDetails: '',
//       city: '',
//       country: '',
//       area: '',
//       minGroup: '',
//       maxGroup: '',
//       capacity: '',
//       includes: '',
//       excludes: '',
//       rules: '',
//       explorationWays: '',
//       thingsToCare: '',
//       languages: '',
//       tips: '',
//       nearbyAttractions: '',
//       freeCancellation: false,
//       deadlineHours: '',
//       cancellationNote: '',
//       reserveNowPayLater: false,
//       reserveNote: '',
//       wheelchairAccessible: false,
//       infantSeats: false,
//       strollerAccessible: false,
//       serviceAnimals: false,
//       accessibilityNotes: '',
//       bookingType: '',
//       singlePersonName: '',
//       singlePersonAge: '',
//       singlePersonNationality: '',
//       singlePersonPreferences: '',
//       singlePersonDietaryReq: '',
//       groupName: '',
//       groupLeaderName: '',
//       groupSize: '',
//       groupType: '',
//       groupSpecialRequests: '',
//       itineraryItems: [],
//       includedDestinations: [],
//       faqs: [],
//       activities: [],
//       pricingSchedule: [],
//       highlightsList: [],
//       taglinesList: [],
//       tagsList: [],
//       sellingPointsList: [],
//       sameDropOff: true,
//       dropArea: '',
//       dropLocation: '',
//       dropPoint: '',
//       dropDetails: ''
//     });
//     setCurrentHighlight('');
//     setCurrentTagline('');
//     setCurrentTag('');
//     setCurrentSellingPoint('');
//     setCurrentItinerary({
//       time: '',
//       activity: '',
//       description: '',
//       duration: '',
//       included: false,
//       additionalCost: '',
//       image: null
//     });
//     setCurrentPricing({ days: [], time: [], duration: '', price: '', currency: 'USD' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Show Button when form is hidden */}
//         {!showForm ? (
//           <div className="text-center">
//             <div className="bg-white rounded-xl shadow-2xl p-12 mb-8">
//               <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Tour Management System
//               </h1>
            
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
//               >
//                 <Plus size={24} className="inline mr-2" />
//                 Create New Tour
//               </button>
//             </div>

           
//           </div>
//         ) : (
//           /* Show Form when button is clicked */
//           <div className="bg-white rounded-xl shadow-2xl p-8">
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Tour Booking Form
//               </h1>
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
//               >
//                 ← Back
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Basic Information */}
//               <div>
//                 <SectionHeader title="Basic Information" section="basic" />
//                 {expandedSections.basic && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                         <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                         <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                           <option value="">Select Category</option>
//                           {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                         </select>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type</label>
//                         <select name="tourType" value={formData.tourType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                           <option value="">Select Tour Type</option>
//                           {tourTypes.map(type => <option key={type} value={type}>{type}</option>)}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Taglines with Add More */}
//                     <div className="space-y-3">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Taglines</label>
//                       <div className="flex gap-2">
//                         <input 
//                           type="text" 
//                           value={currentTagline} 
//                           onChange={(e) => setCurrentTagline(e.target.value)}
//                           placeholder="Enter a tagline"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                         <button 
//                           type="button" 
//                           onClick={addTagline}
//                           className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                         >
//                           <Plus size={16} /> Add
//                         </button>
//                       </div>
//                       {formData.taglinesList.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {formData.taglinesList.map((tagline, index) => (
//                             <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                               {tagline}
//                               <button 
//                                 type="button" 
//                                 onClick={() => removeTagline(index)}
//                                 className="text-blue-600 hover:text-blue-800"
//                               >
//                                 <Trash2 size={14} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     {/* Tags with Add More */}
//                     <div className="space-y-3">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
//                       <div className="flex gap-2">
//                         <input 
//                           type="text" 
//                           value={currentTag} 
//                           onChange={(e) => setCurrentTag(e.target.value)}
//                           placeholder="Enter a tag"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                         <button 
//                           type="button" 
//                           onClick={addTag}
//                           className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//                         >
//                           <Plus size={16} /> Add
//                         </button>
//                       </div>
//                       {formData.tagsList.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {formData.tagsList.map((tag, index) => (
//                             <div key={index} className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                               {tag}
//                               <button 
//                                 type="button" 
//                                 onClick={() => removeTag(index)}
//                                 className="text-green-600 hover:text-green-800"
//                               >
//                                 <Trash2 size={14} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Description & Highlights */}
//               <div>
//                 <SectionHeader title="Description & Highlights" section="description" />
//                 {expandedSections.description && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                       <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
                    
//                     {/* Highlights with Add More */}
//                     <div className="space-y-3">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
//                       <div className="flex gap-2">
//                         <input 
//                           type="text" 
//                           value={currentHighlight} 
//                           onChange={(e) => setCurrentHighlight(e.target.value)}
//                           placeholder="Enter a highlight"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                         <button 
//                           type="button" 
//                           onClick={addHighlight}
//                           className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
//                         >
//                           <Plus size={16} /> Add
//                         </button>
//                       </div>
//                       {formData.highlightsList.length > 0 && (
//                         <div className="space-y-2 mt-2">
//                           {formData.highlightsList.map((highlight, index) => (
//                             <div key={index} className="flex items-center justify-between bg-purple-50 p-3 rounded-md border border-purple-200">
//                               <span className="text-purple-800">{highlight}</span>
//                               <button 
//                                 type="button" 
//                                 onClick={() => removeHighlight(index)}
//                                 className="text-purple-600 hover:text-purple-800"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Selling Points with Add More */}
//                     <div className="space-y-3">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Selling Points</label>
//                       <div className="flex gap-2">
//                         <input 
//                           type="text" 
//                           value={currentSellingPoint} 
//                           onChange={(e) => setCurrentSellingPoint(e.target.value)}
//                           placeholder="Enter a selling point"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                         <button 
//                           type="button" 
//                           onClick={addSellingPoint}
//                           className="flex items-center gap-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
//                         >
//                           <Plus size={16} /> Add
//                         </button>
//                       </div>
//                       {formData.sellingPointsList.length > 0 && (
//                         <div className="space-y-2 mt-2">
//                           {formData.sellingPointsList.map((point, index) => (
//                             <div key={index} className="flex items-center justify-between bg-orange-50 p-3 rounded-md border border-orange-200">
//                               <span className="text-orange-800">{point}</span>
//                               <button 
//                                 type="button" 
//                                 onClick={() => removeSellingPoint(index)}
//                                 className="text-orange-600 hover:text-orange-800"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Transport Details */}
//               <div>
//                 <SectionHeader title="Transport Details" section="transport" />
//                 {expandedSections.transport && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Transport Type</label>
//                         <select name="transportType" value={formData.transportType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                           <option value="">Select Transport Type</option>
//                           {transportTypes.map(type => <option key={type} value={type}>{type}</option>)}
//                         </select>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Transport Modal</label>
//                         <select name="transportModal" value={formData.transportModal} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                           <option value="">Select Year</option>
//                           {transportModals.map(modal => <option key={modal} value={modal}>{modal}</option>)}
//                         </select>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Make & Variant</label>
//                         <input type="text" name="makeVariant" value={formData.makeVariant} onChange={handleInputChange} placeholder="e.g., Toyota Hiace" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Images */}
//               <div>
//                 <SectionHeader title="Images" section="images" />
//                 {expandedSections.images && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
//                       <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'mainImage')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
//                       <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, 'additionalImages')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
//                       <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, 'galleryImages')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Location */}
//               <div>
//                 <SectionHeader title="Location" section="location" />
//                 {expandedSections.location && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
//                       {/* City */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                         <select
//                           name="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select City</option>
//                           {japanCities.map((city) => (
//                             <option key={city} value={city}>
//                               {city}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Country */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                         <select
//                           name="country"
//                           value={formData.country}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select Country</option>
//                           {countries.map((country) => (
//                             <option key={country} value={country}>
//                               {country}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Area */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
//                         <input
//                           type="text"
//                           name="area"
//                           value={formData.area}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>

//                       {/* Pickup Location */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
//                         <input
//                           type="text"
//                           name="pickupLocation"
//                           value={formData.pickupLocation}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>

//                       {/* Meeting Point */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Point</label>
//                         <input
//                           type="text"
//                           name="meetingPoint"
//                           value={formData.meetingPoint}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>

//                       {/* Best Time */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Best Time</label>
//                         <input
//                           type="text"
//                           name="bestTime"
//                           value={formData.bestTime}
//                           onChange={handleInputChange}
//                           placeholder="e.g., Morning, Evening"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>

//                       {/* Location Details */}
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Location Details</label>
//                         <textarea
//                           name="locationDetails"
//                           value={formData.locationDetails}
//                           onChange={handleInputChange}
//                           rows="3"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>

//                       {/* Toggle for Drop-off */}
//                       <div className="md:col-span-2 flex items-center justify-between bg-white px-4 py-3 rounded-md border">
//                         <span className="text-sm font-medium text-gray-700">
//                           Same Drop-off as Pickup?
//                         </span>
//                         <label className="inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             className="sr-only peer"
//                             checked={formData.sameDropOff}
//                             onChange={(e) =>
//                               setFormData((prev) => ({
//                                 ...prev,
//                                 sameDropOff: e.target.checked,
//                                 dropArea: e.target.checked ? prev.area : "",
//                                 dropLocation: e.target.checked ? prev.pickupLocation : "",
//                                 dropPoint: e.target.checked ? prev.meetingPoint : "",
//                                 dropDetails: e.target.checked ? prev.locationDetails : "",
//                               }))
//                             }
//                           />
//                           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
//                         </label>
//                       </div>

//                       {/* Drop-off fields (show only if toggle OFF) */}
//                       {!formData.sameDropOff && (
//                         <>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Area</label>
//                             <input
//                               type="text"
//                               name="dropArea"
//                               value={formData.dropArea}
//                               onChange={handleInputChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
//                             <input
//                               type="text"
//                               name="dropLocation"
//                               value={formData.dropLocation}
//                               onChange={handleInputChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Point</label>
//                             <input
//                               type="text"
//                               name="dropPoint"
//                               value={formData.dropPoint}
//                               onChange={handleInputChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>

//                           <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Details</label>
//                             <textarea
//                               name="dropDetails"
//                               value={formData.dropDetails}
//                               onChange={handleInputChange}
//                               rows="3"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Booking Type - Single or Group */}
//               <div>
//                 <SectionHeader title="Booking Type" section="booking" />
//                 {expandedSections.booking && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Select Booking Type</label>
//                       <div className="flex gap-4">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="bookingType"
//                             value="single"
//                             checked={formData.bookingType === 'single'}
//                             onChange={handleInputChange}
//                             className="w-4 h-4 text-blue-600"
//                           />
//                           <span className="text-gray-700 font-medium">Single Person</span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="bookingType"
//                             value="group"
//                             checked={formData.bookingType === 'group'}
//                             onChange={handleInputChange}
//                             className="w-4 h-4 text-blue-600"
//                           />
//                           <span className="text-gray-700 font-medium">Group</span>
//                         </label>
//                       </div>
//                     </div>

//                     {/* Single Person Fields */}
//                     {formData.bookingType === 'single' && (
//                       <div className="bg-blue-50 p-4 rounded-md space-y-4 border-2 border-blue-200">
//                         <h3 className="text-lg font-semibold text-blue-800">Single Person Booking Details</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                             <input
//                               type="text"
//                               name="singlePersonName"
//                               value={formData.singlePersonName}
//                               onChange={handleInputChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//                             <input
//                               type="number"
//                               name="singlePersonAge"
//                               value={formData.singlePersonAge}
//                               onChange={handleInputChange}
//                               min="1"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
//                             <input
//                               type="text"
//                               name="singlePersonNationality"
//                               value={formData.singlePersonNationality}
//                               onChange={handleInputChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
//                             <input
//                               type="text"
//                               name="singlePersonPreferences"
//                               value={formData.singlePersonPreferences}
//                               onChange={handleInputChange}
//                               placeholder="e.g., Window seat, Photography"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Group Fields */}
//                     {formData.bookingType === 'group' && (
//                       <div className="bg-green-50 p-4 rounded-md space-y-4 border-2 border-green-200">
//                         <h3 className="text-lg font-semibold text-green-800">Group Booking Details</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
//                             <input
//                               type="text"
//                               name="groupName"
//                               value={formData.groupName}
//                               onChange={handleInputChange}
//                               placeholder="e.g., ABC Company Team"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Group Leader Name</label>
//                             <input
//                               type="text"
//                               name="groupLeaderName"
//                               value={formData.groupLeaderName}
//                               onChange={handleInputChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
//                             <input
//                               type="number"
//                               name="groupSize"
//                               value={formData.groupSize}
//                               onChange={handleInputChange}
//                               min="2"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Group Type</label>
//                             <select
//                               name="groupType"
//                               value={formData.groupType}
//                               onChange={handleInputChange}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             >
//                               <option value="">Select Type</option>
//                               <option value="family">Family</option>
//                               <option value="friends">Friends</option>
//                               <option value="corporate">Corporate</option>
//                               <option value="school">School/Educational</option>
//                               <option value="other">Other</option>
//                             </select>
//                           </div>

//                           <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
//                             <textarea
//                               name="groupSpecialRequests"
//                               value={formData.groupSpecialRequests}
//                               onChange={handleInputChange}
//                               rows="2"
//                               placeholder="Any special requirements for the group"
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Pricing */}
//               <div>
//                 <SectionHeader title="Pricing" section="pricing" />
//                 {expandedSections.pricing && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
//                         <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleInputChange} min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
//                         <input type="date" name="validUntil" value={formData.validUntil} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                       </div>
//                     </div>

//                     {/* Pricing Schedule */}
//                     <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm">
//                       <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
//                         Pricing Schedule
//                       </h3>

//                       <div className="space-y-5">
//                         {/* Days Selection */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">Select Days</label>
//                           <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                             <label className="flex items-center space-x-2">
//                               <input
//                                 type="checkbox"
//                                 checked={currentPricing.days.length === weekDays.length}
//                                 onChange={(e) => {
//                                   if (e.target.checked) {
//                                     setCurrentPricing((prev) => ({ ...prev, days: weekDays }))
//                                   } else {
//                                     setCurrentPricing((prev) => ({ ...prev, days: [] }))
//                                   }
//                                 }}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                               />
//                               <span className="text-sm">Select All</span>
//                             </label>

//                             {weekDays.map((day) => (
//                               <label key={day} className="flex items-center space-x-2">
//                                 <input
//                                   type="checkbox"
//                                   checked={currentPricing.days.includes(day)}
//                                   onChange={(e) => {
//                                     if (e.target.checked) {
//                                       setCurrentPricing((prev) => ({ ...prev, days: [...prev.days, day] }))
//                                     } else {
//                                       setCurrentPricing((prev) => ({ ...prev, days: prev.days.filter((d) => d !== day) }))
//                                     }
//                                   }}
//                                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                 />
//                                 <span className="text-sm">{day}</span>
//                               </label>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Time, Price, Currency */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {/* Time Slot */}
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Select Time Slots
//                             </label>
//                             <div className="border rounded-lg p-3 space-y-2 bg-white shadow-sm max-h-40 overflow-y-auto">
//                               {/* Select All Option */}
//                               <div className="flex items-center">
//                                 <input
//                                   type="checkbox"
//                                   id="selectAll"
//                                   checked={currentPricing.time.length === timeSlots.length}
//                                   onChange={(e) => {
//                                     if (e.target.checked) {
//                                       setCurrentPricing((prev) => ({ ...prev, time: [...timeSlots] }));
//                                     } else {
//                                       setCurrentPricing((prev) => ({ ...prev, time: [] }));
//                                     }
//                                   }}
//                                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                                 />
//                                 <label htmlFor="selectAll" className="ml-2 text-sm text-gray-700">
//                                   Select All
//                                 </label>
//                               </div>

//                               {/* Individual Time Slots */}
//                               {timeSlots.map((time) => (
//                                 <div key={time} className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     id={time}
//                                     checked={currentPricing.time.includes(time)}
//                                     onChange={(e) => {
//                                       if (e.target.checked) {
//                                         setCurrentPricing((prev) => ({
//                                           ...prev,
//                                           time: [...prev.time, time],
//                                         }));
//                                       } else {
//                                         setCurrentPricing((prev) => ({
//                                           ...prev,
//                                           time: prev.time.filter((t) => t !== time),
//                                         }));
//                                       }
//                                     }}
//                                     className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                                   />
//                                   <label htmlFor={time} className="ml-2 text-sm text-gray-700">
//                                     {time}
//                                   </label>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           <div className="space-y-4">
//                             {/* Tour Duration */}
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Tour Duration</label>
//                               <select
//                                 value={currentPricing.duration}
//                                 onChange={(e) =>
//                                   setCurrentPricing((prev) => ({ ...prev, duration: e.target.value }))
//                                 }
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               >
//                                 <option value="">Select Duration</option>
//                                 <option value="2 hours">2 Hours</option>
//                                 <option value="4 hours">4 Hours</option>
//                                 <option value="1 day">1 Day</option>
//                               </select>
//                             </div>

//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1"> Actual Price</label>
//                               <input
//                                 type="number"
//                                 value={currentPricing.price}
//                                 onChange={(e) => setCurrentPricing((prev) => ({ ...prev, price: e.target.value }))}
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Enter price"
//                               />
//                             </div>

//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Net Price 
//                               </label>
//                               <input
//                                 type="number"
//                                 value={currentPricing.price ? (parseFloat(currentPricing.price) * 0.75).toFixed(2) : ''}
//                                 readOnly
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-100"
//                                 placeholder="Calculated automatically"
//                               />
//                             </div>

//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
//                               <select
//                                 value={currentPricing.currency}
//                                 onChange={(e) => setCurrentPricing((prev) => ({ ...prev, currency: e.target.value }))}
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               >
//                                 {currencies.map((curr) => (
//                                   <option key={curr} value={curr}>
//                                     {curr}
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Add Button */}
//                         <button
//                           type="button"
//                           onClick={addPricingSchedule}
//                           className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
//                         >
//                           <Plus size={16} /> Add Schedule
//                         </button>
//                       </div>

//                       {/* Saved Pricing List */}
//                       {formData.pricingSchedule.length > 0 && (
//                         <div className="mt-6 space-y-3">
//                           {formData.pricingSchedule.map((schedule, index) => (
//                             <div
//                               key={index}
//                               className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border shadow-sm"
//                             >
//                               <div className="text-sm text-gray-700 space-x-2">
//                                 <span className="font-medium">Days:</span>{" "}
//                                 {schedule.days.map((d) => (
//                                   <span
//                                     key={d}
//                                     className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mr-1"
//                                   >
//                                     {d}
//                                   </span>
//                                 ))}
//                                 <span className="font-medium">Time:</span> {schedule.time.join(', ')} |
//                                 <span className="font-medium">Duration:</span> {schedule.duration} |
//                                 <span className="font-medium">Price:</span> {schedule.currency} {schedule.price}
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => removePricingSchedule(index)}
//                                 className="text-red-600 hover:text-red-800 transition"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Inclusion/Exclusion */}
//               <div>
//                 <SectionHeader title="Inclusion/Exclusion" section="inclusion" />
//                 {expandedSections.inclusion && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Includes</label>
//                       <textarea name="includes" value={formData.includes} onChange={handleInputChange} rows="3" placeholder="What's included in the tour" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Excludes</label>
//                       <textarea name="excludes" value={formData.excludes} onChange={handleInputChange} rows="3" placeholder="What's not included" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Rules</label>
//                       <textarea name="rules" value={formData.rules} onChange={handleInputChange} rows="3" placeholder="Tour rules and regulations" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Additional Information */}
//               <div>
//                 <SectionHeader title="Additional Information" section="additional" />
//                 {expandedSections.additional && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Exploration Ways</label>
//                       <textarea name="explorationWays" value={formData.explorationWays} onChange={handleInputChange} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Things to Care</label>
//                       <textarea name="thingsToCare" value={formData.thingsToCare} onChange={handleInputChange} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
//                       <input type="text" name="languages" value={formData.languages} onChange={handleInputChange} placeholder="e.g., English, Urdu, Arabic" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tips</label>
//                       <textarea name="tips" value={formData.tips} onChange={handleInputChange} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Nearby Attractions</label>
//                       <textarea name="nearbyAttractions" value={formData.nearbyAttractions} onChange={handleInputChange} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Cancellation & Reservation */}
//               <div>
//                 <SectionHeader title="Cancellation & Reservation" section="cancellation" />
//                 {expandedSections.cancellation && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
//                     <div className="flex items-center gap-3">
//                       <input type="checkbox" name="freeCancellation" checked={formData.freeCancellation} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
//                       <label className="text-sm font-medium text-gray-700">Free Cancellation</label>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Hours</label>
//                         <input type="number" name="deadlineHours" value={formData.deadlineHours} onChange={handleInputChange} placeholder="Hours before start" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Note</label>
//                         <input type="text" name="cancellationNote" value={formData.cancellationNote} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <input type="checkbox" name="reserveNowPayLater" checked={formData.reserveNowPayLater} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
//                       <label className="text-sm font-medium text-gray-700">Reserve Now Pay Later</label>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Reservation Note</label>
//                       <textarea name="reserveNote" value={formData.reserveNote} onChange={handleInputChange} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Accessibility */}
//               <div>
//                 <SectionHeader title="Accessibility" section="accessibility" />
//                 {expandedSections.accessibility && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-3">
//                     <div className="flex items-center gap-3">
//                       <input type="checkbox" name="wheelchairAccessible" checked={formData.wheelchairAccessible} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
//                       <label className="text-sm font-medium text-gray-700">Wheelchair Accessible</label>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <input type="checkbox" name="infantSeats" checked={formData.infantSeats} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
//                       <label className="text-sm font-medium text-gray-700">Infant Seats Available</label>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <input type="checkbox" name="strollerAccessible" checked={formData.strollerAccessible} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
//                       <label className="text-sm font-medium text-gray-700">Stroller Accessible</label>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <input type="checkbox" name="serviceAnimals" checked={formData.serviceAnimals} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
//                       <label className="text-sm font-medium text-gray-700">Service Animals Allowed</label>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Notes</label>
//                       <textarea name="accessibilityNotes" value={formData.accessibilityNotes} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Itinerary */}
//               <div>
//                 <SectionHeader title="Itinerary" section="itinerary" />
//                 {expandedSections.itinerary && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg">
//                     <div className="bg-white p-4 rounded-md border-2 border-purple-200 space-y-3">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                           <input type="time" value={currentItinerary.time} onChange={(e) => setCurrentItinerary({...currentItinerary, time: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
//                           <input type="text" value={currentItinerary.activity} onChange={(e) => setCurrentItinerary({...currentItinerary, activity: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                         </div>
                        
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                           <textarea value={currentItinerary.description} onChange={(e) => setCurrentItinerary({...currentItinerary, description: e.target.value})} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
//                           <input type="text" value={currentItinerary.duration} onChange={(e) => setCurrentItinerary({...currentItinerary, duration: e.target.value})} placeholder="e.g., 2 hours" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Additional Cost</label>
//                           <input type="number" value={currentItinerary.additionalCost} onChange={(e) => setCurrentItinerary({...currentItinerary, additionalCost: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                         </div>
                        
//                         {/* Image Field for Itinerary */}
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Activity Image</label>
//                           <input 
//                             type="file" 
//                             accept="image/*" 
//                             onChange={handleItineraryImageChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md" 
//                           />
//                           {currentItinerary.image && (
//                             <p className="text-sm text-green-600 mt-1">
//                               Selected: {currentItinerary.image.name}
//                             </p>
//                           )}
//                         </div>
                        
//                         <div className="flex items-center gap-3">
//                           <input type="checkbox" checked={currentItinerary.included} onChange={(e) => setCurrentItinerary({...currentItinerary, included: e.target.checked})} className="w-4 h-4 text-blue-600" />
//                           <label className="text-sm font-medium text-gray-700">Included in Package</label>
//                         </div>
//                       </div>
                      
//                       <button type="button" onClick={addItinerary} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                         <Plus size={16} /> Add Itinerary Item
//                       </button>
//                     </div>

//                     {formData.itineraryItems.length > 0 && (
//                       <div className="mt-4 space-y-2">
//                         {formData.itineraryItems.map((item, index) => (
//                           <div key={index} className="flex items-start justify-between bg-white p-3 rounded border">
//                             <div className="flex-1">
//                               <div className="font-medium">{item.time} - {item.activity}</div>
//                               <div className="text-sm text-gray-600">{item.description}</div>
//                               <div className="text-sm text-gray-500">
//                                 Duration: {item.duration} | {item.included ? 'Included' : `Additional: ${item.additionalCost}`}
//                                 {item.image && (
//                                   <span className="ml-2 text-blue-600">• Image: {item.image.name}</span>
//                                 )}
//                               </div>
//                             </div>
//                             <button type="button" onClick={() => removeItinerary(index)} className="text-red-600 hover:text-red-800">
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* FAQs */}
//               <div>
//                 <SectionHeader title="Frequently Asked Questions" section="faqs" />
//                 {expandedSections.faqs && (
//                   <div className="mt-4 p-6 bg-gray-50 rounded-lg">
//                     <div className="bg-white p-4 rounded-md border-2 border-pink-200 space-y-3">
//                       <div className="grid grid-cols-1 gap-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
//                           <input type="text" value={currentFaq.question} onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
//                           <textarea value={currentFaq.answer} onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-3">
                     
                          
                        
//                         </div>
//                       </div>
                      
//                       <button type="button" onClick={addFaq} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                         <Plus size={16} /> Add FAQ
//                       </button>
//                     </div>

//                     {formData.faqs.length > 0 && (
//                       <div className="mt-4 space-y-2">
//                         {formData.faqs.map((faq, index) => (
//                           <div key={index} className="flex items-start justify-between bg-white p-3 rounded border">
//                             <div className="flex-1">
//                               <div className="font-medium">{faq.question}</div>
//                               <div className="text-sm text-gray-600 mt-1">{faq.answer}</div>
//                               <div className="text-xs text-gray-500 mt-1">Category: {faq.category} | Priority: {faq.priority}</div>
//                             </div>
//                             <button type="button" onClick={() => removeFaq(index)} className="text-red-600 hover:text-red-800 ml-3">
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end gap-4 pt-6">
//                 <button 
//                   type="button" 
//                   onClick={resetForm}
//                   className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Reset Form
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 font-medium shadow-lg transition-all"
//                 >
//                   Submit Tour
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TourBookingForm;
import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';

const TourBookingForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    status: '',
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
    rules: '',
    explorationWays: '',
    thingsToCare: '',
    languages: '',
    tips: '',
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
    // Single Person Fields
    singlePersonName: '',
    singlePersonAge: '',
    singlePersonNationality: '',
    singlePersonEmail: '',
    singlePersonPreferences: '',
    singlePersonDietaryReq: '',
    // Group Fields
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
    // Arrays for multiple entries
    highlightsList: [],
    taglinesList: [],
    // New fields based on requirements
    themesList: [],
    selectedSellingPoints: [],
    thingsToBring: [],
    // Pricing fields
    discountPercentage: '',
    validUntil: '',
    // Additional fields
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
    currency: 'USD'
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

  // Options
  const categories = ['Tour', 'Transport', 'Hotel'];
  const statuses = ['Active', 'Inactive', 'Draft', 'Archived'];
  const tourTypes = ['Private', 'Group', 'Shared', 'Custom'];
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
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
    '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
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

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    return (price - (price * discount / 100)).toFixed(2);
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

  // File Handlers
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (field === 'mainImage') {
      setFormData(prev => ({ ...prev, mainImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [field]: files }));
    }
  };

  // Itinerary Handlers
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

  // FAQ Handlers
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

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Tour created successfully! Check console for data.');
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      status: '',
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
      rules: '',
      explorationWays: '',
      thingsToCare: '',
      languages: '',
      tips: '',
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
      singlePersonEmail: '',
      singlePersonPreferences: '',
      singlePersonDietaryReq: '',
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
      currency: 'USD'
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

  const SectionHeader = ({ title, section }) => (
    <div 
      className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all"
      onClick={() => toggleSection(section)}
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {expandedSections[section] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {!showForm ? (
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-2xl p-12 mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tour Management System
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
        ) : (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tour Booking Form
              </h1>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Back
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                          name="category" 
                          value={formData.category} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                          name="status" 
                          value={formData.status} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Status</option>
                          {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type</label>
                        <select 
                          name="tourType" 
                          value={formData.tourType} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Tour Type</option>
                          {tourTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Taglines */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Taglines</label>
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
                      {formData.taglinesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.taglinesList.map((tagline, index) => (
                            <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {tagline}
                              <button 
                                type="button" 
                                onClick={() => removeTagline(index)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Theme */}
                    <div className="space-y-3">
                      {/* <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={currentTheme} 
                          onChange={(e) => setCurrentTheme(e.target.value)}
                          placeholder="Enter a theme"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button 
                          type="button" 
                          onClick={addTheme}
                          className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                          <Plus size={16} /> Add
                        </button>
                      </div> */}
                      {formData.themesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.themesList.map((theme, index) => (
                            <div key={index} className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                              {theme}
                              <button 
                                type="button" 
                                onClick={() => removeTheme(index)}
                                className="text-purple-600 hover:text-purple-800"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Setting Points */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Setting Points</label>
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
                        <p className="text-sm text-gray-500">Select from the dropdown to add selling points</p>
                        
                        {formData.selectedSellingPoints.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.selectedSellingPoints.map((point, index) => (
                              <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {point}
                                <button 
                                  type="button" 
                                  onClick={() => removeSellingPoint(point)}
                                  className="text-blue-600 hover:text-blue-800 ml-1"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

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

              {/* Transport Details */}
              <div>
                <SectionHeader title="Transport Details" section="transport" />
                {expandedSections.transport && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transport Type</label>
                        <select 
                          name="transportType" 
                          value={formData.transportType} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Transport Type</option>
                          {transportTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transport Modal</label>
                        <select 
                          name="transportModal" 
                          value={formData.transportModal} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Year</option>
                          {transportModals.map(modal => <option key={modal} value={modal}>{modal}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Make & Variant</label>
                        <input 
                          type="text" 
                          name="makeVariant" 
                          value={formData.makeVariant} 
                          onChange={handleInputChange} 
                          placeholder="e.g., Toyota Hiace" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Images */}
              <div>
                <SectionHeader title="Images" section="images" />
                {expandedSections.images && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'mainImage')} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => handleFileChange(e, 'additionalImages')} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => handleFileChange(e, 'galleryImages')} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <SectionHeader title="Location" section="location" />
                {expandedSections.location && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select City</option>
                          {japanCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      {/* Hotel Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hotels</label>
                        <select
                          name="hotel"
                          value={formData.hotel}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Hotel</option>
                          {japanHotels.map((hotel) => (
                            <option key={hotel} value={hotel}>{hotel}</option>
                          ))}
                        </select>
                      </div>

                      {/* Pickup Location */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                        <input
                          type="text"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Best Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Best Time</label>
                        <input
                          type="text"
                          name="bestTime"
                          value={formData.bestTime}
                          onChange={handleInputChange}
                          placeholder="e.g., Morning, Evening"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Location Details */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location Details</label>
                        <textarea
                          name="locationDetails"
                          value={formData.locationDetails}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Type & Pricing */}
              <div>
                <SectionHeader title="Booking Type & Pricing" section="pricing" />
                {expandedSections.pricing && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    {/* Booking Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Booking Type</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="bookingType"
                            value="single"
                            checked={formData.bookingType === 'single'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-gray-700 font-medium">Single Person</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="bookingType"
                            value="group"
                            checked={formData.bookingType === 'group'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-gray-700 font-medium">Group</span>
                        </label>
                      </div>
                    </div>

                    {/* Single Person Booking Details */}
                    {formData.bookingType === 'single' && (
                      <div className="bg-blue-50 p-4 rounded-md space-y-4 border-2 border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800">Single Person Booking Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              name="singlePersonName"
                              value={formData.singlePersonName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input
                              type="number"
                              name="singlePersonAge"
                              value={formData.singlePersonAge}
                              onChange={handleInputChange}
                              min="1"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                            <input
                              type="text"
                              name="singlePersonNationality"
                              value={formData.singlePersonNationality}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              name="singlePersonEmail"
                              value={formData.singlePersonEmail}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div> */}

                          {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Requirements</label>
                            <input
                              type="text"
                              name="singlePersonDietaryReq"
                              value={formData.singlePersonDietaryReq}
                              onChange={handleInputChange}
                              placeholder="e.g., Vegetarian, Gluten-free"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div> */}
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
                            <input
                              type="text"
                              name="singlePersonPreferences"
                              value={formData.singlePersonPreferences}
                              onChange={handleInputChange}
                              placeholder="e.g., Window seat, Photography"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Group Booking Details */}
                    {formData.bookingType === 'group' && (
                      <div className="bg-green-50 p-4 rounded-md space-y-4 border-2 border-green-200">
                        <h3 className="text-lg font-semibold text-green-800">Group Booking Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                            <input
                              type="text"
                              name="groupName"
                              value={formData.groupName}
                              onChange={handleInputChange}
                              placeholder="e.g., ABC Company Team"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Group Leader Name</label>
                            <input
                              type="text"
                              name="groupLeaderName"
                              value={formData.groupLeaderName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                            <input
                              type="number"
                              name="groupSize"
                              value={formData.groupSize}
                              onChange={handleInputChange}
                              min="2"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Group Type</label>
                            <select
                              name="groupType"
                              value={formData.groupType}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                              <option value="">Select Type</option>
                              {groupTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                            <textarea
                              name="groupSpecialRequests"
                              value={formData.groupSpecialRequests}
                              onChange={handleInputChange}
                              rows="2"
                              placeholder="Any special requirements for the group"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Discount Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
                        <input 
                          type="number" 
                          name="discountPercentage" 
                          value={formData.discountPercentage} 
                          onChange={(e) => {
                            handleInputChange(e);
                            if (currentPricing.actualPrice) {
                              const netPrice = calculateNetPrice(currentPricing.actualPrice, e.target.value);
                              setCurrentPricing(prev => ({ ...prev, netPrice }));
                            }
                          }}
                          min="0" 
                          max="100" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                        <input 
                          type="date" 
                          name="validUntil" 
                          value={formData.validUntil} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                    </div>

                    {/* Pricing Schedule Section */}
                    <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Pricing Schedule</h3>

                      <div className="space-y-6">
                        {/* Days Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Select Days</label>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2 mb-3">
                              <input
                                type="checkbox"
                                checked={currentPricing.days.length === weekDays.length}
                                onChange={handleSelectAllDays}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium">Select All Days</span>
                            </label>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {weekDays.map((day) => (
                                <label key={day} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={currentPricing.days.includes(day)}
                                    onChange={() => handleDaySelection(day)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm">{day}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Time Slots Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Select Time Slots</label>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2 mb-3">
                              <input
                                type="checkbox"
                                checked={currentPricing.timeSlots.length === timeSlotsOptions.length}
                                onChange={handleSelectAllTimeSlots}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium">Select All Time Slots</span>
                            </label>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-2 border rounded-lg">
                              {timeSlotsOptions.map((timeSlot) => (
                                <label key={timeSlot} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={currentPricing.timeSlots.includes(timeSlot)}
                                    onChange={() => handleTimeSlotSelection(timeSlot)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm">{timeSlot}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Duration, Price, and Currency */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {/* Tour Duration */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tour Duration</label>
                            <select
                              value={currentPricing.duration}
                              onChange={(e) => setCurrentPricing(prev => ({ ...prev, duration: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select Duration</option>
                              {durationOptions.map(duration => (
                                <option key={duration} value={duration}>{duration}</option>
                              ))}
                            </select>
                          </div>

                          {/* Actual Price */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Actual Price</label>
                            <input
                              type="number"
                              value={currentPricing.actualPrice}
                              onChange={handleActualPriceChange}
                              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter price"
                            />
                          </div>

                          {/* Net Price
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Net Price</label>
                            <input
                              type="text"
                              value={currentPricing.netPrice}
                              readOnly
                              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-100 text-gray-700"
                              placeholder="Calculated automatically"
                            />
                          </div> */}

                          {/* Currency */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                            <select
                              value={currentPricing.currency}
                              onChange={(e) => setCurrentPricing(prev => ({ ...prev, currency: e.target.value }))}
                              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {currencyOptions.map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Add Schedule Button */}
                        <button
                          type="button"
                          onClick={addPricingSchedule}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all font-medium"
                        >
                          <Plus size={18} /> Add Schedule
                        </button>
                      </div>

                      {/* Saved Pricing Schedules */}
                      {formData.pricingSchedule.length > 0 && (
                        <div className="mt-6 space-y-3">
                          <h4 className="text-lg font-semibold text-gray-700">Saved Schedules</h4>
                          {formData.pricingSchedule.map((schedule, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border shadow-sm"
                            >
                              <div className="flex-1">
                                <div className="text-sm text-gray-700 space-y-1">
                                  <div>
                                    <span className="font-medium">Days:</span>{" "}
                                    {schedule.days.map((day, i) => (
                                      <span
                                        key={day}
                                        className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                                      >
                                        {day}
                                      </span>
                                    ))}
                                  </div>
                                  <div>
                                    <span className="font-medium">Time:</span>{" "}
                                    {schedule.timeSlots.map((time, i) => (
                                      <span
                                        key={time}
                                        className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                                      >
                                        {time}
                                      </span>
                                    ))}
                                  </div>
                                  <div>
                                    <span className="font-medium">Duration:</span> {schedule.duration} |{" "}
                                    <span className="font-medium">Price:</span> {schedule.currency} {schedule.actualPrice} |{" "}
                                    <span className="font-medium">Net:</span> {schedule.currency} {schedule.netPrice}
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removePricingSchedule(index)}
                                className="text-red-600 hover:text-red-800 transition ml-4"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Inclusion/Exclusion */}
              <div>
                <SectionHeader title="Inclusion/Exclusion" section="inclusion" />
                {expandedSections.inclusion && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Includes</label>
                      <textarea 
                        name="includes" 
                        value={formData.includes} 
                        onChange={handleInputChange} 
                        rows="3" 
                        placeholder="What's included in the tour" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Excludes</label>
                      <textarea 
                        name="excludes" 
                        value={formData.excludes} 
                        onChange={handleInputChange} 
                        rows="3" 
                        placeholder="What's not included" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rules</label>
                      <textarea 
                        name="rules" 
                        value={formData.rules} 
                        onChange={handleInputChange} 
                        rows="3" 
                        placeholder="Tour rules and regulations" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div>
                <SectionHeader title="Additional Information" section="additional" />
                {expandedSections.additional && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    {/* Things to Bring */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Things to Bring</label>
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
                        <p className="text-sm text-gray-500">Select from the dropdown to add items</p>
                        
                        {formData.thingsToBring.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.thingsToBring.map((item, index) => (
                              <div key={index} className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                {item}
                                <button 
                                  type="button" 
                                  onClick={() => removeThingToBring(item)}
                                  className="text-green-600 hover:text-green-800 ml-1"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Exploration Ways</label>
                      <textarea 
                        name="explorationWays" 
                        value={formData.explorationWays} 
                        onChange={handleInputChange} 
                        rows="2" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Things to Care</label>
                      <textarea 
                        name="thingsToCare" 
                        value={formData.thingsToCare} 
                        onChange={handleInputChange} 
                        rows="2" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                      <input 
                        type="text" 
                        name="languages" 
                        value={formData.languages} 
                        onChange={handleInputChange} 
                        placeholder="e.g., English, Urdu, Arabic" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tips</label>
                      <textarea 
                        name="tips" 
                        value={formData.tips} 
                        onChange={handleInputChange} 
                        rows="2" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nearby Attractions</label>
                      <textarea 
                        name="nearbyAttractions" 
                        value={formData.nearbyAttractions} 
                        onChange={handleInputChange} 
                        rows="2" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cancellation & Reservation */}
              <div>
                <SectionHeader title="Cancellation & Reservation" section="cancellation" />
                {expandedSections.cancellation && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="freeCancellation" 
                        checked={formData.freeCancellation} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 text-blue-600" 
                      />
                      <label className="text-sm font-medium text-gray-700">Free Cancellation</label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Hours</label>
                        <input 
                          type="number" 
                          name="deadlineHours" 
                          value={formData.deadlineHours} 
                          onChange={handleInputChange} 
                          placeholder="Hours before start" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Note</label>
                        <input 
                          type="text" 
                          name="cancellationNote" 
                          value={formData.cancellationNote} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="reserveNowPayLater" 
                        checked={formData.reserveNowPayLater} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 text-blue-600" 
                      />
                      <label className="text-sm font-medium text-gray-700">Reserve Now Pay Later</label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reservation Note</label>
                      <textarea 
                        name="reserveNote" 
                        value={formData.reserveNote} 
                        onChange={handleInputChange} 
                        rows="2" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Accessibility */}
              <div>
                <SectionHeader title="Accessibility" section="accessibility" />
                {expandedSections.accessibility && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="wheelchairAccessible" 
                        checked={formData.wheelchairAccessible} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 text-blue-600" 
                      />
                      <label className="text-sm font-medium text-gray-700">Wheelchair Accessible</label>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="infantSeats" 
                        checked={formData.infantSeats} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 text-blue-600" 
                      />
                      <label className="text-sm font-medium text-gray-700">Infant Seats Available</label>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="strollerAccessible" 
                        checked={formData.strollerAccessible} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 text-blue-600" 
                      />
                      <label className="text-sm font-medium text-gray-700">Stroller Accessible</label>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="serviceAnimals" 
                        checked={formData.serviceAnimals} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 text-blue-600" 
                      />
                      <label className="text-sm font-medium text-gray-700">Service Animals Allowed</label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Notes</label>
                      <textarea 
                        name="accessibilityNotes" 
                        value={formData.accessibilityNotes} 
                        onChange={handleInputChange} 
                        rows="3" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Itinerary */}
              <div>
                <SectionHeader title="Itinerary" section="itinerary" />
                {expandedSections.itinerary && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="bg-white p-4 rounded-md border-2 border-purple-200 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                          <input 
                            type="time" 
                            value={currentItinerary.time} 
                            onChange={(e) => setCurrentItinerary({...currentItinerary, time: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                          <input 
                            type="text" 
                            value={currentItinerary.activity} 
                            onChange={(e) => setCurrentItinerary({...currentItinerary, activity: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={currentItinerary.description} 
                            onChange={(e) => setCurrentItinerary({...currentItinerary, description: e.target.value})} 
                            rows="2" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                          <input 
                            type="text" 
                            value={currentItinerary.duration} 
                            onChange={(e) => setCurrentItinerary({...currentItinerary, duration: e.target.value})} 
                            placeholder="e.g., 2 hours" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Cost</label>
                          <input 
                            type="number" 
                            value={currentItinerary.additionalCost} 
                            onChange={(e) => setCurrentItinerary({...currentItinerary, additionalCost: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                        </div>
                        
                        {/* Image Field for Itinerary */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Image</label>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleItineraryImageChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                          {currentItinerary.image && (
                            <p className="text-sm text-green-600 mt-1">
                              Selected: {currentItinerary.image.name}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={currentItinerary.included} 
                            onChange={(e) => setCurrentItinerary({...currentItinerary, included: e.target.checked})} 
                            className="w-4 h-4 text-blue-600" 
                          />
                          <label className="text-sm font-medium text-gray-700">Included in Package</label>
                        </div>
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={addItinerary} 
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Plus size={16} /> Add Itinerary Item
                      </button>
                    </div>

                    {formData.itineraryItems.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.itineraryItems.map((item, index) => (
                          <div key={index} className="flex items-start justify-between bg-white p-3 rounded border">
                            <div className="flex-1">
                              <div className="font-medium">{item.time} - {item.activity}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                              <div className="text-sm text-gray-500">
                                Duration: {item.duration} | {item.included ? 'Included' : `Additional: ${item.additionalCost}`}
                                {item.image && (
                                  <span className="ml-2 text-blue-600">• Image: {item.image.name}</span>
                                )}
                              </div>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeItinerary(index)} 
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* FAQs */}
              <div>
                <SectionHeader title="Frequently Asked Questions" section="faqs" />
                {expandedSections.faqs && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="bg-white p-4 rounded-md border-2 border-pink-200 space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                          <input 
                            type="text" 
                            value={currentFaq.question} 
                            onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                          <textarea 
                            value={currentFaq.answer} 
                            onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})} 
                            rows="3" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                          />
                        </div>
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={addFaq} 
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Plus size={16} /> Add FAQ
                      </button>
                    </div>

                    {formData.faqs.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.faqs.map((faq, index) => (
                          <div key={index} className="flex items-start justify-between bg-white p-3 rounded border">
                            <div className="flex-1">
                              <div className="font-medium">{faq.question}</div>
                              <div className="text-sm text-gray-600 mt-1">{faq.answer}</div>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeFaq(index)} 
                              className="text-red-600 hover:text-red-800 ml-3"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

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
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 font-medium shadow-lg transition-all"
                >
                  Submit Tour
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourBookingForm;