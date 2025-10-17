import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { bookingsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  RefreshCw,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      console.log('📥 Fetching bookings...');
      const response = await bookingsAPI.getMyBookings();
      console.log('📦 Bookings response:', response);
      if (response.success) {
        setBookings(response.data || []);
        console.log('✅ Bookings loaded:', response.data?.length || 0);
      } else {
        console.error('❌ Response not successful:', response);
        toast({
          title: "Error",
          description: response.message || "Failed to load your bookings.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('❌ Error fetching bookings:', error);
      console.error('Error details:', error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to load your bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    // Validate reason is provided
    if (!cancelReason || cancelReason.trim() === '') {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for cancellation.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedBookingId) return;

    try {
      setCancelingId(selectedBookingId);
      const response = await bookingsAPI.cancelBooking(selectedBookingId, cancelReason);
      
      if (response.success) {
        toast({
          title: "Booking Cancelled",
          description: "Your booking has been cancelled successfully.",
        });
        setCancelReason('');
        setCancelDialogOpen(false);
        setSelectedBookingId(null);
        fetchBookings(); // Refresh the bookings
      }
    } catch (error: any) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Cancellation Failed",
        description: error.response?.data?.message || "Failed to cancel booking.",
        variant: "destructive",
      });
    } finally {
      setCancelingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      case 'completed':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'failed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const canCancelBooking = (booking: any) => {
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return false;
    }
    
    const tourDate = new Date(booking.tourDate);
    const now = new Date();
    const hoursDifference = (tourDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return hoursDifference > 24;
  };

  const filterBookings = (status?: string) => {
    if (!status) return bookings;
    return bookings.filter((booking: any) => booking.status === status);
  };

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{booking.post?.title || 'Tour'}</CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(booking.tourDate).toLocaleDateString()}</span>
                {booking.selectedDay && <span className="text-xs text-gray-500">({booking.selectedDay})</span>}
              </div>
              {booking.selectedTimeSlot && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{booking.selectedTimeSlot}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right space-y-2">
            <Badge className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
            <Badge className={getPaymentStatusColor(booking.payment?.status)}>
              {booking.payment?.method === 'pay-later' ? 'Pay Later' : booking.payment?.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Participants & Amount */}
        <div className="grid grid-cols-2 gap-4 text-sm border-b pb-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <div className="font-medium">
                  {(booking.participants?.adults || 0) + (booking.participants?.children || 0) + (booking.participants?.seniors || 0)} Total
                </div>
                <div className="text-xs text-gray-500">
                  Adults: {booking.participants?.adults || 0}, Children: {booking.participants?.children || 0}, Seniors: {booking.participants?.seniors || 0}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <div>
                <div className="font-semibold text-green-600 text-lg">
                  ${booking.payment?.amount || 0}
                </div>
                <div className="text-xs text-gray-500">
                  {booking.payment?.method === 'pay-later' ? 'Payment Due' : 'Paid'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-b pb-3">
          <div className="font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Details
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Name:</span> {booking.contactInfo?.fullName}
            </div>
            <div>
              <span className="font-medium">Email:</span> {booking.contactInfo?.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {booking.contactInfo?.phone}
            </div>
            {booking.contactInfo?.language && (
              <div>
                <span className="font-medium">Language:</span> {booking.contactInfo?.language}
              </div>
            )}
            {booking.contactInfo?.pickupLocation && (
              <div className="col-span-2">
                <span className="font-medium">Pickup:</span> {booking.contactInfo?.pickupLocation}
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Information */}
        {booking.selectedVehicle && (
          <div className="border-b pb-3">
            <div className="font-medium text-gray-700 mb-2">Vehicle Selected</div>
            <div className="text-sm text-gray-600">
              {booking.selectedVehicle.makeVariant || 'Selected vehicle'}
              {booking.selectedVehicle.capacity && (
                <span className="text-xs text-gray-500 ml-2">
                  (Capacity: {booking.selectedVehicle.capacity})
                </span>
              )}
            </div>
          </div>
        )}

        {/* Additional Options */}
        {booking.additionalOptions && (
          Object.values(booking.additionalOptions).some((val: any) => val === true) && (
            <div className="border-b pb-3">
              <div className="font-medium text-gray-700 mb-2">Additional Options</div>
              <div className="flex flex-wrap gap-2">
                {booking.additionalOptions.stroller && (
                  <Badge variant="outline" className="text-xs">
                    🍼 Baby Stroller (+$10)
                  </Badge>
                )}
                {booking.additionalOptions.wheelchair && (
                  <Badge variant="outline" className="text-xs">
                    ♿ Wheelchair Accessible (+$15)
                  </Badge>
                )}
                {booking.additionalOptions.extraLuggage && (
                  <Badge variant="outline" className="text-xs">
                    🧳 Extra Luggage (+$12)
                  </Badge>
                )}
              </div>
            </div>
          )
        )}

        {/* Special Requirements */}
        {booking.contactInfo?.specialRequirements && (
          <div className="border-b pb-3">
            <div className="font-medium text-gray-700 mb-1">Special Requirements</div>
            <div className="text-sm text-gray-600 italic">
              {booking.contactInfo.specialRequirements}
            </div>
          </div>
        )}

        {/* Booking Reference */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>Booking ID: <span className="font-mono font-semibold">{booking.bookingReference}</span></div>
          <div>Booked on: {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString()}</div>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex flex-wrap gap-2">
            {booking.post?._id && (
              <Link to={`/tours/${booking.post._id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Tour
                </Button>
              </Link>
            )}
            
            {booking.payment?.receiptUrl && (
              <a href={booking.payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Receipt
                </Button>
              </a>
            )}
            
            {canCancelBooking(booking) && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  setSelectedBookingId(booking._id);
                  setCancelDialogOpen(true);
                }}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to view your bookings.
            </p>
            <Link to="/login">
              <Button className="bg-green-600 hover:bg-green-700">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-600">
              Manage your tour bookings and view past adventures
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading your bookings...</p>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">
                  Start exploring amazing destinations and book your first tour!
                </p>
                <Link to="/tours">
                  <Button className="bg-green-600 hover:bg-green-700">Browse Tours</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({filterBookings('pending').length})</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed ({filterBookings('confirmed').length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({filterBookings('completed').length})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({filterBookings('cancelled').length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4 mt-6">
                {bookings.map((booking: any) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4 mt-6">
                {filterBookings('pending').length > 0 ? (
                  filterBookings('pending').map((booking: any) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                ) : (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-gray-600">No pending bookings</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="confirmed" className="space-y-4 mt-6">
                {filterBookings('confirmed').length > 0 ? (
                  filterBookings('confirmed').map((booking: any) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                ) : (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-gray-600">No confirmed bookings</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4 mt-6">
                {filterBookings('completed').length > 0 ? (
                  filterBookings('completed').map((booking: any) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                ) : (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-gray-600">No completed bookings</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="cancelled" className="space-y-4 mt-6">
                {filterBookings('cancelled').length > 0 ? (
                  filterBookings('cancelled').map((booking: any) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                ) : (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-gray-600">No cancelled bookings</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {/* Cancellation Dialog - Single instance */}
      <Dialog open={cancelDialogOpen} onOpenChange={(open) => {
        setCancelDialogOpen(open);
        if (!open) {
          setSelectedBookingId(null);
          setCancelReason('');
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You can cancel free of charge up to 24 hours before the tour start time.
              </AlertDescription>
            </Alert>
            
            <div>
              <label className="text-sm font-medium text-red-600">
                Reason for cancellation <span className="text-red-600">*</span>
              </label>
              <Textarea
                placeholder="Please provide a reason for cancellation (required)..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="mt-1"
                required
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">This reason will be shared with the admin.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setCancelDialogOpen(false);
                setSelectedBookingId(null);
                setCancelReason('');
              }}
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelBooking}
              disabled={cancelingId !== null || !cancelReason.trim()}
            >
              {cancelingId ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Confirm Cancellation'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBookingsPage;
