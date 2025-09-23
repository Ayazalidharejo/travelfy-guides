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
  ArrowLeft
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
    if (!tour || !tour.priceNumber) return 0;
    const totalParticipants = participants.adults + participants.children + participants.seniors;
    return tour.priceNumber * totalParticipants;
  };

  const getTotalParticipants = () => {
    return participants.adults + participants.children + participants.seniors;
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
        participants,
        contactInfo: {
          ...contactInfo,
          specialRequirements: contactInfo.specialRequirements || undefined
        },
        specialRequests: specialRequests || undefined
      };

      const response = await bookingsAPI.createBooking(bookingData);
      
      if (response.success) {
        toast({
          title: "Booking Created!",
          description: "Redirecting to payment...",
        });
        
        // Here you would typically redirect to Stripe Checkout
        // For now, we'll redirect to bookings page
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
  const imageUrl = tour.imageUrl || tour.images?.[0] || '/placeholder.svg';

  return (
    <div className="min-h-screen bg-gradient-card">
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
                        <span>{tour.duration}</span>
                      </div>
                      {tour.prefecture && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{tour.prefecture}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{tour.category}</Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${tour.priceNumber || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  Booking Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Free cancellation up to 24 hours before tour</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Reserve now, pay later available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-success" />
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
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Select Tour Date</Label>
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
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Participants */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Participants
                  </Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Adults</div>
                        <div className="text-sm text-muted-foreground">Ages 18+</div>
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
                        <span className="w-8 text-center">{participants.adults}</span>
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
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Children</div>
                        <div className="text-sm text-muted-foreground">Ages 3-17</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => updateParticipants('children', false)}
                          disabled={participants.children <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{participants.children}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => updateParticipants('children', true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Seniors</div>
                        <div className="text-sm text-muted-foreground">Ages 65+</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => updateParticipants('seniors', false)}
                          disabled={participants.seniors <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{participants.seniors}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => updateParticipants('seniors', true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <Label>Contact Information</Label>
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

                {/* Special Requests */}
                <div>
                  <Label htmlFor="specialRequests">Additional Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requests or notes for your tour guide..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Adults × {participants.adults}</span>
                    <span>${((tour.priceNumber || 0) * participants.adults).toFixed(2)}</span>
                  </div>
                  {participants.children > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Children × {participants.children}</span>
                      <span>${((tour.priceNumber || 0) * participants.children).toFixed(2)}</span>
                    </div>
                  )}
                  {participants.seniors > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Seniors × {participants.seniors}</span>
                      <span>${((tour.priceNumber || 0) * participants.seniors).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="hero"
                  size="lg"
                  disabled={submitting || !selectedDate || getTotalParticipants() === 0}
                >
                  {submitting ? "Processing..." : `Book Now - $${total.toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;