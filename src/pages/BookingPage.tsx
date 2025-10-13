// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea';
// import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { postsAPI, bookingsAPI } from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
// import { format } from 'date-fns';
// import {
//   CalendarIcon,
//   Users,
//   DollarSign,
//   Clock,
//   MapPin,
//   Minus,
//   Plus,
//   CreditCard,
//   Shield,
//   CheckCircle,
//   ArrowLeft
// } from 'lucide-react';

// const BookingPage = () => {
//   const { tourId } = useParams();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useAuth();
//   const { toast } = useToast();
  
//   const [tour, setTour] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
  
//   // Booking form state
//   const [selectedDate, setSelectedDate] = useState<Date>();
//   const [participants, setParticipants] = useState({
//     adults: 1,
//     children: 0,
//     seniors: 0
//   });
//   const [contactInfo, setContactInfo] = useState({
//     fullName: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     specialRequirements: ''
//   });
//   const [specialRequests, setSpecialRequests] = useState('');

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: { pathname: `/booking/${tourId}` } } });
//       return;
//     }
    
//     if (tourId) {
//       fetchTour();
//     }
//   }, [tourId, isAuthenticated]);

//   useEffect(() => {
//     if (user) {
//       setContactInfo(prev => ({
//         ...prev,
//         fullName: user.name || prev.fullName,
//         email: user.email || prev.email,
//         phone: user.phone || prev.phone
//       }));
//     }
//   }, [user]);

//   const fetchTour = async () => {
//     try {
//       setLoading(true);
//       const response = await postsAPI.getPost(tourId!);
//       if (response.success) {
//         setTour(response.data);
//       } else {
//         navigate('/tours');
//         toast({
//           title: "Tour not found",
//           description: "The tour you're trying to book doesn't exist.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching tour:', error);
//       navigate('/tours');
//       toast({
//         title: "Error",
//         description: "Failed to load tour details.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateParticipants = (type: keyof typeof participants, increment: boolean) => {
//     setParticipants(prev => ({
//       ...prev,
//       [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
//     }));
//   };

//   const handleContactInfoChange = (field: string, value: string) => {
//     setContactInfo(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const calculateTotal = () => {
//     if (!tour || !tour.priceNumber) return 0;
//     const totalParticipants = participants.adults + participants.children + participants.seniors;
//     return tour.priceNumber * totalParticipants;
//   };

//   const getTotalParticipants = () => {
//     return participants.adults + participants.children + participants.seniors;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!selectedDate) {
//       toast({
//         title: "Date Required",
//         description: "Please select a tour date.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     if (getTotalParticipants() === 0) {
//       toast({
//         title: "Participants Required",
//         description: "Please select at least one participant.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);
      
//       const bookingData = {
//         postId: tourId,
//         tourDate: selectedDate,
//         participants,
//         contactInfo: {
//           ...contactInfo,
//           specialRequirements: contactInfo.specialRequirements || undefined
//         },
//         specialRequests: specialRequests || undefined
//       };

//       const response = await bookingsAPI.createBooking(bookingData);
      
//       if (response.success) {
//         toast({
//           title: "Booking Created!",
//           description: "Redirecting to payment...",
//         });
        
//         // Here you would typically redirect to Stripe Checkout
//         // For now, we'll redirect to bookings page
//         navigate('/bookings');
//       }
//     } catch (error: any) {
//       console.error('Booking error:', error);
//       toast({
//         title: "Booking Failed",
//         description: error.response?.data?.message || "Failed to create booking. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-card">
//         <div className="container px-4 py-8">
//           <div className="animate-pulse max-w-4xl mx-auto">
//             <div className="h-8 bg-muted rounded mb-8" />
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="space-y-4">
//                 <div className="h-64 bg-muted rounded" />
//                 <div className="h-32 bg-muted rounded" />
//               </div>
//               <div className="h-96 bg-muted rounded" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!tour) return null;

//   const total = calculateTotal();
//   const imageUrl = tour.imageUrl || tour.images?.[0] || '/placeholder.svg';

//   return (
//     <div className="min-h-screen bg-gradient-card">
//       <div className="container px-4 py-8">
//         {/* Back Button */}
//         <Button variant="ghost" onClick={() => navigate(`/tours/${tourId}`)} className="gap-2 mb-6">
//           <ArrowLeft className="h-4 w-4" />
//           Back to Tour Details
//         </Button>

