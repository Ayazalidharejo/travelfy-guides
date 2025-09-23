import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { postsAPI, adminAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchTours();
    }
  }, [isAdmin]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts({
        limit: 100,
        sort: '-createdAt'
      });
      if (response.success) {
        setTours(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast({
        title: "Error",
        description: "Failed to load tours.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (tourId: string, currentFeatured: boolean) => {
    try {
      await adminAPI.togglePostFeatured(tourId, !currentFeatured);
      toast({
        title: "Success",
        description: `Tour ${!currentFeatured ? 'marked as featured' : 'removed from featured'}.`,
      });
      fetchTours();
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update tour status.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTour = async () => {
    if (!tourToDelete) return;
    
    try {
      setDeleting(true);
      await postsAPI.deletePost(tourToDelete._id);
      toast({
        title: "Tour Deleted",
        description: "Tour has been successfully deleted.",
      });
      setDeleteDialogOpen(false);
      setTourToDelete(null);
      fetchTours();
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast({
        title: "Error",
        description: "Failed to delete tour.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const filteredTours = tours.filter((tour: any) =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.prefecture?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Tours</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your tour listings
            </p>
          </div>
          <Button variant="hero" className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Tour
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tours by name, category, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Total: {filteredTours.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tours List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTours.length > 0 ? (
          <div className="space-y-4">
            {filteredTours.map((tour: any) => (
              <Card key={tour._id} className="hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Tour Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={tour.imageUrl || tour.images?.[0] || '/placeholder.svg'}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Tour Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 truncate">{tour.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{tour.prefecture || 'Location'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{tour.views} views</span>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Tour
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleFeatured(tour._id, tour.featured)}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              {tour.featured ? 'Remove from Featured' : 'Mark as Featured'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setTourToDelete(tour);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Tour
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{tour.category}</Badge>
                          <Badge variant="outline">{tour.status}</Badge>
                          {tour.featured && (
                            <Badge className="bg-gradient-sunset text-white">Featured</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{tour.rating?.average?.toFixed(1) || '0.0'}</span>
                            <span className="text-muted-foreground">({tour.rating?.count || 0})</span>
                          </div>
                          <div className="flex items-center gap-1 text-lg font-bold text-primary">
                            <DollarSign className="h-5 w-5" />
                            <span>{tour.priceNumber || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tours found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first tour'}
              </p>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Create First Tour
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Tour</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{tourToDelete?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteTour}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Tour"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminTours;