

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { postsAPI, bookingsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Users,
  DollarSign,
  Clock,
  MapPin,
  Minus,
  Plus,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  Car,
  Check,
  Baby,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';

const BookingPage = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [tour, setTour] = useState<any>(null);
  
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Booking form state
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedPricingSchedule, setSelectedPricingSchedule] = useState<any>(null);
  const [participants, setParticipants] = useState({
    adults: 1,
    children: 0,
    seniors: 0
  });
  const [contactInfo, setContactInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequirements: ''
  });
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedTransportType, setSelectedTransportType] = useState<string>('');
  const [selectedTransportModal, setSelectedTransportModal] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  
  // Additional options
  const [additionalOptions, setAdditionalOptions] = useState({
    stroller: false,
    wheelchair: false,
    extraLuggage: false
  });
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleError, setVehicleError] = useState('');

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
      const response = await postsAPI.getPost(tourId!);
      if (response.success) {
      
        setTour(response.data);
      } else {
        navigate('/tours');
        toast({
          title: "Tour not found",
          description: "The tour you're trying to book doesn't exist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
      navigate('/tours');
      toast({
        title: "Error",
        description: "Failed to load tour details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateParticipants = (type: keyof typeof participants, increment: boolean) => {
    setParticipants(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    if (!tour) return 0;
    
    let basePrice = 0;
    
    // Use selected vehicle price if available
    if (selectedVehicle && selectedVehicle.price) {
      basePrice = parseFloat(selectedVehicle.price) || 0;
    } else if (selectedPricingSchedule && selectedPricingSchedule.netPrice) {
      // Fallback to pricing schedule price (not multiplied by participants)
      basePrice = parseFloat(selectedPricingSchedule.netPrice) || 0;
    } else {
      // Fallback to tour price (not multiplied by participants)
      basePrice = tour.priceNumber || 0;
    }
    
    // Add additional options cost
    let additionalCost = 0;
    if (additionalOptions.stroller) additionalCost += 10;
    if (additionalOptions.wheelchair) additionalCost += 15;
    if (additionalOptions.extraLuggage) additionalCost += 12;
    
    return basePrice + additionalCost;
  };

  const getTotalParticipants = () => {
    return participants.adults + participants.children + participants.seniors;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      // Find matching pricing schedule
      const dayName = format(date, 'EEEE');
      const matchingSchedule = tour?.pricingSchedule?.find((schedule: any) => 
        schedule.days && schedule.days.includes(dayName)
      );
      if (matchingSchedule) {
        setSelectedPricingSchedule(matchingSchedule);
      }
      // Stay on Step 1 - don't auto-advance
    }
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    setCurrentStep(3);
  };

  const handleParticipantsConfirm = () => {
   
    
    if (getTotalParticipants() > 0) {
      // Check if transport vehicles exist (new system) or old transport fields (backward compatibility)
      const hasTransportVehicles = tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0;
      const hasOldTransportFields = tour.makeVariant || tour.transportType || tour.transportModal;
      
     
      
      if (hasTransportVehicles || hasOldTransportFields) {
       
        setCurrentStep(4); // Go to vehicle selection
      } else {
        
        setCurrentStep(5); // Skip to additional options
      }
    }
  };

  const handleVehicleSelect = (vehicle: any) => {
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
    
    setVehicleError('');
    setSelectedVehicle(vehicle);
    setSelectedVariant(vehicle.makeVariant || '');
    setSelectedTransportType(vehicle.transportType || '');
    setSelectedTransportModal(vehicle.transportModal || '');
  };

  const toggleAdditionalOption = (option: keyof typeof additionalOptions) => {
    setAdditionalOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a tour date.",
        variant: "destructive",
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

    try {
      setSubmitting(true);
      
      const bookingData = {
        postId: tourId,
        tourDate: selectedDate,
        selectedDay,
        selectedTimeSlot,
        participants,
        contactInfo: {
          ...contactInfo,
          specialRequirements: contactInfo.specialRequirements || undefined
        },
        specialRequests: specialRequests || undefined,
        variant: selectedVariant || undefined,
        transportType: selectedTransportType || undefined,
        transportModal: selectedTransportModal || undefined,
        selectedVehicle: selectedVehicle || undefined,
        additionalOptions: {
          stroller: additionalOptions.stroller,
          wheelchair: additionalOptions.wheelchair,
          extraLuggage: additionalOptions.extraLuggage
        }
      };

      const response = await bookingsAPI.createBooking(bookingData);
      
      if (response.success) {
        toast({
          title: "Booking Created!",
          description: "Redirecting to payment...",
        });
        
        navigate('/bookings');
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-card">
        <div className="container px-4 py-8">
          <div className="animate-pulse max-w-4xl mx-auto">
            <div className="h-8 bg-muted rounded mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-64 bg-muted rounded" />
                <div className="h-32 bg-muted rounded" />
              </div>
              <div className="h-96 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  const total = calculateTotal();
  const imageUrl = tour.mainImageUrl || tour.imageUrl || tour.images?.[0] || '/placeholder.svg';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(`/tours/${tourId}`)} className="gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Tour Details
        </Button>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tour Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Tour Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={imageUrl}
                    alt={tour.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{tour.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{tour.duration || tour.pricingSchedule?.[0]?.duration || 'N/A'}</span>
                      </div>
                      {tour.city && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{tour.city}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {tour.category && <Badge variant="secondary">{tour.category}</Badge>}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${(() => {
                        // Show selected vehicle price if available
                        if (selectedVehicle && selectedVehicle.price) {
                          return parseFloat(selectedVehicle.price).toFixed(2);
                        }
                        // Show pricing schedule price if available
                        if (selectedPricingSchedule?.netPrice) {
                          return parseFloat(selectedPricingSchedule.netPrice).toFixed(2);
                        }
                        // Fallback to tour price
                        return (tour.priceNumber || 0).toFixed(2);
                      })()}
                    </div>
                    <div className="text-sm text-muted-foreground">Fixed Vehicle Price</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Booking Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tour.freeCancellation && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Free cancellation up to {tour.deadlineHours || 24} hours before tour</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Instant confirmation</span>
                </div>
                {tour.reserveNowPayLater && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Reserve now, pay later available</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Safe and secure payment</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Complete Your Booking
              </CardTitle>
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full ${
                      step <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-0">
                {/* Step 1: Select Date, Travelers & Vehicle */}
                {currentStep >= 1 && (
                  <div className="space-y-0">
                    {/* Header Bar - Dark Green */}
                    <div className="bg-[#1e5a3f] text-white p-6 flex items-center justify-between flex-wrap gap-4">
                      <h2 className="text-xl font-bold">Select date and travelers</h2>
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Date Picker */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "EEEE, MMMM dd, yyyy") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        {/* Travelers Counter */}
                        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-300">
                          <Users className="h-4 w-4 text-gray-600" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateParticipants('adults', false)}
                            disabled={participants.adults <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-semibold text-gray-900 min-w-[20px] text-center">
                            {getTotalParticipants()}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateParticipants('adults', true)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Check Availability Button */}
                        <Button
                          type="button"
                          onClick={() => selectedDate && setCurrentStep(2)}
                          disabled={!selectedDate || getTotalParticipants() === 0}
                          className="bg-[#00d277] hover:bg-[#00b866] text-gray-900 font-semibold px-6"
                        >
                          Check availability
                        </Button>
                      </div>
                    </div>

                    {/* Info Bar - Light Green */}
                    <div className="bg-[#d4f1d4] border-b-2 border-[#00d277] px-6 py-3 flex items-center gap-2 text-sm text-gray-800">
                      <span className="text-green-700">⚡</span>
                      <span><strong>Book ahead</strong> • This is booked 35 days in advance on average.</span>
                    </div>

                    {/* Vehicle Cards */}
                    {selectedDate && getTotalParticipants() > 0 && (
                      <div className="p-6 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {(() => {
                            let vehicles = [];
                            
                            if (tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0) {
                              vehicles = tour.transportVehicles.map((vehicle: any) => ({
                                id: vehicle.id,
                                name: vehicle.makeVariant || vehicle.transportModal || 'Vehicle',
                                transportType: vehicle.transportType || '',
                                transportModal: vehicle.transportModal || '',
                                makeVariant: vehicle.makeVariant || '',
                                capacity: parseInt(vehicle.capacity) || 4,
                                price: vehicle.price || '',
                                features: [
                                  'With English speaking guide',
                                  `Sedan upto ${vehicle.capacity} passengers`,
                                  'Recommended for comfort ride',
                                  'Pickup included'
                                ],
                                popular: false
                              }));
                            } else {
                              const variants = tour.makeVariant ? tour.makeVariant.split(',').map((v: string) => v.trim()) : ['Sedan'];
                              const types = tour.transportType ? tour.transportType.split(',').map((t: string) => t.trim()) : ['Car'];
                              const models = tour.transportModal ? tour.transportModal.split(',').map((m: string) => m.trim()) : ['Standard'];
                              
                              for (let i = 0; i < Math.max(variants.length, types.length, models.length); i++) {
                                const capacity = 3 + (i * 3);
                                const vehicle = {
                                  id: `fallback-${i}`,
                                  name: variants[i] || variants[0] || 'Vehicle',
                                  transportType: types[i] || types[0] || '',
                                  transportModal: models[i] || models[0] || '',
                                  makeVariant: variants[i] || variants[0] || '',
                                  capacity: capacity,
                                  price: '',
                                  features: [
                                    'With English speaking guide',
                                    `Vehicle upto ${capacity} passengers`,
                                    'Recommended for comfort ride',
                                    'Pickup included'
                                  ],
                                  popular: i === 0
                                };
                                vehicles.push(vehicle);
                              }
                            }
                            
                            return vehicles.map((vehicle: any, idx: number) => {
                              const totalParticipants = getTotalParticipants();
                              const canAccommodate = totalParticipants <= vehicle.capacity;
                              const isSelected = selectedVehicle && selectedVehicle.id === vehicle.id;
                              
                              return (
                                <div
                                  key={vehicle.id || idx}
                                  className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                                    canAccommodate
                                      ? isSelected
                                        ? 'border-[#00d277] shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                      : 'border-red-300 opacity-60 cursor-not-allowed'
                                  }`}
                                >
                                  <div className="p-6 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                      <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                                      {vehicle.popular && canAccommodate && (
                                        <Badge className="bg-gray-900 text-white text-xs px-2 py-1">
                                          Popular*
                                        </Badge>
                                      )}
                                      {!canAccommodate && (
                                        <Badge variant="destructive" className="text-xs px-2 py-1">
                                          Too Small
                                        </Badge>
                                      )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-1.5 text-sm text-gray-700">
                                      {vehicle.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-gray-900">•</span>
                                          <span>{feature}</span>
                                        </li>
                                      ))}
                                    </ul>

                                    {!canAccommodate && (
                                      <div className="flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 px-3 py-2 rounded-md">
                                        <AlertCircle className="h-3 w-3" />
                                        Cannot fit {totalParticipants} travelers
                                      </div>
                                    )}

                                    {/* Pricing */}
                                    <div className="pt-4 border-t border-gray-200">
                                      <div className="mb-1">
                                        <span className="text-2xl font-bold text-gray-900">
                                          Total ${vehicle.price || calculateTotal()}
                                        </span>
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        Per group (up to {vehicle.capacity}) × ${vehicle.price || calculateTotal()}
                                      </div>
                                    </div>

                                    {/* Time Slot Selector */}
                                    {canAccommodate && (
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                          Choose start time:
                                        </label>
                                        <select
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00d277] focus:border-transparent"
                                          value={isSelected ? selectedTimeSlot : ''}
                                          onChange={(e) => {
                                            handleVehicleSelect(vehicle);
                                            setSelectedTimeSlot(e.target.value);
                                          }}
                                        >
                                          <option value="">Select time</option>
                                          <option value="7:00 AM">🕐 7:00 AM</option>
                                          <option value="7:30 AM">🕐 7:30 AM</option>
                                          <option value="8:00 AM">🕑 8:00 AM</option>
                                          <option value="8:30 AM">🕑 8:30 AM</option>
                                          <option value="9:00 AM">🕘 9:00 AM</option>
                                          <option value="9:30 AM">🕘 9:30 AM</option>
                                          <option value="10:00 AM">🕙 10:00 AM</option>
                                        </select>
                                      </div>
                                    )}

                                    {/* Reserve Button */}
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        if (canAccommodate) {
                                          handleVehicleSelect(vehicle);
                                          if (selectedTimeSlot) {
                                            setCurrentStep(2);
                                          }
                                        }
                                      }}
                                      disabled={!canAccommodate || !selectedTimeSlot}
                                      className={`w-full py-6 text-base font-bold ${
                                        !canAccommodate
                                          ? 'bg-gray-400 cursor-not-allowed'
                                          : isSelected
                                            ? 'bg-[#00d277] hover:bg-[#00b866] text-gray-900'
                                            : 'bg-[#00d277] hover:bg-[#00b866] text-gray-900'
                                      }`}
                                    >
                                      {!canAccommodate ? 'Vehicle Too Small' : 'Reserve'}
                                    </Button>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>

                        {/* Footer Note */}
                        <div className="mt-6 text-xs text-gray-600 space-y-1">
                          <p>*Popular option based on the number of bookings on the Tripadvisor site over the past 60 days.</p>
                          <p>(Price includes taxes and booking fees)</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep >= 2 && selectedVehicle && (
                  <div className="space-y-4 p-6">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Step 2: Contact Information
                    </Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={contactInfo.fullName}
                          onChange={(e) => handleContactInfoChange('fullName', e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => handleContactInfoChange('email', e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                          placeholder="+1 234 567 8900"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                      <Textarea
                        id="specialRequirements"
                        value={contactInfo.specialRequirements}
                        onChange={(e) => handleContactInfoChange('specialRequirements', e.target.value)}
                        placeholder="Any special needs or requests..."
                        rows={3}
                      />
                    </div>

                    {currentStep === 2 && (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        disabled={!contactInfo.fullName || !contactInfo.email || !contactInfo.phone}
                        className="w-full bg-green-600 hover:bg-green-700 py-6 text-base font-bold"
                      >
                        Continue to Additional Options
                      </Button>
                    )}
                  </div>
                )}

                {/* Step 3: Additional Options */}
                {currentStep >= 3 && selectedVehicle && contactInfo.fullName && (
                  <div className="space-y-4 p-6">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Step 3: Additional Options (Optional)
                    </Label>

                    <div className="space-y-3">
                      {/* Additional options would go here */}
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-green-600 hover:bg-green-700 py-6 text-base font-bold"
                    >
                      {submitting ? 'Processing...' : 'Complete Booking'}
                    </Button>
                  </div>
                )}

  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-xl border-2 border-blue-200">
    <Label className="text-xl font-bold flex items-center gap-2 text-gray-900">
      <Car className="h-6 w-6 text-blue-600" />
      Step 4: Select Your Vehicle
    </Label>
    <p className="text-sm text-gray-600 mt-2 mb-4">
      Choose a vehicle that fits {getTotalParticipants()} traveler{getTotalParticipants() > 1 ? 's' : ''}
    </p>
    
    {/* Booking Summary */}
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
            <CalendarIcon className="h-4 w-4" />
          </div>
          <div className="font-semibold text-gray-900">
            {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Date not set"}
          </div>
          <div className="text-xs text-gray-500">Tour Date</div>
        </div>
        
        <div className="text-center border-x border-blue-200">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
            <Clock className="h-4 w-4" />
          </div>
          <div className="font-semibold text-gray-900">
            {selectedTimeSlot || "Any time"}
          </div>
          <div className="text-xs text-gray-500">Start Time</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
            <Users className="h-4 w-4" />
          </div>
          <div className="font-semibold text-gray-900">
            {getTotalParticipants()} Person{getTotalParticipants() > 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-500">Total Travelers</div>
        </div>
      </div>
    </div>
  </div>

  {vehicleError && (
    <div className="flex items-center gap-2 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 shadow-sm">
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-medium">{vehicleError}</span>
    </div>
  )}

  <div className="grid grid-cols-1 gap-4">
    {/* Use transportVehicles array from tour data */}
    {(() => {
    
      
      // Use transportVehicles array if available, otherwise fallback to old logic
      let vehicles = [];
      
      if (tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0) {
       
        // Use the new transportVehicles array
        vehicles = tour.transportVehicles.map((vehicle: any) => ({
          id: vehicle.id,
          transportType: vehicle.transportType || '',
          transportModal: vehicle.transportModal || '',
          makeVariant: vehicle.makeVariant || '',
          capacity: parseInt(vehicle.capacity) || 4,
          price: vehicle.price || '',
          image: '/placeholder-car.png'
        }));
      } else {
       
        // Fallback to old logic for backward compatibility
        const variants = tour.makeVariant ? tour.makeVariant.split(',').map((v: string) => v.trim()) : [''];
        const types = tour.transportType ? tour.transportType.split(',').map((t: string) => t.trim()) : [''];
        const models = tour.transportModal ? tour.transportModal.split(',').map((m: string) => m.trim()) : [''];
        
        
        
        for (let i = 0; i < Math.max(variants.length, types.length, models.length); i++) {
          const vehicle = {
            id: `fallback-${i}`,
            transportType: types[i] || types[0] || '',
            transportModal: models[i] || models[0] || '',
            makeVariant: variants[i] || variants[0] || '',
            capacity: 4 + (i * 3), // Example: 4, 7, 10, 13 capacity
            price: '',
            image: '/placeholder-car.png'
          };
          vehicles.push(vehicle);
        }
      }
      
    
      return vehicles.map((vehicle: any, idx: number) => {
        const isSelected = selectedVehicle && 
          selectedVehicle.id === vehicle.id;
        const totalParticipants = getTotalParticipants();
        const canAccommodate = totalParticipants <= vehicle.capacity;
        
        // Create display name
        const displayName = [
          vehicle.transportType,
          vehicle.transportModal,
          vehicle.makeVariant
        ].filter(Boolean).join(' / ') || 'Vehicle';
        
        return (
          <div
            key={vehicle.id || idx}
            onClick={() => canAccommodate && handleVehicleSelect(vehicle)}
            className={`relative p-5 border-3 rounded-2xl cursor-pointer transition-all duration-300 ${
              isSelected 
                ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg ring-2 ring-green-500' 
                : canAccommodate 
                  ? 'border-gray-300 hover:border-blue-400 hover:shadow-md bg-white' 
                  : 'border-red-300 bg-gradient-to-br from-red-50 to-red-100 opacity-70 cursor-not-allowed'
            }`}
          >
            {isSelected && (
              <div className="absolute -top-2 -right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                <CheckCircle className="h-3 w-3" />
                Selected
              </div>
            )}
            
            {!canAccommodate && (
              <div className="absolute -top-2 -right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                <AlertCircle className="h-3 w-3" />
                Too Small
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${
                isSelected ? 'bg-green-200' : canAccommodate ? 'bg-[#5C7AC0]  hover:bg-[#284078]' : 'bg-red-100'
              }`}>
                <Car className={`h-10 w-10 ${
                  isSelected ? 'text-green-700' : canAccommodate ? 'text-blue-600' : 'text-red-600'
                }`} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  {displayName}
                </h4>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className={`text-sm font-semibold ${
                      canAccommodate ? 'text-green-700' : 'text-red-700'
                    }`}>
                      Capacity: {vehicle.capacity} Person{vehicle.capacity > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {!canAccommodate && (
                    <div className="flex items-center gap-1 text-red-700 text-xs font-medium bg-red-200 px-2 py-1 rounded-md inline-flex">
                      <AlertCircle className="h-3 w-3" />
                      Cannot fit {totalParticipants} travelers
                    </div>
                  )}
                  
                  {canAccommodate && (
                    <div className="flex items-center gap-1 text-green-700 text-xs font-medium bg-green-200 px-2 py-1 rounded-md inline-flex">
                      <CheckCircle className="h-3 w-3" />
                      Perfect fit for your group
                    </div>
                  )}
                  
                  {vehicle.price && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-blue-600">
                          ${vehicle.price}
                        </span>
                        <span className="text-sm text-gray-500">total</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      });
    })()}
  </div>

  <div className="pt-4 border-t border-gray-200">
    {selectedVehicle ? (
      <Button
        type="button"
        onClick={() => setCurrentStep(5)}
        disabled={getTotalParticipants() > selectedVehicle.capacity}
        className={`w-full py-6 text-lg font-bold ${
          getTotalParticipants() > selectedVehicle.capacity
            ? 'bg-gray-400 cursor-not-allowed opacity-60'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {getTotalParticipants() > selectedVehicle.capacity ? (
          <>
            <AlertCircle className="h-5 w-5 mr-2" />
            Vehicle Too Small - Select Larger Vehicle
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            Continue with Selected Vehicle
          </>
        )}
      </Button>
    ) : (
      <div className="text-center p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
        <AlertCircle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
        <p className="text-sm font-semibold text-yellow-800">
          Please select a vehicle to continue
        </p>
      </div>
    )}
  </div>
</div>
                )}

                {/* Step 3: Additional Options - Moved above, this is the actual implementation */}
                {currentStep >= 3 && contactInfo.fullName && (
                  <div className="space-y-4 p-6">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Step 3: Additional Options (Optional)
                    </Label>

                    <div className="space-y-3">
                      {/* Stroller Option */}
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

                      {/* Wheelchair Option */}
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

                      {/* Extra Luggage Option */}
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

                    {currentStep === 5 && (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(6)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                )}

                {/* Step 6: Contact Information & Submit */}
                {currentStep >= 6 && (
                  <>
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Step 6: Contact Information</Label>
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
                          required
                        />
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
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                      
                      {/* Vehicle Price - Fixed Price */}
                      <div className="flex justify-between text-sm">
                        <span>
                          {selectedVehicle ? 
                            `${selectedVehicle.transportType} ${selectedVehicle.makeVariant} (${selectedVehicle.capacity} people)` : 
                            'Vehicle Price'
                          }
                        </span>
                        <span>${(() => {
                          if (selectedVehicle && selectedVehicle.price) {
                            return parseFloat(selectedVehicle.price).toFixed(2);
                          }
                          if (selectedPricingSchedule?.netPrice) {
                            return parseFloat(selectedPricingSchedule.netPrice).toFixed(2);
                          }
                          return (tour.priceNumber || 0).toFixed(2);
                        })()}</span>
                      </div>
                      
                      {/* Participants Info - Not affecting price */}
                      <div className="text-xs text-gray-500 mt-2">
                        <div className="flex justify-between">
                          <span>Participants:</span>
                          <span>{participants.adults} adults{participants.children > 0 ? `, ${participants.children} children` : ''}{participants.seniors > 0 ? `, ${participants.seniors} seniors` : ''}</span>
                        </div>
                      </div>
                      
                      {/* Additional Options */}
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
                      className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                      disabled={submitting || !selectedDate || getTotalParticipants() === 0}
                    >
                      {submitting ? "Processing..." : `Book Now - $${total.toFixed(2)}`}
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
