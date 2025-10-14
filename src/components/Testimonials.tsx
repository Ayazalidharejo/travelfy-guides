"use client";
import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { postsAPI } from '@/lib/api';


interface RealReview {
  _id: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  rating: number;
  comment: string;
  reviewImage?: string;
  tourId: string;
  createdAt: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [testimonials, setTestimonials] = useState<RealReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async (showLoading = true) => {
      try {
        if (showLoading) {
          setLoading(true);
        }
        
        // Use centralized API method instead of manual axios call
        const response = await postsAPI.getAllRatings();
        
        if (response.success) {
          console.log('✅ Testimonials fetched:', response.data.length);
          setTestimonials(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep existing testimonials on error if we have some
        setTestimonials(prev => prev.length > 0 ? prev : []);
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    };

    // Initial fetch with loading
    fetchTestimonials(true);
    
    // Auto-refresh every 10 seconds (silent refresh - no loading spinner)
    const intervalId = setInterval(() => {
      console.log('🔄 Auto-refreshing testimonials...');
      fetchTestimonials(false);
    }, 10000); // 10 seconds

    // Also refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Page visible - refreshing testimonials');
        fetchTestimonials(false);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Adjust number of visible cards based on screen width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else {
        setCardsToShow(3);
      }
    }

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate max index for looping
  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  // Previous button handler
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Next button handler
  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Show loading state
  if (loading) {
    return (
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-10">
             Feedback from travelers who explored Japan with Karvaan Tours.
          </p>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no testimonials
  if (testimonials.length === 0) {
    return (
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-10">
             Feedback from travelers who explored Japan with Karvaan Tours.
          </p>
          <p className="text-gray-500 py-10">No reviews yet. Be the first to share your experience!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
           Feedback from travelers who explored Japan with Karvaan Tours.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Carousel container with overflow hidden */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
          >
            {testimonials.map((review) => (
              <div
                key={review._id}
                className="box-border px-4"
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <div className="bg-gray-50 p-6 rounded-xl shadow text-left h-full flex flex-col justify-between">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=random`}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=random`;
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{review.userName}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow line-clamp-4">"{review.comment}"</p>
                  
                  {/* Review Image */}
                  {review.reviewImage && (
                    <div className="mb-4">
                      <img
                        src={review.reviewImage}
                        alt="Review"
                        className="rounded-lg w-full h-32 object-cover"
                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                      />
                    </div>
                  )}
                  
                  {/* Star Rating */}
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous testimonials"
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next testimonials"
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
