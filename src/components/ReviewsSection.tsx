import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

const JapanToursReview = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Indian cities
  const indianCities = [
    "Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka",
    "Hyderabad, Telangana", "Ahmedabad, Gujarat", "Chennai, Tamil Nadu",
    "Kolkata, West Bengal", "Pune, Maharashtra", "Jaipur, Rajasthan",
    "Surat, Gujarat", "Lucknow, Uttar Pradesh", "Chandigarh, Punjab",
    "Indore, Madhya Pradesh", "Kochi, Kerala", "Nagpur, Maharashtra"
  ];

  // Tour-specific review messages
  const tourReviews = {
    fuji: [
      "Mount Fuji tour was absolutely breathtaking! The view from the 5th station was stunning. Our guide was knowledgeable and made the experience unforgettable.",
      "Amazing experience visiting Mount Fuji! The weather was perfect and we got incredible photos. The tour was well organized and worth every penny.",
      "Fantastic day trip to Mount Fuji! Loved the scenic beauty and peaceful atmosphere. Highly recommend this tour to everyone visiting Japan.",
      "One of the best tours I've ever been on! Mount Fuji is truly majestic. The tour guide was excellent and very informative about the history."
    ],
    tokyo: [
      "Tokyo city tour was incredible! Visited Shibuya, Asakusa, and Tokyo Tower. The guide knew all the best spots and local restaurants. Perfect introduction to Tokyo!",
      "Excellent Tokyo tour! Experienced both traditional and modern sides of the city. The tour was well-paced and covered all major attractions. Highly satisfied!",
      "Amazing Tokyo experience! From temples to skyscrapers, we saw it all. Our guide was friendly and shared interesting facts about Japanese culture.",
      "Perfect city tour! Tokyo is vibrant and beautiful. The itinerary was well planned and we didn't feel rushed at any point. Would definitely recommend!"
    ],
    nikko: [
      "Nikko was absolutely stunning! The shrines and temples are magnificent. The natural beauty combined with cultural heritage made this tour exceptional.",
      "Wonderful day in Nikko! Toshogu Shrine was breathtaking with its golden decorations. The tour guide explained the history beautifully. A must-visit place!",
      "Incredible Nikko tour! The waterfalls and temples were spectacular. Loved learning about the UNESCO World Heritage sites. Great value for money!",
      "Nikko exceeded all expectations! The autumn colors were gorgeous and the sacred bridges were amazing. Excellent tour with a knowledgeable guide."
    ],
    kawaguchi: [
      "Lake Kawaguchi tour was serene and beautiful! The view of Mount Fuji reflected in the lake was picture-perfect. Very peaceful and relaxing experience.",
      "Amazing Lake Kawaguchi experience! We took the ropeway and the panoramic views were stunning. The lakeside walk was very pleasant and scenic.",
      "Loved the Lake Kawaguchi tour! The weather was clear and we got amazing photos of Mount Fuji. The boat ride on the lake was very enjoyable.",
      "Beautiful and tranquil tour! Lake Kawaguchi is a hidden gem. The surrounding nature is pristine and the views are spectacular. Highly recommend!"
    ]
  };

  // Review images for each tour
  const tourImages = {
    fuji: [
      "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      null,
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop"
    ],
    tokyo: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      null,
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=400&h=300&fit=crop"
    ],
    nikko: [
      null,
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop",
      null
    ],
    kawaguchi: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&h=300&fit=crop",
      null,
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop"
    ]
  };

  const getRandomDate = () => {
    const start = new Date('2025-01-01');
    const end = new Date('2025-10-13');
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };

  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://randomuser.me/api/?results=16&nat=in,us,gb');
        const data = await response.json();
        
        const toursData = [
          {
            id: 1,
            name: "Mount Fuji Tour",
            description: "Experience the majestic Mount Fuji with breathtaking views",
            image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=800&h=500&fit=crop",
            tourKey: 'fuji'
          },
          {
            id: 2,
            name: "Tokyo City Tour",
            description: "Explore the vibrant capital city with modern and traditional sights",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop",
            tourKey: 'tokyo'
          },
          {
            id: 3,
            name: "Nikko Heritage Tour",
            description: "Discover UNESCO World Heritage shrines and natural beauty",
            image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop",
            tourKey: 'nikko'
          },
          {
            id: 4,
            name: "Lake Kawaguchi Tour",
            description: "Enjoy serene lake views with stunning Mount Fuji backdrop",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=500&fit=crop",
            tourKey: 'kawaguchi'
          }
        ];

        const toursWithReviews = toursData.map((tour, tourIndex) => {
          const reviews = data.results.slice(tourIndex * 4, (tourIndex * 4) + 4).map((user, reviewIndex) => ({
            id: reviewIndex + 1,
            name: `${user.name.first} ${user.name.last}`,
            location: getRandomItem(indianCities),
            rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars for tours
            date: getRandomDate(),
            message: tourReviews[tour.tourKey][reviewIndex],
            image: user.picture.large,
            reviewImage: tourImages[tour.tourKey][reviewIndex]
          }));

          return {
            ...tour,
            reviews: reviews,
            averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / 4).toFixed(1)
          };
        });

        setTours(toursWithReviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading Japan Tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
            Japan Tours Reviews
          </h1>
          <p className="text-xl text-gray-600">Discover the beauty of Japan through our customer experiences</p>
        </div>

        {/* Tours Grid */}
        <div className="space-y-12">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
              {/* Tour Header */}
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-4xl font-bold mb-2">{tour.name}</h2>
                  <p className="text-lg mb-4 text-gray-200">{tour.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-7 h-7 ${star <= Math.round(tour.averageRating) ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'}`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold">{tour.averageRating}</span>
                    <span className="text-lg">({tour.reviews.length} Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
                
                {tour.reviews.map((review) => (
                  <div key={review.id} className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-purple-100">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* User Info */}
                      <div className="flex-shrink-0">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                        />
                      </div>

                      {/* Review Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-800">{review.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 text-pink-500" />
                              <span>{review.location}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-start md:items-end gap-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-5 h-5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(review.date)}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-base mb-4">{review.message}</p>

                        {review.reviewImage && (
                          <div className="mt-4">
                            <img
                              src={review.reviewImage}
                              alt="Tour Experience"
                              className="rounded-xl max-w-md w-full h-56 object-cover border-2 border-purple-200 shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JapanToursReview;