// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuth } from '@/contexts/AuthContext';
// import { MapPin, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }
    
//     setLoading(true);
    
//     const success = await register({
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       phone: formData.phone || undefined
//     });
    
//     if (success) {
//       navigate('/');
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-2">
//             <MapPin className="h-10 w-10 text-white" />
//             <span className="text-3xl font-bold text-white">
//               Travel Tours
//             </span>
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
//             <form onSubmit={handleSubmit} className="space-y-4">
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
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>
              
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
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>
              
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
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
              
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
//                     className="pl-10 pr-10"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>
              
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
//                     className="pl-10 pr-10"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>
              
//               {error && (
//                 <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
//                   {error}
//                 </div>
//               )}
              
//               <Button 
//                 type="submit" 
//                 className="w-full" 
//                 variant="hero"
//                 disabled={loading}
//               >
//                 {loading ? "Creating Account..." : "Create Account"}
//               </Button>
//             </form>
            
//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{' '}
//                 <Link 
//                   to="/login" 
//                   className="text-primary hover:underline font-medium"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </div>
            
//             <div className="mt-4 text-xs text-muted-foreground text-center">
//               By creating an account, you agree to our{' '}
//               <Link to="/terms" className="text-primary hover:underline">
//                 Terms of Service
//               </Link>{' '}
//               and{' '}
//               <Link to="/privacy" className="text-primary hover:underline">
//                 Privacy Policy
//               </Link>
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';  // npm i react-toastify
import 'react-toastify/dist/ReactToastify.css';

// Icons import (make sure you have these icons or replace with your own)
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

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

  // Password strength checker function - memoized
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

  // Memoized password strength
  const memoizedPasswordStrength = useMemo(() => {
    return checkPasswordStrength(formData.password);
  }, [formData.password, checkPasswordStrength]);

  useEffect(() => {
    setPasswordStrength(memoizedPasswordStrength);
  }, [memoizedPasswordStrength]);

  // Basic frontend validation function - memoized
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
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for field as user types
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
      // You can customize error display based on error from backend
      toast.error('Something went wrong. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <User className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold text-white">Travel Tours</span>
          </Link>
        </div>

        <Card className="shadow-large border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join Travel Tours</CardTitle>
            <CardDescription>
              Create your account and start exploring amazing destinations
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

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
                    aria-describedby="name-error"
                  />
                </div>
                {formErrors.name && (
                  <p id="name-error" className="text-destructive text-sm">{formErrors.name}</p>
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
                    aria-describedby="email-error"
                  />
                </div>
                {formErrors.email && (
                  <p id="email-error" className="text-destructive text-sm">{formErrors.email}</p>
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
                    aria-describedby="phone-error"
                  />
                </div>
                {formErrors.phone && (
                  <p id="phone-error" className="text-destructive text-sm">{formErrors.phone}</p>
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
                    aria-describedby="password-error password-strength"
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
                  <p id="password-error" className="text-destructive text-sm">{formErrors.password}</p>
                )}
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm font-medium text-gray-700 mb-2">PASSWORD MUST CONTAIN:</p>
                    <div className="space-y-1">
                      {/* Row 1: Lowercase and Uppercase */}
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
                      
                      {/* Row 2: Number and Minimum Characters */}
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
                  <p id="password-strength" className={`text-sm font-medium ${
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
                    aria-describedby="confirmPassword-error"
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
                  <p id="confirmPassword-error" className="text-destructive text-sm">{formErrors.confirmPassword}</p>
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
                  aria-describedby="termsAccepted-error"
                  required
                />
                <Label htmlFor="termsAccepted" className="text-sm select-none cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </Label>
              </div>
              {formErrors.termsAccepted && (
                <p id="termsAccepted-error" className="text-destructive text-sm">{formErrors.termsAccepted}</p>
              )}

              {/* Captcha Placeholder */}
              <div className="my-4">
                {/* Integrate your captcha here */}
                <p className="text-center text-sm text-muted-foreground italic">[Captcha Placeholder]</p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;