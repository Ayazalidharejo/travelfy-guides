import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import UserChat from '@/pages/UserChat';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Phone, Calendar, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { bookingsAPI } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ConsultationSection = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [hasBookings, setHasBookings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    message: ''
  });
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user has bookings
  useEffect(() => {
    const checkUserBookings = async () => {
      if (!isAuthenticated || isAdmin) return;
      
      try {
        const response = await bookingsAPI.getMyBookings();
        if (response.success && response.data.length > 0) {
          setHasBookings(true);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    
    checkUserBookings();
  }, [isAuthenticated, isAdmin]);

  const handleChatClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isAdmin) {
      // Admins should use admin dashboard chat
      return;
    }
    setChatOpen(true);
  };

  const handleScheduleClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!hasBookings) {
      toast({
        title: "No Bookings Found",
        description: "You need to have at least one booking to schedule a call.",
        variant: "destructive"
      });
      return;
    }
    setScheduleOpen(true);
  };

  const handleScheduleSubmit = async () => {
    if (!scheduleData.date || !scheduleData.time || !scheduleData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const response = await bookingsAPI.scheduleCall(scheduleData);

      if (response.success) {
        toast({
          title: "✅ Call Scheduled!",
          description: "Your call request has been sent to the admin."
        });
        setScheduleOpen(false);
        setScheduleData({ date: '', time: '', message: '' });
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Schedule call error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to schedule call. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <div 
          className="bg-gradient-to-r from-[#307172] to-[#204f4f] rounded-3xl overflow-hidden shadow-xl relative "
          style={{
            background: ')',
            minHeight: '300px'
          }}
        >
          <div className=" grid md:grid-cols-[1fr,auto] gap-8 items-center p-8 md:p-12">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#fff' }}>
                Get Free Travel Consultation
              </h2>
              
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#fff' }}>
                Our expert travel consultants are here to help you plan the perfect trip. From
                destination selection to customized itineraries, we've got you covered.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
                  <p className="text-sm" style={{ color: '#fff' }}>Personalized recommendations</p>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
                  <p className="text-sm" style={{ color: '#fff' }}>Flexible scheduling</p>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
                  <p className="text-sm" style={{ color: '#fff' }}>24/7 support available</p>
                </div>
              </div>

              <Button 
                className="text-sm px-6 py-2 rounded-lg font-medium bg-[#4C9684]  hover:bg-[#166955] text-white "
             
              >
                Book Free Consultation
              </Button>
            </div>

            {/* Right Content - Contact Cards & Image */}
            <div className="flex items-center gap-6">
              {/* Contact Cards */}
              <div className="space-y-3">
                {/* Live Chat */}
                <div 
                  className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-all" 
                  style={{ minWidth: '200px' }}
                  onClick={handleChatClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">Live Chat</h3>
                      <p className="text-[10px] text-gray-600">Available now</p>
                    </div>
                  </div>
                </div>

                {/* Call Us */}
                {/* <div className="bg-white rounded-xl p-3 shadow-sm" style={{ minWidth: '200px' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Phone className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">Call Us</h3>
                      <p className="text-[10px] text-gray-600">+81 80-7480-1156</p>
                    </div>
                  </div>
                </div> */}

                <div 
  className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow" 
  style={{ minWidth: '200px' }}
  onClick={() => {
    const phoneNumber = '818074801156'; 
    const message = encodeURIComponent('Hello, I would like to inquire about your tour packages.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }}
>
  <div className="flex items-center gap-3">
    <div className="bg-orange-100 p-2 rounded-lg">
      <Phone className="h-4 w-4 text-orange-600" />
    </div>
    <div>
      <h3 className="font-bold text-gray-900 text-xs">Call Us</h3>
      <p className="text-[10px] text-gray-600">+81 80-7480-1156</p>
    </div>
  </div>
</div>

                {/* Schedule a Call */}
                <div 
                  className={`bg-white rounded-xl p-3 shadow-sm transition-all ${
                    isAuthenticated && hasBookings 
                      ? 'cursor-pointer hover:shadow-md' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  style={{ minWidth: '200px' }}
                  onClick={handleScheduleClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">Schedule a Call</h3>
                      <p className="text-[10px] text-gray-600">
                        {isAuthenticated && hasBookings ? 'Click to schedule' : 'Booking required'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traveler Image - Girl with backpack */}
              <div className="hidden lg:block relative" style={{ width: '250px', height: '280px' }}>
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400"
                  alt="Travel Consultant"
                  className="object-cover object-center"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectPosition: 'center top'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal - Only for authenticated users who are NOT admins */}
      {isAuthenticated && !isAdmin && (
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="max-w-lg h-[650px] p-0 overflow-hidden">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Live Chat Support
              </DialogTitle>
            </DialogHeader>
            <div className="h-full">
              <UserChat
                token={localStorage.getItem('token') || ''}
                currentUser={{
                  id: user?._id || user?.id || '',
                  name: user?.name || '',
                  email: user?.email || '',
                  avatar: user?.photoURL || user?.avatar || undefined
                }}
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Schedule Call Dialog */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Schedule a Call
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Preferred Date</label>
              <Input
                type="date"
                value={scheduleData.date}
                onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Preferred Time</label>
              <Input
                type="time"
                value={scheduleData.time}
                onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
              <Textarea
                placeholder="Let us know what you'd like to discuss..."
                value={scheduleData.message}
                onChange={(e) => setScheduleData({ ...scheduleData, message: e.target.value })}
                className="w-full min-h-[100px]"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {scheduleData.message.length}/500 characters
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setScheduleOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleScheduleSubmit}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Scheduling...' : 'Schedule Call'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ConsultationSection;

