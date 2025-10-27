




import React, { useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import logo from "@/../public/logo.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut, Menu, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import UserChat from '@/pages/UserChat';

// ✅ Removed React.memo to ensure Header re-renders when user context changes
const Header = () => {
  const { user, logout, isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Avatar URL - handles both Cloudinary, local URLs, and Google photoURL
  // ✅ Priority: Custom avatar first, then Google photoURL
  const avatarUrl = (() => {

    
    // Priority 1: Custom uploaded avatar (highest priority)
    if (user?.avatar && user.avatar !== user?.photoURL) {
      // User has uploaded a custom avatar, use it
      
      // If already a full URL (Cloudinary, data URI, etc.), return as is
      if (user.avatar.startsWith('http') || user.avatar.startsWith('data:')) {
        // Add timestamp to prevent browser caching
        const separator = user.avatar.includes('?') ? '&' : '?';
        const finalUrl = `${user.avatar}${separator}t=${Date.now()}`;
      
        return finalUrl;
      }
      
      // For relative paths, resolve backend base from env (strip /api) or localhost fallback, then add cache-busting
      const envBase = (import.meta.env.VITE_API_BASE_URL as string) || '';
      const derived = envBase ? envBase.replace(/\/?api\/?$/, '') : '';
      const baseURL = derived || 'https://karvaantours.com';
      const finalUrl = `${baseURL}${user.avatar}?t=${Date.now()}`;
     
      return finalUrl;
    }
    
    // Priority 2: Google photoURL (fallback if no custom avatar)
    if (user?.photoURL) {
 
      return user.photoURL;
    }
    
    // Priority 3: No avatar at all

    return null;
  })();

  // Optimized logout handler
  const handleLogout = useCallback(() => {
    logout();
    navigate('/', { replace: true });
  }, [logout, navigate]);

  // Memoized navigation component
  const NavLinks = useCallback(() => (
    <>
  
      
      <Link 
        to="/tours" 
        className="text-foreground hover:text-primary transition-smooth font-medium"
        onClick={() => setMobileMenuOpen(false)}
      >
        Tours
      </Link>
      <Link 
        to="/about" 
        className="text-foreground hover:text-primary transition-smooth font-medium"
        onClick={() => setMobileMenuOpen(false)}
      >
        About
      </Link>
      <Link 
        to="/vehicle " 
        className="text-foreground hover:text-primary transition-smooth font-medium"
        onClick={() => setMobileMenuOpen(false)}
      >
       Vehicles
      </Link>
      <Link 
        to="/contact" 
        className="text-foreground hover:text-primary transition-smooth font-medium"
        onClick={() => setMobileMenuOpen(false)}
      >
        Contact
      </Link>
      {isAdmin && (
        <Link 
          to="/admin" 
          className="text-foreground hover:text-primary transition-smooth font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          Admin
        </Link>
      )}
     
    </>
  ), [isAdmin, user]);

  // Loading state
  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <img style={{width:"130px",height:"75px"}} src={logo} alt="Travel Tours Logo" />
          </Link>
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img style={{width:"130px",height:"75px"}} src={logo} alt="Travel Tours Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8" key={avatarUrl || 'no-avatar'}>
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={user?.name} key={avatarUrl} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8" key={avatarUrl || 'no-avatar-dropdown'}>
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={user?.name} key={avatarUrl} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/bookings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>
                {/* Live Chat - Only for Users, NOT Admins */}
                {!isAdmin && (
                  <DropdownMenuItem onClick={() => setChatOpen(true)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Live Chat Support
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden  md:flex items-center space-x-2">
              <Button                 variant="ghost" 
                onClick={() => navigate('/login')}
                className="font-medium hover:bg-[#307072]"
              >
                Login
              </Button>
              <Button 
                // variant="hero" 
                onClick={() => navigate('/register')}
                className="font-medium"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <NavLinks />
                
                {!isAuthenticated && (
                  <div className="pt-4 border-t space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="hero" 
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Live Chat Modal - Only for Users */}
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
                  id: (user as any)?._id || user?.id || '',
                  name: user?.name || '',
                  email: user?.email || '',
                  avatar: avatarUrl || undefined
                }}
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
};

export default Header;