"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface TourHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const TourHero: React.FC<TourHeroProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => {
  return (
    <section className="relative w-full h-[90vh] bg-black">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1558981001-c67a5b31c7b2?auto=format&fit=crop&w=1600&q=80"
        alt="Beautiful Japan"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-4">
          🌏 Handpicked Japanese Journeys
        </Badge>

        <h1 className="text-white text-4xl md:text-5xl font-bold max-w-3xl mb-4 leading-tight">
          Explore Breathtaking Tours Across{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">
            Japan
          </span>
        </h1>

        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
          Discover culture, adventure, food, temples, and unforgettable experiences
          in every corner of Japan with Karvaan Tours.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-md gap-2 backdrop-blur-sm"
        >
          <Input
            placeholder="Search destinations, e.g., Kyoto, Fuji..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/90 text-black"
          />
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default TourHero;
