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
  RefreshCw
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
      const response = await bookingsAPI.getMyBookings();
      if (response.success) {
        setBookings(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load your bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      setCancelingId(bookingId);
      const response = await bookingsAPI.cancelBooking(bookingId, cancelReason);
      
      if (response.success) {
        toast({
          title: "Booking Cancelled",
          description: "Your booking has been cancelled successfully.",
        });
        setCancelReason('');
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
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
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
    <Card className="hover:shadow-medium transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{booking.post?.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(booking.tourDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{booking.post?.duration}</span>
              </div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <Badge className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
            <Badge className={getPaymentStatusColor(booking.payment.status)}>
              Payment: {booking.payment.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {booking.participants.adults + booking.participants.children + booking.participants.seniors} participants
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-primary">
                ${booking.payment.amount}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              Booking ID: {booking.bookingReference}
            </div>
            <div className="text-xs text-muted-foreground">
              Booked: {new Date(booking.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex flex-wrap gap-2">
            <Link to={`/tours/${booking.post?._id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View Tour
              </Button>
            </Link>
            
            {booking.payment.receiptUrl && (
              <a href={booking.payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Receipt
                </Button>
              </a>
            )}
            
            {canCancelBooking(booking) && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Booking</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel this booking? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        You can cancel free of charge up to 24 hours before the tour start time.
                      </AlertDescription>
                    </Alert>
                    
                    <div>
                      <label className="text-sm font-medium">Reason for cancellation (optional)</label>
                      <Textarea
                        placeholder="Please let us know why you're cancelling..."
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button variant="outline">Keep Booking</Button>
                    </DialogTrigger>
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={cancelingId === booking._id}
                    >
                      {cancelingId === booking._id ? (
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
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              Please login to view your bookings.
            </p>
            <Link to="/login">
              <Button variant="hero">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">
              Manage your tour bookings and view past adventures
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring amazing destinations and book your first tour!
                </p>
                <Link to="/tours">
                  <Button variant="hero">Browse Tours</Button>
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
                {filterBookings('pending').map((booking: any) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </TabsContent>
              
              <TabsContent value="confirmed" className="space-y-4 mt-6">
                {filterBookings('confirmed').map((booking: any) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4 mt-6">
                {filterBookings('completed').map((booking: any) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </TabsContent>
              
              <TabsContent value="cancelled" className="space-y-4 mt-6">
                {filterBookings('cancelled').map((booking: any) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;