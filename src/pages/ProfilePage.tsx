

// import React, { useState, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useAuth } from '@/contexts/AuthContext';
// import { authAPI } from '@/lib/api';
// import { useToast } from '@/hooks/use-toast';
// import { User, Mail, Phone, Lock, Camera, Save, Upload } from 'lucide-react';

// const ProfilePage = () => {
//   const { user, isAuthenticated,updateUser } = useAuth();
//   const { toast } = useToast();
//   const fileInputRef = useRef(null);
  
//   const [profileData, setProfileData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     avatar: user?.avatar || ''
//   });
  
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [passwordLoading, setPasswordLoading] = useState(false);
//   const [avatarUploading, setAvatarUploading] = useState(false);
//   const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '');

//   const handleProfileChange = (field, value) => {
//     setProfileData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePasswordChange = (field, value) => {
//     setPasswordData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleAvatarClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       toast({
//         title: "Invalid File Type",
//         description: "Please select an image file.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast({
//         title: "File Too Large",
//         description: "Please select an image smaller than 5MB.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setAvatarUploading(true);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPreviewAvatar(e.target.result);
//       };
//       reader.readAsDataURL(file);

//       // Upload avatar
//       const formData = new FormData();
//       formData.append('avatar', file);
      
//       const response = await authAPI.uploadAvatar(formData);
      
//       // if (response.success) {
//       //   handleProfileChange('avatar', response.avatarUrl);
//       //   toast({
//       //     title: "Avatar Updated",
//       //     description: "Your profile picture has been updated successfully.",
//       //   });
//       // }
//       if (response.success) {
//   handleProfileChange('avatar', response.avatarUrl);
  
//   // User context update karein - YE ADD KAREIN
//   updateUser({ avatar: response.avatarUrl });
  
//   toast({
//     title: "Avatar Updated",
//     description: "Your profile picture has been updated successfully.",
//   });
// }
//     } catch (error) {
//       console.error('Avatar upload error:', error);
//       toast({
//         title: "Upload Failed",
//         description: error.response?.data?.message || "Failed to upload avatar.",
//         variant: "destructive",
//       });
//       // Reset preview on error
//       setPreviewAvatar(user?.avatar || '');
//     } finally {
//       setAvatarUploading(false);
//     }
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       setLoading(true);
//       const response = await authAPI.updateProfile(profileData);
      
//       if (response.success) {
//         toast({
//           title: "Profile Updated",
//           description: "Your profile has been updated successfully.",
//         });
//       }
//     } catch (error) {
//       console.error('Profile update error:', error);
//       toast({
//         title: "Update Failed",
//         description: error.response?.data?.message || "Failed to update profile.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast({
//         title: "Password Mismatch",
//         description: "New passwords do not match.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     if (passwordData.newPassword.length < 6) {
//       toast({
//         title: "Password Too Short",
//         description: "Password must be at least 6 characters long.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     try {
//       setPasswordLoading(true);
//       const response = await authAPI.updatePassword({
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword
//       });
      
//       if (response.success) {
//         toast({
//           title: "Password Updated",
//           description: "Your password has been updated successfully.",
//         });
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//       }
//     } catch (error) {
//       console.error('Password update error:', error);
//       toast({
//         title: "Update Failed",
//         description: error.response?.data?.message || "Failed to update password.",
//         variant: "destructive",
//       });
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   if (!isAuthenticated || !user) {
//     return (
//       <div className="min-h-screen bg-gradient-card flex items-center justify-center">
//         <Card className="w-full max-w-md text-center">
//           <CardContent className="p-8">
//             <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
//             <p className="text-muted-foreground">
//               Please login to access your profile.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-card">
//       <div className="container px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="relative inline-block">
//               <Avatar className="w-24 h-24 mx-auto mb-4">
//                 <AvatarImage src={previewAvatar} alt={user.name} />
//                 <AvatarFallback className="bg-gradient-primary text-white text-2xl">
//                   {user.name?.charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <Button
//                 size="icon"
//                 variant="outline"
//                 className="absolute bottom-0 right-0 rounded-full"
//                 onClick={handleAvatarClick}
//                 disabled={avatarUploading}
//               >
//                 {avatarUploading ? (
//                   <Upload className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <Camera className="h-4 w-4" />
//                 )}
//               </Button>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleAvatarChange}
//                 className="hidden"
//               />
//             </div>
//             <h1 className="text-3xl font-bold">{user.name}</h1>
//             <p className="text-muted-foreground">{user.email}</p>
//             {user.role === 'admin' && (
//               <span className="inline-block mt-2 px-3 py-1 bg-gradient-primary text-white text-sm rounded-full">
//                 Administrator
//               </span>
//             )}
//           </div>

//           {/* Profile Tabs */}
//           <Tabs defaultValue="profile" className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="profile">Profile Information</TabsTrigger>
//               <TabsTrigger value="security">Security</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="profile" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <User className="h-5 w-5" />
//                     Personal Information
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <form onSubmit={handleProfileSubmit} className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Full Name</Label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           id="name"
//                           value={profileData.name}
//                           onChange={(e) => handleProfileChange('name', e.target.value)}
//                           className="pl-10"
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email Address</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           id="email"
//                           type="email"
//                           value={profileData.email}
//                           onChange={(e) => handleProfileChange('email', e.target.value)}
//                           className="pl-10"
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone Number</Label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           id="phone"
//                           type="tel"
//                           value={profileData.phone}
//                           onChange={(e) => handleProfileChange('phone', e.target.value)}
//                           className="pl-10"
//                         />
//                       </div>
//                     </div>
                    
//                     <Button
//                       type="submit"
//                       className="w-full"
//                       variant="hero"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         "Updating..."
//                       ) : (
//                         <>
//                           <Save className="mr-2 h-4 w-4" />
//                           Save Changes
//                         </>
//                       )}
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="security" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Lock className="h-5 w-5" />
//                     Change Password
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <form onSubmit={handlePasswordSubmit} className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="currentPassword">Current Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           id="currentPassword"
//                           type="password"
//                           value={passwordData.currentPassword}
//                           onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
//                           className="pl-10"
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="newPassword">New Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           id="newPassword"
//                           type="password"
//                           value={passwordData.newPassword}
//                           onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
//                           className="pl-10"
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           id="confirmPassword"
//                           type="password"
//                           value={passwordData.confirmPassword}
//                           onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
//                           className="pl-10"
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <Button
//                       type="submit"
//                       className="w-full"
//                       variant="hero"
//                       disabled={passwordLoading}
//                     >
//                       {passwordLoading ? (
//                         "Updating Password..."
//                       ) : (
//                         <>
//                           <Lock className="mr-2 h-4 w-4" />
//                           Update Password
//                         </>
//                       )}
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

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
import { User, Mail, Phone, Lock, Camera, Save, Upload } from 'lucide-react';

const ProfilePage = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to convert backend avatar path to full URL
  const getImageURL = useCallback((avatarPath?: string) => {
    if (!avatarPath) return '';

    if (avatarPath.startsWith('data:') || avatarPath.startsWith('http')) {
      return avatarPath; // Already full URL or base64 image
    }

    // Adjust baseURL according to your backend
    const baseURL = 'http://localhost:5000';
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
          const serverAvatarURL = response.avatarUrl; // relative path from backend

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
    [toast, authAPI, handleProfileChange, updateUser, getImageURL, user?.avatar]
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
          </div>

          {/* Tabs for Profile & Password */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>

            {/* Profile Update Form */}
            <TabsContent value="profile" className="p-0">
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="mb-1 inline-block">
                    <User className="inline-block mr-2" /> Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={profileData.name}
                    onChange={e => handleProfileChange('name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="mb-1 inline-block">
                    <Mail className="inline-block mr-2" /> Email
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

                <div>
                  <Label htmlFor="phone" className="mb-1 inline-block">
                    <Phone className="inline-block mr-2" /> Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={e => handleProfileChange('phone', e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full" size="lg" variant="default">
                  {loading ? 'Saving...' : <><Save className="inline-block mr-2" /> Save Profile</>}
                </Button>
              </form>
            </TabsContent>

            {/* Password Change Form */}
            <TabsContent value="password" className="p-0">
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword" className="mb-1 inline-block">
                    <Lock className="inline-block mr-2" /> Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword" className="mb-1 inline-block">
                    <Lock className="inline-block mr-2" /> New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={e => handlePasswordChange('newPassword', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="mb-1 inline-block">
                    <Lock className="inline-block mr-2" /> Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" disabled={passwordLoading} className="w-full" size="lg" variant="default">
                  {passwordLoading ? 'Changing...' : <><Save className="inline-block mr-2" /> Change Password</>}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