//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Tour Summary */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MapPin className="h-5 w-5 text-primary" />
//                   Tour Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex gap-4">
//                   <img
//                     src={imageUrl}
//                     alt={tour.title}
//                     className="w-20 h-20 rounded-lg object-cover"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-lg">{tour.title}</h3>
//                     <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
//                       <div className="flex items-center gap-1">
//                         <Clock className="h-4 w-4" />
//                         <span>{tour.duration}</span>
//                       </div>
//                       {tour.prefecture && (
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           <span>{tour.prefecture}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <Badge variant="secondary">{tour.category}</Badge>
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-primary">
//                       ${tour.priceNumber || 0}
//                     </div>
//                     <div className="text-sm text-muted-foreground">per person</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Important Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Shield className="h-5 w-5 text-success" />
//                   Booking Protection
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center gap-2 text-sm">
//                   <CheckCircle className="h-4 w-4 text-success" />
//                   <span>Free cancellation up to 24 hours before tour</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <CheckCircle className="h-4 w-4 text-success" />
//                   <span>Instant confirmation</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <CheckCircle className="h-4 w-4 text-success" />
//                   <span>Reserve now, pay later available</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <Shield className="h-4 w-4 text-success" />
//                   <span>Safe and secure payment</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Booking Form */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CreditCard className="h-5 w-5 text-primary" />
//                 Complete Your Booking
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Date Selection */}
//                 <div className="space-y-2">
//                   <Label>Select Tour Date</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className="w-full justify-start text-left font-normal"
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={selectedDate}
//                         onSelect={setSelectedDate}
//                         disabled={(date) => date < new Date()}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>

//                 {/* Participants */}
//                 <div className="space-y-4">
//                   <Label className="flex items-center gap-2">
//                     <Users className="h-4 w-4" />
//                     Participants
//                   </Label>
                  
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="font-medium">Adults</div>
//                         <div className="text-sm text-muted-foreground">Ages 18+</div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           onClick={() => updateParticipants('adults', false)}
//                           disabled={participants.adults <= 1}
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span className="w-8 text-center">{participants.adults}</span>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           onClick={() => updateParticipants('adults', true)}
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="font-medium">Children</div>
//                         <div className="text-sm text-muted-foreground">Ages 3-17</div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           onClick={() => updateParticipants('children', false)}
//                           disabled={participants.children <= 0}
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span className="w-8 text-center">{participants.children}</span>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           onClick={() => updateParticipants('children', true)}
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="font-medium">Seniors</div>
//                         <div className="text-sm text-muted-foreground">Ages 65+</div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           onClick={() => updateParticipants('seniors', false)}
//                           disabled={participants.seniors <= 0}
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span className="w-8 text-center">{participants.seniors}</span>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           onClick={() => updateParticipants('seniors', true)}
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="space-y-4">
//                   <Label>Contact Information</Label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="fullName">Full Name</Label>
//                       <Input
//                         id="fullName"
//                         value={contactInfo.fullName}
//                         onChange={(e) => handleContactInfoChange('fullName', e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={contactInfo.email}
//                         onChange={(e) => handleContactInfoChange('email', e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       value={contactInfo.phone}
//                       onChange={(e) => handleContactInfoChange('phone', e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
//                     <Textarea
//                       id="specialRequirements"
//                       placeholder="Any dietary restrictions, accessibility needs, etc."
//                       value={contactInfo.specialRequirements}
//                       onChange={(e) => handleContactInfoChange('specialRequirements', e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 {/* Special Requests */}
//                 <div>
//                   <Label htmlFor="specialRequests">Additional Requests (Optional)</Label>
//                   <Textarea
//                     id="specialRequests"
//                     placeholder="Any special requests or notes for your tour guide..."
//                     value={specialRequests}
//                     onChange={(e) => setSpecialRequests(e.target.value)}
//                   />
//                 </div>

//                 <Separator />

