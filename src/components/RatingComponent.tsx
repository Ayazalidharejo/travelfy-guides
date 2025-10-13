import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { postsAPI } from '@/lib/api';
import { 
  Star, 
  MessageSquare, 
  Edit, 
  Trash2, 
  Send,
  User,
  Calendar,
  ThumbsUp
} from 'lucide-react';

interface Rating {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  tourId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface RatingComponentProps {
  tourId: string;
  tourTitle?: string;
  onRatingAdded?: (rating: Rating) => void;
  onRatingUpdated?: (rating: Rating) => void;
  onRatingDeleted?: (ratingId: string) => void;
}

const RatingComponent: React.FC<RatingComponentProps> = ({
  tourId,
  tourTitle,
  onRatingAdded,
  onRatingUpdated,
  onRatingDeleted
}) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingRating, setEditingRating] = useState<Rating | null>(null);
  
  // New rating form
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  
  // Edit rating form
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const fetchRatings = useCallback(async () => {
    if (!tourId) {
      console.warn('No tourId provided to fetchRatings');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Fetching ratings for tour:', tourId);
      const response = await postsAPI.getRatings(tourId);
      console.log('Ratings response:', response);
      
      if (response.success) {
        setRatings(response.data || []);
      } else {
        console.warn('Failed to fetch ratings:', response.message);
        // Don't show error toast for failed fetch, just log it
        setRatings([]);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
      // Don't show error toast, just set empty ratings
      setRatings([]);
    } finally {
      setLoading(false);
    }
  }, [tourId]);

  useEffect(() => {
    if (tourId) {
      fetchRatings();
    }
  }, [tourId, fetchRatings]);

  const handleSubmitRating = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to submit a rating.",
        variant: "destructive",
      });
      return;
    }

    if (newRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please write a comment about your experience.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const ratingData = {
        tourId,
        rating: newRating,
        comment: newComment.trim(),
        userName: user?.name || user?.email || 'Anonymous',
        userEmail: user?.email || ''
      };

      const response = await postsAPI.addRating(tourId, ratingData);
      
      if (response.success) {
        const newRatingData = response.data;
        setRatings(prev => [newRatingData, ...prev]);
        setNewRating(0);
        setNewComment('');
        
        toast({
          title: "Rating Submitted",
          description: "Thank you for your feedback!",
        });
        
        if (onRatingAdded) {
          onRatingAdded(newRatingData);
        }
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to submit rating.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateRating = async () => {
    if (!editingRating) return;

    if (editRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating.",
        variant: "destructive",
      });
      return;
    }

    if (!editComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please write a comment about your experience.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const updateData = {
        rating: editRating,
        comment: editComment.trim()
      };

      const response = await postsAPI.updateRating(tourId, editingRating._id, updateData);
      
      if (response.success) {
        const updatedRating = response.data;
        setRatings(prev => prev.map(rating => 
          rating._id === editingRating._id ? updatedRating : rating
        ));
        setEditingRating(null);
        setEditRating(0);
        setEditComment('');
        
        toast({
          title: "Rating Updated",
          description: "Your rating has been updated successfully!",
        });
        
        if (onRatingUpdated) {
          onRatingUpdated(updatedRating);
        }
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update rating.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating rating:', error);
      toast({
        title: "Error",
        description: "Failed to update rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRating = async (ratingId: string) => {
    if (!confirm('Are you sure you want to delete this rating?')) {
      return;
    }

    try {
      const response = await postsAPI.deleteRating(tourId, ratingId);
      
      if (response.success) {
        setRatings(prev => prev.filter(rating => rating._id !== ratingId));
        
        toast({
          title: "Rating Deleted",
          description: "Your rating has been deleted successfully.",
        });
        
        if (onRatingDeleted) {
          onRatingDeleted(ratingId);
        }
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to delete rating.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
      toast({
        title: "Error",
        description: "Failed to delete rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startEditRating = (rating: Rating) => {
    setEditingRating(rating);
    setEditRating(rating.rating);
    setEditComment(rating.comment);
  };

  const cancelEdit = () => {
    setEditingRating(null);
    setEditRating(0);
    setEditComment('');
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const calculateAverageRating = useMemo(() => {
    if (ratings.length === 0) return '0';
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return (total / ratings.length).toFixed(1);
  }, [ratings]);

  const getRatingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach(rating => {
      distribution[rating.rating as keyof typeof distribution]++;
    });
    return distribution;
  }, [ratings]);

  const userRating = useMemo(() => {
    return ratings.find(rating => rating.userId === user?.id);
  }, [ratings, user?.id]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {calculateAverageRating}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(parseFloat(calculateAverageRating)))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {ratings.length} review{ratings.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = getRatingDistribution[star as keyof typeof getRatingDistribution];
                const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
                
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm font-medium w-6">{star}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Rating Form */}
      {isAuthenticated && !userRating && (
        <Card>
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="rating">Your Rating *</Label>
              <div className="mt-2">
                {renderStars(newRating, true, setNewRating)}
              </div>
            </div>
            
            <div>
              <Label htmlFor="comment">Your Review *</Label>
              <Textarea
                id="comment"
                placeholder="Tell us about your experience..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
            
            <Button 
              onClick={handleSubmitRating} 
              disabled={submitting || newRating === 0 || !newComment.trim()}
              className="w-full"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* User's Existing Rating */}
      {userRating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Review</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditRating(userRating)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteRating(userRating._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingRating && editingRating._id === userRating._id ? (
              <div className="space-y-4">
                <div>
                  <Label>Your Rating *</Label>
                  <div className="mt-2">
                    {renderStars(editRating, true, setEditRating)}
                  </div>
                </div>
                
                <div>
                  <Label>Your Review *</Label>
                  <Textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleUpdateRating} 
                    disabled={submitting}
                    size="sm"
                  >
                    {submitting ? 'Updating...' : 'Update Review'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={cancelEdit}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {renderStars(userRating.rating)}
                  <Badge variant="secondary">
                    {new Date(userRating.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{userRating.comment}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Login Prompt */}
      {!isAuthenticated && (
        <Card>
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Login to Review</h3>
            <p className="text-muted-foreground mb-4">
              Please login to share your experience and help other travelers.
            </p>
            <Button asChild>
              <a href="/login">Login to Review</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* All Reviews */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">All Reviews ({ratings.length})</h3>
        
        {ratings.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <Card key={rating._id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {rating.userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{rating.userName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(rating.rating)}
                            <span className="text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {user?.id === rating.userId && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditRating(rating)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRating(rating._id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground">{rating.comment}</p>
                      
                      {rating.updatedAt !== rating.createdAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Edited on {new Date(rating.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RatingComponent);
