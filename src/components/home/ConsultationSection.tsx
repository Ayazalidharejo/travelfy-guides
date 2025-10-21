// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { useAuth } from '@/contexts/AuthContext';
// import UserChat from '@/pages/UserChat';
// import { useNavigate } from 'react-router-dom';
// import { CheckCircle, Phone, Calendar, MessageCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { bookingsAPI } from '@/lib/api';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';

// const ConsultationSection = () => {
//   const [chatOpen, setChatOpen] = useState(false);

//   const [hasBookings, setHasBookings] = useState(false);
//   const [loading, setLoading] = useState(false);
 
//   const { user, isAuthenticated, isAdmin } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Check if user has bookings
//   useEffect(() => {
//     const checkUserBookings = async () => {
//       if (!isAuthenticated || isAdmin) return;
      
//       try {
//         const response = await bookingsAPI.getMyBookings();
//         if (response.success && response.data.length > 0) {
//           setHasBookings(true);
//         }
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };
    
//     checkUserBookings();
//   }, [isAuthenticated, isAdmin]);

//   const handleChatClick = () => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
//     if (isAdmin) {
//       // Admins should use admin dashboard chat
//       return;
//     }
//     setChatOpen(true);
//   };




//   return (
//     <section className="py-12 ">
//       <div className="container mx-auto px-4">
//         <div 
//           className="bg-gradient-to-r from-[#307172] to-[#204f4f] rounded-3xl overflow-hidden shadow-xl relative "
//           style={{
//             background: ')',
//             minHeight: '300px'
//           }}
//         >
//           <div className=" grid md:grid-cols-[1fr,auto] gap-8 items-center p-8 md:p-12">
//             {/* Left Content */}
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#fff' }}>
//                 Get Free Travel Consultation
//               </h2>
              
//               <p className="text-sm mb-6 leading-relaxed" style={{ color: '#fff' }}>
//                 Our expert travel consultants are here to help you plan the perfect trip. From
//                 destination selection to customized itineraries, we've got you covered.
//               </p>

//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
//                   <p className="text-sm" style={{ color: '#fff' }}>Personalized recommendations</p>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
//                   <p className="text-sm" style={{ color: '#fff' }}>Flexible scheduling</p>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
//                   <p className="text-sm" style={{ color: '#fff' }}>24/7 support available</p>
//                 </div>
//               </div>

//               <Button 
//                 className="text-sm px-6 py-2 rounded-lg font-medium bg-[#4C9684]  hover:bg-[#166955] text-white "
             
//               >
//                 Book Free Consultation
//               </Button>
//             </div>

//             {/* Right Content - Contact Cards & Image */}
//             <div className="flex items-center gap-6">
//               {/* Contact Cards */}
//               <div className="space-y-3">
//                 {/* Live Chat */}
//                 <div 
//                   className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-all" 
//                   style={{ minWidth: '200px' }}
//                   onClick={handleChatClick}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="bg-orange-100 p-2 rounded-lg">
//                       <MessageCircle className="h-4 w-4 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900 text-xs">Live Chat</h3>
//                       <p className="text-[10px] text-gray-600">Available now</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Call Us */}
//                 {/* <div className="bg-white rounded-xl p-3 shadow-sm" style={{ minWidth: '200px' }}>
//                   <div className="flex items-center gap-3">
//                     <div className="bg-orange-100 p-2 rounded-lg">
//                       <Phone className="h-4 w-4 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900 text-xs">Call Us</h3>
//                       <p className="text-[10px] text-gray-600">+81 80-7480-1156</p>
//                     </div>
//                   </div>
//                 </div> */}

//                 <div 
//   className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow" 
//   style={{ minWidth: '200px' }}
//   onClick={() => {
//     const phoneNumber = '818074801156'; 
//     const message = encodeURIComponent('Hello, I would like to inquire about your tour packages.');
//     window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
//   }}
// >
//   <div className="flex items-center gap-3">
//     <div className="bg-orange-100 p-2 rounded-lg">
//       <Phone className="h-4 w-4 text-orange-600" />
//     </div>
//     <div>
//       <h3 className="font-bold text-gray-900 text-xs">Call Us</h3>
//       <p className="text-[10px] text-gray-600">+81 80-7480-1156</p>
//     </div>
//   </div>
// </div>

