import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { postsAPI, uploadAPI } from '@/lib/api';
import { 
  Star, 
  MessageSquare, 
  Edit, 
  Trash2, 
  Send,
  User,
  Calendar,
  ThumbsUp,
  Upload,
  X
} from 'lucide-react';

interface Rating {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  tourId: string;
  rating: number;
  comment: string;
  reviewImage?: string;
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
  const [newReviewImage, setNewReviewImage] = useState<File | null>(null);
  const [newReviewImagePreview, setNewReviewImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Edit rating form
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');
  const [editReviewImage, setEditReviewImage] = useState<File | null>(null);
  const [editReviewImagePreview, setEditReviewImagePreview] = useState('');

  const fetchRatings = useCallback(async () => {
    if (!tourId) {
      console.warn('No tourId provided to fetchRatings');
      return;
    }
    
    try {
      setLoading(true);
      const response = await postsAPI.getRatings(tourId);
      
      if (response.success) {
        setRatings(response.data || []);
      } else {
        // Don't show error toast for failed fetch, just set empty ratings
        setRatings([]);
      }
    } catch (error) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId]);


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
      
      // Upload image if file is selected
      let uploadedImageUrl = '';
      if (newReviewImage) {
        setUploadingImage(true);
        toast({
          title: "Uploading Image...",
          description: "Please wait while we upload your image.",
        });
        
        const uploadResponse = await uploadAPI.uploadReviewImage(newReviewImage);
        setUploadingImage(false);
        
        if (uploadResponse.success && uploadResponse.data) {
          uploadedImageUrl = uploadResponse.data.url;
        } else {
          toast({
            title: "Image Upload Failed",
            description: uploadResponse.message || "Failed to upload image. Continuing without image.",
            variant: "destructive",
          });
        }
      }
      
      const ratingData = {
        tourId,
        rating: newRating,
        comment: newComment.trim(),
        userName: user?.name || user?.email || 'Anonymous',
        userEmail: user?.email || '',
        reviewImage: uploadedImageUrl
      };

      const response = await postsAPI.addRating(tourId, ratingData);
      
      if (response.success) {
        const newRatingData = response.data;
        setRatings(prev => [newRatingData, ...prev]);
        setNewRating(0);
        setNewComment('');
        setNewReviewImage(null);
        setNewReviewImagePreview('');
        
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
      setUploadingImage(false);
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
      
      // Upload image if new file is selected
      let uploadedImageUrl = editingRating.reviewImage || ''; // Keep existing image by default
      if (editReviewImage) {
        setUploadingImage(true);
        toast({
          title: "Uploading Image...",
          description: "Please wait while we upload your image.",
        });
        
        const uploadResponse = await uploadAPI.uploadReviewImage(editReviewImage);
        setUploadingImage(false);
        
        if (uploadResponse.success && uploadResponse.data) {
          uploadedImageUrl = uploadResponse.data.url;
        } else {
          toast({
            title: "Image Upload Failed",
            description: uploadResponse.message || "Failed to upload image. Keeping existing image.",
            variant: "destructive",
          });
        }
      }
      
      const updateData = {
        rating: editRating,
        comment: editComment.trim(),
        reviewImage: uploadedImageUrl
      };

      const response = await postsAPI.updateRating(tourId, editingRating._id, updateData);
     
      
      if (response.success) {
        setEditingRating(null);
        setEditRating(0);
        setEditComment('');
        setEditReviewImage(null);
        setEditReviewImagePreview('');
        
        toast({
          title: "Rating Updated",
          description: "Rating has been updated successfully!",
        });
        
        // Refetch ratings from database to get fresh data
        await fetchRatings();
  
        
        if (onRatingUpdated) {
          onRatingUpdated(response.data);
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
      setUploadingImage(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    if (isEdit) {
      setEditReviewImage(file);
      setEditReviewImagePreview(previewUrl);
    } else {
      setNewReviewImage(file);
      setNewReviewImagePreview(previewUrl);
    }
  };
  
  const removeImage = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditReviewImage(null);
      if (editReviewImagePreview) {
        URL.revokeObjectURL(editReviewImagePreview);
      }
      setEditReviewImagePreview('');
    } else {
      setNewReviewImage(null);
      if (newReviewImagePreview) {
        URL.revokeObjectURL(newReviewImagePreview);
      }
      setNewReviewImagePreview('');
    }
  };

  const handleDeleteRating = async (ratingId: string) => {
    if (!confirm('Are you sure you want to delete this rating?')) {
      return;
    }

    try {
  
      const response = await postsAPI.deleteRating(tourId, ratingId);
     
      
      if (response.success) {
        toast({
          title: "Rating Deleted",
          description: "Rating has been deleted successfully.",
        });
        
        // Refetch ratings from database to get fresh data
        await fetchRatings();
   
        
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
    setEditReviewImage(null);
    setEditReviewImagePreview(rating.reviewImage || '');
  };

  const cancelEdit = () => {
    setEditingRating(null);
    setEditRating(0);
    setEditComment('');
    removeImage(true);
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

  // Allow multiple reviews - removed single userRating
  // const userRating = useMemo(() => {
  //   return ratings.find(rating => rating.userId === user?.id);
  // }, [ratings, user?.id]);
  const userRating = null; // Always null to allow multiple reviews

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
            
            <div>
              <Label htmlFor="reviewImage">Review Image (Optional)</Label>
              <div className="mt-2">
                <label htmlFor="reviewImageInput" className="cursor-pointer">
                  <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <input
                    id="reviewImageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, false)}
                    className="hidden"
                  />
                </label>
                
                {(newReviewImagePreview || newReviewImage) && (
                  <div className="mt-3 relative inline-block">
                    <img 
                      src={newReviewImagePreview} 
                      alt="Preview" 
                      className="rounded-lg max-w-xs h-32 object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(false)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleSubmitRating} 
              disabled={submitting || uploadingImage || newRating === 0 || !newComment.trim()}
              className="w-full"
            >
              {uploadingImage ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-pulse" />
                  Uploading Image...
                </>
              ) : submitting ? (
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
              {/* Only admin can edit/delete reviews - removed user buttons */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar>
                {userRating.userAvatar && <AvatarImage src={userRating.userAvatar} alt={userRating.userName} />}
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userRating.userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3">
                <div>
                  <p className="font-semibold">{userRating.userName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(userRating.rating)}
                    <Badge variant="secondary" className="text-xs">
                      {new Date(userRating.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{userRating.comment}</p>
                {userRating.reviewImage && (
                  <div className="mt-3">
                    <img 
                      src={userRating.reviewImage} 
                      alt="Your review" 
                      className="rounded-lg max-w-md w-full h-auto object-cover border"
                      onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                  </div>
                )}
              </div>
            </div>
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
                      {rating.userAvatar && <AvatarImage src={rating.userAvatar} alt={rating.userName} />}
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
                        
                        {/* Admin can edit/delete any review */}
                        {user?.role === 'admin' && (
                          <div className="flex gap-2">
                            {editingRating?._id === rating._id ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={cancelEdit}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleUpdateRating}
                                  disabled={submitting}
                                >
                                  {submitting ? 'Saving...' : 'Save'}
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => startEditRating(rating)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteRating(rating._id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Show edit form if admin is editing this rating */}
                      {editingRating?._id === rating._id ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-rating">Rating</Label>
                            <div className="flex gap-2 mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEditRating(star)}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    className={`h-8 w-8 ${
                                      star <= editRating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="edit-comment">Your Review</Label>
                            <Textarea
                              id="edit-comment"
                              value={editComment}
                              onChange={(e) => setEditComment(e.target.value)}
                              placeholder="Share your experience..."
                              rows={4}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="editReviewImage">Review Image (Optional)</Label>
                            <div className="mt-2">
                              <label htmlFor="editReviewImageInput" className="cursor-pointer">
                                <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                                  <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">
                                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                  </div>
                                </div>
                                <input
                                  id="editReviewImageInput"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageChange(e, true)}
                                  className="hidden"
                                />
                              </label>

                              {(editReviewImagePreview || editReviewImage || rating.reviewImage) && (
                                <div className="mt-3 relative inline-block">
                                  <img
                                    src={editReviewImagePreview || rating.reviewImage}
                                    alt="Preview"
                                    className="rounded-lg max-w-xs h-32 object-cover border"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(true)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-muted-foreground">{rating.comment}</p>
                          
                          {rating.reviewImage && (
                            <div className="mt-3">
                              <img 
                                src={rating.reviewImage} 
                                alt="Review" 
                                className="rounded-lg max-w-md w-full h-auto object-cover border"
                                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                              />
                            </div>
                          )}
                          
                          {rating.updatedAt !== rating.createdAt && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Edited on {new Date(rating.updatedAt).toLocaleDateString()}
                            </p>
                          )}
                        </>
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

// Memoization with custom comparison
export default React.memo(RatingComponent, (prevProps, nextProps) => {
  // Only re-render if tourId or tourTitle changes
  return prevProps.tourId === nextProps.tourId && 
         prevProps.tourTitle === nextProps.tourTitle;
});
