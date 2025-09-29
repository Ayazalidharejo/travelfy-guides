import React, { useState, useEffect } from 'react';
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
import TourHero from '@/components/Tourpage.tsx/TourHero';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  
  
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  
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

  useEffect(() => {
    filterTours();
  }, [tours, searchTerm, selectedCategory]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts({
        page: currentPage,
        limit: 12,
        sort: sortBy,
        status: 'published'
      });
      
      setTours(response.data || []);
      setTotalPages(response.pages || 1);
    } catch (error) {
      console.error('Error fetching tours:', error);
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
    let filtered = [...tours];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tour => 
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.prefecture?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(tour => tour.category === selectedCategory);
    }

    setFilteredTours(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterTours();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('-createdAt');
    setCurrentPage(1);
  };

  const Filters = () => (
    <div className="space-y-4">
      {/* Search */}
      {/* <div>
        <label className="text-sm font-medium mb-2 block">Search Tours</label>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search destinations, activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div> */}

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
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
        <label className="text-sm font-medium mb-2 block">Sort By</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
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

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-4">
              🌍 Explore Destinations
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Amazing Tours
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Choose from our carefully curated collection of unforgettable travel experiences
            </p>
            
            {/* Quick Search */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/90 backdrop-blur-sm border-white/30"
                />
                <Button type="submit" variant="hero" className="bg-white text-primary hover:bg-white/90">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
<TourHero/>
      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <Filters />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">
                  {filteredTours.length} Tours Found
                </h2>
                
                {/* Active Filters */}
                <div className="flex gap-2">
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('')} className="ml-1 hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  )}
                  {searchTerm && (
                    <Badge variant="secondary" className="gap-1">
                      "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
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
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all tours
                </p>
                <Button onClick={clearFilters} variant="hero">
                  Clear Filters
                </Button>
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