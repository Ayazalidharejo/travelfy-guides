import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { adminAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Shield, Key, Eye, EyeOff } from 'lucide-react';

const AdminLoginPage = () => {
  const [adminKey, setAdminKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await adminAPI.adminLogin(adminKey);
      
      if (response.success) {
        // Store admin token and user info
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        toast({
          title: "Admin Access Granted",
          description: `Welcome, ${response.user.name}!`,
        });
        
        // Redirect to admin dashboard
        navigate('/admin');
        
        // Reload to update auth context
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast({
        title: "Access Denied",
        description: error.response?.data?.message || "Invalid admin key",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <MapPin className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold text-white">
              Travel Tours
            </span>
          </Link>
        </div>

        <Card className="shadow-large border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription>
              Enter your admin key to access the administration panel
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminKey">Admin Key</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="adminKey"
                    type={showKey ? "text" : "password"}
                    placeholder="Enter your admin key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Access Admin Panel"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have admin access?{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium"
                >
                  Regular Login
                </Link>
              </p>
            </div>

            {/* Demo Admin Key */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Demo Admin Key:</p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-muted px-2 py-1 rounded">your_admin_access_key_here</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAdminKey('your_admin_access_key_here')}
                  className="text-xs"
                >
                  Use Demo Key
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-warning mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-warning-foreground">Security Notice</p>
                  <p className="text-xs text-muted-foreground">
                    Admin keys provide full system access. Keep them secure and never share them.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;