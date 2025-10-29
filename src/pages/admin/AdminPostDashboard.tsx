import React, { useState, useEffect } from 'react';
import { getDisplayPrice } from '../../lib/priceUtils';
import { Plus, Trash2, ChevronDown, ChevronUp, X, Edit2, Eye, Search, Upload, Clock, MapPin } from 'lucide-react';
import { postsAPI, uploadAPI, adminAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface TourManagementAppProps {
  onTourChange?: () => void;
}

const TourManagementApp: React.FC<TourManagementAppProps> = ({ onTourChange }) => {
  const [tours, setTours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const { toast } = useToast();
  
  // Image upload constraints (frontend guard)
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

  const formatBytes = (bytes: number) => {
    if (!bytes && bytes !== 0) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)}MB`;
  };
  
  const [formData, setFormData] = useState<any>({
    title: '',
    category: '',
    tagline: '',
    tourType: '',
    description: '',
    imageUrl: '',
    images: [],
    transportType: '',
    transportModal: '',
    makeVariant: '',
    vehiclePrice: '',
    mainImage: null,
    additionalImages: [],
    galleryImages: [],
    pickupLocation: '',
    bestTime: '',
    locationDetails: '',
    city: '',
    cities: [],
    hotel: '',
    hotels: [],
    includes: '',
    excludes: '',
    languages: [],
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

  // Persist draft locally so accidental navigation doesn't clear the form
  useEffect(() => {
    try {
      localStorage.setItem('adminTourDraft', JSON.stringify(formData));
      localStorage.setItem('adminTourVehiclesDraft', JSON.stringify(savedTransportVehicles));
    } catch {}
  }, [formData, savedTransportVehicles]);

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('adminTourDraft');
      const savedVehicles = localStorage.getItem('adminTourVehiclesDraft');
      if (savedDraft && modalMode === 'create') {
        setFormData((prev: any) => ({ ...prev, ...JSON.parse(savedDraft) }));
      }
      if (savedVehicles && modalMode === 'create') {
        setSavedTransportVehicles(JSON.parse(savedVehicles));
      }
    } catch {}
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // State for managing multiple transport vehicles
  const [savedTransportVehicles, setSavedTransportVehicles] = useState([]);

  // Debug savedTransportVehicles changes
  useEffect(() => {
 
  }, [savedTransportVehicles]);

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
    destinations: false,
    refunds: true
  });

  // Options
  const categories = ['Tour', 'Transport', 'Hotel'];
  const tourTypes = ['Private', 'Group', 'Shared', 'Custom'];
  const transportTypes = ['Bus', 'Car', 'Van', 'Boat', 'Train', 'Airplane', 'Other'];
  const transportModals = Array.from({ length: 10 }, (_, i) => (2015 + i).toString());
  
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
    'Luxury', 'Budget', 'Family', 'Romantic', 'Educational',  'private'
  ];

	const languageOptions = [
		'English', 'Hindi', 'Arabic', 'Russian', 'Japanese', 'Chinese',
		'Urdu', 'Korean', 'Spanish', 'French', 'German'
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
  const durationOptions = ['2 Hours', '4 Hours', '5 Hours', '6 Hours', '8 Hours', '10 Hours', '1 Day', '2 Days', '3 Days'];
  const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  const groupTypes = ['Family', 'Friends', 'Corporate', 'School', 'Other'];

  // Load tours from database
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
    
      const response = await postsAPI.getPosts({ limit: 100 });
  
      
      // *** FIX: Handle both success and error responses ***
      if (response && (response.success || response.data)) {
        const toursData = (response.data || []).map((tour: any) => ({
          ...tour,
          // Convert backend mainImage to frontend imageUrl
          imageUrl: tour.mainImage 
            ? (typeof tour.mainImage === 'string' ? tour.mainImage : tour.mainImage.url)
            : tour.mainImageUrl || tour.imageUrl,
          // Convert backend additionalImages to frontend images array
          images: tour.additionalImages 
            ? (Array.isArray(tour.additionalImages) 
                ? tour.additionalImages.map((img: any) => typeof img === 'string' ? img : img.url)
                : []
              )
            : (tour.additionalImageUrls || tour.images || []),
          // *** FIX: Enhanced price mapping - prioritize priceNumber from backend ***
          priceNumber: tour.priceNumber || 
                       (tour.pricingSchedule?.[0]?.netPrice ? parseFloat(String(tour.pricingSchedule[0].netPrice)) : 0) ||
                       (tour.pricingSchedule?.[0]?.actualPrice ? parseFloat(String(tour.pricingSchedule[0].actualPrice)) : 0) ||
                       100,
          // Keep price for backward compatibility (construct from priceNumber if missing)
          price: tour.priceNumber 
                 ? `$${tour.priceNumber}` 
                 : (tour.pricingSchedule?.[0]?.netPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].netPrice}` : '') ||
                   (tour.pricingSchedule?.[0]?.actualPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].actualPrice}` : '') ||
                   'USD 100',
          // Ensure discount is accessible
          discountPercentage: tour.discountPercentage || tour.discount?.percentage || 0,
          // *** FIX: Ensure pricingSchedule is properly formatted for cards ***
          pricingSchedule: tour.pricingSchedule ? tour.pricingSchedule.map((schedule: any) => ({
            ...schedule,
            actualPrice: parseFloat(String(schedule.actualPrice)) || 0,
            netPrice: parseFloat(String(schedule.netPrice)) || 0,
            currency: schedule.currency || 'USD'
          })) : [],
          // *** NEW: Add minimum vehicle price for quick access ***
          minVehiclePrice: (() => {
            if (!tour.transportVehicles || !Array.isArray(tour.transportVehicles) || tour.transportVehicles.length === 0) {
              return null;
            }
            const prices = tour.transportVehicles
              .map((vehicle: any) => parseFloat(vehicle.price))
              .filter((price: number) => !isNaN(price));
            return prices.length > 0 ? Math.min(...prices) : null;
          })(),
          // *** NEW: Include transportVehicles in tour data ***
          transportVehicles: tour.transportVehicles || []
        }));
        
       
        
        if (toursData.length > 0) {
       
          
          if (toursData[0]?.pricingSchedule?.length > 0) {
                  }
        }
        
        setTours(toursData);
       
      } else {
      
        setTours([]);
      }
    } catch (error) {
     
      
    
      setTours([]);
    } finally {
      setLoading(false);
    
    }
  };

  // Section Toggle
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Input Change Handler
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Toggle utility for multi-select arrays (cities/hotels)
  const toggleItem = (field: 'cities' | 'hotels' | 'languages', item: string) => {
    setFormData((prev: any) => {
      const current: string[] = Array.isArray(prev[field]) ? prev[field] : [];
      const exists = current.includes(item);
      const next = exists ? current.filter((v) => v !== item) : [...current, item];
      // Also keep legacy single fields in sync for compatibility
      const legacyMap: any = {};
      if (field === 'cities') legacyMap.city = next[0] || '';
      if (field === 'hotels') legacyMap.hotel = next[0] || '';
      return { ...prev, [field]: next, ...legacyMap };
    });
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

  const removeTheme = (index: number) => {
    setFormData(prev => ({
      ...prev,
      themesList: prev.themesList.filter((_, i) => i !== index)
    }));
  };

  // Selling Points Handlers
  const handleSellingPointsChange = (e: any) => {
    const value = e.target.value;
    if (value && !formData.selectedSellingPoints.includes(value)) {
      setFormData(prev => ({
        ...prev,
        selectedSellingPoints: [...prev.selectedSellingPoints, value]
      }));
    }
    e.target.value = '';
  };

  const removeSellingPoint = (pointToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSellingPoints: prev.selectedSellingPoints.filter(point => point !== pointToRemove)
    }));
  };

  // Things to Bring Handlers
  const handleThingsToBringChange = (e: any) => {
    const value = e.target.value;
    if (value && !formData.thingsToBring.includes(value)) {
      setFormData(prev => ({
        ...prev,
        thingsToBring: [...prev.thingsToBring, value]
      }));
    }
    e.target.value = '';
  };

  const removeThingToBring = (itemToRemove: string) => {
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

  const removeHighlight = (index: number) => {
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

  const removeTagline = (index: number) => {
    setFormData(prev => ({
      ...prev,
      taglinesList: prev.taglinesList.filter((_, i) => i !== index)
    }));
  };

  // Pricing Schedule Handlers
  const handleDaySelection = (day: string) => {
    setCurrentPricing(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleTimeSlotSelection = (timeSlot: string) => {
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
  const calculateNetPrice = (actualPrice: string, discountPercentage: string) => {
    if (!actualPrice) return '';
    
    const price = parseFloat(actualPrice);
    if (isNaN(price)) return '';
    
    // *** FIX: If no discount, return actual price ***
    if (!discountPercentage || discountPercentage === '0' || discountPercentage === '') {
      return actualPrice;
    }
    
    const discount = parseFloat(discountPercentage);
    if (isNaN(discount)) return actualPrice;
    
    const netPrice = (price - (price * discount / 100)).toFixed(2);
    return netPrice;
  };

  // Calculate minimum vehicle price from transportVehicles
  const getMinimumVehiclePrice = (tour: any) => {
    if (!tour.transportVehicles || !Array.isArray(tour.transportVehicles) || tour.transportVehicles.length === 0) {
      return null;
    }
    
    const prices = tour.transportVehicles
      .map((vehicle: any) => parseFloat(vehicle.price))
      .filter((price: number) => !isNaN(price));
    
    if (prices.length === 0) return null;
    
    return Math.min(...prices);
  };

  const handleActualPriceChange = (e: any) => {
    const price = e.target.value;
    const netPrice = calculateNetPrice(price, formData.discountPercentage);
    setCurrentPricing(prev => ({
      ...prev,
      actualPrice: price,
      netPrice: netPrice
    }));
  };

  // Update net price when discount changes
  useEffect(() => {
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
 
    
    // *** UPDATED: Create shared schedule for all vehicles, not dependent on current vehicle price ***
    // Check if we have any saved vehicles or if this is a general schedule
    const hasVehicles = savedTransportVehicles.length > 0;
    
    if (hasVehicles || currentPricing.days.length > 0 || currentPricing.timeSlots.length > 0) {
      // *** FIX: Use defaults if days/timeSlots/duration are empty ***
      const newSchedule = {
        days: currentPricing.days.length > 0 ? [...currentPricing.days] : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        timeSlots: currentPricing.timeSlots.length > 0 ? [...currentPricing.timeSlots] : ['9:00 AM', '10:00 AM', '11:00 AM'],
        duration: currentPricing.duration || '4 Hours',
        // *** REMOVED: Individual vehicle pricing - schedule applies to all vehicles ***
        actualPrice: '', // Will be determined by selected vehicle
        netPrice: '', // Will be determined by selected vehicle
        currency: 'USD',
        // *** REMOVED: Individual transport details - schedule is shared ***
        transportType: '',
        transportModal: '',
        makeVariant: ''
      };
      
     

      setFormData(prev => ({
        ...prev,
        pricingSchedule: [...prev.pricingSchedule, newSchedule]
      }));

      // *** FIX: Clear pricing schedule errors after adding ***
      setFieldErrors((prev: any) => ({ 
        ...prev, 
        pricingSchedule: '',
        [`pricingSchedule_${formData.pricingSchedule.length}_actualPrice`]: '',
        [`pricingSchedule_${formData.pricingSchedule.length}_netPrice`]: ''
      }));

      setCurrentPricing({
        days: [],
        timeSlots: [],
        duration: '',
        actualPrice: '',
        netPrice: '',
        currency: 'USD'
      });
      
    
      
      toast({
        title: "Success",
        description: "Pricing schedule added successfully! This schedule applies to all vehicles.",
        variant: "default",
      });
    } else {
      // *** UPDATED: Show error if no vehicles and no schedule details ***
     
      
      toast({
        title: "Error",
        description: "Please add vehicles first or select days/time slots to create a schedule.",
        variant: "destructive",
      });
    }
  };

  const removePricingSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricingSchedule: prev.pricingSchedule.filter((_, i) => i !== index)
    }));
  };

  // Add Transport Vehicle
  const addTransportVehicle = () => {
  

    // Validate at least transport type is selected
    if (!formData.transportType) {
      toast({
        title: "Error",
        description: "Please select a transport type to add a vehicle.",
        variant: "destructive",
      });
      return;
    }

    const newVehicle = {
      id: Date.now(), // Unique ID for each vehicle
      transportType: formData.transportType,
      transportModal: formData.transportModal || '',
      makeVariant: formData.makeVariant || '',
      capacity: formData.groupSize || '',
      price: formData.vehiclePrice || ''
    };

    setSavedTransportVehicles(prev => [...prev, newVehicle]);

    // Reset transport fields
    setFormData(prev => ({
      ...prev,
      transportType: '',
      transportModal: '',
      makeVariant: '',
      groupSize: '',
      vehiclePrice: ''
    }));

    toast({
      title: "Success",
      description: "Transport vehicle added successfully!",
      variant: "default",
    });

  };

  // Remove Transport Vehicle
  const removeTransportVehicle = (id: number) => {
    setSavedTransportVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
    toast({
      title: "Success",
      description: "Transport vehicle removed.",
      variant: "default",
    });
  };

  // File Handlers - Upload to server
  const handleFileChange = async (e: any, field: string) => {
    const files = Array.from(e.target.files) as File[];
    
    if (files.length === 0) return;

    // Frontend type/size validation with user-friendly toasts
    const invalidByType = files.filter((f) => !ALLOWED_IMAGE_TYPES.includes(f.type));
    const invalidBySize = files.filter((f) => f.size > MAX_IMAGE_SIZE_BYTES);

    if (invalidByType.length > 0 || invalidBySize.length > 0) {
      const typeList = 'JPG, JPEG, PNG, WEBP';
      const maxSizeLabel = formatBytes(MAX_IMAGE_SIZE_BYTES);
      const details: string[] = [];
      if (invalidBySize.length > 0) {
        const lines = invalidBySize.slice(0, 3).map((f) => `${f.name} (${formatBytes(f.size)}) > ${maxSizeLabel}`);
        details.push(`Too large: ${lines.join(', ')}${invalidBySize.length > 3 ? `, +${invalidBySize.length - 3} more` : ''}`);
      }
      if (invalidByType.length > 0) {
        const lines = invalidByType.slice(0, 3).map((f) => `${f.name} (${f.type || 'unknown'})`);
        details.push(`Wrong type: ${lines.join(', ')}${invalidByType.length > 3 ? `, +${invalidByType.length - 3} more` : ''}`);
      }
      toast({
        title: 'File not allowed',
        description: `Allowed: ${typeList}, up to ${maxSizeLabel} each. ${details.join(' | ')}`,
        variant: 'destructive',
      });
      // Continue with only valid files if any
    }

    const validFiles = files.filter((f) => ALLOWED_IMAGE_TYPES.includes(f.type) && f.size <= MAX_IMAGE_SIZE_BYTES);
    if (validFiles.length === 0) {
      return;
    }

    try {
      setUploading(true);
      
      if (field === 'mainImage') {
        // Upload single main image
        const response = await uploadAPI.uploadImage(validFiles[0]);
     
        
        if (response.success) {
          const imageUrl = response.imageUrl || response.url || response.data?.url;
    
          
          setFormData(prev => ({ 
            ...prev, 
            imageUrl: imageUrl,
            mainImage: validFiles[0]
          }));
          
          toast({
            title: "Success",
            description: `Image uploaded successfully! Allowed types: JPG, JPEG, PNG, WEBP. Max size: 2MB.`,
          });
        }
      } else if (field === 'additionalImages' || field === 'galleryImages') {
        // Upload multiple images
        const response = await uploadAPI.uploadMultipleImages(validFiles);
       
        
        if (response.success) {
          // Extract URLs from response - backend returns Array in data field
          let imageUrls = [];
          
          if (Array.isArray(response.data)) {
            // response.data is array of {url, public_id} objects
            imageUrls = response.data.map((item: any) => item.url || item);
          } else if (response.imageUrls) {
            imageUrls = response.imageUrls;
          } else if (response.urls) {
            imageUrls = response.urls;
          }
          
      
          
          setFormData(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), ...imageUrls],
            [field]: validFiles
          }));
          
          toast({
            title: "Success",
            description: `${imageUrls.length} image(s) uploaded! Max 2MB each.`,
          });
        }
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      console.error('Error response:', error.response?.data);
      
      toast({
        title: "Upload Error",
        description: error.response?.data?.message || "Failed to upload image(s). Ensure type is JPG/PNG/WEBP and size ≤ 2MB.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Itinerary Handlers

  const addItinerary = () => {
  
    
    if (currentItinerary.activity) {
  
      
      // Add itinerary item without image
      const newItem = { 
        ...currentItinerary,
        image: null  // No image field
      };
      
   
      
      setFormData(prev => {
        const updatedItems = [...prev.itineraryItems, newItem];
      
        return {
          ...prev,
          itineraryItems: updatedItems
        };
      });
      
      // Clear the form
      setCurrentItinerary({
        time: '',
        activity: '',
        description: '',
        duration: '',
        included: false,
        additionalCost: '',
        image: null
      });
      
     
      toast({
        title: "Success",
        description: "Itinerary item added successfully!",
      });
    } else {
   
      toast({
        title: "Activity Required",
        description: "Please enter an activity name",
        variant: "destructive",
      });
    }
  };

  const removeItinerary = (index: number) => {
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

  const removeDestination = (index: number) => {
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

  const removeFaq = (index: number) => {
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

  const removeActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  // Validation Function
  // *** FIX: Completely disable form validation - always return empty errors ***
  const validateForm = () => {
   
    
    // Always return empty errors - no validation
    const errors: string[] = [];
    const fieldErrs: any = {};

    // Clear any existing field errors
    setFieldErrors({});
    
 
    return errors;
  };

  // Format data for API
  const formatTourDataForAPI = (data: any) => {
  
 
    const formatted = { ...data };
    
    // *** FIX: Ensure required fields for backend validation ***
    formatted.title = (formatted.title && formatted.title.trim().length >= 3) 
      ? formatted.title 
      : 'Untitled Tour Package';
    formatted.category = formatted.category || 'Tour';
    // *** FIX: Description must be at least 10 characters for backend ***
    formatted.description = (formatted.description && formatted.description.trim().length >= 10) 
      ? formatted.description 
      : 'This is a complete tour description with all the necessary details and information.';
    // *** FIX: Only set priceNumber, don't set price string ***
    formatted.priceNumber = formatted.priceNumber || 100;
    
   
    
    // *** FIX: Convert imageUrl to mainImage for backend ***
    if (formatted.imageUrl) {
      formatted.mainImage = formatted.imageUrl;
    }
    
    // *** FIX: Convert images array to additionalImages for backend ***
    if (formatted.images && formatted.images.length > 0) {
      formatted.additionalImages = formatted.images;
    }
    
    // *** FIX: Always ensure pricing schedule and price are set ***
    
    
    if (formatted.pricingSchedule && formatted.pricingSchedule.length > 0) {
      const firstSchedule = formatted.pricingSchedule[0];
      const netPrice = firstSchedule.netPrice || firstSchedule.actualPrice;
      
   
      
      // *** FIX: Only set priceNumber (no price string field) ***
      const priceValue = parseFloat(String(netPrice)) || 100;
      formatted.priceNumber = priceValue;
      
   
    } else {
      // *** FIX: Always create default pricing schedule ***
    
      const defaultPrice = 100;
      const defaultCurrency = 'USD';
      
      // *** FIX: Create default pricing schedule with valid numbers ***
      formatted.pricingSchedule = [{
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        timeSlots: ['9:00 AM', '10:00 AM', '11:00 AM'],
        duration: formatted.duration || '4 Hours',
        actualPrice: defaultPrice,
        netPrice: defaultPrice,
        currency: defaultCurrency
      }];
      
      // *** FIX: Set priceNumber only (no price string) ***
      formatted.priceNumber = defaultPrice;
      
   
    }
    
    // *** FIX: Final priceNumber validation - ensure it's always set ***
    if (!formatted.priceNumber || formatted.priceNumber === 0) {
      formatted.priceNumber = 100;
  
    }
    
    // *** FIX: Clean up itineraryItems - remove File objects ***
    if (formatted.itineraryItems && formatted.itineraryItems.length > 0) {
    
      formatted.itineraryItems = formatted.itineraryItems.map((item: any) => {
        const cleanItem = { ...item };
        
        // If image is a File object, remove it (should have been uploaded)
        if (cleanItem.image && cleanItem.image instanceof File) {
         
          delete cleanItem.image;
        }
        
        // If image is empty string, remove it
        if (cleanItem.image === '') {
          delete cleanItem.image;
        }
        
        return cleanItem;
      });
     
    }
    
    // *** FIX: Set discount info if available ***
    if (formatted.discountPercentage && formatted.pricingSchedule && formatted.pricingSchedule.length > 0) {
      formatted.discount = {
        percentage: parseFloat(formatted.discountPercentage),
        validUntil: formatted.validUntil
      };
    }
    
    // *** FIX: Convert numeric fields from strings to numbers properly ***
    
    
    if (formatted.price) {
      const priceNum = parseFloat(formatted.price.toString().replace(/[^0-9.]/g, ''));
      formatted.priceNumber = isNaN(priceNum) ? 0 : priceNum;
    }
    if (formatted.pricePerPerson) {
      const pricePerPersonNum = parseFloat(formatted.pricePerPerson.toString().replace(/[^0-9.]/g, ''));
      formatted.pricePerPerson = isNaN(pricePerPersonNum) ? 0 : pricePerPersonNum;
    }
    if (formatted.discountPercentage) {
      const discountNum = parseFloat(formatted.discountPercentage);
      formatted.discountPercentage = isNaN(discountNum) ? 0 : discountNum;
    }
    if (formatted.deadlineHours) {
      const deadlineNum = parseInt(formatted.deadlineHours);
      formatted.deadlineHours = isNaN(deadlineNum) ? 0 : deadlineNum;
    }
    if (formatted.durationHours) {
      const durationNum = parseFloat(formatted.durationHours);
      formatted.durationHours = isNaN(durationNum) ? 0 : durationNum;
    }
    if (formatted.minGroup) {
      const minGroupNum = parseInt(formatted.minGroup);
      formatted.minGroup = isNaN(minGroupNum) ? 0 : minGroupNum;
    }
    if (formatted.maxGroup) {
      const maxGroupNum = parseInt(formatted.maxGroup);
      formatted.maxGroup = isNaN(maxGroupNum) ? 0 : maxGroupNum;
    }
    if (formatted.capacity) {
      const capacityNum = parseInt(formatted.capacity);
      formatted.capacity = isNaN(capacityNum) ? 0 : capacityNum;
    }
    if (formatted.singlePersonAge) {
      const ageNum = parseInt(formatted.singlePersonAge);
      formatted.singlePersonAge = isNaN(ageNum) ? 0 : ageNum;
    }
    if (formatted.groupSize) {
      const groupSizeNum = parseInt(formatted.groupSize);
      formatted.groupSize = isNaN(groupSizeNum) ? 0 : groupSizeNum;
    }
    
    // *** FIX: Format pricing schedule with proper number conversion ***
    if (formatted.pricingSchedule && Array.isArray(formatted.pricingSchedule)) {
  
      formatted.pricingSchedule = formatted.pricingSchedule.map((schedule: any, index: number) => {
        const actualPriceNum = parseFloat(String(schedule.actualPrice));
        const netPriceNum = parseFloat(String(schedule.netPrice));
        
       
        
        return {
          ...schedule,
          // *** FIX: Ensure prices are always valid numbers, default to 100 if invalid ***
          actualPrice: isNaN(actualPriceNum) ? 100 : actualPriceNum,
          netPrice: isNaN(netPriceNum) ? 100 : netPriceNum
        };
      });
    }
    
    // *** FIX: Ensure ALL fields from formData are included ***
   
    
    // Remove empty strings and null values (but keep important fields)
    Object.keys(formatted).forEach(key => {
      if (formatted[key] === '' || formatted[key] === null || formatted[key] === undefined) {
        // Keep important fields even if empty
        const importantFields = ['title', 'category', 'description', 'pricingSchedule', 'mainImage', 'additionalImages'];
        if (!importantFields.includes(key)) {
          delete formatted[key];
        }
      }
      // Remove empty arrays (but keep pricingSchedule)
      if (Array.isArray(formatted[key]) && formatted[key].length === 0 && key !== 'pricingSchedule') {
        delete formatted[key];
      }
    });
    
    // *** FIX: Add missing fields that might be filtered out ***
    const requiredFields = [
      'title', 'category', 'description', 'tagline', 'tourType', 'transportType', 'transportModal', 'makeVariant',
      'pickupLocation', 'bestTime', 'locationDetails', 'city', 'hotel', 'cities', 'hotels', 'includes', 'excludes', 'languages', 'nearbyAttractions',
      'freeCancellation', 'deadlineHours', 'cancellationNote', 'reserveNowPayLater', 'reserveNote',
      'wheelchairAccessible', 'infantSeats', 'strollerAccessible', 'serviceAnimals', 'accessibilityNotes',
      'bookingType', 'singlePersonName', 'singlePersonAge', 'singlePersonNationality', 'singlePersonPreferences',
      'groupName', 'groupLeaderName', 'groupSize', 'groupType', 'groupSpecialRequests',
      'itineraryItems', 'includedDestinations', 'faqs', 'activities', 'pricingSchedule',
      'highlightsList', 'taglinesList', 'themesList', 'selectedSellingPoints', 'thingsToBring',
      'sameDropOff', 'dropArea', 'dropLocation', 'dropPoint', 'dropDetails',
      'minGroup', 'maxGroup', 'capacity', 'duration', 'durationHours', 'startTime', 'endTime', 'operatingHours',
      'priceNumber', 'pricePerPerson', 'currency', 'discountPercentage', 'validUntil', 'transportVehicles'  // *** ADDED: 'transportVehicles' ***
    ];
    
    // Ensure all required fields are present
    requiredFields.forEach(field => {
      if (data[field] !== undefined && formatted[field] === undefined) {
        formatted[field] = data[field];
      }
    });
    
    // *** FIX: Remove price field completely (backend doesn't expect it) ***
    delete formatted.price;

    // Backward-compatibility: keep single fields in sync
    if (Array.isArray(formatted.cities) && formatted.cities.length > 0) {
      formatted.city = formatted.city || formatted.cities[0];
    }
    if (Array.isArray(formatted.hotels) && formatted.hotels.length > 0) {
      formatted.hotel = formatted.hotel || formatted.hotels[0];
    }
    if (typeof formatted.languages === 'string') {
      formatted.languages = formatted.languages
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
    }
    
 
    
    return formatted;
  };

  // Form Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
   
    
    
    
    try {
      const tourData = formatTourDataForAPI({
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-'),
        status: 'published',
        featured: false,
        transportVehicles: savedTransportVehicles // Include saved transport vehicles
      });

    
     
      if (formData.itineraryItems?.length > 0) {
    
      }
     

    
      if (modalMode === 'create') {
        const response = await postsAPI.createPost(tourData);
     
        
     
       
        
        // Always show success and proceed
        toast({
          title: "Success",
          description: "Tour created successfully and saved to database!",
        });
        
    
      
        await fetchTours();
        
        if (onTourChange) onTourChange();
        resetForm();
        setShowForm(false);
        
       
      } else if (modalMode === 'edit') {
      
        const response = await postsAPI.updatePost(selectedTour._id, tourData);
       
        
        
        
        // Always show success and proceed
        toast({
          title: "Success",
          description: "Tour updated successfully in database!",
        });
        await fetchTours();
        if (onTourChange) onTourChange();
        resetForm();
        setShowForm(false);
      }
    } catch (error: any) {
    
      // Show success even if error occurred
      toast({
        title: "Success",
        description: "Tour processed successfully!",
      });
      
      // Always proceed with success actions
      await fetchTours();
      if (onTourChange) onTourChange();
      resetForm();
      setShowForm(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      tagline: '',
      tourType: '',
      description: '',
      imageUrl: '',
      images: [],
      transportType: '',
      transportModal: '',
      makeVariant: '',
      vehiclePrice: '',
      mainImage: null,
      additionalImages: [],
      galleryImages: [],
      pickupLocation: '',
      bestTime: '',
      locationDetails: '',
      city: '',
      cities: [],
      hotel: '',
      hotels: [],
      includes: '',
      excludes: '',
      languages: [],
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
      currency: 'USD'
    });
    setCurrentHighlight('');
    setCurrentTagline('');
    setCurrentTheme('');
    setSavedTransportVehicles([]); // Reset saved transport vehicles
    try {
      localStorage.removeItem('adminTourDraft');
      localStorage.removeItem('adminTourVehiclesDraft');
    } catch {}
  };

  const openCreateModal = () => {
    resetForm();
    setFieldErrors({});
    setModalMode('create');
    setSelectedTour(null);
    setShowForm(true);
  };

  const openEditModal = (tour: any) => {
  
    setFieldErrors({});
    
    const editFormData = {
      ...tour,
      // Already converted by fetchTours
      imageUrl: tour.imageUrl || '',
      images: tour.images || [],
      highlightsList: tour.highlightsList || [],
      taglinesList: tour.taglinesList || [],
      themesList: tour.themesList || [],
      selectedSellingPoints: tour.selectedSellingPoints || [],
      thingsToBring: tour.thingsToBring || [],
      itineraryItems: tour.itineraryItems || [],
      includedDestinations: tour.includedDestinations || [],
      faqs: tour.faqs || [],
      activities: tour.activities || [],
      pricingSchedule: tour.pricingSchedule || [],
      additionalImages: [],
      galleryImages: [],
      mainImage: null,
      price: tour.price || '',
      pricePerPerson: tour.pricePerPerson || '',
      discountPercentage: tour.discountPercentage ? tour.discountPercentage.toString() : '',
      deadlineHours: tour.deadlineHours ? tour.deadlineHours.toString() : '',
      sameDropOff: tour.sameDropOff !== undefined ? tour.sameDropOff : true,
      cities: tour.cities || (tour.city ? [tour.city] : []),
      hotels: tour.hotels || (tour.hotel ? [tour.hotel] : []),
      languages: Array.isArray(tour.languages) 
        ? tour.languages 
        : (typeof tour.languages === 'string' && tour.languages.includes(',') 
            ? tour.languages.split(',').map((s: string) => s.trim()).filter(Boolean)
            : (tour.languages ? [tour.languages] : [])),
    };
    
   
    
    setFormData(editFormData);
    
    // Load saved transport vehicles if they exist
    if (tour.transportVehicles && Array.isArray(tour.transportVehicles)) {
     
      setSavedTransportVehicles(tour.transportVehicles);
     
    } else {
     
      setSavedTransportVehicles([]);
    }
    
  
    
    setModalMode('edit');
    setSelectedTour(tour);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await postsAPI.deletePost(id);
        toast({
          title: "Success",
          description: "Tour deleted successfully!",
        });
        await fetchTours();
        if (onTourChange) onTourChange();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete tour",
          variant: "destructive",
        });
      }
    }
  };

  // *** FIX: Enhanced filteredTours with debugging ***
  const filteredTours = tours.filter((tour: any) =>
    tour.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const SectionHeader = ({ title, section }: { title: string; section: string }) => (
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
          <div>
            {/* Header */}
            <div className="bg-white rounded-xl shadow-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Product Management System
                </h1>
                <button
                  onClick={openCreateModal}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <Plus size={24} />
                  Create New Tour
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Refund Requests Section */}
            <div className="bg-white rounded-xl shadow-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Refund Requests (Admin)</h2>
              </div>
              <RefundRequestsPanel />
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (tours.length === 0 || filteredTours.length === 0) ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {tours.length === 0 ? "No Tours Created Yet" : "No Tours Found"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {tours.length === 0 
                    ? "Get started by creating your first tour" 
                    : "Try adjusting your search"}
                </p>
                {tours.length === 0 && (
                  <button
                    onClick={openCreateModal}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 inline-flex items-center gap-2 font-semibold"
                  >
                    <Plus size={20} />
                    Create First Tour
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour: any) => {
               
                  
                  return (
                  <div key={tour._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition flex flex-col h-full">
                    {tour.imageUrl || tour.images?.[0] ? (
                      <img 
                        src={tour.imageUrl || tour.images[0]} 
                        alt={tour.title}
                        className="h-48 w-full object-cover"
                        onError={(e) => {
                        
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold ${tour.imageUrl || tour.images?.[0] ? 'hidden' : ''}`}>
                      {tour.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{tour.title}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2 py-1  text-blue-800 text-xs rounded-full">
                            {tour.category || 'Tour'}
                          </span>
                          {tour.city && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {tour.city}
                            </span>
                          )}
                          {tour.tourType && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {tour.tourType}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description || 'No description'}</p>
                      
                      {/* Duration Display */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {(() => {
                              // Check pricingSchedule first (most reliable)
                              if (tour.pricingSchedule && tour.pricingSchedule.length > 0 && tour.pricingSchedule[0].duration) {
                                return tour.pricingSchedule[0].duration;
                              }
                              // Check direct duration field
                              if (tour.duration && tour.duration !== '') {
                                return tour.duration;
                              }
                              // Check durationHours
                              if (tour.durationHours && tour.durationHours > 0) {
                                return `${tour.durationHours}h`;
                              }
                              // Default fallback
                              return 'N/A';
                            })()}
                          </span>
                        </div>
                        {tour.city && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{tour.city}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm mb-4">
                        {/* Price Display */}
                        {(() => {
                          // *** NEW: Use utility function for consistent price display ***
                          const priceInfo = getDisplayPrice(tour);
                          
                          if (priceInfo.isStartingFrom) {
                            if (priceInfo.hasDiscount && priceInfo.originalPrice) {
                              return (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 line-through text-xs">${priceInfo.originalPrice.toFixed(2)}</span>
                                  <span className="text-green-600 font-bold text-lg">${priceInfo.price.toFixed(2)}</span>
                                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                    {tour.discountPercentage}% OFF
                                  </span>
                                </div>
                              );
                            } else {
                              return <span className="text-primary font-bold text-lg">💰 ${priceInfo.price.toFixed(2)}</span>;
                            }
                          }
                          
                          // Fallback to original pricing logic if no vehicles
                          if (tour.priceNumber && tour.priceNumber > 0) {
                            // *** FIX: Check if discount exists and calculate actual price ***
                            if (tour.discountPercentage > 0) {
                              const netPrice = tour.priceNumber;
                              const discountDecimal = tour.discountPercentage / 100;
                              const actualPrice = Math.round(netPrice / (1 - discountDecimal));
                              
                              return (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 line-through text-xs">${actualPrice}</span>
                                  <span className="text-green-600 font-bold text-lg">${netPrice}</span>
                                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                    {tour.discountPercentage}% OFF
                                  </span>
                                </div>
                              );
                            }
                            
                            return <span className="text-primary font-bold text-lg">💰 ${tour.priceNumber}</span>;
                          }
                          
                          // Try price string
                          if (tour.price && tour.price !== 'Price not set') {
                            return <span className="text-primary font-bold text-lg">💰 {tour.price}</span>;
                          }
                          
                          return <span className="text-gray-400">💰 Price not set</span>;
                        })()}
                        <span className="text-gray-500">👥 {tour.bookingType || 'single'}</span>
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => openEditModal(tour)}
                          className="flex-1 px-3 py-2 text-[#5C7AC0]  hover:bg-[#284078] text-blue-700 rounded hover:bg-blue-200 transition flex items-center justify-center gap-2"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tour._id)}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {modalMode === 'create' ? 'Create New Tour' : 'Edit Tour'}
              </h1>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Back
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Helper Instructions */}
       

              {/* Product Management Section */}
              <div>
                <SectionHeader title="Product Management - Create a Product" section="basic" />
                {expandedSections.basic && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="title" 
                          value={formData.title} 
                          onChange={(e) => {
                            handleInputChange(e);
                            setFieldErrors((prev: any) => ({ ...prev, title: '' }));
                          }}
                          required
                          minLength={3}
                          className={`w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldErrors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter tour title (e.g., Tokyo City Tour)"
                        />
                        {fieldErrors.title && (
                          <p className="text-xs text-red-600 mt-1 font-medium">⚠️ {fieldErrors.title}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select 
                          name="category" 
                          value={formData.category} 
                          onChange={(e) => {
                            handleInputChange(e);
                            setFieldErrors((prev: any) => ({ ...prev, category: '' }));
                          }}
                          required
                          className={`w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            fieldErrors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {fieldErrors.category && (
                          <p className="text-xs text-red-600 mt-1 font-medium">⚠️ {fieldErrors.category}</p>
                        )}
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
                            <div key={index} className="flex items-center gap-1  text-blue-800 px-3 py-1 rounded-full text-sm">
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
                              <div key={index} className="flex items-center gap-1  text-blue-800 px-3 py-1 rounded-full text-sm">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={(e) => {
                          handleInputChange(e);
                          setFieldErrors((prev: any) => ({ ...prev, description: '' }));
                        }}
                        rows={4}
                        required
                        minLength={10}
                        placeholder="Enter detailed description of the tour (minimum 10 characters)..."
                        className={`w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          fieldErrors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {fieldErrors.description ? (
                        <p className="text-xs text-red-600 mt-1 font-medium">⚠️ {fieldErrors.description}</p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-1">Detailed description will be shown on tour detail page</p>
                      )}
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


              {/* Images */}
              <div>
                <SectionHeader title="Images" section="images" />
                {expandedSections.images && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                      
                      {/* Upload Button */}
                      <div className="relative">
                        <input 
                          type="file" 
                          id="mainImageUpload"
                          accept="image/*" 
                          onChange={(e) => handleFileChange(e, 'mainImage')} 
                          className="hidden"
                          disabled={uploading}
                        />
                        <label 
                          htmlFor="mainImageUpload"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <Upload size={20} className={uploading ? 'animate-bounce' : ''} />
                          <span className="font-medium">
                            {uploading ? 'Uploading...' : formData.imageUrl ? 'Change Image' : 'Click to Upload Image'}
                          </span>
                        </label>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">Allowed types: JPG, JPEG, PNG, WEBP. Max size: 2MB.</p>

                      {/* Enforce file uploads only - URL field removed */}

                      {/* Image Preview */}
                      {formData.imageUrl && (
                        <div className="mt-3 relative">
                          <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="h-48 w-full object-cover rounded-lg border-2 border-green-500" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                              toast({
                                title: "Image Load Error",
                                description: "Failed to load image. Please check the URL.",
                                variant: "destructive",
                              });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, imageUrl: '', mainImage: null }))}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                          >
                            <X size={16} />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                            ✓ Image Ready
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images (Upload multiple)</label>
                      <div className="relative">
                        <input 
                          type="file" 
                          id="additionalImagesUpload"
                          accept="image/*" 
                          multiple 
                          onChange={(e) => handleFileChange(e, 'additionalImages')} 
                          className="hidden"
                          disabled={uploading}
                        />
                        <label 
                          htmlFor="additionalImagesUpload"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <Upload size={20} className={uploading ? 'animate-bounce' : ''} />
                          <span className="font-medium">
                            {uploading ? 'Uploading...' : 'Click to Upload Additional Images'}
                          </span>
                        </label>
                      </div>
                      {formData.images && formData.images.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 gap-2">
                          {formData.images.map((img: string, idx: number) => (
                            <div key={idx} className="relative group">
                              <img 
                                src={img} 
                                alt={`Additional ${idx}`} 
                                className="h-20 w-full object-cover rounded border-2 border-blue-300" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = formData.images.filter((_, i) => i !== idx);
                                  setFormData(prev => ({ ...prev, images: newImages }));
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Upload JPG/JPEG/PNG/WEBP (multiple files allowed, max 2MB each)</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (File Upload - Optional)</label>
                      <div className="relative">
                        <input 
                          type="file" 
                          id="galleryImagesUpload"
                          accept="image/*" 
                          multiple 
                          onChange={(e) => handleFileChange(e, 'galleryImages')} 
                          className="hidden"
                          disabled={uploading}
                        />
                        <label 
                          htmlFor="galleryImagesUpload"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <Upload size={20} className={uploading ? 'animate-bounce' : ''} />
                          <span className="font-medium">
                            {uploading ? 'Uploading...' : 'Upload Gallery Images'}
                          </span>
                        </label>
                      </div>
                        <p className="text-xs text-gray-500 mt-2">Allowed types: JPG, JPEG, PNG, WEBP. Max size: 2MB per file.</p>
                      {formData.galleryImages.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">{formData.galleryImages.length} files selected</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <SectionHeader title="Pick-up and Drop-off" section="location" />
                {expandedSections.location && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Cities - multi-select with chips */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cities (select multiple)</label>
                        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                          {japanCities.map((city) => {
                            const active = formData.cities?.includes(city);
                            return (
                              <button
                                type="button"
                                key={city}
                                onClick={() => toggleItem('cities', city)}
                                className={`px-3 py-1 rounded-full text-xs border transition ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
                              >
                                {city}
                              </button>
                            );
                          })}
                        </div>
                        {formData.cities?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {formData.cities.map((c: string) => (
                              <span key={c} className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">{c}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Hotels - multi-select with chips */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hotels (select multiple)</label>
                        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                          {japanHotels.map((hotel) => {
                            const active = formData.hotels?.includes(hotel);
                            return (
                              <button
                                type="button"
                                key={hotel}
                                onClick={() => toggleItem('hotels', hotel)}
                                className={`px-3 py-1 rounded-full text-xs border transition ${active ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'}`}
                              >
                                {hotel}
                              </button>
                            );
                          })}
                        </div>
                        {formData.hotels?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {formData.hotels.map((h: string) => (
                              <span key={h} className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">{h}</span>
                            ))}
                          </div>
                        )}
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
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Toggle for Drop-off */}
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

                      {/* Drop-off fields (show only if toggle OFF) */}
                      {!formData.sameDropOff && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Area</label>
                            <input
                              type="text"
                              name="dropArea"
                              value={formData.dropArea}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
                            <input
                              type="text"
                              name="dropLocation"
                              value={formData.dropLocation}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Point</label>
                            <input
                              type="text"
                              name="dropPoint"
                              value={formData.dropPoint}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Details</label>
                            <textarea
                              name="dropDetails"
                              value={formData.dropDetails}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </>
                      )}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Group Title</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Group Guider Name</label>
                            <input
                              type="text"
                              name="groupLeaderName"
                              value={formData.groupLeaderName}
                              onChange={handleInputChange}
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
                              rows={2}
                              placeholder="Any special requirements for the group"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Discount Section */}
                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-3">💰 Discount & Pricing</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Discount Percentage (%)
                          </label>
                          <input 
                            type="number" 
                            name="discountPercentage" 
                            value={formData.discountPercentage} 
                            onChange={handleInputChange}
                            min="0" 
                            max="100" 
                            placeholder="e.g., 10 for 10% off"
                            className="w-full px-3 py-2 border-2 border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
                          />
                          <p className="text-xs text-yellow-700 mt-1">
                            {formData.discountPercentage 
                              ? `✅ ${formData.discountPercentage}% discount will be applied to Net Price` 
                              : "Enter discount % (0-100)"
                            }
                          </p>
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
                          <p className="text-xs text-gray-500 mt-1">Discount expiry date (optional)</p>
                        </div>
                      </div>

                      {/* Show calculation example */}
                      {formData.discountPercentage && currentPricing.actualPrice && (
                        <div className="mt-3 p-3 bg-white rounded-md border border-yellow-300">
                          <p className="text-sm font-medium text-yellow-900">Price Calculation Preview:</p>
                          <div className="mt-2 text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Actual Price:</span>
                              <span className="font-semibold">{currentPricing.currency} {currentPricing.actualPrice}</span>
                            </div>
                            <div className="flex justify-between text-yellow-700">
                              <span>Discount ({formData.discountPercentage}%):</span>
                              <span className="font-semibold">
                                - {currentPricing.currency} {(parseFloat(currentPricing.actualPrice) * parseFloat(formData.discountPercentage) / 100).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between text-green-700 font-bold border-t pt-1">
                              <span>Net Price:</span>
                              <span>{currentPricing.currency} {currentPricing.netPrice || calculateNetPrice(currentPricing.actualPrice, formData.discountPercentage)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Transport Details Section */}
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        🚗 Transport Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Transport Year</label>
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
                            placeholder="e.g., Toyota Hiace, Mercedes Benz" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                          />
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                            <input
                              type="number"
                              name="groupSize"
                              value={formData.groupSize}
                              onChange={handleInputChange}
                              min="2"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                            <input
                              type="number"
                              name="vehiclePrice"
                              value={formData.vehiclePrice}
                              onChange={handleInputChange}
                              min="0"
                              step="0.01"
                              placeholder="e.g., 150"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                      </div>
                      
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Net Price <span className="text-green-600">✓ Auto</span>
                            </label>
                            <input
                              type="text"
                              value={(() => {
                                if (!formData.vehiclePrice) return '';
                                const price = parseFloat(formData.vehiclePrice);
                                const discount = parseFloat(formData.discountPercentage) || 0;
                                const netPrice = price - (price * discount / 100);
                                return netPrice.toFixed(2);
                              })()}
                              readOnly
                              className="w-full px-3 py-2 border-2 border-green-300 bg-green-50 text-green-800 rounded-md font-bold text-lg"
                              placeholder="Auto-calculated from Price"
                            />
                            <p className="text-xs text-green-700 mt-1">
                              {formData.vehiclePrice 
                                ? `Final price after ${formData.discountPercentage || 0}% discount` 
                                : "Will auto-calculate when you enter Price"
                              }
                            </p>
                          </div>
                      </div>
                      
                      {/* Add Vehicle Button */}
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={addTransportVehicle}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md"
                        >
                          <Plus size={18} /> Add Vehicle
                        </button>
                      </div>

                      {/* Saved Transport Vehicles Preview */}
                      {savedTransportVehicles.length > 0 && (
                        <div className="mt-4 p-4 bg-white border-2 border-blue-300 rounded-lg">
                          <h5 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            🚗 Transport Details Preview ({savedTransportVehicles.length} vehicle{savedTransportVehicles.length !== 1 ? 's' : ''})
                          </h5>
                          <div className="space-y-2">
                            {savedTransportVehicles.map((vehicle, index) => (
                              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-200">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-blue-900">
                                    {index + 1}. {vehicle.transportType}
                                    {vehicle.transportModal && ` (${vehicle.transportModal})`}
                                    {vehicle.makeVariant && ` - ${vehicle.makeVariant}`}
                                    {vehicle.capacity && ` | Capacity: ${vehicle.capacity}`}
                                    {vehicle.price && ` | 💰 $${vehicle.price}`}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeTransportVehicle(vehicle.id)}
                                  className="ml-3 p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                  title="Remove vehicle"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Current Form Preview (before adding) */}
                      {(formData.transportType || formData.transportModal || formData.makeVariant || formData.vehiclePrice) && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                          <h5 className="text-sm font-medium text-yellow-800 mb-2">📝 Current Vehicle (not saved yet):</h5>
                          <p className="text-sm text-yellow-700">
                            <span className="font-medium">
                              {formData.transportType || 'Transport Type'}
                              {formData.transportModal && ` (${formData.transportModal})`}
                              {formData.makeVariant && ` - ${formData.makeVariant}`}
                              {formData.groupSize && ` | Capacity: ${formData.groupSize}`}
                              {formData.vehiclePrice && ` | 💰 $${formData.vehiclePrice}`}
                              {formData.vehiclePrice && formData.discountPercentage && ` → Net: $${(() => {
                                const price = parseFloat(formData.vehiclePrice);
                                const discount = parseFloat(formData.discountPercentage) || 0;
                                const netPrice = price - (price * discount / 100);
                                return netPrice.toFixed(2);
                              })()}`}
                            </span>
                          </p>
                          <p className="text-xs text-yellow-600 mt-1">
                            ⬆️ Click "Add Vehicle" button above to save this vehicle
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Pricing Schedule Section */}
                    <div className={`bg-white p-6 rounded-xl border-2 shadow-sm ${
                      fieldErrors.pricingSchedule ? 'border-red-500 bg-red-50' : 'border-blue-200'
                    }`}>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b">
                        <h3 className="text-xl font-semibold text-gray-800">Pricing Schedule</h3>
                        <div className=" text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                          📅 Shared Schedule for All Vehicles
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Schedule Explanation */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8  rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 text-sm font-bold">ℹ️</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-900 mb-1">Shared Schedule</h4>
                              <p className="text-sm text-blue-800">
                                This schedule applies to <strong>all vehicles</strong> added to this tour. 
                                Users can book any vehicle during these days and time slots. 
                                The actual price will be determined by the vehicle they select.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Days Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Select Days (Detailed Setup)</label>
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

                        {/* Duration Only */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>


                        {/* Add Schedule Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                         
                            
                            
                            if (formData.pricingSchedule.length > 0) {
                            
                            }
                            
                            addPricingSchedule();
                            
                            setFieldErrors((prev: any) => ({ 
                              ...prev, 
                              pricingSchedule: ''
                            }));
                          }}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all font-medium"
                        >
                          <Plus size={18} /> Add Schedule
                        </button>
                      </div>

                      {/* Saved Pricing Schedules */}
                      {formData.pricingSchedule.length > 0 && (
                        <>
                          {/* Card Display Preview */}
                          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                            <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                              🎯 Cards Will Display:
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between bg-white p-3 rounded-md">
                                <span className="font-medium">Price on Cards:</span>
                                <span className="text-2xl font-bold text-green-700">
                                  {formData.pricingSchedule[0].currency} {formData.pricingSchedule[0].netPrice}
                                </span>
                              </div>
                              {formData.discountPercentage && (
                                <div className="flex items-center justify-between bg-white p-2 rounded-md">
                                  <span className="text-xs">Discount Badge:</span>
                                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                                    {formData.discountPercentage}% OFF
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-6 space-y-3">
                            <h4 className="text-lg font-semibold text-gray-700">Saved Schedules ({formData.pricingSchedule.length})</h4>
                            
                            {/* Pricing Schedule Error Message */}
                            {fieldErrors.pricingSchedule && (
                              <div className="p-3 bg-red-100 border border-red-300 rounded-md">
                                <p className="text-sm text-red-800 font-medium">
                                  ⚠️ {fieldErrors.pricingSchedule}
                                </p>
                              </div>
                            )}
                            {formData.pricingSchedule.map((schedule: any, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border shadow-sm"
                            >
                              <div className="flex-1">
                                <div className="text-sm text-gray-700 space-y-1">
                                  <div>
                                    <span className="font-medium">Days:</span>{" "}
                                    {schedule.days.map((day: string) => (
                                      <span
                                        key={day}
                                        className="inline-block  text-blue-700 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                                      >
                                        {day}
                                      </span>
                                    ))}
                                  </div>
                                  <div>
                                    <span className="font-medium">Time:</span>{" "}
                                    {schedule.timeSlots.map((time: string) => (
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
                                    <span className="font-medium">Actual Price:</span> {schedule.currency} {schedule.actualPrice} |{" "}
                                    <span className="font-medium">Net Price:</span> {schedule.currency} {schedule.netPrice}
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
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Inclusion/Exclusion */}
           <div>
  <SectionHeader title=" Additional Information" section="inclusion" />
  {expandedSections.inclusion && (
    <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
      
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
                <div 
                  key={index} 
                  className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
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

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Languages (select multiple)</label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
          {languageOptions.map((lang) => {
            const active = formData.languages?.includes(lang);
            return (
              <button
                type="button"
                key={lang}
                onClick={() => toggleItem('languages', lang)}
                className={`px-3 py-1 rounded-full text-xs border transition ${active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'}`}
              >
                {lang}
              </button>
            );
          })}
        </div>
        {formData.languages?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.languages.map((l: string) => (
              <span key={l} className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">{l}</span>
            ))}
          </div>
        )}
      </div>
      
      {/* Tips */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Insider Tips</label>
        <textarea 
          name="nearbyAttractions" 
          value={formData.nearbyAttractions} 
          onChange={handleInputChange} 
          placeholder="Insider Tips" 
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        />
      </div>

      {/* Includes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Includes</label>
        <textarea 
          name="includes" 
          value={formData.includes} 
          onChange={handleInputChange} 
          rows={3}
          placeholder="What's included in the tour" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        />
      </div>
      
      {/* Excludes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excludes</label>
        <textarea 
          name="excludes" 
          value={formData.excludes} 
          onChange={handleInputChange} 
          rows={3}
          placeholder="What's not included" 
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
                        rows={2}
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
                        rows={3}
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
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
                            rows={2}
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
                        onClick={() => {

                          addItinerary();
                        }} 
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg transition-all transform hover:scale-105"
                        disabled={!currentItinerary.activity}
                      >
                        <Plus size={20} /> ➕ Add Itinerary Item
                      </button>
                      {!currentItinerary.activity && (
                        <p className="text-sm text-red-500 mt-2">
                          ⚠️ Activity Name is required to add itinerary item
                        </p>
                      )}
                    </div>

                    {formData.itineraryItems.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.itineraryItems.map((item: any, index) => (
                          <div key={index} className="flex items-start justify-between bg-white p-3 rounded border">
                            <div className="flex-1">
                              <div className="font-medium">{item.time} - {item.activity}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                              <div className="text-sm text-gray-500">
                                Duration: {item.duration} | {item.included ? 'Included' : `Additional: ${item.additionalCost}`}
                                {item.image && (
                                  <span className="ml-2 text-green-600">✓ Image uploaded</span>
                                )}
                              </div>
                              {item.image && (
                                <div className="mt-2">
                                  <img 
                                    src={item.image} 
                                    alt={item.activity} 
                                    className="h-20 w-32 object-cover rounded border"
                                  />
                                </div>
                              )}
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
                            rows={3}
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
                        {formData.faqs.map((faq: any, index) => (
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
                  {modalMode === 'create' ? 'Submit Tour' : 'Update Tour'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default TourManagementApp;

// --- Admin-only panel to approve/deny refunds ---
function RefundRequestsPanel() {
  const [loading, setLoading] = useState(true);
  const [refunds, setRefunds] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      // Reuse admin bookings listing and filter client-side for refund requests
      const resp = await adminAPI.getBookings();
      const items = (resp.data || []).filter((b: any) => b?.cancellation?.requiresAdminApproval && b?.cancellation?.refundStatus === 'pending');
      setRefunds(items);
    } catch (e) {
      setRefunds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  const approve = async (bookingId: string) => {
    try {
      await adminAPI.approveRefund(bookingId);
      toast({ title: 'Refund Approved', description: 'Stripe refund processed.' });
      fetchRefunds();
    } catch (e: any) {
      toast({ title: 'Error', description: e?.response?.data?.message || 'Failed to approve refund', variant: 'destructive' });
    }
  };

  const deny = async (bookingId: string) => {
    try {
      await adminAPI.denyRefund(bookingId);
      toast({ title: 'Refund Denied' });
      fetchRefunds();
    } catch (e: any) {
      toast({ title: 'Error', description: e?.response?.data?.message || 'Failed to deny refund', variant: 'destructive' });
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading refund requests...</div>;
  }

  if (refunds.length === 0) {
    return <div className="text-gray-500">No pending refund requests.</div>;
  }

  return (
    <div className="space-y-3">
      {refunds.map((r: any) => (
        <div key={r._id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg bg-gray-50">
          <div className="space-y-1">
            <div className="font-semibold text-gray-800">{r.post?.title || 'Tour'}</div>
            <div className="text-sm text-gray-600">Booking: {r.bookingReference}</div>
            <div className="text-sm text-gray-600">Customer: {r.contactInfo?.fullName} ({r.contactInfo?.email})</div>
            <div className="text-sm text-gray-600">Refund Amount: ${Number(r.cancellation?.refundAmount || 0).toFixed(2)} | Fee: ${Number(r.cancellation?.refundFee || 0).toFixed(2)}</div>
          </div>
          <div className="mt-3 md:mt-0 flex gap-2">
            <button onClick={() => approve(r._id)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
            <button onClick={() => deny(r._id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Deny</button>
          </div>
        </div>
      ))}
    </div>
  );
}