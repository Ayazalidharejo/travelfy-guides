

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { authAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  photoURL?: string;
  phone?: string;
  isGoogleUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string; phone?: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUserData: Partial<User>) => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Optimized logout function
  const logout = useCallback(async () => {
    // Clear localStorage first
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Sign out from Firebase if user is signed in
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Firebase sign out error:', error);
    }
    
    // Batch state updates
    setUser(null);
    setToken(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }, [toast]);

  // Initialize auth and Firebase auth state listener
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          setToken(storedToken);
          setUser(parsedUser);
          
          // Only verify token for non-Google users
          if (!parsedUser.isGoogleUser) {
            const response = await authAPI.getProfile();
            setUser(response.user);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // Only logout if it's not a Google user
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (!parsedUser.isGoogleUser) {
              logout();
            }
          }
        }
      }
      
      setLoading(false);
    };

    // Firebase auth state listener for Google users
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in with Firebase (Google)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.isGoogleUser) {
            // Update user state with fresh Firebase data
            setUser(parsedUser);
            setToken('google-auth-token');
          }
        }
      }
    });

    initAuth();

    // Cleanup subscription
    return () => unsubscribe();
  }, [logout]);

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        const { token: newToken, user: newUser } = response;
        
        // Update localStorage first
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Then update state
        setToken(newToken);
        setUser(newUser);
        
        toast({
          title: "Welcome back!",
          description: `Welcome back, ${newUser.name}!`,
        });
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Create user object from Firebase data
      const googleUser: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Google User',
        email: firebaseUser.email || '',
        role: 'user',
        photoURL: firebaseUser.photoURL || '',
        avatar: firebaseUser.photoURL || '',
        isGoogleUser: true,
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(googleUser));
      localStorage.setItem('token', 'google-auth-token'); // Placeholder token
      
      // Update state
      setUser(googleUser);
      setToken('google-auth-token');
      
      toast({
        title: "Welcome!",
        description: `Welcome, ${googleUser.name}!`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Google login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const register = useCallback(async (userData: { name: string; email: string; password: string; phone?: string }) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      if (response.success) {
        const { token: newToken, user: newUser } = response;
        
        // Update localStorage first
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Then update state
        setToken(newToken);
        setUser(newUser);
        
        toast({
          title: "Account Created!",
          description: `Welcome to Travel Tours, ${newUser.name}!`,
        });
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Failed to create account",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateUser = useCallback((updatedUserData: Partial<User>) => {
   
    setUser(prev => {
      if (!prev) return prev;
      
      const updatedUser = {
        ...prev,
        ...updatedUserData
      };
    
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  // Memoize computed values
  const isAuthenticated = useMemo(() => !!user, [user]);
  const isAdmin = useMemo(() => user?.role === 'admin', [user?.role]);

  const value: AuthContextType = useMemo(() => ({
    user,
    token,
    login,
    loginWithGoogle,
    register,
    logout,
    loading,
    updateUser,
    isAuthenticated,
    isAdmin,
  }), [user, token, login, loginWithGoogle, register, logout, loading, updateUser, isAuthenticated, isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};