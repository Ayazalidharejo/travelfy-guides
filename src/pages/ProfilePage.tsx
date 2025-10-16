
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Lock, Camera, Save, Upload, MessageCircle } from 'lucide-react';
import UserChat from './UserChat';

const ProfilePage = () => {
  const { user, isAuthenticated, updateUser, token } = useAuth(); // ✅ token add karo
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat state
  const [showChat, setShowChat] = useState(false);

  // Function to convert backend avatar path to full URL
  const getImageURL = useCallback((avatarPath?: string) => {
    if (!avatarPath) return '';

    // If already a full URL (Cloudinary, data URI, etc.), return as is
    if (avatarPath.startsWith('data:') || avatarPath.startsWith('http')) {
      return avatarPath;
    }

    // For relative paths, use local backend URL
    const baseURL = 'https://tour-backend-eight.vercel.app';
    return `${baseURL}${avatarPath}`;
  }, []);

  // State to preview avatar image
  const [previewAvatar, setPreviewAvatar] = useState(() =>
    user?.avatar ? getImageURL(user.avatar) : ''
  );

  // Profile form data state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Loading states
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Update profileData and previewAvatar when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
      });

      const newAvatarURL = getImageURL(user.avatar);
      if (previewAvatar !== newAvatarURL) {
        setPreviewAvatar(newAvatarURL);
      }
    }
  }, [user, getImageURL, previewAvatar]);

  // Handle profile input changes
  const handleProfileChange = useCallback((field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Handle password input changes
  const handlePasswordChange = useCallback((field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Open file dialog when avatar button clicked
  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle avatar file selection & upload
  const handleAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File Type',
          description: 'Please select an image file.',
          variant: 'destructive',
        });
        return;
      }

      // Validate file size (< 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Please select an image smaller than 5MB.',
          variant: 'destructive',
        });
        return;
      }

      try {
        setAvatarUploading(true);

        // Preview image locally
        const reader = new FileReader();
        reader.onload = e => {
          setPreviewAvatar(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload avatar to backend
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await authAPI.uploadAvatar(formData);

        if (response.success) {
          const serverAvatarURL = response.avatarUrl;

          // Update profileData and global user context
          handleProfileChange('avatar', serverAvatarURL);
          updateUser({ avatar: serverAvatarURL });

          // Set preview with full URL
          const finalURL = getImageURL(serverAvatarURL);
          setPreviewAvatar(finalURL);

          toast({
            title: 'Avatar Updated',
            description: 'Your profile picture has been updated successfully.',
          });
        } else {
          throw new Error('Upload failed');
        }
      } catch (error: any) {
        toast({
          title: 'Upload Failed',
          description: error.response?.data?.message || 'Failed to upload avatar.',
          variant: 'destructive',
        });
        // Reset preview to original avatar
        setPreviewAvatar(getImageURL(user?.avatar));
      } finally {
        setAvatarUploading(false);
      }
    },
    [toast, handleProfileChange, updateUser, getImageURL, user?.avatar]
  );

  // Submit updated profile to backend
  const handleProfileSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await authAPI.updateProfile(profileData);

        if (response.success) {
          updateUser(response.user);

          toast({
            title: 'Profile Updated',
            description: 'Your profile has been updated successfully.',
          });
        } else {
          throw new Error('Update failed');
        }
      } catch (error: any) {
        toast({
          title: 'Update Failed',
          description: error.response?.data?.message || 'Failed to update profile.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    },
    [profileData, updateUser, toast]
  );

  // Submit password change to backend
  const handlePasswordSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast({
          title: 'Password Mismatch',
          description: 'New passwords do not match.',
          variant: 'destructive',
        });
        return;
      }

      if (passwordData.newPassword.length < 6) {
        toast({
          title: 'Password Too Short',
          description: 'Password must be at least 6 characters long.',
          variant: 'destructive',
        });
        return;
      }

      try {
        setPasswordLoading(true);
        const response = await authAPI.updatePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        });

        if (response.success) {
          toast({
            title: 'Password Updated',
            description: 'Your password has been updated successfully.',
          });
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        } else {
          throw new Error('Update failed');
        }
      } catch (error: any) {
        toast({
          title: 'Update Failed',
          description: error.response?.data?.message || 'Failed to update password.',
          variant: 'destructive',
        });
      } finally {
        setPasswordLoading(false);
      }
    },
    [passwordData, toast]
  );

  // Chat handlers
  const handleOpenChat = useCallback(() => {
    console.log('Opening chat...');
    setShowChat(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    console.log('Closing chat...');
    setShowChat(false);
  }, []);

  // If user not logged in, show access denied
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">Please login to access your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header with Avatar */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={previewAvatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>

              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={handleAvatarClick}
                disabled={avatarUploading}
              >
                {avatarUploading ? <Upload className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>

            {/* ✅ FIX: Chat button add karo yahan */}
            <Button 
              onClick={handleOpenChat}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Support Chat
            </Button>
          </div>

          {/* Tabs for Profile, Password & Bookings */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>

            {/* Profile Update Form */}
            <TabsContent value="profile" className="p-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <User className="mr-2 h-4 w-4" /> 
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={profileData.name}
                        onChange={e => handleProfileChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> 
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={e => handleProfileChange('email', e.target.value)}
                        required
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" /> 
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={e => handleProfileChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full" 
                      size="lg" 
                      variant="default"
                    >
                      {loading ? (
                        <>
                          <Upload className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> 
                          Save Profile
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Password Change Form */}
            <TabsContent value="password" className="p-0">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="flex items-center">
                        <Lock className="mr-2 h-4 w-4" /> 
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                        required
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="flex items-center">
                        <Lock className="mr-2 h-4 w-4" /> 
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={e => handlePasswordChange('newPassword', e.target.value)}
                        required
                        placeholder="Enter new password (min 6 characters)"
                        minLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="flex items-center">
                        <Lock className="mr-2 h-4 w-4" /> 
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                        required
                        placeholder="Confirm new password"
                        minLength={6}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={passwordLoading} 
                      className="w-full" 
                      size="lg" 
                      variant="default"
                    >
                      {passwordLoading ? (
                        <>
                          <Upload className="mr-2 h-4 w-4 animate-spin" />
                          Changing...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> 
                          Change Password
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Bookings Tab */}
            <TabsContent value="bookings" className="p-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    My Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <div className="text-center py-8">
                      <Upload className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                      <p className="text-muted-foreground">Loading bookings...</p>
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-semibold mb-2">No Bookings Yet</p>
                      <p className="text-muted-foreground">Start exploring tours and make your first booking!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking: any) => (
                        <Card key={booking._id} className="border-2 hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            {/* Booking Header */}
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                  {booking.post?.title || 'Tour Booking'}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Booking ID: <span className="font-mono">{booking._id?.slice(-8)}</span>
                                </p>
                              </div>
                              <Badge 
                                variant={
                                  booking.paymentMethod === 'bookNowPayLater' 
                                    ? 'secondary' 
                                    : booking.paymentStatus === 'paid' 
                                    ? 'default' 
                                    : 'destructive'
                                }
                                className={
                                  booking.paymentMethod === 'bookNowPayLater'
                                    ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                    : booking.paymentStatus === 'paid'
                                    ? 'bg-green-100 text-green-800 border-green-300'
                                    : ''
                                }
                              >
                                {booking.paymentMethod === 'bookNowPayLater' 
                                  ? '⏰ Pay Later' 
                                  : booking.paymentStatus === 'paid' 
                                  ? '✅ Paid' 
                                  : '❌ Unpaid'}
                              </Badge>
                            </div>

                            <Separator className="my-4" />

                            {/* Booking Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">Date:</span>
                                <span>{booking.tourDate ? format(new Date(booking.tourDate), 'PPP') : 'N/A'}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-green-600" />
                                <span className="font-medium">Time:</span>
                                <span>{booking.selectedTimeSlot || 'N/A'}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-purple-600" />
                                <span className="font-medium">Participants:</span>
                                <span>
                                  {booking.participants?.adults || 0} adults
                                  {(booking.participants?.children || 0) > 0 && `, ${booking.participants.children} children`}
                                  {(booking.participants?.seniors || 0) > 0 && `, ${booking.participants.seniors} seniors`}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-red-600" />
                                <span className="font-medium">Language:</span>
                                <span>{booking.preferredLanguage || 'English'}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <CreditCard className="h-4 w-4 text-indigo-600" />
                                <span className="font-medium">Payment:</span>
                                <span>
                                  {booking.paymentMethod === 'bookNowPayLater' 
                                    ? 'Pay Later at Tour' 
                                    : 'Stripe (Online)'}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-green-600" />
                                <span className="font-medium">Total:</span>
                                <span className="font-bold text-green-700">
                                  ${booking.totalAmount?.toFixed(2) || '0.00'}
                                </span>
                              </div>
                            </div>

                            {/* Pay Later Warning */}
                            {booking.paymentMethod === 'bookNowPayLater' && (
                              <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                                <p className="text-sm text-yellow-900 font-medium flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <strong>Reminder:</strong> Please bring cash or card to pay ${booking.totalAmount?.toFixed(2)} at the tour location.
                                </p>
                              </div>
                            )}

                            {/* Booking Status */}
                            <Separator className="my-4" />
                            <div className="flex justify-between items-center text-xs text-gray-600">
                              <span>
                                Booked on: {booking.createdAt ? format(new Date(booking.createdAt), 'PPp') : 'N/A'}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {booking.status || 'Confirmed'}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* ✅ FIX: UserChat component with proper props */}
          <UserChat 
            token={token} 
            currentUser={user}
            isOpen={showChat}
            onClose={handleCloseChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;