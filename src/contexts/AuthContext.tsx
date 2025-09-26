// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { authAPI } from '@/lib/api';
// import { useToast } from '@/hooks/use-toast';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar?: string;
//   phone?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (credentials: { email: string; password: string }) => Promise<boolean>;
//   register: (userData: { name: string; email: string; password: string; phone?: string }) => Promise<boolean>;
//   logout: () => void;
//   updateUser: (updatedUserData: Partial<User>) => void;
//   loading: boolean;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   // useEffect(() => {
//   //   const initAuth = async () => {
//   //     const storedToken = localStorage.getItem('token');
//   //     const storedUser = localStorage.getItem('user');
      
//   //     // if (storedToken && storedUser) {
//   //     //   setToken(storedToken);
//   //     //   setUser(JSON.parse(storedUser));
//   //      if (storedToken && storedUser) {
//   //     const parsedUser = JSON.parse(storedUser);
//   //     console.log('🔄 Loading user from localStorage:', parsedUser);
//   //     console.log('🖼️ Avatar from localStorage:', parsedUser.avatar);
      
//   //     setToken(storedToken);
//   //     setUser(parsedUser);
      
        
//   //       // Verify token is still valid
//   //       try {
//   //         const response = await authAPI.getProfile();
//   //         setUser(response.user);
//   //       } catch (error) {
//   //         console.error('Token verification failed:', error);
//   //         logout();
//   //       }
//   //     }
      
//   //     setLoading(false);
//   //   };

//   //   initAuth();
//   // }, []);
// useEffect(() => {
//   const initAuth = async () => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
    
//     if (storedToken && storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       console.log('🔄 Loading user from localStorage:', parsedUser);
//       console.log('🖼️ Avatar from localStorage:', parsedUser.avatar);
      
//       setToken(storedToken);
//       setUser(parsedUser);
      
//       // Verify token is still valid
//       try {
//         const response = await authAPI.getProfile();
//         console.log('✅ Fresh user data from API:', response.user);
//         setUser(response.user); // This will overwrite localStorage user with fresh data
//       } catch (error) {
//         console.error('Token verification failed:', error);
//         logout();
//       }
//     }
    
//     setLoading(false);
//   };

//   initAuth();
// }, []);
//   const login = async (credentials: { email: string; password: string }) => {
//     try {
//       setLoading(true);
//       const response = await authAPI.login(credentials);
      
//       if (response.success) {
//         const { token: newToken, user: newUser } = response;
        
//         setToken(newToken);
//         setUser(newUser);
        
//         localStorage.setItem('token', newToken);
//         localStorage.setItem('user', JSON.stringify(newUser));
        
//         toast({
//           title: "Welcome back!",
//           description: `Welcome back, ${newUser.name}!`,
//         });
        
//         return true;
//       }
      
//       return false;
//     } catch (error: any) {
//       console.error('Login error:', error);
//       toast({
//         title: "Login Failed",
//         description: error.response?.data?.message || "Invalid credentials",
//         variant: "destructive",
//       });
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (userData: { name: string; email: string; password: string; phone?: string }) => {
//     try {
//       setLoading(true);
//       const response = await authAPI.register(userData);
      
//       if (response.success) {
//         const { token: newToken, user: newUser } = response;
        
//         setToken(newToken);
//         setUser(newUser);
        
//         localStorage.setItem('token', newToken);
//         localStorage.setItem('user', JSON.stringify(newUser));
        
//         toast({
//           title: "Account Created!",
//           description: `Welcome to Travel Tours, ${newUser.name}!`,
//         });
        
//         return true;
//       }
      
//       return false;
//     } catch (error: any) {
//       console.error('Registration error:', error);
//       toast({
//         title: "Registration Failed",
//         description: error.response?.data?.message || "Failed to create account",
//         variant: "destructive",
//       });
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
    
//     toast({
//       title: "Logged Out",
//       description: "You have been successfully logged out.",
//     });
//   };
//  // AuthContext.tsx میں updateUser function میں console log add کریں
// const updateUser = (updatedUserData) => {
//   console.log('🔄 UpdateUser called with:', updatedUserData);
//   setUser(prev => {
//     if (!prev) return prev;
    
//     const updatedUser = {
//       ...prev,
//       ...updatedUserData
//     };
    
//     console.log('💾 Setting updated user:', updatedUser);
//     console.log('💾 Avatar field:', updatedUser.avatar); // یہ لائن add کریں
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//     return updatedUser;
//   });
// };

//   const value: AuthContextType = {
//     user,
//     token,
//     login,
//     register,
//     logout,
//     loading,
//     updateUser,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'admin',
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { authAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
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
  const logout = useCallback(() => {
    // Clear localStorage first
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Batch state updates
    setUser(null);
    setToken(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }, [toast]);

  // Initialize auth
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          setToken(storedToken);
          setUser(parsedUser);
          
          // Verify token is still valid
          const response = await authAPI.getProfile();
          setUser(response.user);
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, [logout]);

  const login = async (credentials: { email: string; password: string }) => {
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
  };

  const register = async (userData: { name: string; email: string; password: string; phone?: string }) => {
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
  };

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
    register,
    logout,
    loading,
    updateUser,
    isAuthenticated,
    isAdmin,
  }), [user, token, login, register, logout, loading, updateUser, isAuthenticated, isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};