//                 {/* Price Breakdown */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Adults × {participants.adults}</span>
//                     <span>${((tour.priceNumber || 0) * participants.adults).toFixed(2)}</span>
//                   </div>
//                   {participants.children > 0 && (
//                     <div className="flex justify-between text-sm">
//                       <span>Children × {participants.children}</span>
//                       <span>${((tour.priceNumber || 0) * participants.children).toFixed(2)}</span>
//                     </div>
//                   )}
//                   {participants.seniors > 0 && (
//                     <div className="flex justify-between text-sm">
//                       <span>Seniors × {participants.seniors}</span>
//                       <span>${((tour.priceNumber || 0) * participants.seniors).toFixed(2)}</span>
//                     </div>
//                   )}
//                   <Separator />
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-primary">${total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   variant="hero"
//                   size="lg"
//                   disabled={submitting || !selectedDate || getTotalParticipants() === 0}
//                 >
//                   {submitting ? "Processing..." : `Book Now - $${total.toFixed(2)}`}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
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
    const totalParticipants = participants.adults + participants.children + participants.seniors;
    
    let basePrice = 0;
    // Use selected pricing schedule if available
    if (selectedPricingSchedule && selectedPricingSchedule.netPrice) {
      basePrice = selectedPricingSchedule.netPrice * totalParticipants;
    } else {
      // Fallback to tour price
      basePrice = (tour.priceNumber || 0) * totalParticipants;
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
        // Skip day selection, go directly to time slot
        if (matchingSchedule.timeSlots && matchingSchedule.timeSlots.length > 0) {
          setCurrentStep(2);
        } else {
          setCurrentStep(3); // Skip to participants
        }
      } else {
        setCurrentStep(3); // Skip to participants if no pricing schedule
      }
    }
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    setCurrentStep(3);
  };

  const handleParticipantsConfirm = () => {
    if (getTotalParticipants() > 0) {
      // Check if transport/variant options exist
      if (tour.makeVariant || tour.transportType || tour.transportModal) {
        setCurrentStep(4);
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
    setSelectedVariant(vehicle.variant || '');
    setSelectedTransportType(vehicle.type || '');
    setSelectedTransportModal(vehicle.model || '');
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
                      ${selectedPricingSchedule?.netPrice || tour.priceNumber || 0}
                    </div>
                    {/* <div className="text-sm text-muted-foreground">per person</div> */}
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
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Date Selection */}
                {currentStep >= 1 && (
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Step 1: Select Tour Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
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
                  </div>
                )}

                {/* Step 2: Time Slot Selection */}
                {currentStep >= 2 && selectedPricingSchedule && selectedPricingSchedule.timeSlots && selectedPricingSchedule.timeSlots.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Step 2: Select Pickup Slot</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPricingSchedule.timeSlots.map((slot: string, i: number) => (
                        <Button
                          key={i}
                          type="button"
                          variant={selectedTimeSlot === slot ? "default" : "outline"}
                          className={`px-4 py-2 ${
                            selectedTimeSlot === slot ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'
                          }`}
                          onClick={() => handleTimeSlotSelect(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Number of Persons */}
                {currentStep >= 3 && (
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-lg font-semibold">
                      <Users className="h-5 w-5" />
                      Step 3: Number of Persons
                    </Label>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div>
                        <div className="font-medium">Number of persons</div>
                        <div className="text-sm text-muted-foreground">Total participants</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => updateParticipants('adults', false)}
                          disabled={participants.adults <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center font-semibold text-lg">{participants.adults}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => updateParticipants('adults', true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {currentStep === 3 && (
                      <Button
                        type="button"
                        onClick={handleParticipantsConfirm}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                )}

                {/* Step 4: Transport & Options */}
                {currentStep >= 4 && (tour.makeVariant || tour.transportType || tour.transportModal) && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Step 4: Transport & Options
                    </Label>

                    {vehicleError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm">{vehicleError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Create vehicle options by combining variant, type, and model */}
                      {(() => {
                        const variants = tour.makeVariant ? tour.makeVariant.split(',').map((v: string) => v.trim()) : [''];
                        const types = tour.transportType ? tour.transportType.split(',').map((t: string) => t.trim()) : [''];
                        const models = tour.transportModal ? tour.transportModal.split(',').map((m: string) => m.trim()) : [''];
                        
                        // Create vehicle combinations
                        const vehicles = [];
                        for (let i = 0; i < Math.max(variants.length, types.length, models.length); i++) {
                          const vehicle = {
                            variant: variants[i] || variants[0] || '',
                            type: types[i] || types[0] || '',
                            model: models[i] || models[0] || '',
                            capacity: 4 + (i * 3), // Example: 4, 7, 10, 13 capacity
                            image: '/placeholder-car.png'
                          };
                          vehicles.push(vehicle);
                        }
                        
                        return vehicles.map((vehicle, idx) => {
                          const isSelected = selectedVehicle && 
                            selectedVehicle.variant === vehicle.variant && 
                            selectedVehicle.type === vehicle.type && 
                            selectedVehicle.model === vehicle.model;
                          const totalParticipants = getTotalParticipants();
                          const canAccommodate = totalParticipants <= vehicle.capacity;
                          
                          return (
                            <div
                              key={idx}
                              onClick={() => canAccommodate && handleVehicleSelect(vehicle)}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                isSelected 
                                  ? 'border-green-500 bg-green-50' 
                                  : canAccommodate 
                                    ? 'border-gray-200 hover:border-green-300 bg-white' 
                                    : 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <Car className="h-8 w-8 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">
                                    {[vehicle.variant, vehicle.type, vehicle.model].filter(Boolean).join(' ')}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span className={`text-sm font-medium ${
                                      canAccommodate ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                      {tour.groupSize && (
  <div className=" gap-1 text-gray-700 text-xs">
    <span className="">Up to {tour.groupSize} Persons</span>
  </div>
)}


                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CheckCircle className="h-6 w-6 text-green-600" />
                                )}
                              </div>
                              {!canAccommodate && (
                                <div className="text-xs text-red-600 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Too small for {totalParticipants} participants
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {currentStep === 4 && selectedVehicle && (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(5)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                )}

                {/* Step 5: Additional Options */}
                {currentStep >= 5 && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Step 5: Additional Options (Optional)
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
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
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
                      
                      <div className="flex justify-between text-sm">
                        <span>Adults × {participants.adults}</span>
                        <span>${((selectedPricingSchedule?.netPrice || tour.priceNumber || 0) * participants.adults).toFixed(2)}</span>
                      </div>
                      {participants.children > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Children × {participants.children}</span>
                          <span>${((selectedPricingSchedule?.netPrice || tour.priceNumber || 0) * participants.children).toFixed(2)}</span>
                        </div>
                      )}
                      {participants.seniors > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Seniors × {participants.seniors}</span>
                          <span>${((selectedPricingSchedule?.netPrice || tour.priceNumber || 0) * participants.seniors).toFixed(2)}</span>
                        </div>
                      )}
                      
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
