import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Scroll from "@/components/Scroll";

// ✅ Keep critical components as regular imports
import Layout from "@/components/layout/Layout";

// 🚀 Lazy load all pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

// Tours pages
const ToursPage = lazy(() => import("./pages/ToursPage"));
const TourDetailPage = lazy(() => import("./pages/TourDetailPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));

// Info pages
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const TransportPage = lazy(() => import("./pages/TransportPage"));
const CancellationPolicyPage = lazy(() => import("./pages/CancellationPolicyPage"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const HelpSupportPage = lazy(() => import("./pages/HelpSupportPage"));

// User pages
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const MyBookingsPage = lazy(() => import("./pages/MyBookingsPage"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminTours = lazy(() => import("./pages/admin/AdminTours"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

// Feature pages
const ExpertGuidesPage = lazy(() => import("./pages/ExpertGuidesPage"));
const CustomizedToursPage = lazy(() => import("./pages/CustomizedToursPage"));
const FreeCancellationPage = lazy(() => import("./pages/FreeCancellationPage"));
const ReliableTransportationPage = lazy(() => import("./pages/ReliableTransportationPage"));
const CustomerSupportPage = lazy(() => import("./pages/CustomerSupportPage"));
const TrustedTravelersPage = lazy(() => import("./pages/TrustedTravelersPage"));

// Other
const FeaturedTours = lazy(() => import("./components/FeaturedTours"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg text-muted-foreground">Loading...</p>
    </div>
  </div>
)
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
         <Scroll />
         <Suspense fallback={<PageLoader />}>
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
            <Route path="/vehicle" element={<Layout><TransportPage /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
            <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
            <Route path="/cancellation-policy" element={<Layout><CancellationPolicyPage /></Layout>} />
            <Route path="/refund-policy" element={<Layout><RefundPolicyPage /></Layout>} />
            <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
            <Route path="/help" element={<Layout><HelpSupportPage /></Layout>} />
            
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
         </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
