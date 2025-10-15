

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
//   ArrowLeft,
//   Car,
//   Check,
//   Baby,
//   ShoppingBag,
//   AlertCircle
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
//   const [selectedDay, setSelectedDay] = useState<string>('');
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
//   const [selectedPricingSchedule, setSelectedPricingSchedule] = useState<any>(null);
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
//   const [selectedVariant, setSelectedVariant] = useState<string>('');
//   const [selectedTransportType, setSelectedTransportType] = useState<string>('');
//   const [selectedTransportModal, setSelectedTransportModal] = useState<string>('');
//   const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  
//   // Additional options
//   const [additionalOptions, setAdditionalOptions] = useState({
//     stroller: false,
//     wheelchair: false,
//     extraLuggage: false
//   });
  
//   // Step management
//   const [currentStep, setCurrentStep] = useState(1);
//   const [vehicleError, setVehicleError] = useState('');

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
//         console.log('🚗 TOUR DATA RECEIVED:', response.data);
//         console.log('🚗 Transport Vehicles:', response.data.transportVehicles);
//         console.log('🚗 Transport Type:', response.data.transportType);
//         console.log('🚗 Transport Modal:', response.data.transportModal);
//         console.log('🚗 Make Variant:', response.data.makeVariant);
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
//     if (!tour) return 0;
    
//     let basePrice = 0;
    
//     // Use selected vehicle price if available
//     if (selectedVehicle && selectedVehicle.price) {
//       basePrice = parseFloat(selectedVehicle.price) || 0;
//     } else if (selectedPricingSchedule && selectedPricingSchedule.netPrice) {
//       // Fallback to pricing schedule price (not multiplied by participants)
//       basePrice = parseFloat(selectedPricingSchedule.netPrice) || 0;
//     } else {
//       // Fallback to tour price (not multiplied by participants)
//       basePrice = tour.priceNumber || 0;
//     }
    
//     // Add additional options cost
//     let additionalCost = 0;
//     if (additionalOptions.stroller) additionalCost += 10;
//     if (additionalOptions.wheelchair) additionalCost += 15;
//     if (additionalOptions.extraLuggage) additionalCost += 12;
    
//     return basePrice + additionalCost;
//   };

//   const getTotalParticipants = () => {
//     return participants.adults + participants.children + participants.seniors;
//   };

//   const handleDateSelect = (date: Date | undefined) => {
//     setSelectedDate(date);
//     if (date) {
//       // Find matching pricing schedule
//       const dayName = format(date, 'EEEE');
//       const matchingSchedule = tour?.pricingSchedule?.find((schedule: any) => 
//         schedule.days && schedule.days.includes(dayName)
//       );
//       if (matchingSchedule) {
//         setSelectedPricingSchedule(matchingSchedule);
//         // Skip day selection, go directly to time slot
//         if (matchingSchedule.timeSlots && matchingSchedule.timeSlots.length > 0) {
//           setCurrentStep(2);
//         } else {
//           setCurrentStep(3); // Skip to participants
//         }
//       } else {
//         setCurrentStep(3); // Skip to participants if no pricing schedule
//       }
//     }
//   };

//   const handleTimeSlotSelect = (slot: string) => {
//     setSelectedTimeSlot(slot);
//     setCurrentStep(3);
//   };

//   const handleParticipantsConfirm = () => {
//     console.log('👥 Participants confirmed:', getTotalParticipants());
//     console.log('🚗 Tour transportVehicles:', tour.transportVehicles);
//     console.log('🚗 Tour makeVariant:', tour.makeVariant);
//     console.log('🚗 Tour transportType:', tour.transportType);
//     console.log('🚗 Tour transportModal:', tour.transportModal);
    
//     if (getTotalParticipants() > 0) {
//       // Check if transport vehicles exist (new system) or old transport fields (backward compatibility)
//       const hasTransportVehicles = tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0;
//       const hasOldTransportFields = tour.makeVariant || tour.transportType || tour.transportModal;
      
//       console.log('🔍 Has transport vehicles:', hasTransportVehicles);
//       console.log('🔍 Has old transport fields:', hasOldTransportFields);
      
//       if (hasTransportVehicles || hasOldTransportFields) {
//         console.log('✅ Going to Step 4 - Vehicle selection');
//         setCurrentStep(4); // Go to vehicle selection
//       } else {
//         console.log('⚠️ Skipping to Step 5 - No transport data');
//         setCurrentStep(5); // Skip to additional options
//       }
//     }
//   };

//   const handleVehicleSelect = (vehicle: any) => {
//     const totalParticipants = getTotalParticipants();
//     const capacity = parseInt(vehicle.capacity) || 0;
    
//     if (totalParticipants > capacity) {
//       setVehicleError(`This vehicle can accommodate up to ${capacity} persons. You have ${totalParticipants} participants. Please select a larger vehicle.`);
//       toast({
//         title: "Vehicle Capacity Exceeded",
//         description: `This vehicle can only accommodate ${capacity} persons. You have ${totalParticipants} participants.`,
//         variant: "destructive",
//       });
//       return;
//     }
    
//     setVehicleError('');
//     setSelectedVehicle(vehicle);
//     setSelectedVariant(vehicle.makeVariant || '');
//     setSelectedTransportType(vehicle.transportType || '');
//     setSelectedTransportModal(vehicle.transportModal || '');
//   };

//   const toggleAdditionalOption = (option: keyof typeof additionalOptions) => {
//     setAdditionalOptions(prev => ({
//       ...prev,
//       [option]: !prev[option]
//     }));
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
//         selectedDay,
//         selectedTimeSlot,
//         participants,
//         contactInfo: {
//           ...contactInfo,
//           specialRequirements: contactInfo.specialRequirements || undefined
//         },
//         specialRequests: specialRequests || undefined,
//         variant: selectedVariant || undefined,
//         transportType: selectedTransportType || undefined,
//         transportModal: selectedTransportModal || undefined,
//         selectedVehicle: selectedVehicle || undefined,
//         additionalOptions: {
//           stroller: additionalOptions.stroller,
//           wheelchair: additionalOptions.wheelchair,
//           extraLuggage: additionalOptions.extraLuggage
//         }
//       };

//       const response = await bookingsAPI.createBooking(bookingData);
      
//       if (response.success) {
//         toast({
//           title: "Booking Created!",
//           description: "Redirecting to payment...",
//         });
        
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
//   const imageUrl = tour.mainImageUrl || tour.imageUrl || tour.images?.[0] || '/placeholder.svg';

