import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TourCard from '@/components/tour/TourCard';
import { postsAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, MapPin, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';


const ToursPage = () => {
  const [searchParams] = useSearchParams();
  
  // Initialize state from URL parameters FIRST
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlDate = searchParams.get('date') || '';
  
  console.log('🌐 ToursPage URL Params:', {
    urlSearch,
    urlCategory,
    urlDate,
    fullURL: window.location.href
  });
  
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedDate, setSelectedDate] = useState(urlDate);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  
  console.log('🔧 State Initialized:', {
    searchTerm,
    selectedCategory,
    selectedDate
  });
  
  const categories = [
    'adventure',
    'cultural', 
    'nature',
    'food',
    'historical',
    'spiritual',
    'mountain',
    'urban',
    'temple',
    'modern'
  ];

  const sortOptions = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' },
    { value: '-views', label: 'Most Popular' },
    { value: 'priceNumber', label: 'Price: Low to High' },
    { value: '-priceNumber', label: 'Price: High to Low' },
    { value: '-rating.average', label: 'Highest Rated' },
  ];

  useEffect(() => {
    fetchTours();
  }, [currentPage, sortBy]);

  // Filter tours whenever tours data changes or search/category/date changes
  useEffect(() => {
    if (tours.length > 0) {
      console.log('⚡ Running filterTours because tours/search/category/date changed');
      filterTours();
    }
  }, [tours, searchTerm, selectedCategory, selectedDate]);

  // Auto-filter when search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
    filterTours();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      console.log('📥 Fetching tours from API...');
      
      const response = await postsAPI.getPosts({
        page: currentPage,
        limit: 12,
        sort: sortBy,
        status: 'published'
      });
      
      console.log('✅ Fetched tours:', response.data?.length || 0);
      
      // Convert backend mainImage to frontend imageUrl
      const toursData = (response.data || []).map((tour: any) => ({
        ...tour,
        imageUrl: tour.mainImage 
          ? (typeof tour.mainImage === 'string' ? tour.mainImage : tour.mainImage.url)
          : tour.mainImageUrl || tour.imageUrl,
        images: tour.additionalImages 
          ? (Array.isArray(tour.additionalImages) 
              ? tour.additionalImages.map((img: any) => typeof img === 'string' ? img : img.url)
              : []
            )
          : (tour.additionalImageUrls || tour.images || []),
        // *** FIX: Enhanced price mapping - prioritize priceNumber from backend ***
        priceNumber: tour.priceNumber || 
                     (tour.pricingSchedule?.[0]?.netPrice ? parseFloat(String(tour.pricingSchedule[0].netPrice)) : 0) ||
                     (tour.pricingSchedule?.[0]?.actualPrice ? parseFloat(String(tour.pricingSchedule[0].actualPrice)) : 0) ||
                     100,
        // Keep price for display (construct from priceNumber)
        price: tour.priceNumber 
               ? `$${tour.priceNumber}` 
               : (tour.pricingSchedule?.[0]?.netPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].netPrice}` : '') ||
                 (tour.pricingSchedule?.[0]?.actualPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].actualPrice}` : '') ||
                 'USD 100',
        discountPercentage: tour.discountPercentage || tour.discount?.percentage || 0,
        // *** FIX: Ensure pricingSchedule is properly formatted with numbers ***
        pricingSchedule: tour.pricingSchedule ? tour.pricingSchedule.map((schedule: any) => ({
          ...schedule,
          actualPrice: parseFloat(String(schedule.actualPrice)) || 0,
          netPrice: parseFloat(String(schedule.netPrice)) || 0,
          currency: schedule.currency || 'USD'
        })) : []
      }));
      
      setTours(toursData);
      setTotalPages(response.pages || 1);
      
      console.log('💾 Tours saved to state:', toursData.length);
      console.log('🎯 Will apply filters if any exist...');
    } catch (error) {
      console.error('❌ Error fetching tours:', error);
      toast({
        title: "Error",
        description: "Failed to load tours. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterTours = () => {
    console.log('🔍 Filtering tours...', {
      totalTours: tours.length,
      searchTerm,
      selectedCategory,
      selectedDate
    });
    
    let filtered = [...tours];

    // ✅ Title Search Filter (Primary Search)
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      console.log('🔎 Searching for:', searchLower);
      
      filtered = filtered.filter(tour => {
        // Priority 1: Search in TITLE first (most important)
        const titleMatch = tour.title && tour.title.toLowerCase().includes(searchLower);
        
        // Priority 2: Search in other fields
        const descriptionMatch = tour.description && tour.description.toLowerCase().includes(searchLower);
        const locationMatch = (tour.prefecture && tour.prefecture.toLowerCase().includes(searchLower)) ||
                             (tour.city && tour.city.toLowerCase().includes(searchLower));
        const categoryMatch = tour.category && tour.category.toLowerCase().includes(searchLower);
        const typeMatch = tour.tourType && tour.tourType.toLowerCase().includes(searchLower);
        
        return titleMatch || descriptionMatch || locationMatch || categoryMatch || typeMatch;
      });
      
      console.log('✅ Search filtered results:', filtered.length);
    }

    // ✅ Category Filter
    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== '') {
      console.log('📁 Filtering by category:', selectedCategory);
      filtered = filtered.filter(tour => tour.category === selectedCategory);
      console.log('✅ Category filtered results:', filtered.length);
    }

    // ✅ Date Filter (NEW)
    if (selectedDate && selectedDate.trim()) {
      console.log('📅 Filtering by date:', selectedDate);
      
      filtered = filtered.filter(tour => {
        // Check if tour has available dates in pricingSchedule
        if (tour.pricingSchedule && tour.pricingSchedule.length > 0) {
          return tour.pricingSchedule.some((schedule: any) => {
            if (schedule.days && Array.isArray(schedule.days)) {
              // Check if selected date matches any available days
              return schedule.days.some((day: string) => {
                const tourDate = new Date(day);
                const selectedDateObj = new Date(selectedDate);
                return tourDate.toDateString() === selectedDateObj.toDateString();
              });
            }
            return true; // If no specific days, show all tours
          });
        }
        return true; // If no pricing schedule, show tour
      });
      
      console.log('✅ Date filtered results:', filtered.length);
    }

    console.log('🎯 Final filtered count:', filtered.length);
    setFilteredTours(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterTours();
  };

  const clearFilters = () => {
    console.log('🧹 Clearing all filters...');
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDate('');
    setSortBy('-createdAt');
    setCurrentPage(1);
    // Reset filtered tours to show all tours
    setFilteredTours(tours);
  };

  const Filters = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search Tours
        </label>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search destinations, activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button type="submit" size="icon" variant="outline" className="border-gray-300 hover:bg-blue-50">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Date Filter */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Filter by Date
        </label>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {selectedDate && (
          <p className="text-xs text-gray-500 mt-2">
            Showing tours available on {new Date(selectedDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Category
        </label>
        <Select value={selectedCategory || 'all'} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Sort By
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Button 
          onClick={clearFilters} 
          variant="outline" 
          className="w-full border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
        >
          Clear All Filters
      </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full blur-lg animate-pulse"></div>
        
        <div className="container px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 hover:bg-white/30 transition-all duration-300">
              <span className="text-2xl">🌍</span>
              <span className="text-white font-semibold">Explore Amazing Destinations</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Your Next
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose from our carefully curated collection of unforgettable travel experiences, 
              handpicked by local experts and adventure enthusiasts.
            </p>
            
            {/* Enhanced Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/20">
              <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                      placeholder="Search destinations, tours, activities, cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:ring-0 placeholder:text-gray-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                </Button>
              </form>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80">Amazing Tours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80">Happy Travelers</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <Card className="p-6 sticky top-24 shadow-lg border-0 bg-white">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">Filters</h3>
              </div>
              <Filters />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Applied Banner */}
            {(searchTerm || selectedCategory !== 'all' || selectedDate) && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Filters Applied</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {searchTerm && (
                    <Badge className="gap-1 bg-blue-600 text-white hover:bg-blue-700">
                      <Search className="h-3 w-3" />
                      Search: "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-red-300">
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCategory && selectedCategory !== 'all' && (
                    <Badge className="gap-1 bg-purple-600 text-white hover:bg-purple-700">
                      <Filter className="h-3 w-3" />
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-red-300">
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedDate && (
                    <Badge className="gap-1 bg-green-600 text-white hover:bg-green-700">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Date: {new Date(selectedDate).toLocaleDateString()}
                      <button onClick={() => setSelectedDate('')} className="ml-1 hover:text-red-300">
                        ×
                      </button>
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Filters & Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                  {filteredTours.length} Tours Found
                </h2>
                    <p className="text-sm text-gray-600">
                      {searchTerm || selectedCategory !== 'all' || selectedDate ? '✅ Showing filtered results' : 'All available tours'}
                    </p>
                  </div>
                </div>
                
                {/* Active Filters - Smaller badges */}
                <div className="hidden md:flex gap-2 flex-wrap">
                  {selectedCategory && selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
                      <Filter className="h-3 w-3" />
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-red-600">
                        ×
                      </button>
                    </Badge>
                  )}
                  {searchTerm && (
                    <Badge variant="secondary" className="gap-1 bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200">
                      <Search className="h-3 w-3" />
                      "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-red-600">
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedDate && (
                    <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(selectedDate).toLocaleDateString()}
                      <button onClick={() => setSelectedDate('')} className="ml-1 hover:text-red-600">
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm" className="border-gray-300 hover:bg-blue-50 hover:border-blue-300">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {(searchTerm || (selectedCategory && selectedCategory !== 'all') || selectedDate) && (
                      <Badge className="ml-2 bg-blue-500 text-white text-xs">Active</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-gray-50">
                  <SheetHeader className="pb-4 border-b border-gray-200">
                    <SheetTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Filter className="h-5 w-5 text-blue-600" />
                      </div>
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <Filters />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Tours Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted" />
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour: any) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="p-4 bg-red-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No tours found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'No tours match your current filters. Try adjusting your search criteria.'
                    : 'No tours are currently available. Please check back later.'
                  }
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={clearFilters} variant="hero" className="bg-blue-600 hover:bg-blue-700">
                  Clear Filters
                </Button>
                  <Button onClick={() => window.location.reload()} variant="outline" className="border-gray-300">
                    Refresh Page
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;