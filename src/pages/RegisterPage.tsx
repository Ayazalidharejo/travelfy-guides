

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuth } from '@/contexts/AuthContext';
// import { toast } from 'react-toastify';  // npm i react-toastify
// import 'react-toastify/dist/ReactToastify.css';

// // Icons import (make sure you have these icons or replace with your own)
// import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     termsAccepted: false
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
//   const [passwordStrength, setPasswordStrength] = useState('');

//   const { register } = useAuth();
//   const navigate = useNavigate();

//   // Password strength checker function - memoized
//   const checkPasswordStrength = useCallback((password: string) => {
//     if (!password) return '';
//     if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password) && /\W/.test(password)) {
//       return 'Strong';
//     } else if (password.length >= 6) {
//       return 'Medium';
//     } else {
//       return 'Weak';
//     }
//   }, []);

//   // Password validation requirements
//   const passwordValidation = useMemo(() => {
//     const password = formData.password;
//     return {
//       hasLowercase: /[a-z]/.test(password),
//       hasUppercase: /[A-Z]/.test(password),
//       hasNumber: /\d/.test(password),
//       hasMinLength: password.length >= 8,
//       isValid: /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8
//     };
//   }, [formData.password]);

//   // Memoized password strength
//   const memoizedPasswordStrength = useMemo(() => {
//     return checkPasswordStrength(formData.password);
//   }, [formData.password, checkPasswordStrength]);

//   useEffect(() => {
//     setPasswordStrength(memoizedPasswordStrength);
//   }, [memoizedPasswordStrength]);

//   // Basic frontend validation function - memoized
//   const validateForm = useCallback(() => {
//     const errors: {[key: string]: string} = {};

//     if (!formData.name.trim()) errors.name = 'Name is required';
//     else if (/[^a-zA-Z\s]/.test(formData.name)) errors.name = 'Name can only contain letters and spaces';

//     if (!formData.email.trim()) errors.email = 'Email is required';
//     else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) errors.email = 'Invalid email format';

//     if (formData.phone && !/^\+?\d{7,15}$/.test(formData.phone)) errors.phone = 'Invalid phone number';

//     if (!formData.password) errors.password = 'Password is required';
//     else if (!passwordValidation.isValid) errors.password = 'Password must meet all requirements';

//     if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
//     else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

//     if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions';

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   }, [formData]);

//   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Clear error for field as user types
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }));
//   }, []);

//   const toggleShowPassword = useCallback(() => {
//     setShowPassword(prev => !prev);
//   }, []);

//   const toggleShowConfirmPassword = useCallback(() => {
//     setShowConfirmPassword(prev => !prev);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setLoading(true);

//     try {
//       const success = await register({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone || undefined
//       });

//       if (success) {
//         toast.success('Account created successfully! Redirecting...');
//         setTimeout(() => navigate('/'), 2000);
//       } else {
//         toast.error('Registration failed. Please try again.');
//       }
//     } catch (err) {
//       // You can customize error display based on error from backend
//       toast.error('Something went wrong. Please try again later.');
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-2">
//             <User className="h-10 w-10 text-white" />
//             <span className="text-3xl font-bold text-white">Travel Tours</span>
//           </Link>
//         </div>

//         <Card className="shadow-large border-0 bg-white/95 backdrop-blur-sm">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold">Join Travel Tours</CardTitle>
//             <CardDescription>
//               Create your account and start exploring amazing destinations
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4" noValidate>

//               {/* Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`pl-10 ${formErrors.name ? 'border-destructive' : ''}`}
//                     required
//                     aria-invalid={!!formErrors.name}
//                     aria-describedby="name-error"
//                   />
//                 </div>
//                 {formErrors.name && (
//                   <p id="name-error" className="text-destructive text-sm">{formErrors.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`pl-10 ${formErrors.email ? 'border-destructive' : ''}`}
//                     required
//                     aria-invalid={!!formErrors.email}
//                     aria-describedby="email-error"
//                   />
//                 </div>
//                 {formErrors.email && (
//                   <p id="email-error" className="text-destructive text-sm">{formErrors.email}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number (Optional)</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     placeholder="Enter your phone number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className={`pl-10 ${formErrors.phone ? 'border-destructive' : ''}`}
//                     aria-invalid={!!formErrors.phone}
//                     aria-describedby="phone-error"
//                   />
//                 </div>
//                 {formErrors.phone && (
//                   <p id="phone-error" className="text-destructive text-sm">{formErrors.phone}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Create a password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`pl-10 pr-10 ${formErrors.password ? 'border-destructive' : ''}`}
//                     required
//                     aria-invalid={!!formErrors.password}
//                     aria-describedby="password-error password-strength"
//                   />
//                   <button
//                     type="button"
//                     onClick={toggleShowPassword}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//                 {formErrors.password && (
//                   <p id="password-error" className="text-destructive text-sm">{formErrors.password}</p>
//                 )}
                
