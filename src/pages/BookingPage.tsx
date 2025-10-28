

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { postsAPI, bookingsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import SEO from '@/components/SEO';
import {
  Calendar as CalIcon,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Car,
  Baby,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  Languages,
  CreditCard,
  Shield
} from 'lucide-react';

// Initialize Stripe with your publishable key from environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const BookingPage = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedPricingSchedule, setSelectedPricingSchedule] = useState(null);
  const [participants, setParticipants] = useState({
    adults: 2,
    children: 0,
    seniors: 0
  });
  const [contactInfo, setContactInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequirements: '',
    language: 'English',
    pickupLocation: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('pay-now'); // 'pay-now' or 'pay-later'
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedTransportType, setSelectedTransportType] = useState('');
  const [selectedTransportModal, setSelectedTransportModal] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState({
    stroller: false,
    wheelchair: false,
    extraLuggage: false
  });
  const [vehicleError, setVehicleError] = useState('');
  const [showAdditionalSections, setShowAdditionalSections] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/booking/${tourId}` } } });
      return;
    }
    
    if (tourId) {
      fetchTour();
    }
  }, [tourId, isAuthenticated]);

  useEffect(() => {
    if (user) {
      setContactInfo(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const fetchTour = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPost(tourId);
      if (response.success) {
      
        setTour(response.data);
        
        if (response.data.pricingSchedule?.[0]?.timeSlots?.length > 0) {
          setSelectedTimeSlot(response.data.pricingSchedule[0].timeSlots[0]);
        }
      } else {
        navigate('/tours');
        toast({
          title: "Tour not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
      navigate('/tours');
    } finally {
      setLoading(false);
    }
  };

  const getTotalParticipants = () => {
    return participants.adults + participants.children + participants.seniors;
  };

  const updateParticipants = (type, increment) => {
    setParticipants(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
    }));
  };

  const handleContactInfoChange = (field, value) => {
    let newValue = value;
    if (field === 'phone') {
      // Keep only digits and limit to 15
      newValue = String(value || '').replace(/\D/g, '').slice(0, 15);
    }
    setContactInfo(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const isValidEmail = (email: string) => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email.trim());
  };

  const isValidPhone = (phone: string) => {
    if (!phone) return false;
    const digitsOnly = phone.replace(/\D/g, '');
    return /^\d{10,15}$/.test(digitsOnly);
  };

  const calculateTotal = () => {
    if (!tour) return 0;
    
    let basePrice = 0;
    
    if (selectedVehicle && selectedVehicle.price) {
      basePrice = parseFloat(selectedVehicle.price) || 0;
    } else if (selectedPricingSchedule && selectedPricingSchedule.netPrice) {
      basePrice = parseFloat(selectedPricingSchedule.netPrice) || 0;
    } else {
      basePrice = tour.priceNumber || 0;
    }
    
    let additionalCost = 0;
    if (additionalOptions.stroller) additionalCost += 10;
    if (additionalOptions.wheelchair) additionalCost += 15;
    if (additionalOptions.extraLuggage) additionalCost += 12;
    
    return basePrice + additionalCost;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      const dayName = format(date, 'EEEE');
      setSelectedDay(dayName);
      const matchingSchedule = tour?.pricingSchedule?.find((schedule) => 
        schedule.days && schedule.days.includes(dayName)
      );
      if (matchingSchedule) {
        setSelectedPricingSchedule(matchingSchedule);
        if (matchingSchedule.timeSlots && matchingSchedule.timeSlots.length > 0) {
          setSelectedTimeSlot(matchingSchedule.timeSlots[0]);
        }
      }
    }
  };

  const validateAndCheck = () => {
    const total = getTotalParticipants();
    
    if (total === 0) {
      setValidationMessage('Please select at least 1 participant');
      setIsValid(false);
      setShowValidationDialog(true);
      return;
    }

    if (!selectedDate) {
      setValidationMessage('Please select a date');
      setIsValid(false);
      setShowValidationDialog(true);
      return;
    }

    setValidationMessage(`Great! ${total} participant${total > 1 ? 's' : ''} selected. Available for booking.`);
    setIsValid(true);
    setShowValidationDialog(true);
  };

  const handleVehicleSelect = (vehicle) => {
    const totalParticipants = getTotalParticipants();
    const capacity = parseInt(vehicle.capacity) || 0;
    
    if (totalParticipants > capacity) {
      setVehicleError(`This vehicle can accommodate up to ${capacity} persons. You have ${totalParticipants} participants. Please select a larger vehicle.`);
      toast({
        title: "Vehicle Capacity Exceeded",
        description: `This vehicle can only accommodate ${capacity} persons. You have ${totalParticipants} participants.`,
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date first",
        variant: "destructive",
      });
      return;
    }
    
    setVehicleError('');
    setSelectedVehicle(vehicle);
    setSelectedVariant(vehicle.makeVariant || '');
    setSelectedTransportType(vehicle.transportType || '');
    setSelectedTransportModal(vehicle.transportModal || '');
    
    // Show additional sections after vehicle selection
    setShowAdditionalSections(true);
    
    // Scroll to additional sections
    setTimeout(() => {
      document.getElementById('additional-sections')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const toggleAdditionalOption = (option) => {
    setAdditionalOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a tour date.",
        variant: "destructive",
      });
      return;
    }

    // Contact validations
    if (!contactInfo.fullName || contactInfo.fullName.trim().length < 2) {
      toast({
        title: 'Full Name Required',
        description: 'Please enter your full name.',
        variant: 'destructive'
      });
      return;
    }

    if (!isValidEmail(contactInfo.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      });
      return;
    }

    if (!isValidPhone(contactInfo.phone)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid phone number (10–15 digits).',
        variant: 'destructive'
      });
      return;
    }
    
    if (getTotalParticipants() === 0) {
      toast({
        title: "Participants Required",
        description: "Please select at least one participant.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedVehicle) {
      toast({
        title: "Vehicle Required",
        description: "Please select a vehicle.",
        variant: "destructive",
      });
      return;
    }

    if (!contactInfo.pickupLocation) {
      toast({
        title: "Pickup Location Required",
        description: "Please enter your pickup location.",
        variant: "destructive",
      });
      return;
    }

    // If pay now is selected, show payment dialog
    if (paymentMethod === 'pay-now') {
      setShowPaymentDialog(true);
      return;
    }

    // If pay later, proceed directly with booking
    await processBooking(null);
  };

  const processBooking = async (paymentIntentId) => {
    try {
      setSubmitting(true);
      
      const totalAmount = calculateTotal();
      const tourDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
      
      const bookingData = {
        postId: tourId,
        tourDate: tourDateString,
        selectedDay,
        selectedTimeSlot,
        participants,
        contactInfo: {
          ...contactInfo,
          specialRequirements: contactInfo.specialRequirements || undefined
        },
        variant: selectedVariant || undefined,
        transportType: selectedTransportType || undefined,
        transportModal: selectedTransportModal || undefined,
        selectedVehicle: selectedVehicle || undefined,
        additionalOptions: {
          stroller: additionalOptions.stroller,
          wheelchair: additionalOptions.wheelchair,
          extraLuggage: additionalOptions.extraLuggage
        },
        paymentMethod,
        paymentIntentId,
        totalAmount: totalAmount
      };

     
      const response = await bookingsAPI.createBooking(bookingData);
   
      
      if (response.success) {
        // Store booking reference
        setBookingReference(response.data.bookingReference || 'Generated');
        
        // Show success toast only after backend confirms
        toast({
          title: "✅ Payment Successful!",
          description: "Your booking has been confirmed!",
        });
        
        // Show Thank You modal
        setShowThankYouModal(true);
        
        // Hide modal and redirect after 4 seconds
        setTimeout(() => {
          setShowThankYouModal(false);
          navigate('/bookings');
        }, 4000);
      }
    } catch (error) {
      console.error('❌ Booking error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || "Failed to create booking. Please try again.";
      const errorDetails = error.response?.data?.errors;
      
      toast({
        title: "Booking Failed",
        description: errorDetails 
          ? `${errorMessage} - ${JSON.stringify(errorDetails)}`
          : errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setShowPaymentDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  // Prepare vehicles array with discount calculation
  let vehicles = [];
  const tourDiscount = tour?.discountPercentage || tour?.discount?.percentage || 0;
  
  if (tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0) {
  
    
    vehicles = tour.transportVehicles.map((vehicle) => {
      const originalPrice = parseFloat(vehicle.price) || 0;
      const discountedPrice = tourDiscount > 0 
        ? originalPrice - (originalPrice * tourDiscount / 100)
        : originalPrice;
      
    
      
      return {
        id: vehicle.id,
        transportType: vehicle.transportType || '',
        transportModal: vehicle.transportModal || '',
        makeVariant: vehicle.makeVariant || '',
        capacity: parseInt(vehicle.capacity) || 4,
        price: discountedPrice.toFixed(2), // Use discounted price
        originalPrice: tourDiscount > 0 ? originalPrice.toFixed(2) : null, // Store original if discount exists
        isPopular: vehicle.isPopular || false
      };
    });
  } else if (tour.makeVariant || tour.transportType || tour.transportModal) {

    const variants = tour.makeVariant ? tour.makeVariant.split(',').map(v => v.trim()) : [''];
    const types = tour.transportType ? tour.transportType.split(',').map(t => t.trim()) : [''];
    const models = tour.transportModal ? tour.transportModal.split(',').map(m => m.trim()) : [''];
    
    for (let i = 0; i < Math.max(variants.length, types.length, models.length); i++) {
      vehicles.push({
        id: `vehicle-${i}`,
        transportType: types[i] || types[0] || '',
        transportModal: models[i] || models[0] || '',
        makeVariant: variants[i] || variants[0] || '',
        capacity: 4 + (i * 3),
        price: selectedPricingSchedule?.netPrice || tour.priceNumber || '',
        isPopular: i === 0
      });
    }
  }

  const availableTimeSlots = selectedPricingSchedule?.timeSlots || 
    tour.pricingSchedule?.[0]?.timeSlots || 
    ['7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM'];

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <SEO
        title={tour?.title ? `${tour.title} | Karvaan Tours` : 'Book a Tour | Karvaan Tours'}
        description={"Securely book your private Japan tour with Karvaan Tours. Choose vehicles, pick time slots, and pay online. Mount Fuji, Tokyo, Hakone and more."}
        keywords={["Karvaan Tours", "Japan tour booking", "Mount Fuji tour", "Tokyo private tour", "Hakone tour", "Nikko tour", "private driver Japan"]}
        canonical={`https://karvaantours.com/booking/${tourId || ''}`}
      />
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(`/tours/${tourId}`)}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tour Details
        </Button>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-6 rounded-t-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Select date and travelers</h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Date Selection */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white text-gray-800 hover:bg-gray-50 min-w-[250px] justify-start"
                >
                  <CalIcon className="mr-2 h-5 w-5" />
                  {selectedDate ? format(selectedDate, "EEEE, MMMM dd, yyyy") : "Monday, November 17, 2025"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            {/* Participants Counter */}
            <div className="flex items-center gap-3 bg-white text-gray-800 px-4 py-2 rounded-lg">
              <Users className="h-5 w-5" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateParticipants('adults', false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold transition"
                >
                  -
                </button>
                <span className="font-bold text-lg w-8 text-center">
                  {getTotalParticipants()}
                </span>
                <button
                  onClick={() => updateParticipants('adults', true)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* <Button
              onClick={validateAndCheck}
              className="bg-green-400 hover:bg-green-500 text-green-900 font-bold px-6"
            >
              Check availability
            </Button> */}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-green-100 border-l-4 border-green-500 p-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">
            Book ahead • This is booked {tour.averageBookingDays || 35} days in advance on average.
          </span>
        </div>

        {/* Vehicle Options Grid */}
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {vehicles.map((vehicle, index) => {
              const totalParticipants = getTotalParticipants();
              const canAccommodate = totalParticipants <= vehicle.capacity;
              const isSelected = selectedVehicle && selectedVehicle.id === vehicle.id;
              const displayName = [
                vehicle.makeVariant,
                vehicle.transportModal,
                vehicle.transportType
              ].filter(Boolean).join(' ') || `Vehicle ${index + 1}`;

              return (
                <Card key={vehicle.id} className={`relative hover:shadow-xl transition-shadow ${isSelected ? 'ring-2 ring-green-500' : ''}`}>
                  {vehicle.isPopular && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-black text-white">Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{displayName}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">With English speaking guide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">
                          {displayName} : Up to {vehicle.capacity} passengers recommended for comfort ride
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">Pickup included</span>
                      </li>
                    </ul>

                    {!canAccommodate && (
                      <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                        <AlertCircle className="h-4 w-4" />
                        Too small for {totalParticipants} participants
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      {/* Show discount badge and original price if discount exists */}
                      {vehicle.originalPrice && tourDiscount > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg text-gray-500 line-through">
                            ${parseFloat(vehicle.originalPrice).toFixed(2)}
                          </span>
                          <Badge className="bg-red-500 text-white">
                            {tourDiscount}% OFF
                          </Badge>
                        </div>
                      )}
                      
                      <div className="text-2xl font-bold text-gray-900">
                        Total ${parseFloat(vehicle.price || 0).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Per group (up to {vehicle.capacity}) x ${parseFloat(vehicle.price || 0).toFixed(2)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Choose start time:</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <select
                          value={selectedTimeSlot}
                          onChange={(e) => setSelectedTimeSlot(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {availableTimeSlots.map((time, idx) => (
                            <option key={idx} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleVehicleSelect(vehicle)}
                      disabled={!canAccommodate}
                      className={`w-full font-bold py-6 text-lg ${
                        canAccommodate
                          ? 'bg-green-400 hover:bg-green-500 text-green-900'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {isSelected ? 'Selected ✓' : 'Reserve'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="mt-6">
            <CardContent className="p-8 text-center">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Vehicles Available</h3>
              <p className="text-gray-600">Please contact us for booking options.</p>
            </CardContent>
          </Card>
        )}

        {/* Footer Notes */}
        <div className="mt-6 text-sm text-gray-600 space-y-1">
          <p>*Popular option based on the number of bookings on the Tripadvisor site over the past 60 days.</p>
          <p>(Price includes taxes and booking fees)</p>
        </div>

        {/* Additional Sections - Show after vehicle selection */}
        {showAdditionalSections && selectedVehicle && (
          <div id="additional-sections" className="mt-8 space-y-6">
            {/* Additional Options Section */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Additional Options (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div
                    onClick={() => toggleAdditionalOption('stroller')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      additionalOptions.stroller 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#5C7AC0]  hover:bg-[#284078] rounded-lg flex items-center justify-center">
                          <Baby className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Baby Stroller</h4>
                          <p className="text-sm text-gray-600">Comfortable stroller for infants</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">+$10</div>
                        {additionalOptions.stroller && (
                          <CheckCircle className="h-5 w-5 text-blue-600 ml-auto mt-1" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => toggleAdditionalOption('wheelchair')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      additionalOptions.wheelchair 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Wheelchair Accessible</h4>
                          <p className="text-sm text-gray-600">Wheelchair-friendly vehicle</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">+$15</div>
                        {additionalOptions.wheelchair && (
                          <CheckCircle className="h-5 w-5 text-purple-600 ml-auto mt-1" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => toggleAdditionalOption('extraLuggage')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      additionalOptions.extraLuggage 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Extra Luggage Space</h4>
                          <p className="text-sm text-gray-600">Additional storage for bags</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">+$12</div>
                        {additionalOptions.extraLuggage && (
                          <CheckCircle className="h-5 w-5 text-orange-600 ml-auto mt-1" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Contact Information Section */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={contactInfo.fullName}
                        onChange={(e) => handleContactInfoChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => handleContactInfoChange('email', e.target.value)}
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                        inputMode="email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactInfo.phone}
                        onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                        inputMode="numeric"
                        pattern="\\d{10,15}"
                        maxLength={15}
                        onKeyDown={(e) => {
                          const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                          if (allowed.includes(e.key)) return;
                          if (!/\d/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language" className="flex items-center gap-2">
                        <Languages className="h-4 w-4" />
                        Preferred Language
                      </Label>
                      <Select
                        value={contactInfo.language}
                        onValueChange={(value) => handleContactInfoChange('language', value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pickupLocation" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Pickup Location *
                      </Label>
                      <Input
                        id="pickupLocation"
                        placeholder="Hotel name or address"
                        value={contactInfo.pickupLocation}
                        onChange={(e) => handleContactInfoChange('pickupLocation', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                    <Textarea
                      id="specialRequirements"
                      placeholder="Any dietary restrictions, accessibility needs, etc."
                      value={contactInfo.specialRequirements}
                      onChange={(e) => handleContactInfoChange('specialRequirements', e.target.value)}
                    />
                  </div>

                  <Separator />

                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() => setPaymentMethod('pay-now')}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === 'pay-now'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              <CreditCard className="h-5 w-5" />
                              Pay Now
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Secure payment with Stripe
                            </p>
                          </div>
                          {paymentMethod === 'pay-now' && (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentMethod('pay-later')}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === 'pay-later'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              <Clock className="h-5 w-5" />
                              Reserve Now, Pay Later
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              No payment required now
                            </p>
                          </div>
                          {paymentMethod === 'pay-later' && (
                            <CheckCircle className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                    
                    <div className="flex justify-between text-sm">
                      <span>
                        {selectedVehicle.makeVariant || 'Vehicle'} (up to {selectedVehicle.capacity} people)
                      </span>
                      <span>${parseFloat(selectedVehicle.price || 0).toFixed(2)}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      <div className="flex justify-between">
                        <span>Participants:</span>
                        <span>{participants.adults} adults{participants.children > 0 ? `, ${participants.children} children` : ''}{participants.seniors > 0 ? `, ${participants.seniors} seniors` : ''}</span>
                      </div>
                    </div>
                    
                    {(additionalOptions.stroller || additionalOptions.wheelchair || additionalOptions.extraLuggage) && (
                      <>
                        <Separator className="my-2" />
                        <div className="text-sm font-semibold text-gray-700 mb-1">Additional Options:</div>
                        {additionalOptions.stroller && (
                          <div className="flex justify-between text-sm text-blue-600">
                            <span>Baby Stroller</span>
                            <span>+$10.00</span>
                          </div>
                        )}
                        {additionalOptions.wheelchair && (
                          <div className="flex justify-between text-sm text-purple-600">
                            <span>Wheelchair Accessible</span>
                            <span>+$15.00</span>
                          </div>
                        )}
                        {additionalOptions.extraLuggage && (
                          <div className="flex justify-between text-sm text-orange-600">
                            <span>Extra Luggage Space</span>
                            <span>+$12.00</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full py-6 text-lg ${
                      paymentMethod === 'pay-now'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : paymentMethod === 'pay-later' ? (
                      `Reserve Now - $${total.toFixed(2)}`
                    ) : (
                      `Pay Now - $${total.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-green-600" />
                Complete Payment
              </DialogTitle>
              <DialogDescription>
                Enter your card details to complete the booking.
              </DialogDescription>
            </DialogHeader>
            <PaymentForm 
              total={total} 
              onSuccess={processBooking}
              onCancel={() => setShowPaymentDialog(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Validation Dialog */}
        <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {isValid ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span>Success</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <span>Validation Error</span>
                  </>
                )}
              </DialogTitle>
              <DialogDescription className="text-base pt-4">
                {validationMessage}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setShowValidationDialog(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Thank You Modal */}
        <Dialog open={showThankYouModal} onOpenChange={() => {}}>
          <DialogContent className="max-w-md">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 animate-bounce">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Thank You! 🎉
              </h2>
              
              <p className="text-lg text-gray-700 mb-4">
                Your booking has been confirmed!
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 mb-6">
                <div className="text-sm text-gray-600 mb-2">Booking Reference</div>
                <div className="text-2xl font-bold text-green-600 font-mono">
                  {bookingReference}
                </div>
              </div>
              
              <div className="space-y-3 text-left bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Confirmation email sent to your inbox
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Tour guide and driver details included
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    24/7 customer support available
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                Redirecting to your bookings...
              </p>
              
              <div className="flex gap-2 justify-center mt-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ total, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Google Pay / Payment Request Button
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [prReady, setPrReady] = useState(false);
  const [prCapabilities, setPrCapabilities] = useState<any>(null);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Booking Total',
        amount: Math.round(total * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
        setPrReady(true);
        setPrCapabilities(result);
      } else {
        setPrReady(false);
        setPrCapabilities(null);
      }
    });

    pr.on('paymentmethod', async (ev) => {
      try {
        setProcessing(true);
        await onSuccess(ev.paymentMethod.id);
        ev.complete('success');
      } catch (e) {
        ev.complete('fail');
      } finally {
        setProcessing(false);
      }
    });
  }, [stripe, total, onSuccess]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        setError(stripeError.message);
        toast({
          title: "Payment Error",
          description: stripeError.message,
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }

   
      
      toast({
        title: "Processing Payment...",
        description: "Please wait while we process your payment.",
      });

      // Call the success callback with payment method ID
      // This will send the payment method to backend which creates PaymentIntent
      // Success toast will be shown by processBooking if payment succeeds
      await onSuccess(paymentMethod.id);

    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
      toast({
        title: "Payment Failed",
        description: "An error occurred while processing your payment.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '10px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: false,
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-3">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">Complete Payment</h3>
        <p className="text-sm text-gray-600">Enter your card details to complete the booking</p>
      </div>

      {/* Wallets: explicit Google Pay button when available */}
      {prReady && paymentRequest && prCapabilities?.googlePay && (
        <div className="space-y-3">
          <Button
            type="button"
            onClick={() => paymentRequest?.show()}
            disabled={processing}
            className="w-full h-12 bg-black text-white hover:bg-gray-900"
          >
            Pay with Google Pay
          </Button>
          <div className="text-center text-xs text-gray-500">or pay with card</div>
        </div>
      )}

      {/* Card Details Section */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-green-600" />
          Card Information
        </Label>
        <div className="relative">
          <div className="p-4 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:border-green-400 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all">
            <CardElement options={cardElementOptions} />
          </div>
          <div className="absolute -bottom-2 right-4 flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8 bg-white p-1 rounded shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 bg-white p-1 rounded shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-8 bg-white p-1 rounded shadow-sm" />
          </div>
        </div>
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Payment Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Amount Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">Booking Total</span>
          <span className="text-sm text-gray-500">USD</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600 leading-none">
              ${total.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Includes all fees</p>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Secure Payment</h4>
            <p className="text-xs text-blue-700">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={processing}
          className="flex-1 h-12 text-base border-2 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 h-12 text-base bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {processing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Pay ${total.toFixed(2)}</span>
            </div>
          )}
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center pt-2 border-t">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Shield className="h-4 w-4" />
          <span>Powered by</span>
          <span className="font-semibold text-indigo-600">Stripe</span>
          <span>•</span>
          <span>PCI-DSS Compliant</span>
        </div>
      </div>
    </form>
  );
};

// Wrap BookingPage with Stripe Elements
const BookingPageWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <BookingPage />
    </Elements>
  );
};

export default BookingPageWrapper;