//                 {/* Schedule a Call */}
//                 <div 
//                   className="bg-white rounded-xl p-3 shadow-sm transition-all"
//                   style={{ minWidth: '200px' }}
                  
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="bg-orange-100 p-2 rounded-lg">
//                       <Calendar className="h-4 w-4 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900 text-xs">Schedule a Call</h3>
//                       <p className="text-[10px] text-gray-600">
                      
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Traveler Image - Girl with backpack */}
//               <div className="hidden lg:block relative" style={{ width: '250px', height: '280px' }}>
//                 <img
//                   src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400"
//                   alt="Travel Consultant"
//                   className="object-cover object-center"
//                   style={{ 
//                     width: '100%', 
//                     height: '100%',
//                     objectPosition: 'center top'
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Live Chat Modal - Only for authenticated users who are NOT admins */}
//       {isAuthenticated && !isAdmin && (
//         <Dialog open={chatOpen} onOpenChange={setChatOpen}>
//           <DialogContent className="max-w-lg h-[650px] p-0 overflow-hidden">
//             <DialogHeader className="px-6 py-4 border-b">
//               <DialogTitle className="flex items-center gap-2">
//                 <MessageCircle className="h-5 w-5 text-primary" />
//                 Live Chat Support
//               </DialogTitle>
//             </DialogHeader>
//             <div className="h-full">
//               <UserChat
//                 token={localStorage.getItem('token') || ''}
//                 currentUser={{
//                   id: user?._id || user?.id || '',
//                   name: user?.name || '',
//                   email: user?.email || '',
//                   avatar: user?.photoURL || user?.avatar || undefined
//                 }}
//                 isOpen={chatOpen}
//                 onClose={() => setChatOpen(false)}
//               />
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}

//       {/* Schedule Call Dialog */}
    
//     </section>
//   );
// };

// export default ConsultationSection;






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
import { CheckCircle, Phone, Calendar, MessageCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { bookingsAPI } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ConsultationSection = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '04:00 PM',
    travelPlans: ''
  });

  const [hasBookings, setHasBookings] = useState(false);
  const [loading, setLoading] = useState(false);
 
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
      return;
    }
    setChatOpen(true);
  };

  const handleScheduleClick = () => {
    setScheduleOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleScheduleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.date) {
      toast({
        title: "Required fields missing",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/consultations/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          travelPlans: formData.travelPlans
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Consultation Scheduled! ✅",
          description: "We'll call you at your preferred time.",
        });
        
        // Close dialog and reset form
        setScheduleOpen(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          date: '',
          time: '04:00 PM',
          travelPlans: ''
        });
      } else {
        throw new Error(data.message || 'Failed to schedule consultation');
      }
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      toast({
        title: "Error ❌",
        description: error.message || "Failed to schedule consultation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div 
          className="bg-gradient-to-r from-[#307172] to-[#204f4f] rounded-3xl overflow-hidden shadow-xl relative"
          style={{
            minHeight: '300px'
          }}
        >
          <div className="grid md:grid-cols-[1fr,auto] gap-8 items-center p-8 md:p-12">
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
                className="text-sm px-6 py-2 rounded-lg font-medium bg-[#4C9684] hover:bg-[#166955] text-white"
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
                  className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-all"
                  style={{ minWidth: '200px' }}
                  onClick={handleScheduleClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">Schedule a Call</h3>
                      <p className="text-[10px] text-gray-600"></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traveler Image */}
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

      {/* Live Chat Modal */}
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
        <DialogContent className="p-0 max-w-[506px] gap-0">
          <button
            onClick={() => setScheduleOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-7">
            <DialogHeader className="mb-5">
              <DialogTitle className="text-xl font-bold text-gray-900 mb-1">
                Schedule Your Free Consultation
              </DialogTitle>
              <p className="text-xs text-gray-500">
                Fill in your details and we'll call you at your preferred time to discuss your travel plans.
              </p>
            </DialogHeader>

            <div className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 text-sm"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              {/* Preferred Date and Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                    Preferred Date *
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>04:00 PM</option>
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>05:00 PM</option>
                    <option>06:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Travel Plans */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                  Tell us about your travel plans (Optional)
                </label>
                <Textarea
                  name="travelPlans"
                  value={formData.travelPlans}
                  onChange={handleFormChange}
                  placeholder="Where would you like to go? What kind of experience are you looking for?"
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-sm resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <Button
                  onClick={handleScheduleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Scheduling...' : 'Confirm Schedule'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setScheduleOpen(false)}
                  disabled={loading}
                  className="px-8 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    
    </section>
  );
};

export default ConsultationSection;