//                 {/* Password Requirements */}
//                 {formData.password && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
//                     <p className="text-sm font-medium text-gray-700 mb-2">PASSWORD MUST CONTAIN:</p>
//                     <div className="space-y-1">
//                       {/* Row 1: Lowercase and Uppercase */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-1">
//                           {passwordValidation.hasLowercase ? (
//                             <span className="text-green-600">✓</span>
//                           ) : (
//                             <span className="text-red-600">✗</span>
//                           )}
//                           <span className={`text-xs ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
//                             At least one lowercase letter
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           {passwordValidation.hasUppercase ? (
//                             <span className="text-green-600">✓</span>
//                           ) : (
//                             <span className="text-red-600">✗</span>
//                           )}
//                           <span className={`text-xs ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
//                             At least one uppercase letter
//                           </span>
//                         </div>
//                       </div>
                      
//                       {/* Row 2: Number and Minimum Characters */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-1">
//                           {passwordValidation.hasNumber ? (
//                             <span className="text-green-600">✓</span>
//                           ) : (
//                             <span className="text-red-600">✗</span>
//                           )}
//                           <span className={`text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
//                             At least one number
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           {passwordValidation.hasMinLength ? (
//                             <span className="text-green-600">✓</span>
//                           ) : (
//                             <span className="text-red-600">✗</span>
//                           )}
//                           <span className={`text-xs ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
//                             Minimum 8 characters
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {passwordStrength && (
//                   <p id="password-strength" className={`text-sm font-medium ${
//                     passwordStrength === 'Strong' ? 'text-green-600' :
//                     passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
//                   }`}>
//                     Password strength: {passwordStrength}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className={`pl-10 pr-10 ${formErrors.confirmPassword ? 'border-destructive' : ''}`}
//                     required
//                     aria-invalid={!!formErrors.confirmPassword}
//                     aria-describedby="confirmPassword-error"
//                   />
//                   <button
//                     type="button"
//                     onClick={toggleShowConfirmPassword}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                     aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//                 {formErrors.confirmPassword && (
//                   <p id="confirmPassword-error" className="text-destructive text-sm">{formErrors.confirmPassword}</p>
//                 )}
//               </div>

//               {/* Terms and Conditions */}
//               <div className="flex items-center space-x-2">
//                 <input
//                   id="termsAccepted"
//                   name="termsAccepted"
//                   type="checkbox"
//                   checked={formData.termsAccepted}
//                   onChange={handleChange}
//                   className="w-4 h-4"
//                   aria-invalid={!!formErrors.termsAccepted}
//                   aria-describedby="termsAccepted-error"
//                   required
//                 />
//                 <Label htmlFor="termsAccepted" className="text-sm select-none cursor-pointer">
//                   I agree to the{' '}
//                   <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
//                   <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
//                 </Label>
//               </div>
//               {formErrors.termsAccepted && (
//                 <p id="termsAccepted-error" className="text-destructive text-sm">{formErrors.termsAccepted}</p>
//               )}

//               {/* Captcha Placeholder */}
//               <div className="my-4">
//                 {/* Integrate your captcha here */}
//                 <p className="text-center text-sm text-muted-foreground italic">[Captcha Placeholder]</p>
//               </div>

//               {/* Submit Button */}
//               <Button 
//                 type="submit" 
//                 className="w-full" 
//                 variant="hero"
//                 disabled={loading}
//                 aria-busy={loading}
//               >
//                 {loading ? "Creating Account..." : "Create Account"}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{' '}
//                 <Link to="/login" className="text-primary hover:underline font-medium">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;




import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Mail, Phone, Lock, Eye, EyeOff, Plane, MapPin, Globe } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = useCallback((password: string) => {
    if (!password) return '';
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password) && /\W/.test(password)) {
      return 'Strong';
    } else if (password.length >= 6) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  }, []);

  // Password validation requirements
  const passwordValidation = useMemo(() => {
    const password = formData.password;
    return {
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasMinLength: password.length >= 8,
      isValid: /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8
    };
  }, [formData.password]);

  const memoizedPasswordStrength = useMemo(() => {
    return checkPasswordStrength(formData.password);
  }, [formData.password, checkPasswordStrength]);

  useEffect(() => {
    setPasswordStrength(memoizedPasswordStrength);
  }, [memoizedPasswordStrength]);

  // Form validation
  const validateForm = useCallback(() => {
    const errors: {[key: string]: string} = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    else if (/[^a-zA-Z\s]/.test(formData.name)) errors.name = 'Name can only contain letters and spaces';

    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) errors.email = 'Invalid email format';

    if (formData.phone && !/^\+?\d{7,15}$/.test(formData.phone)) errors.phone = 'Invalid phone number';

    if (!formData.password) errors.password = 'Password is required';
    else if (!passwordValidation.isValid) errors.password = 'Password must meet all requirements';

    if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, passwordValidation.isValid]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined
      });

      if (success) {
        toast.success('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=1600&fit=crop)'
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center space-x-4 mb-8">
              <Plane className="h-16 w-16 animate-bounce" />
              <Globe className="h-16 w-16 animate-pulse" />
              <MapPin className="h-16 w-16 animate-bounce" />
            </div>
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to Karvaan Tours</h1>
            <p className="text-xl text-white/90 drop-shadow-md">
              Discover amazing destinations around the world
            </p>
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="bg-white/20 p-3 rounded-full">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">150+ Destinations</p>
                  <p className="text-sm text-white/80">Explore worldwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="bg-white/20 p-3 rounded-full">
                  <User className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">50,000+ Happy Travelers</p>
                  <p className="text-sm text-white/80">Join our community</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="bg-white/20 p-3 rounded-full">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Expert Guides</p>
                  <p className="text-sm text-white/80">Best local experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center space-x-2">
              <User className="h-10 w-10 text-blue-600" />
              <span className="text-3xl font-bold text-gray-800">Travel Tours</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-600 mt-2">Join us and start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 ${formErrors.name ? 'border-destructive' : ''}`}
                    required
                    aria-invalid={!!formErrors.name}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-destructive text-sm">{formErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 ${formErrors.email ? 'border-destructive' : ''}`}
                    required
                    aria-invalid={!!formErrors.email}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-destructive text-sm">{formErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`pl-10 ${formErrors.phone ? 'border-destructive' : ''}`}
                    aria-invalid={!!formErrors.phone}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-destructive text-sm">{formErrors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 pr-10 ${formErrors.password ? 'border-destructive' : ''}`}
                    required
                    aria-invalid={!!formErrors.password}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-destructive text-sm">{formErrors.password}</p>
                )}
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm font-medium text-gray-700 mb-2">PASSWORD MUST CONTAIN:</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {passwordValidation.hasLowercase ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          <span className={`text-xs ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                            At least one lowercase letter
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {passwordValidation.hasUppercase ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          <span className={`text-xs ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                            At least one uppercase letter
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {passwordValidation.hasNumber ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          <span className={`text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                            At least one number
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {passwordValidation.hasMinLength ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          <span className={`text-xs ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
                            Minimum 8 characters
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {passwordStrength && (
                  <p className={`text-sm font-medium ${
                    passwordStrength === 'Strong' ? 'text-green-600' :
                    passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    Password strength: {passwordStrength}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-10 pr-10 ${formErrors.confirmPassword ? 'border-destructive' : ''}`}
                    required
                    aria-invalid={!!formErrors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-destructive text-sm">{formErrors.confirmPassword}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4"
                  aria-invalid={!!formErrors.termsAccepted}
                  required
                />
                <Label htmlFor="termsAccepted" className="text-sm select-none cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </Label>
              </div>
              {formErrors.termsAccepted && (
                <p className="text-destructive text-sm">{formErrors.termsAccepted}</p>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-[#5C7AC0]  hover:bg-[#284078]" 
                // variant="hero"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <button 
                type="button"
                onClick={async () => {
                  setLoading(true);
                  const success = await loginWithGoogle();
                  if (success) {
                    navigate('/', { replace: true });
                  }
                  setLoading(false);
                }}
                disabled={loading}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              {/* <button 
                type="button"
                disabled={loading}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button> */}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;