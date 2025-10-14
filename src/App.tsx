import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTours from "./pages/admin/AdminTours";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./pages/NotFound";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import FeaturedTours from "./components/FeaturedTours";
import ExpertGuidesPage from "./pages/ExpertGuidesPage";
import CustomizedToursPage from "./pages/CustomizedToursPage";
import FreeCancellationPage from "./pages/FreeCancellationPage";
import ReliableTransportationPage from "./pages/ReliableTransportationPage";
import CustomerSupportPage from "./pages/CustomerSupportPage";
import TrustedTravelersPage from "./pages/TrustedTravelersPage";
import CancellationPolicyPage from "./pages/CancellationPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="//test" element={<FeaturedTours />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            
            
            {/* Public routes with layout */}
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/tours" element={<Layout><ToursPage /></Layout>} />
            <Route path="/tours/:id" element={<Layout><TourDetailPage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
            <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
            <Route path="/cancellation-policy" element={<Layout><CancellationPolicyPage /></Layout>} />
            <Route path="/refund-policy" element={<Layout><RefundPolicyPage /></Layout>} />
            
            {/* Feature detail routes */}
            <Route path="/features/expert-guides" element={<Layout><ExpertGuidesPage /></Layout>} />
            <Route path="/features/customized-tours" element={<Layout><CustomizedToursPage /></Layout>} />
            <Route path="/features/free-cancellation" element={<Layout><FreeCancellationPage /></Layout>} />
            <Route path="/features/reliable-transportation" element={<Layout><ReliableTransportationPage /></Layout>} />
            <Route path="/features/customer-support" element={<Layout><CustomerSupportPage /></Layout>} />
            <Route path="/features/trusted-travelers" element={<Layout><TrustedTravelersPage /></Layout>} />
            
            {/* Protected routes with layout */}
            <Route path="/booking/:tourId" element={<Layout><BookingPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/bookings" element={<Layout><MyBookingsPage /></Layout>} />
            
            {/* Admin routes with layout */}
            <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin/tours" element={<Layout><AdminTours /></Layout>} />
            <Route path="/admin/bookings" element={<Layout><AdminBookings /></Layout>} />
            <Route path="/admin/users" element={<Layout><AdminUsers /></Layout>} />
            
            {/* 404 route */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