//   return (
//     <div className="min-h-screen bg-gray-50">
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
//                         <span>{tour.duration || tour.pricingSchedule?.[0]?.duration || 'N/A'}</span>
//                       </div>
//                       {tour.city && (
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           <span>{tour.city}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   {tour.category && <Badge variant="secondary">{tour.category}</Badge>}
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-primary">
//                       ${(() => {
//                         // Show selected vehicle price if available
//                         if (selectedVehicle && selectedVehicle.price) {
//                           return parseFloat(selectedVehicle.price).toFixed(2);
//                         }
//                         // Show pricing schedule price if available
//                         if (selectedPricingSchedule?.netPrice) {
//                           return parseFloat(selectedPricingSchedule.netPrice).toFixed(2);
//                         }
//                         // Fallback to tour price
//                         return (tour.priceNumber || 0).toFixed(2);
//                       })()}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Fixed Vehicle Price</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Important Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Shield className="h-5 w-5 text-green-600" />
//                   Booking Protection
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 {tour.freeCancellation && (
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle className="h-4 w-4 text-green-600" />
//                     <span>Free cancellation up to {tour.deadlineHours || 24} hours before tour</span>
//                   </div>
//                 )}
//                 <div className="flex items-center gap-2 text-sm">
//                   <CheckCircle className="h-4 w-4 text-green-600" />
//                   <span>Instant confirmation</span>
//                 </div>
//                 {tour.reserveNowPayLater && (
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle className="h-4 w-4 text-green-600" />
//                     <span>Reserve now, pay later available</span>
//                   </div>
//                 )}
//                 <div className="flex items-center gap-2 text-sm">
//                   <Shield className="h-4 w-4 text-green-600" />
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
//               <div className="flex gap-2 mt-4">
//                 {[1, 2, 3, 4, 5, 6].map((step) => (
//                   <div
//                     key={step}
//                     className={`h-2 flex-1 rounded-full ${
//                       step <= currentStep ? 'bg-green-500' : 'bg-gray-200'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Step 1: Date Selection */}
//                 {currentStep >= 1 && (
//                   <div className="space-y-2">
//                     <Label className="text-lg font-semibold">Step 1: Select Tour Date</Label>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant="outline"
//                           className="w-full justify-start text-left font-normal"
//                         >
//                           <CalendarIcon className="mr-2 h-4 w-4" />
//                           {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={selectedDate}
//                           onSelect={handleDateSelect}
//                           disabled={(date) => date < new Date()}
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   </div>
//                 )}

//                 {/* Step 2: Time Slot Selection */}
//                 {currentStep >= 2 && selectedPricingSchedule && selectedPricingSchedule.timeSlots && selectedPricingSchedule.timeSlots.length > 0 && (
//                   <div className="space-y-2">
//                     <Label className="text-lg font-semibold">Step 2: Select Pickup Slot</Label>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedPricingSchedule.timeSlots.map((slot: string, i: number) => (
//                         <Button
//                           key={i}
//                           type="button"
//                           variant={selectedTimeSlot === slot ? "default" : "outline"}
//                           className={`px-4 py-2 ${
//                             selectedTimeSlot === slot ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'
//                           }`}
//                           onClick={() => handleTimeSlotSelect(slot)}
//                         >
//                           {slot}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 3: Number of Persons */}
//                 {currentStep >= 3 && (
//                   <div className="space-y-4">
//                     <Label className="flex items-center gap-2 text-lg font-semibold">
//                       <Users className="h-5 w-5" />
//                       Step 3: Number of Persons
//                     </Label>
                    
//                     <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
//                       <div>
//                         <div className="font-medium">Number of persons</div>
//                         <div className="text-sm text-muted-foreground">Total participants</div>
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
//                         <span className="w-10 text-center font-semibold text-lg">{participants.adults}</span>
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

//                     {currentStep === 3 && (
//                       <Button
//                         type="button"
//                         onClick={handleParticipantsConfirm}
//                         className="w-full bg-green-600 hover:bg-green-700"
//                       >
//                         Continue
//                       </Button>
//                     )}
//                   </div>
//                 )}

//                 {/* Step 4: Transport & Options */}
//                 {(() => {
//                   const hasTransportVehicles = tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0;
//                   const hasOldTransportFields = tour.makeVariant || tour.transportType || tour.transportModal;
//                   const shouldShowStep4 = currentStep >= 4 && (hasTransportVehicles || hasOldTransportFields);
                  
//                   console.log('🔍 Step 4 Check:', {
//                     currentStep,
//                     hasTransportVehicles,
//                     hasOldTransportFields,
//                     shouldShowStep4,
//                     transportVehicles: tour.transportVehicles,
//                     makeVariant: tour.makeVariant,
//                     transportType: tour.transportType,
//                     transportModal: tour.transportModal
//                   });
                  
//                   return shouldShowStep4;
//                 })() && (
//                   // <div className="space-y-4">
//                   //   <Label className="text-lg font-semibold flex items-center gap-2">
//                   //     <Car className="h-5 w-5" />
//                   //     Step 4: Transport & Options
//                   //   </Label>

//                   //   {vehicleError && (
//                   //     <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
//                   //       <AlertCircle className="h-5 w-5" />
//                   //       <span className="text-sm">{vehicleError}</span>
//                   //     </div>
//                   //   )}

//                   //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   //     {/* Use transportVehicles array from tour data */}
//                   //     {(() => {
//                   //       console.log('🚗 RENDERING VEHICLES - Tour Data:', tour);
//                   //       console.log('🚗 Transport Vehicles Array:', tour.transportVehicles);
//                   //       console.log('🚗 Transport Type:', tour.transportType);
//                   //       console.log('🚗 Transport Modal:', tour.transportModal);
//                   //       console.log('🚗 Make Variant:', tour.makeVariant);
                        
//                   //       // Use transportVehicles array if available, otherwise fallback to old logic
//                   //       let vehicles = [];
                        
//                   //       if (tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0) {
//                   //         console.log('✅ Using transportVehicles array:', tour.transportVehicles);
//                   //         // Use the new transportVehicles array
//                   //         vehicles = tour.transportVehicles.map((vehicle: any) => ({
//                   //           id: vehicle.id,
//                   //           transportType: vehicle.transportType || '',
//                   //           transportModal: vehicle.transportModal || '',
//                   //           makeVariant: vehicle.makeVariant || '',
//                   //           capacity: parseInt(vehicle.capacity) || 4,
//                   //           price: vehicle.price || '',
//                   //           image: '/placeholder-car.png'
//                   //         }));
//                   //       } else {
//                   //         console.log('⚠️ Falling back to old logic');
//                   //         // Fallback to old logic for backward compatibility
//                   //         const variants = tour.makeVariant ? tour.makeVariant.split(',').map((v: string) => v.trim()) : [''];
//                   //         const types = tour.transportType ? tour.transportType.split(',').map((t: string) => t.trim()) : [''];
//                   //         const models = tour.transportModal ? tour.transportModal.split(',').map((m: string) => m.trim()) : [''];
                          
//                   //         console.log('🔍 Fallback data:', { variants, types, models });
                          
//                   //         for (let i = 0; i < Math.max(variants.length, types.length, models.length); i++) {
//                   //           const vehicle = {
//                   //             id: `fallback-${i}`,
//                   //             transportType: types[i] || types[0] || '',
//                   //             transportModal: models[i] || models[0] || '',
//                   //             makeVariant: variants[i] || variants[0] || '',
//                   //             capacity: 4 + (i * 3), // Example: 4, 7, 10, 13 capacity
//                   //             price: '',
//                   //             image: '/placeholder-car.png'
//                   //           };
//                   //           vehicles.push(vehicle);
//                   //         }
//                   //       }
                        
//                   //       console.log('🚗 Final vehicles array:', vehicles);
//                   //       return vehicles.map((vehicle: any, idx: number) => {
//                   //         const isSelected = selectedVehicle && 
//                   //           selectedVehicle.id === vehicle.id;
//                   //         const totalParticipants = getTotalParticipants();
//                   //         const canAccommodate = totalParticipants <= vehicle.capacity;
                          
//                   //         // Create display name
//                   //         const displayName = [
//                   //           vehicle.transportType,
//                   //           vehicle.transportModal,
//                   //           vehicle.makeVariant
//                   //         ].filter(Boolean).join(' / ') || 'Vehicle';
                          
//                   //         return (
//                   //           <div
//                   //             key={vehicle.id || idx}
//                   //             onClick={() => canAccommodate && handleVehicleSelect(vehicle)}
//                   //             className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                   //               isSelected 
//                   //                 ? 'border-green-500 bg-green-50' 
//                   //                 : canAccommodate 
//                   //                   ? 'border-gray-200 hover:border-green-300 bg-white' 
//                   //                   : 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed'
//                   //             }`}
//                   //           >
//                   //             <div className="flex items-center gap-3 mb-3">
//                   //               <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
//                   //                 <Car className="h-8 w-8 text-gray-600" />
//                   //               </div>
//                   //               <div className="flex-1">
//                   //                 <h4 className="font-semibold text-gray-900">
//                   //                   {displayName}
//                   //                 </h4>
//                   //                 <div className="flex items-center gap-2 mt-1">
//                   //                   <Users className="h-4 w-4 text-gray-500" />
//                   //                   <span className={`text-sm font-medium ${
//                   //                     canAccommodate ? 'text-green-600' : 'text-red-600'
//                   //                   }`}>
//                   //                     Up to {vehicle.capacity} Persons
//                   //                   </span>
//                   //                   {vehicle.price && (
//                   //                     <span className="text-sm font-bold text-blue-600 ml-2">
//                   //                       ${vehicle.price}
//                   //                     </span>
//                   //                   )}
//                   //                 </div>
//                   //               </div>
//                   //               {isSelected && (
//                   //                 <CheckCircle className="h-6 w-6 text-green-600" />
//                   //               )}
//                   //             </div>
//                   //             {!canAccommodate && (
//                   //               <div className="text-xs text-red-600 flex items-center gap-1">
//                   //                 <AlertCircle className="h-3 w-3" />
//                   //                 Too small for {totalParticipants} participants
//                   //               </div>
//                   //             )}
//                   //           </div>
//                   //         );
//                   //       });
//                   //     })()}
//                   //   </div>

//                   //   {currentStep === 4 && selectedVehicle && (
//                   //     <Button
//                   //       type="button"
//                   //       onClick={() => setCurrentStep(5)}
//                   //       className="w-full bg-green-600 hover:bg-green-700"
//                   //     >
//                   //       Continue
//                   //     </Button>
//                   //   )}
//                   // </div>
//                   <div className="space-y-4">
//   <Label className="text-lg font-semibold flex items-center gap-2">
//     <Car className="h-5 w-5" />
//     Step 4: Transport & Options
//   </Label>

//   {vehicleError && (
//     <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
//       <AlertCircle className="h-5 w-5" />
//       <span className="text-sm">{vehicleError}</span>
//     </div>
//   )}

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {/* Use transportVehicles array from tour data */}
//     {(() => {
//       console.log('🚗 RENDERING VEHICLES - Tour Data:', tour);
//       console.log('🚗 Transport Vehicles Array:', tour.transportVehicles);
//       console.log('🚗 Transport Type:', tour.transportType);
//       console.log('🚗 Transport Modal:', tour.transportModal);
//       console.log('🚗 Make Variant:', tour.makeVariant);
      
//       // Use transportVehicles array if available, otherwise fallback to old logic
//       let vehicles = [];
      
//       if (tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0) {
//         console.log('✅ Using transportVehicles array:', tour.transportVehicles);
//         // Use the new transportVehicles array
//         vehicles = tour.transportVehicles.map((vehicle: any) => ({
//           id: vehicle.id,
//           transportType: vehicle.transportType || '',
//           transportModal: vehicle.transportModal || '',
//           makeVariant: vehicle.makeVariant || '',
//           capacity: parseInt(vehicle.capacity) || 4,
//           price: vehicle.price || '',
//           image: '/placeholder-car.png'
//         }));
//       } else {
//         console.log('⚠️ Falling back to old logic');
//         // Fallback to old logic for backward compatibility
//         const variants = tour.makeVariant ? tour.makeVariant.split(',').map((v: string) => v.trim()) : [''];
//         const types = tour.transportType ? tour.transportType.split(',').map((t: string) => t.trim()) : [''];
//         const models = tour.transportModal ? tour.transportModal.split(',').map((m: string) => m.trim()) : [''];
        
//         console.log('🔍 Fallback data:', { variants, types, models });
        
//         for (let i = 0; i < Math.max(variants.length, types.length, models.length); i++) {
//           const vehicle = {
//             id: `fallback-${i}`,
//             transportType: types[i] || types[0] || '',
//             transportModal: models[i] || models[0] || '',
//             makeVariant: variants[i] || variants[0] || '',
//             capacity: 4 + (i * 3), // Example: 4, 7, 10, 13 capacity
//             price: '',
//             image: '/placeholder-car.png'
//           };
//           vehicles.push(vehicle);
//         }
//       }
      
//       console.log('🚗 Final vehicles array:', vehicles);
//       return vehicles.map((vehicle: any, idx: number) => {
//         const isSelected = selectedVehicle && 
//           selectedVehicle.id === vehicle.id;
//         const totalParticipants = getTotalParticipants();
//         const canAccommodate = totalParticipants <= vehicle.capacity;
        
//         // Create display name
//         const displayName = [
//           vehicle.transportType,
//           vehicle.transportModal,
//           vehicle.makeVariant
//         ].filter(Boolean).join(' / ') || 'Vehicle';
        
//         return (
//           <div
//             key={vehicle.id || idx}
//             onClick={() => canAccommodate && handleVehicleSelect(vehicle)}
//             className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//               isSelected 
//                 ? 'border-green-500 bg-green-50' 
//                 : canAccommodate 
//                   ? 'border-gray-200 hover:border-green-300 bg-white' 
//                   : 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed'
//             }`}
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <Car className="h-8 w-8 text-gray-600" />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-semibold text-gray-900">
//                   {displayName}
//                 </h4>
//                 <div className="flex items-center gap-2 mt-1">
//                   <Users className="h-4 w-4 text-gray-500" />
//                   <span className={`text-sm font-medium ${
//                     canAccommodate ? 'text-green-600' : 'text-red-600'
//                   }`}>
//                     Up to {vehicle.capacity} Persons
//                   </span>
//                   {vehicle.price && (
//                     <span className="text-sm font-bold text-blue-600 ml-2">
//                       ${vehicle.price}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               {isSelected && (
//                 <CheckCircle className="h-6 w-6 text-green-600" />
//               )}
//             </div>
//             {!canAccommodate && (
//               <div className="text-xs text-red-600 flex items-center gap-1">
//                 <AlertCircle className="h-3 w-3" />
//                 Too small for {totalParticipants} participants
//               </div>
//             )}
//           </div>
//         );
//       });
//     })()}
//   </div>

//   {currentStep === 4 && selectedVehicle && (
//     <Button
//       type="button"
//       onClick={() => setCurrentStep(5)}
//       disabled={getTotalParticipants() > selectedVehicle.capacity}
//       className={`w-full ${
//         getTotalParticipants() > selectedVehicle.capacity
//           ? 'bg-gray-400 cursor-not-allowed opacity-60'
//           : 'bg-green-600 hover:bg-green-700'
//       }`}
//     >
//       {getTotalParticipants() > selectedVehicle.capacity
//         ? 'Vehicle Too Small - Select Larger Vehicle'
//         : 'Continue'}
//     </Button>
//   )}
// </div>
//                 )}

//                 {/* Step 5: Additional Options */}
//                 {currentStep >= 5 && (
//                   <div className="space-y-4">
//                     <Label className="text-lg font-semibold flex items-center gap-2">
//                       <ShoppingBag className="h-5 w-5" />
//                       Step 5: Additional Options (Optional)
//                     </Label>

//                     <div className="space-y-3">
//                       {/* Stroller Option */}
//                       <div
//                         onClick={() => toggleAdditionalOption('stroller')}
//                         className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                           additionalOptions.stroller 
//                             ? 'border-blue-500 bg-blue-50' 
//                             : 'border-gray-200 hover:border-blue-300 bg-white'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 bg-[#5C7AC0]  hover:bg-[#284078] rounded-lg flex items-center justify-center">
//                               <Baby className="h-6 w-6 text-blue-600" />
//                             </div>
//                             <div>
//                               <h4 className="font-semibold text-gray-900">Baby Stroller</h4>
//                               <p className="text-sm text-gray-600">Comfortable stroller for infants</p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-bold text-blue-600">+$10</div>
//                             {additionalOptions.stroller && (
//                               <CheckCircle className="h-5 w-5 text-blue-600 ml-auto mt-1" />
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Wheelchair Option */}
//                       <div
//                         onClick={() => toggleAdditionalOption('wheelchair')}
//                         className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                           additionalOptions.wheelchair 
//                             ? 'border-purple-500 bg-purple-50' 
//                             : 'border-gray-200 hover:border-purple-300 bg-white'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                               <Users className="h-6 w-6 text-purple-600" />
//                             </div>
//                             <div>
//                               <h4 className="font-semibold text-gray-900">Wheelchair Accessible</h4>
//                               <p className="text-sm text-gray-600">Wheelchair-friendly vehicle</p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-bold text-purple-600">+$15</div>
//                             {additionalOptions.wheelchair && (
//                               <CheckCircle className="h-5 w-5 text-purple-600 ml-auto mt-1" />
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Extra Luggage Option */}
//                       <div
//                         onClick={() => toggleAdditionalOption('extraLuggage')}
//                         className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                           additionalOptions.extraLuggage 
//                             ? 'border-orange-500 bg-orange-50' 
//                             : 'border-gray-200 hover:border-orange-300 bg-white'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                               <ShoppingBag className="h-6 w-6 text-orange-600" />
//                             </div>
//                             <div>
//                               <h4 className="font-semibold text-gray-900">Extra Luggage Space</h4>
//                               <p className="text-sm text-gray-600">Additional storage for bags</p>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-bold text-orange-600">+$12</div>
//                             {additionalOptions.extraLuggage && (
//                               <CheckCircle className="h-5 w-5 text-orange-600 ml-auto mt-1" />
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {currentStep === 5 && (
//                       <Button
//                         type="button"
//                         onClick={() => setCurrentStep(6)}
//                         className="w-full bg-green-600 hover:bg-green-700"
//                       >
//                         Continue
//                       </Button>
//                     )}
//                   </div>
//                 )}

//                 {/* Step 6: Contact Information & Submit */}
//                 {currentStep >= 6 && (
//                   <>
//                     <div className="space-y-4">
//                       <Label className="text-lg font-semibold">Step 6: Contact Information</Label>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <Label htmlFor="fullName">Full Name</Label>
//                           <Input
//                             id="fullName"
//                             value={contactInfo.fullName}
//                             onChange={(e) => handleContactInfoChange('fullName', e.target.value)}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="email">Email</Label>
//                           <Input
//                             id="email"
//                             type="email"
//                             value={contactInfo.email}
//                             onChange={(e) => handleContactInfoChange('email', e.target.value)}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <Label htmlFor="phone">Phone Number</Label>
//                         <Input
//                           id="phone"
//                           type="tel"
//                           value={contactInfo.phone}
//                           onChange={(e) => handleContactInfoChange('phone', e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
//                         <Textarea
//                           id="specialRequirements"
//                           placeholder="Any dietary restrictions, accessibility needs, etc."
//                           value={contactInfo.specialRequirements}
//                           onChange={(e) => handleContactInfoChange('specialRequirements', e.target.value)}
//                         />
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* Price Breakdown */}
//                     <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                      
//                       {/* Vehicle Price - Fixed Price */}
//                       <div className="flex justify-between text-sm">
//                         <span>
//                           {selectedVehicle ? 
//                             `${selectedVehicle.transportType} ${selectedVehicle.makeVariant} (${selectedVehicle.capacity} people)` : 
//                             'Vehicle Price'
//                           }
//                         </span>
//                         <span>${(() => {
//                           if (selectedVehicle && selectedVehicle.price) {
//                             return parseFloat(selectedVehicle.price).toFixed(2);
//                           }
//                           if (selectedPricingSchedule?.netPrice) {
//                             return parseFloat(selectedPricingSchedule.netPrice).toFixed(2);
//                           }
//                           return (tour.priceNumber || 0).toFixed(2);
//                         })()}</span>
//                       </div>
                      
//                       {/* Participants Info - Not affecting price */}
//                       <div className="text-xs text-gray-500 mt-2">
//                         <div className="flex justify-between">
//                           <span>Participants:</span>
//                           <span>{participants.adults} adults{participants.children > 0 ? `, ${participants.children} children` : ''}{participants.seniors > 0 ? `, ${participants.seniors} seniors` : ''}</span>
//                         </div>
//                       </div>
                      
//                       {/* Additional Options */}
//                       {(additionalOptions.stroller || additionalOptions.wheelchair || additionalOptions.extraLuggage) && (
//                         <>
//                           <Separator className="my-2" />
//                           <div className="text-sm font-semibold text-gray-700 mb-1">Additional Options:</div>
//                           {additionalOptions.stroller && (
//                             <div className="flex justify-between text-sm text-blue-600">
//                               <span>Baby Stroller</span>
//                               <span>+$10.00</span>
//                             </div>
//                           )}
//                           {additionalOptions.wheelchair && (
//                             <div className="flex justify-between text-sm text-purple-600">
//                               <span>Wheelchair Accessible</span>
//                               <span>+$15.00</span>
//                             </div>
//                           )}
//                           {additionalOptions.extraLuggage && (
//                             <div className="flex justify-between text-sm text-orange-600">
//                               <span>Extra Luggage Space</span>
//                               <span>+$12.00</span>
//                             </div>
//                           )}
//                         </>
//                       )}
                      
//                       <Separator />
//                       <div className="flex justify-between text-lg font-bold">
//                         <span>Total</span>
//                         <span className="text-green-600">${total.toFixed(2)}</span>
//                       </div>
//                     </div>

//                     <Button
//                       type="submit"
//                       className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
//                       disabled={submitting || !selectedDate || getTotalParticipants() === 0}
//                     >
//                       {submitting ? "Processing..." : `Book Now - $${total.toFixed(2)}`}
//                     </Button>
//                   </>
//                 )}
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;















// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
// import { Separator } from '@/components/ui/separator';
// import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { postsAPI, bookingsAPI } from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
// import { format } from 'date-fns';
// import {
//   Calendar as CalIcon,
//   Users,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
//   Car,
//   Baby,
//   ShoppingBag
// } from 'lucide-react';

// const BookingPage = () => {
//   const { tourId } = useParams();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useAuth();
//   const { toast } = useToast();
  
//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
  
//   const [selectedDate, setSelectedDate] = useState();
//   const [selectedDay, setSelectedDay] = useState('');
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//   const [selectedPricingSchedule, setSelectedPricingSchedule] = useState(null);
//   const [participants, setParticipants] = useState({
//     adults: 2,
//     children: 0,
//     seniors: 0
//   });
//   const [contactInfo, setContactInfo] = useState({
//     fullName: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     specialRequirements: ''
//   });
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState('');
//   const [selectedTransportType, setSelectedTransportType] = useState('');
//   const [selectedTransportModal, setSelectedTransportModal] = useState('');
//   const [additionalOptions, setAdditionalOptions] = useState({
//     stroller: false,
//     wheelchair: false,
//     extraLuggage: false
//   });
//   const [showDialog, setShowDialog] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState('');
//   const [isDialogValid, setIsDialogValid] = useState(false);
//   const [showContactForm, setShowContactForm] = useState(false);

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
//       const response = await postsAPI.getPost(tourId);
//       if (response.success) {
//         setTour(response.data);
        
//         if (response.data.pricingSchedule?.[0]?.timeSlots?.length > 0) {
//           setSelectedTimeSlot(response.data.pricingSchedule[0].timeSlots[0]);
//         }
//       } else {
//         navigate('/tours');
//         toast({
//           title: "Tour not found",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching tour:', error);
//       navigate('/tours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTotalParticipants = () => {
//     return participants.adults + participants.children + participants.seniors;
//   };

//   const updateParticipants = (type, increment) => {
//     setParticipants(prev => ({
//       ...prev,
//       [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
//     }));
//   };

//   const handleContactInfoChange = (field, value) => {
//     setContactInfo(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const calculateTotal = () => {
//     if (!tour) return 0;
    
//     let basePrice = 0;
    
//     if (selectedVehicle && selectedVehicle.price) {
//       basePrice = parseFloat(selectedVehicle.price) || 0;
//     } else if (selectedPricingSchedule && selectedPricingSchedule.netPrice) {
//       basePrice = parseFloat(selectedPricingSchedule.netPrice) || 0;
//     } else {
//       basePrice = tour.priceNumber || 0;
//     }
    
//     let additionalCost = 0;
//     if (additionalOptions.stroller) additionalCost += 10;
//     if (additionalOptions.wheelchair) additionalCost += 15;
//     if (additionalOptions.extraLuggage) additionalCost += 12;
    
//     return basePrice + additionalCost;
//   };

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     if (date) {
//       const dayName = format(date, 'EEEE');
//       setSelectedDay(dayName);
//       const matchingSchedule = tour?.pricingSchedule?.find((schedule) => 
//         schedule.days && schedule.days.includes(dayName)
//       );
//       if (matchingSchedule) {
//         setSelectedPricingSchedule(matchingSchedule);
//         if (matchingSchedule.timeSlots && matchingSchedule.timeSlots.length > 0) {
//           setSelectedTimeSlot(matchingSchedule.timeSlots[0]);
//         }
//       }
//     }
//   };

//   const validateAndCheck = () => {
//     const total = getTotalParticipants();
    
//     if (total === 0) {
//       setDialogMessage('Please select at least 1 participant');
//       setIsDialogValid(false);
//       setShowDialog(true);
//       return;
//     }

//     if (!selectedDate) {
//       setDialogMessage('Please select a date');
//       setIsDialogValid(false);
//       setShowDialog(true);
//       return;
//     }

//     setDialogMessage(`Great! ${total} participant${total > 1 ? 's' : ''} selected. You can now select a vehicle.`);
//     setIsDialogValid(true);
//     setShowDialog(true);
//   };

//   const handleVehicleReserve = (vehicle) => {
//     const totalParticipants = getTotalParticipants();
//     const capacity = parseInt(vehicle.capacity) || 0;
    
//     if (totalParticipants > capacity) {
//       setDialogMessage(`This vehicle can accommodate up to ${capacity} persons. You have ${totalParticipants} participants. Please select a larger vehicle or reduce the number of participants.`);
//       setIsDialogValid(false);
//       setShowDialog(true);
//       return;
//     }

//     if (!selectedDate) {
//       setDialogMessage('Please select a date first');
//       setIsDialogValid(false);
//       setShowDialog(true);
//       return;
//     }

//     setSelectedVehicle(vehicle);
//     setSelectedVariant(vehicle.makeVariant || '');
//     setSelectedTransportType(vehicle.transportType || '');
//     setSelectedTransportModal(vehicle.transportModal || '');
    
//     // Check if transport vehicles exist (means multi-step flow)
//     const hasTransportVehicles = tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0;
//     const hasOldTransportFields = tour.makeVariant || tour.transportType || tour.transportModal;
    
//     if (hasTransportVehicles || hasOldTransportFields) {
//       // Show additional options
//       setShowContactForm(true);
//     } else {
//       // Direct booking without additional steps
//       proceedToBooking(vehicle);
//     }
//   };

//   const toggleAdditionalOption = (option) => {
//     setAdditionalOptions(prev => ({
//       ...prev,
//       [option]: !prev[option]
//     }));
//   };

//   const proceedToBooking = async (vehicle) => {
//     try {
//       setSubmitting(true);
      
//       const bookingData = {
//         postId: tourId,
//         tourDate: selectedDate,
//         selectedDay,
//         selectedTimeSlot,
//         participants,
//         contactInfo: {
//           ...contactInfo,
//           specialRequirements: contactInfo.specialRequirements || undefined
//         },
//         variant: selectedVariant || undefined,
//         transportType: selectedTransportType || undefined,
//         transportModal: selectedTransportModal || undefined,
//         selectedVehicle: vehicle || selectedVehicle || undefined,
//         additionalOptions: {
//           stroller: additionalOptions.stroller,
//           wheelchair: additionalOptions.wheelchair,
//           extraLuggage: additionalOptions.extraLuggage
//         }
//       };

//       const response = await bookingsAPI.createBooking(bookingData);
      
//       if (response.success) {
//         setDialogMessage(`Perfect! Your ${vehicle?.makeVariant || 'vehicle'} booking for ${getTotalParticipants()} participant${getTotalParticipants() > 1 ? 's' : ''} is confirmed.`);
//         setIsDialogValid(true);
//         setShowDialog(true);
        
//         setTimeout(() => {
//           navigate('/bookings');
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Booking error:', error);
//       toast({
//         title: "Booking Failed",
//         description: error.response?.data?.message || "Failed to create booking.",
//         variant: "destructive",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleFinalSubmit = (e) => {
//     e.preventDefault();
    
//     if (!contactInfo.fullName || !contactInfo.email || !contactInfo.phone) {
//       toast({
//         title: "Contact Information Required",
//         description: "Please fill in all contact fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     proceedToBooking(selectedVehicle);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading tour details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!tour) return null;

//   // Prepare vehicles array
//   let vehicles = [];
//   if (tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0) {
//     vehicles = tour.transportVehicles.map((vehicle) => ({
//       id: vehicle.id,
//       transportType: vehicle.transportType || '',
//       transportModal: vehicle.transportModal || '',
//       makeVariant: vehicle.makeVariant || '',
//       capacity: parseInt(vehicle.capacity) || 4,
//       price: vehicle.price || '',
//       features: vehicle.features || [],
//       isPopular: vehicle.isPopular || false
//     }));
//   } else if (tour.makeVariant || tour.transportType || tour.transportModal) {
//     const variants = tour.makeVariant ? tour.makeVariant.split(',').map(v => v.trim()) : [''];
//     const types = tour.transportType ? tour.transportType.split(',').map(t => t.trim()) : [''];
//     const models = tour.transportModal ? tour.transportModal.split(',').map(m => m.trim()) : [''];
    
//     for (let i = 0; i < Math.max(variants.length, types.length, models.length); i++) {
//       vehicles.push({
//         id: `vehicle-${i}`,
//         transportType: types[i] || types[0] || '',
//         transportModal: models[i] || models[0] || '',
//         makeVariant: variants[i] || variants[0] || '',
//         capacity: 4 + (i * 3),
//         price: selectedPricingSchedule?.netPrice || tour.priceNumber || '',
//         features: [
//           'With English speaking guide',
//           `Up to ${4 + (i * 3)} passengers`,
//           'Pickup included'
//         ],
//         isPopular: i === 0
//       });
//     }
//   }

//   const availableTimeSlots = selectedPricingSchedule?.timeSlots || 
//     tour.pricingSchedule?.[0]?.timeSlots || 
//     ['7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM'];

//   const total = calculateTotal();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section - Image Style */}
//         <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-6 rounded-t-xl shadow-lg">
//           <h1 className="text-2xl font-bold mb-4">Select date and travelers</h1>
          
//           <div className="flex flex-wrap gap-4 items-center">
//             {/* Date Selection */}
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="bg-white text-gray-800 hover:bg-gray-50 min-w-[250px] justify-start"
//                 >
//                   <CalIcon className="mr-2 h-5 w-5" />
//                   {selectedDate ? format(selectedDate, "EEEE, MMMM dd, yyyy") : "Monday, November 17, 2025"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={selectedDate}
//                   onSelect={handleDateSelect}
//                   disabled={(date) => date < new Date()}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
            
//             {/* Participants Counter */}
//             <div className="flex items-center gap-3 bg-white text-gray-800 px-4 py-2 rounded-lg">
//               <Users className="h-5 w-5" />
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => updateParticipants('adults', false)}
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold transition"
//                 >
//                   -
//                 </button>
//                 <span className="font-bold text-lg w-8 text-center">
//                   {getTotalParticipants()}
//                 </span>
//                 <button
//                   onClick={() => updateParticipants('adults', true)}
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold transition"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <Button
//               onClick={validateAndCheck}
//               className="bg-green-400 hover:bg-green-500 text-green-900 font-bold px-6"
//             >
//               Check availability
//             </Button>
//           </div>
//         </div>

//         {/* Info Banner */}
//         <div className="bg-green-100 border-l-4 border-green-500 p-4 flex items-center gap-2">
//           <CheckCircle className="h-5 w-5 text-green-600" />
//           <span className="text-green-800 font-medium">
//             Book ahead • This is booked {tour.averageBookingDays || 35} days in advance on average.
//           </span>
//         </div>

//         {/* Vehicle Options Grid - Image Style */}
//         {vehicles.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//             {vehicles.map((vehicle, index) => {
//               const totalParticipants = getTotalParticipants();
//               const canAccommodate = totalParticipants <= vehicle.capacity;
//               const displayName = [
//                 vehicle.makeVariant,
//                 vehicle.transportModal,
//                 vehicle.transportType
//               ].filter(Boolean).join(' ') || `Vehicle ${index + 1}`;

//               return (
//                 <Card key={vehicle.id} className="relative hover:shadow-xl transition-shadow">
//                   {vehicle.isPopular && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <Badge className="bg-black text-white">Popular</Badge>
//                     </div>
//                   )}
                  
//                   <CardHeader>
//                     <CardTitle className="text-xl">{displayName}</CardTitle>
//                   </CardHeader>
                  
//                   <CardContent className="space-y-4">
//                     <ul className="space-y-2 text-sm">
//                       {vehicle.features && vehicle.features.length > 0 ? (
//                         vehicle.features.map((feature, idx) => (
//                           <li key={idx} className="flex items-start gap-2">
//                             <span className="text-green-600 mt-1">•</span>
//                             <span className="text-gray-700">{feature}</span>
//                           </li>
//                         ))
//                       ) : (
//                         <>
//                           <li className="flex items-start gap-2">
//                             <span className="text-green-600 mt-1">•</span>
//                             <span className="text-gray-700">With English speaking guide</span>
//                           </li>
//                           <li className="flex items-start gap-2">
//                             <span className="text-green-600 mt-1">•</span>
//                             <span className="text-gray-700">Up to {vehicle.capacity} passengers</span>
//                           </li>
//                           <li className="flex items-start gap-2">
//                             <span className="text-green-600 mt-1">•</span>
//                             <span className="text-gray-700">Pickup included</span>
//                           </li>
//                         </>
//                       )}
//                     </ul>

//                     {!canAccommodate && (
//                       <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
//                         <AlertCircle className="h-4 w-4" />
//                         Too small for {totalParticipants} participants
//                       </div>
//                     )}

//                     <div className="pt-4 border-t">
//                       <div className="text-2xl font-bold text-gray-900">
//                         Total ${parseFloat(vehicle.price || 0).toFixed(2)}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         Per group (up to {vehicle.capacity}) x ${parseFloat(vehicle.price || 0).toFixed(2)}
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Choose start time:</label>
//                       <div className="relative">
//                         <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//                         <select
//                           value={selectedTimeSlot}
//                           onChange={(e) => setSelectedTimeSlot(e.target.value)}
//                           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         >
//                           {availableTimeSlots.map((time, idx) => (
//                             <option key={idx} value={time}>{time}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <Button
//                       onClick={() => handleVehicleReserve(vehicle)}
//                       disabled={submitting || !canAccommodate}
//                       className={`w-full font-bold py-6 text-lg ${
//                         canAccommodate
//                           ? 'bg-green-400 hover:bg-green-500 text-green-900'
//                           : 'bg-gray-300 cursor-not-allowed'
//                       }`}
//                     >
//                       {submitting ? (
//                         <>
//                           <Loader2 className="h-5 w-5 mr-2 animate-spin" />
//                           Processing...
//                         </>
//                       ) : (
//                         'Reserve'
//                       )}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         ) : (
//           <Card className="mt-6">
//             <CardContent className="p-8 text-center">
//               <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">No Vehicles Available</h3>
//               <p className="text-gray-600">Please contact us for booking options.</p>
//             </CardContent>
//           </Card>
//         )}

//         {/* Footer Notes */}
//         <div className="mt-6 text-sm text-gray-600 space-y-1">
//           <p>*Popular option based on the number of bookings on the Tripadvisor site over the past 60 days.</p>
//           <p>(Price includes taxes and booking fees)</p>
//         </div>

//         {/* Contact Form Dialog - Opens after vehicle selection */}
//         <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Complete Your Booking</DialogTitle>
//               <DialogDescription>
//                 Please provide your contact information and any additional options.
//               </DialogDescription>
//             </DialogHeader>
            
//             <form onSubmit={handleFinalSubmit} className="space-y-6">
//               {/* Additional Options */}
//               <div className="space-y-4">
//                 <Label className="text-lg font-semibold flex items-center gap-2">
//                   <ShoppingBag className="h-5 w-5" />
//                   Additional Options (Optional)
//                 </Label>

//                 <div className="space-y-3">
//                   <div
//                     onClick={() => toggleAdditionalOption('stroller')}
//                     className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                       additionalOptions.stroller 
//                         ? 'border-blue-500 bg-blue-50' 
//                         : 'border-gray-200 hover:border-blue-300 bg-white'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 bg-[#5C7AC0]  hover:bg-[#284078] rounded-lg flex items-center justify-center">
//                           <Baby className="h-6 w-6 text-blue-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">Baby Stroller</h4>
//                           <p className="text-sm text-gray-600">Comfortable stroller for infants</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-bold text-blue-600">+$10</div>
//                         {additionalOptions.stroller && (
//                           <CheckCircle className="h-5 w-5 text-blue-600 ml-auto mt-1" />
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     onClick={() => toggleAdditionalOption('wheelchair')}
//                     className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                       additionalOptions.wheelchair 
//                         ? 'border-purple-500 bg-purple-50' 
//                         : 'border-gray-200 hover:border-purple-300 bg-white'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                           <Users className="h-6 w-6 text-purple-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">Wheelchair Accessible</h4>
//                           <p className="text-sm text-gray-600">Wheelchair-friendly vehicle</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-bold text-purple-600">+$15</div>
//                         {additionalOptions.wheelchair && (
//                           <CheckCircle className="h-5 w-5 text-purple-600 ml-auto mt-1" />
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     onClick={() => toggleAdditionalOption('extraLuggage')}
//                     className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                       additionalOptions.extraLuggage 
//                         ? 'border-orange-500 bg-orange-50' 
//                         : 'border-gray-200 hover:border-orange-300 bg-white'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                           <ShoppingBag className="h-6 w-6 text-orange-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">Extra Luggage Space</h4>
//                           <p className="text-sm text-gray-600">Additional storage for bags</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-bold text-orange-600">+$12</div>
//                         {additionalOptions.extraLuggage && (
//                           <CheckCircle className="h-5 w-5 text-orange-600 ml-auto mt-1" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Separator />

//               {/* Contact Information */}
//               <div className="space-y-4">
//                 <Label className="text-lg font-semibold">Contact Information</Label>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="fullName">Full Name</Label>
//                     <Input
//                       id="fullName"
//                       value={contactInfo.fullName}
//                       onChange={(e) => handleContactInfoChange('fullName', e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={contactInfo.email}
//                       onChange={(e) => handleContactInfoChange('email', e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     value={contactInfo.phone}
//                     onChange={(e) => handleContactInfoChange('phone', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
//                   <Textarea
//                     id="specialRequirements"
//                     placeholder="Any dietary restrictions, accessibility needs, etc."
//                     value={contactInfo.specialRequirements}
//                     onChange={(e) => handleContactInfoChange('specialRequirements', e.target.value)}
//                   />
//                 </div>
//               </div>

//               <Separator />

//               {/* Price Breakdown */}
//               <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
//                 <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                
//                 <div className="flex justify-between text-sm">
//                   <span>
//                     {selectedVehicle ? 
//                       `${selectedVehicle.makeVariant || 'Vehicle'} (${selectedVehicle.capacity} people)` : 
//                       'Vehicle Price'
//                     }
//                   </span>
//                   <span>${(() => {
//                     if (selectedVehicle && selectedVehicle.price) {
//                       return parseFloat(selectedVehicle.price).toFixed(2);
//                     }
//                     return '0.00';
//                   })()}</span>
//                 </div>
                
//                 {(additionalOptions.stroller || additionalOptions.wheelchair || additionalOptions.extraLuggage) && (
//                   <>
//                     <Separator className="my-2" />
//                     <div className="text-sm font-semibold text-gray-700 mb-1">Additional Options:</div>
//                     {additionalOptions.stroller && (
//                       <div className="flex justify-between text-sm text-blue-600">
//                         <span>Baby Stroller</span>
//                         <span>+$10.00</span>
//                       </div>
//                     )}
//                     {additionalOptions.wheelchair && (
//                       <div className="flex justify-between text-sm text-purple-600">
//                         <span>Wheelchair Accessible</span>
//                         <span>+$15.00</span>
//                       </div>
//                     )}
//                     {additionalOptions.extraLuggage && (
//                       <div className="flex justify-between text-sm text-orange-600">
//                         <span>Extra Luggage Space</span>
//                         <span>+$12.00</span>
//                       </div>
//                     )}
//                   </>
//                 )}
                
//                 <Separator />
//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total</span>
//                   <span className="text-green-600">${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <div className="flex gap-3 justify-end">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setShowContactForm(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700"
//                   disabled={submitting}
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     `Book Now - $${total.toFixed(2)}`
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>

//         {/* Validation Dialog */}
//         <Dialog open={showDialog} onOpenChange={setShowDialog}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle className="flex items-center gap-2">
//                 {isDialogValid ? (
//                   <>
//                     <CheckCircle className="h-6 w-6 text-green-600" />
//                     <span>{submitting ? 'Booking Confirmed!' : 'Success'}</span>
//                   </>
//                 ) : (
//                   <>
//                     <AlertCircle className="h-6 w-6 text-red-600" />
//                     <span>Validation Error</span>
//                   </>
//                 )}
//               </DialogTitle>
//               <DialogDescription className="text-base pt-4">
//                 {dialogMessage}
//               </DialogDescription>
//             </DialogHeader>
            
//             <div className="flex gap-3 justify-end pt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowDialog(false)}
//               >
//                 Close
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
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
import { postsAPI, bookingsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
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
  ArrowLeft
} from 'lucide-react';

const BookingPage = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState();
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
    specialRequirements: ''
  });
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
        console.log('🚗 TOUR DATA RECEIVED:', response.data);
        console.log('🚗 Transport Vehicles:', response.data.transportVehicles);
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
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
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
          description: "Redirecting to your bookings...",
        });
        
        setTimeout(() => {
          navigate('/bookings');
        }, 1500);
      }
    } catch (error) {
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  // Prepare vehicles array
  let vehicles = [];
  if (tour.transportVehicles && Array.isArray(tour.transportVehicles) && tour.transportVehicles.length > 0) {
    console.log('✅ Using transportVehicles array:', tour.transportVehicles);
    vehicles = tour.transportVehicles.map((vehicle) => ({
      id: vehicle.id,
      transportType: vehicle.transportType || '',
      transportModal: vehicle.transportModal || '',
      makeVariant: vehicle.makeVariant || '',
      capacity: parseInt(vehicle.capacity) || 4,
      price: vehicle.price || '',
      isPopular: vehicle.isPopular || false
    }));
  } else if (tour.makeVariant || tour.transportType || tour.transportModal) {
    console.log('⚠️ Falling back to old logic');
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
            <Card>
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
            </Card>

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
                    className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Book Now - $${total.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default BookingPage;