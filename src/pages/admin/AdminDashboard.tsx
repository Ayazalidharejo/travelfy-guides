import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import api, { adminAPI } from '@/lib/api';
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
  Activity,
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import React, { Suspense } from 'react';
const AdminPostDashboard = React.lazy(() => import('./AdminPostDashboard'));
import NotificationBell from '@/components/admin/NotificationBell';
import AdminChat from '@/components/AdminChat';
import AdminConsultationsDashboard from '@/components/admin/AdminConsultationsDashboard';

const AdminDashboard = React.memo(() => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMounted, setChatMounted] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [refundsOpen, setRefundsOpen] = useState(false);
  const [refundsLoading, setRefundsLoading] = useState(false);
  const [refunds, setRefunds] = useState<any[]>([]);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  const fetchStats = useCallback(async () => {
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
  }, [toast]);

  const fetchRefundRequests = useCallback(async () => {
    try {
      setRefundsLoading(true);
      const resp = await adminAPI.getBookings();
      const list = (resp.data || []).filter((b: any) => b?.cancellation?.requiresAdminApproval && b?.cancellation?.refundStatus === 'pending');
      setRefunds(list);
    } catch (e) {
      setRefunds([]);
    } finally {
      setRefundsLoading(false);
    }
  }, []);

  // Fetch unread messages count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const headers: any = {
        'Authorization': `Bearer ${token}`,
      };

      // For Google Auth
      if (token === 'google-auth-token') {
        const userDataStr = localStorage.getItem('user');
        if (userDataStr) {
          headers['x-user-data'] = encodeURIComponent(userDataStr);
        }
      }

      const { data } = await api.get('/chat/admin/unread-count', { headers });
      if (data.success) {
        setUnreadMessages(data.unreadCount || 0);

      }
    } catch (error) {
    return error
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      fetchUnreadCount();
      fetchRefundRequests();
    }
  }, [isAdmin, fetchStats, fetchUnreadCount, fetchRefundRequests]);

  // Delay AdminChat mounting to prevent blink
  useEffect(() => {
    if (chatOpen) {
      // Mount AdminChat after dialog animation
      const timer = setTimeout(() => {
        setChatMounted(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // Immediately unmount when closing
      setChatMounted(false);
    }
  }, [chatOpen]);

  // Memoize currentUser to prevent recreation
  const currentUserMemo = useMemo(() => ({
    id: (user as any)?._id || user?.id || '',
    name: user?.name || '',
    email: user?.email || ''
  }), [(user as any)?._id, user?.id, user?.name, user?.email]);

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's what's happening with your tours.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
             <AdminConsultationsDashboard/>
        
          </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setRefundsOpen(true)}
              className="relative hover:bg-secondary hover:text-white transition-all"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Refund Requests
              {refunds.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse font-bold">
                  {refunds.length}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setChatOpen(true)}
              className="relative hover:bg-primary hover:text-white transition-all"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Live Chat
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse font-bold">
                  {unreadMessages}
                </span>
              )}
            </Button>
            <NotificationBell />
          </div>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Completed Revenue</p>
                  <p className="text-3xl font-bold text-secondary">
                    ${(stats?.completedRevenue || 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Status Cards */}
       

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
               <CardTitle className="flex items-center gap-2 py-3">
                <TrendingUp className="h-5 w-5 px-3 py-4" />
                Popular Tours
              </CardTitle>
            {/* <CardHeader className="flex flex-row items-center justify-between">
           
              <Link to="/admin/tours">
                <Button variant="outline" size="sm">Manage Tours</Button>
              </Link>
            </CardHeader> */}
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
        <Suspense fallback={<div className="mt-8 text-muted-foreground">Loading admin tools...</div>}>
          <AdminPostDashboard onTourChange={fetchStats} />
        </Suspense>

        {/* Refund Requests Modal */}
        <Dialog open={refundsOpen} onOpenChange={setRefundsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Refund Requests</DialogTitle>
              <DialogDescription>
                Approve or deny refund requests created after 24 hours cancellations.
              </DialogDescription>
            </DialogHeader>

            {refundsLoading ? (
              <div className="text-muted-foreground">Loading...</div>
            ) : refunds.length === 0 ? (
              <div className="text-muted-foreground">No pending refund requests.</div>
            ) : (
              <div className="space-y-3">
                {refunds.map((r: any) => (
                  <div key={r._id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{r.post?.title || 'Tour'}</div>
                      <div className="text-sm text-muted-foreground">Booking: {r.bookingReference}</div>
                      <div className="text-sm text-muted-foreground">Customer: {r.contactInfo?.fullName} ({r.contactInfo?.email})</div>
                      <div className="text-sm text-muted-foreground">Refund Amount: ${Number(r.cancellation?.refundAmount || 0).toFixed(2)} | Fee: ${Number(r.cancellation?.refundFee || 0).toFixed(2)}</div>
                    </div>
                    <div className="mt-3 md:mt-0 flex gap-2">
                      <Button
                        onClick={async () => {
                          try {
                            await adminAPI.approveRefund(r._id);
                            toast({ title: 'Refund Approved', description: 'Stripe refund processed.' });
                            fetchRefundRequests();
                          } catch (e: any) {
                            toast({ title: 'Error', description: e?.response?.data?.message || 'Failed to approve refund', variant: 'destructive' });
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={async () => {
                          try {
                            await adminAPI.denyRefund(r._id);
                            toast({ title: 'Refund Denied' });
                            fetchRefundRequests();
                          } catch (e: any) {
                            toast({ title: 'Error', description: e?.response?.data?.message || 'Failed to deny refund', variant: 'destructive' });
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Live Chat Modal - Only render when open */}
        {chatOpen && (
          <Dialog open={chatOpen} onOpenChange={setChatOpen}>
            <DialogContent className="max-w-6xl h-[85vh] p-0 overflow-hidden">
              <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  Live Chat Support
                </DialogTitle>
                <DialogDescription>
                  Chat with users in real-time • Respond to inquiries and provide support
                </DialogDescription>
              </DialogHeader>
              <div className="h-[calc(85vh-100px)]">
                {chatMounted ? (
                  <AdminChat
                    token={localStorage.getItem('token') || ''}
                    currentUser={currentUserMemo}
                    onUnreadCountChange={setUnreadMessages}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
     
    </div>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;