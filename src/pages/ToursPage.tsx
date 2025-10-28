

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TourCard from "@/components/tour/TourCard";
import { postsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Filter,
  MapPin,
  SlidersHorizontal,
  Clock,
  DollarSign,
  Languages,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [durationRange, setDurationRange] = useState([1, 15]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedBookingType, setSelectedBookingType] = useState("all");
  const [sortBy, setSortBy] = useState("-createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(10); // Changed to 10 (matches options)
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();

  const categories = [
    "hiking",
    "adventure",
    "experience",
    "tour",
    "cultural",
    "historical",
    "nature",
    "wildlife",
    "photography",
    "food",
    "luxury",
    "budget",
    "family",
    "romantic",
    "educational",
  ];

  const locations = [
    "all",
    "Tokyo",
    "Kyoto",
    "Osaka",
    "Hokkaido",
    "Okinawa",
    "Nagoya",
    "Nara",
  ];

  // Booking Types
  const bookingTypes = [
    { value: "all", label: "All Booking Types" },
    { value: "Group", label: "Group Booking" },
    { value: "Single", label: "Single/Private Booking" },
  ];

  // Driver Languages - sorted A to Z, must include these
  const driverLanguages = [
    "all",
    "Arabic",
    "Chinese",
    "English",
    "French",
    "German",
    "Hindi",
    "Italian",
    "Japanese",
    "Korean",
    "Portuguese",
    "Russian",
    "Spanish",
    "Thai",
  ].sort((a, b) => {
    if (a === "all") return -1;
    if (b === "all") return 1;
    return a.localeCompare(b);
  });

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "-views", label: "Most Popular" },
    { value: "priceNumber", label: "Price: Low to High" },
    { value: "-priceNumber", label: "Price: High to Low" },
    { value: "-rating.average", label: "Highest Rated" },
    { value: "title-asc", label: "Name: A to Z" },
    { value: "title-desc", label: "Name: Z to A" },
  ];

  useEffect(() => {
    fetchTours();
  }, [currentPage, sortBy, toursPerPage, searchTerm]);

  useEffect(() => {
    filterTours();
  }, [tours, searchTerm, selectedCategory, selectedLocation, durationRange, priceRange, selectedLanguage, selectedBookingType, sortBy]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts({
        page: currentPage,
        limit: toursPerPage,
        sort: sortBy,
        // server-side search support
        search: (searchTerm || '').trim() || undefined,
        status: "published",
      });

      const toursData = (response.data || []).map((tour: any) => ({
        ...tour,
        imageUrl:
          typeof tour.mainImage === "string"
            ? tour.mainImage
            : tour.mainImage?.url || tour.imageUrl,
        priceNumber:
          tour.priceNumber ||
          parseFloat(tour.pricingSchedule?.[0]?.netPrice) ||
          100,
        duration: tour.duration || Math.floor(Math.random() * 10 + 1),
        // Ensure rating structure exists for sorting
        rating: {
          average: tour.rating?.average || 0,
          count: tour.rating?.count || 0
        },
        // Ensure views exists for sorting
        views: tour.views || 0,
        // Ensure createdAt exists for sorting
        createdAt: tour.createdAt || new Date().toISOString(),
        // Ensure selectedSellingPoints exists for filtering
        selectedSellingPoints: tour.selectedSellingPoints || []
      }));

      setTours(toursData);
      setTotalPages(response.pages || 1);
    } catch (error) {
      console.error("Error fetching tours:", error);
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

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title?.toLowerCase().includes(term) ||
          t.description?.toLowerCase().includes(term) ||
          t.city?.toLowerCase().includes(term)
      );
    }

    // Category - Check both category field and selectedSellingPoints array
    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => {
        // Check main category field
        if (t.category === selectedCategory) {
          return true;
        }
        
        // Check selectedSellingPoints array
        if (t.selectedSellingPoints && Array.isArray(t.selectedSellingPoints)) {
          return t.selectedSellingPoints.some(point => 
            point.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
        
        return false;
      });
    }

    // Location
    if (selectedLocation !== "all") {
      filtered = filtered.filter(
        (t) =>
          t.city?.toLowerCase() === selectedLocation.toLowerCase() ||
          t.prefecture?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // Duration
    filtered = filtered.filter(
      (t) => t.duration >= durationRange[0] && t.duration <= durationRange[1]
    );

    // Price
    filtered = filtered.filter(
      (t) => t.priceNumber >= priceRange[0] && t.priceNumber <= priceRange[1]
    );

    // Driver Language - Fixed to use tour.languages
    if (selectedLanguage !== "all") {
      filtered = filtered.filter((t) => {
        const tourLanguages = t.languages || [];
        // Check if the selected language is in the tour's language array
        if (Array.isArray(tourLanguages)) {
          return tourLanguages.some(lang => 
            lang?.toLowerCase().includes(selectedLanguage.toLowerCase()) ||
            selectedLanguage.toLowerCase().includes(lang?.toLowerCase())
          );
        }
        // Handle string format
        if (typeof tourLanguages === 'string') {
          return tourLanguages.toLowerCase().includes(selectedLanguage.toLowerCase());
        }
        return false;
      });
    }

    // Booking Type Filter
    if (selectedBookingType !== "all") {
      filtered = filtered.filter((t) => {
        const bookingType = t.bookingType || "";
        return bookingType.toLowerCase() === selectedBookingType.toLowerCase();
      });
    }

    // Apply Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "-createdAt":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case "createdAt":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case "-views":
          return (b.views || 0) - (a.views || 0);
        case "priceNumber":
          // Price: Low to High
          return (a.priceNumber || 0) - (b.priceNumber || 0);
        case "-priceNumber":
          // Price: High to Low
          return (b.priceNumber || 0) - (a.priceNumber || 0);
        case "-rating.average":
          return (b.rating?.average || 0) - (a.rating?.average || 0);
        case "title-asc":
          // A to Z
          return (a.title || "").localeCompare(b.title || "");
        case "title-desc":
          // Z to A
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });

 

    setFilteredTours(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setDurationRange([1, 15]);
    setPriceRange([0, 5000]);
    setSelectedLanguage("all");
    setSelectedBookingType("all");
    setSortBy("-createdAt");
    fetchTours();
  };

  const Filters = () => (
    <div className="space-y-6">
      {/* Search */}
      {/* <div>
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
          <Search className="h-4 w-4" /> Search Tours
        </label>
        <Input
          placeholder="Search tours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}

      {/* Category */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Theme
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
          <MapPin className="h-4 w-4" /> Location
        </label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 ">
          <Clock className="h-4 w-4" /> Duration (Days)
        </label>
        <Slider className="bg-[#5C7AC0]"
          min={1}
          max={15}
          step={1}
          value={durationRange}
          onValueChange={setDurationRange}
        />
        <div className="text-xs   mt-1">
          {durationRange[0]} - {durationRange[1]} days
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <DollarSign className="h-4 w-4" /> Price Range ($)
        </label>
      <Slider
  min={0}
  max={5000}
  step={50}
  value={priceRange}
  className="bg-[#5C7AC0]"
  onValueChange={setPriceRange}
/>

        <div className="text-xs text-gray-500 mt-1">
          ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>

      {/* Driver Language */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
          <Languages className="h-4 w-4" /> Driver Language
        </label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent>
            {driverLanguages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang === "all" ? "All Languages" : lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Booking Type */}
      {/* <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
          <Users className="h-4 w-4" /> Booking Type
        </label>
        <Select value={selectedBookingType} onValueChange={setSelectedBookingType}>
          <SelectTrigger>
            <SelectValue placeholder="All Booking Types" />
          </SelectTrigger>
          <SelectContent>
            {bookingTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* Sort */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Sort By
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear */}
      <Button variant="outline" className="w-full bg-[#5C7AC0] text-white hover:bg-[#284078]" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5C7AC0] to-[#284078] text-white py-20 text-center relative">
        <h1 className="text-5xl font-bold mb-4">Explore Our Tours</h1>
        <p className="text-lg opacity-90 mb-8">
          Find your perfect adventure with filters and search.
        </p>
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Search destinations or tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-800"
            />
            <Button type="submit" className="bg-[#5C7AC0] text-white hover:bg-[#284078]">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block w-80">
          <Card className="p-6 shadow-md border-0">
            <Filters />
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Filter Button (Mobile) */}
          <div className="flex justify-between items-center mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gray-50">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Filters />
                </div>
              </SheetContent>
            </Sheet>

            {/* Page Size */}
            <Select
              value={String(toursPerPage)}
              onValueChange={(val) => setToursPerPage(Number(val))}
            >
              <SelectTrigger className="w-40 border-gray-300 text-gray-700">
                <SelectValue placeholder="10 per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>



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
            <div className="text-center py-20 text-gray-600">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No tours found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToursPage;