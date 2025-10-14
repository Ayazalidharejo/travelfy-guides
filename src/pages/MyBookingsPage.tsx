// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { bookingsAPI } from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
// import {
//   Calendar,
//   MapPin,
//   Users,
//   DollarSign,
//   Clock,
//   Phone,
//   Mail,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Download,
//   RefreshCw
// } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';

// const MyBookingsPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelingId, setCancelingId] = useState<string | null>(null);
//   const [cancelReason, setCancelReason] = useState('');
//   const { user, isAuthenticated } = useAuth();
//   const { toast } = useToast();

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchBookings();
//     }
//   }, [isAuthenticated]);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await bookingsAPI.getMyBookings();
//       if (response.success) {
//         setBookings(response.data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load your bookings.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelBooking = async (bookingId: string) => {
//     try {
//       setCancelingId(bookingId);
//       const response = await bookingsAPI.cancelBooking(bookingId, cancelReason);
      
//       if (response.success) {
//         toast({
//           title: "Booking Cancelled",
//           description: "Your booking has been cancelled successfully.",
//         });
//         setCancelReason('');
//         fetchBookings(); // Refresh the bookings
//       }
//     } catch (error: any) {
//       console.error('Error cancelling booking:', error);
//       toast({
//         title: "Cancellation Failed",
//         description: error.response?.data?.message || "Failed to cancel booking.",
//         variant: "destructive",
//       });
//     } finally {
//       setCancelingId(null);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'confirmed':
//         return 'bg-success text-success-foreground';
//       case 'pending':
//         return 'bg-warning text-warning-foreground';
//       case 'cancelled':
//         return 'bg-destructive text-destructive-foreground';
//       case 'completed':
//         return 'bg-primary text-primary-foreground';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   const getPaymentStatusColor = (status: string) => {
//     switch (status) {
//       case 'succeeded':
//         return 'bg-success text-success-foreground';
//       case 'pending':
//         return 'bg-warning text-warning-foreground';
//       case 'failed':
//         return 'bg-destructive text-destructive-foreground';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   const canCancelBooking = (booking: any) => {
//     if (booking.status === 'cancelled' || booking.status === 'completed') {
//       return false;
//     }
    
//     const tourDate = new Date(booking.tourDate);
//     const now = new Date();
//     const hoursDifference = (tourDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
//     return hoursDifference > 24;
//   };

//   const filterBookings = (status?: string) => {
//     if (!status) return bookings;
//     return bookings.filter((booking: any) => booking.status === status);
//   };

//   const BookingCard = ({ booking }: { booking: any }) => (
//     <Card className="hover:shadow-medium transition-smooth">
//       <CardHeader className="pb-3">
//         <div className="flex items-start justify-between">
//           <div className="space-y-1">
//             <CardTitle className="text-lg">{booking.post?.title}</CardTitle>
//             <div className="flex items-center gap-4 text-sm text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <Calendar className="h-4 w-4" />
//                 <span>{new Date(booking.tourDate).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Clock className="h-4 w-4" />
//                 <span>{booking.post?.duration}</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-right space-y-2">
//             <Badge className={getStatusColor(booking.status)}>
//               {booking.status}
//             </Badge>
//             <Badge className={getPaymentStatusColor(booking.payment.status)}>
//               Payment: {booking.payment.status}
//             </Badge>
//           </div>
//         </div>
//       </CardHeader>
      
//       <CardContent className="space-y-4">
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <Users className="h-4 w-4 text-muted-foreground" />
//               <span>
//                 {booking.participants.adults + booking.participants.children + booking.participants.seniors} participants
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//               <span className="font-semibold text-primary">
//                 ${booking.payment.amount}
//               </span>
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <div className="text-xs text-muted-foreground">
//               Booking ID: {booking.bookingReference}
//             </div>
//             <div className="text-xs text-muted-foreground">
//               Booked: {new Date(booking.createdAt).toLocaleDateString()}
//             </div>
//           </div>
//         </div>
        
//         <div className="border-t pt-3">
//           <div className="flex flex-wrap gap-2">
//             <Link to={`/tours/${booking.post?._id}`}>
//               <Button variant="outline" size="sm">
//                 <Eye className="h-4 w-4 mr-1" />
//                 View Tour
//               </Button>
//             </Link>
            
//             {booking.payment.receiptUrl && (
//               <a href={booking.payment.receiptUrl} target="_blank" rel="noopener noreferrer">
//                 <Button variant="outline" size="sm">
//                   <Download className="h-4 w-4 mr-1" />
//                   Receipt
//                 </Button>
//               </a>
//             )}
            
//             {canCancelBooking(booking) && (
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button variant="destructive" size="sm">
//                     <XCircle className="h-4 w-4 mr-1" />
//                     Cancel
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Cancel Booking</DialogTitle>
//                     <DialogDescription>
//                       Are you sure you want to cancel this booking? This action cannot be undone.
//                     </DialogDescription>
//                   </DialogHeader>
                  
//                   <div className="space-y-4">
//                     <Alert>
//                       <AlertCircle className="h-4 w-4" />
//                       <AlertDescription>
//                         You can cancel free of charge up to 24 hours before the tour start time.
//                       </AlertDescription>
//                     </Alert>
                    
//                     <div>
//                       <label className="text-sm font-medium">Reason for cancellation (optional)</label>
//                       <Textarea
//                         placeholder="Please let us know why you're cancelling..."
//                         value={cancelReason}
//                         onChange={(e) => setCancelReason(e.target.value)}
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>
                  
//                   <DialogFooter>
//                     <DialogTrigger asChild>
//                       <Button variant="outline">Keep Booking</Button>
//                     </DialogTrigger>
//                     <Button
//                       variant="destructive"
//                       onClick={() => handleCancelBooking(booking._id)}
//                       disabled={cancelingId === booking._id}
//                     >
//                       {cancelingId === booking._id ? (
//                         <>
//                           <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                           Cancelling...
//                         </>
//                       ) : (
//                         'Confirm Cancellation'
//                       )}
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-card flex items-center justify-center">
//         <Card className="w-full max-w-md text-center">
//           <CardContent className="p-8">
//             <h2 className="text-2xl font-bold mb-4">Login Required</h2>
//             <p className="text-muted-foreground mb-6">
//               Please login to view your bookings.
//             </p>
//             <Link to="/login">
//               <Button variant="hero">Login</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-card">
//       <div className="container px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
//             <p className="text-muted-foreground">
//               Manage your tour bookings and view past adventures
//             </p>
//           </div>

//           {loading ? (
//             <div className="space-y-4">
//               {[...Array(3)].map((_, i) => (
//                 <Card key={i} className="animate-pulse">
//                   <CardHeader>
//                     <div className="h-6 bg-muted rounded w-1/3" />
//                     <div className="h-4 bg-muted rounded w-1/2" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-20 bg-muted rounded" />
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : bookings.length === 0 ? (
//             <Card className="text-center py-12">
//               <CardContent>
//                 <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
//                 <p className="text-muted-foreground mb-6">
//                   Start exploring amazing destinations and book your first tour!
//                 </p>
//                 <Link to="/tours">
//                   <Button variant="hero">Browse Tours</Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           ) : (
//             <Tabs defaultValue="all" className="w-full">
//               <TabsList className="grid w-full grid-cols-5">
//                 <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
//                 <TabsTrigger value="pending">Pending ({filterBookings('pending').length})</TabsTrigger>
//                 <TabsTrigger value="confirmed">Confirmed ({filterBookings('confirmed').length})</TabsTrigger>
//                 <TabsTrigger value="completed">Completed ({filterBookings('completed').length})</TabsTrigger>
//                 <TabsTrigger value="cancelled">Cancelled ({filterBookings('cancelled').length})</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="all" className="space-y-4 mt-6">
//                 {bookings.map((booking: any) => (
//                   <BookingCard key={booking._id} booking={booking} />
//                 ))}
//               </TabsContent>
              
//               <TabsContent value="pending" className="space-y-4 mt-6">
//                 {filterBookings('pending').map((booking: any) => (
//                   <BookingCard key={booking._id} booking={booking} />
//                 ))}
//               </TabsContent>
              
//               <TabsContent value="confirmed" className="space-y-4 mt-6">
//                 {filterBookings('confirmed').map((booking: any) => (
//                   <BookingCard key={booking._id} booking={booking} />
//                 ))}
//               </TabsContent>
              
//               <TabsContent value="completed" className="space-y-4 mt-6">
//                 {filterBookings('completed').map((booking: any) => (
//                   <BookingCard key={booking._id} booking={booking} />
//                 ))}
//               </TabsContent>
              
//               <TabsContent value="cancelled" className="space-y-4 mt-6">
//                 {filterBookings('cancelled').map((booking: any) => (
//                   <BookingCard key={booking._id} booking={booking} />
//                 ))}
//               </TabsContent>
//             </Tabs>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyBookingsPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { bookingsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const TourBookingPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const [tourPost, setTourPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState({
    adults: 2,
    children: 0,
    seniors: 0
  });
  const [selectedTime, setSelectedTime] = useState('');
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchTourDetails();
    }
  }, [postId]);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      // Fetch tour post details from your existing API
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      
      if (data.success) {
        setTourPost(data.data);
        if (data.data.availableDates && data.data.availableDates.length > 0) {
          setSelectedDate(data.data.availableDates[0]);
        }
        if (data.data.timeSlots && data.data.timeSlots.length > 0) {
          setSelectedTime(data.data.timeSlots[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching tour details:', error);
      toast({
        title: "Error",
        description: "Failed to load tour details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTotalParticipants = () => {
    return participants.adults + participants.children + participants.seniors;
  };

  const handleParticipantChange = (type, increment) => {
    setParticipants(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
    }));
  };

  const validateBooking = () => {
    const total = getTotalParticipants();
    
    if (total === 0) {
      setValidationMessage('Please select at least 1 participant');
      setIsValid(false);
      setShowValidationDialog(true);
      return false;
    }

    if (!selectedDate || !selectedTime) {
      setValidationMessage('Please select date and time');
      setIsValid(false);
      setShowValidationDialog(true);
      return false;
    }

    if (tourPost.maxParticipants && total > tourPost.maxParticipants) {
      setValidationMessage(`Maximum ${tourPost.maxParticipants} participants allowed`);
      setIsValid(false);
      setShowValidationDialog(true);
      return false;
    }

    return true;
  };

  const handleReserve = async (priceOption) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to make a booking.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!validateBooking()) {
      return;
    }

    try {
      setProcessing(true);

      const bookingData = {
        postId: tourPost._id,
        tourDate: selectedDate,
        timeSlot: selectedTime,
        participants: participants,
        priceOption: priceOption.type,
        totalAmount: priceOption.price
      };

      const response = await bookingsAPI.createBooking(bookingData);

      if (response.success) {
        setValidationMessage(`Great! Your booking for ${getTotalParticipants()} participant(s) is confirmed.`);
        setIsValid(true);
        setShowValidationDialog(true);
        
        setTimeout(() => {
          navigate('/my-bookings');
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || "Failed to create booking.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
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

  if (!tourPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Tour Not Found</h2>
            <p className="text-gray-600">Unable to load tour details.</p>
            <Button onClick={() => navigate('/tours')} className="mt-4">
              Browse Tours
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-6 rounded-t-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">{tourPost.title}</h1>
          <p className="text-green-100 mb-4">{tourPost.location}</p>
          <h2 className="text-xl font-semibold mb-4">Select date and travelers</h2>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Date Selection */}
            <div className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg">
              <Calendar className="h-5 w-5" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent font-medium focus:outline-none min-w-[200px]"
              >
                {tourPost.availableDates?.map((date, idx) => (
                  <option key={idx} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Participants Counter */}
            <div className="flex items-center gap-3 bg-white text-gray-800 px-4 py-2 rounded-lg">
              <Users className="h-5 w-5" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleParticipantChange('adults', false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold"
                >
                  -
                </button>
                <span className="font-bold text-lg w-8 text-center">
                  {getTotalParticipants()}
                </span>
                <button
                  onClick={() => handleParticipantChange('adults', true)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Participants */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur px-3 py-2 rounded">
              Adults: {participants.adults}
            </div>
            <div className="bg-white/10 backdrop-blur px-3 py-2 rounded">
              Children: {participants.children}
            </div>
            <div className="bg-white/10 backdrop-blur px-3 py-2 rounded">
              Seniors: {participants.seniors}
            </div>
          </div>
        </div>

        {/* Tour Info Banner */}
        <div className="bg-green-100 border-l-4 border-green-500 p-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">
            Duration: {tourPost.duration} • Max Participants: {tourPost.maxParticipants || 'Unlimited'}
          </span>
        </div>

        {/* Price Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {tourPost.pricing?.map((priceOption, index) => (
            <Card key={index} className="relative hover:shadow-xl transition-shadow">
              {priceOption.isPopular && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black text-white">Popular</Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{priceOption.type || `Option ${index + 1}`}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {priceOption.description && (
                  <p className="text-sm text-gray-600">{priceOption.description}</p>
                )}

                {priceOption.features && priceOption.features.length > 0 && (
                  <ul className="space-y-2 text-sm">
                    {priceOption.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pt-4 border-t">
                  <div className="text-2xl font-bold text-gray-900">
                    Total ${priceOption.price?.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Per group • {getTotalParticipants()} participant(s)
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Choose start time:</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {tourPost.timeSlots?.map((time, idx) => (
                        <option key={idx} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  onClick={() => handleReserve(priceOption)}
                  disabled={processing}
                  className="w-full bg-green-400 hover:bg-green-500 text-green-900 font-bold py-6 text-lg"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Reserve'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Validation Dialog */}
        <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {isValid ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span>Booking Confirmed!</span>
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
                {isValid ? 'Close' : 'Go Back'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TourBookingPage;