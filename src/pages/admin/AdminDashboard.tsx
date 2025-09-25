import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { adminAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Star,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';
import AdminPostDashboard from './AdminPostDashboard';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">
              You need administrator privileges to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-card">
        <div className="container px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-16 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="h-64 bg-muted rounded" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="h-64 bg-muted rounded" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's what's happening with your tours.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tours</p>
                  <p className="text-3xl font-bold text-primary">{stats?.totalPosts || 0}</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-success">{stats?.totalUsers || 0}</p>
                </div>
                <Users className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-3xl font-bold text-warning">{stats?.totalBookings || 0}</p>
                </div>
                <Calendar className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-secondary">
                    ${(stats?.totalRevenue || 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Bookings
              </CardTitle>
              <Link to="/admin/bookings">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {stats?.recentBookings?.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentBookings.slice(0, 5).map((booking: any) => (
                    <div key={booking._id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{booking.post?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.user?.name} • {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          booking.status === 'confirmed' ? 'bg-success' :
                          booking.status === 'pending' ? 'bg-warning' :
                          'bg-muted'
                        }>
                          {booking.status}
                        </Badge>
                        <p className="text-xs font-medium mt-1">${booking.payment.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No recent bookings</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Popular Tours */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Popular Tours
              </CardTitle>
              <Link to="/admin/tours">
                <Button variant="outline" size="sm">Manage Tours</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {stats?.popularPosts?.length > 0 ? (
                <div className="space-y-4">
                  {stats.popularPosts.map((tour: any) => (
                    <div key={tour._id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{tour.title}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{tour.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{tour.rating?.average?.toFixed(1) || '0.0'}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{tour.category}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No tours available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/tours">
                <Card className="hover:shadow-medium transition-smooth cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Manage Tours</h3>
                    <p className="text-sm text-muted-foreground">Create and edit tour listings</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/bookings">
                <Card className="hover:shadow-medium transition-smooth cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-success mx-auto mb-2" />
                    <h3 className="font-semibold">View Bookings</h3>
                    <p className="text-sm text-muted-foreground">Monitor and manage bookings</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/users">
                <Card className="hover:shadow-medium transition-smooth cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-warning mx-auto mb-2" />
                    <h3 className="font-semibold">User Management</h3>
                    <p className="text-sm text-muted-foreground">View and manage users</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
        <AdminPostDashboard/>
      </div>
    </div>
  );
};

export default AdminDashboard;