// Utility function to get minimum vehicle price from tour
export const getMinimumVehiclePrice = (tour: any): number | null => {
  if (!tour.transportVehicles || !Array.isArray(tour.transportVehicles) || tour.transportVehicles.length === 0) {
    return null;
  }
  
  const prices = tour.transportVehicles
    .map((vehicle: any) => parseFloat(vehicle.price))
    .filter((price: number) => !isNaN(price));
  
  if (prices.length === 0) return null;
  
  return Math.min(...prices);
};

// Utility function to get display price with "Starting from" text
export const getDisplayPrice = (tour: any): { price: number; isStartingFrom: boolean; hasDiscount: boolean; originalPrice?: number } => {
  const minVehiclePrice = getMinimumVehiclePrice(tour);
  
  if (minVehiclePrice !== null) {
    const discount = tour.discountPercentage || 0;
    const discountedPrice = minVehiclePrice - (minVehiclePrice * discount / 100);
    
    return {
      price: discountedPrice,
      isStartingFrom: true,
      hasDiscount: discount > 0,
      originalPrice: discount > 0 ? minVehiclePrice : undefined
    };
  }
  
  // Fallback to tour price
  const tourPrice = tour.priceNumber || 100;
  const discount = tour.discountPercentage || 0;
  const discountedPrice = tourPrice - (tourPrice * discount / 100);
  
  return {
    price: discountedPrice,
    isStartingFrom: false,
    hasDiscount: discount > 0,
    originalPrice: discount > 0 ? tourPrice : undefined
  };
};
