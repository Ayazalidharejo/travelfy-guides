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
  if (!tour) {
    return { price: 0, isStartingFrom: false, hasDiscount: false };
  }

  const discountPercent = Number(
    tour?.discountPercentage ?? tour?.discount?.percentage ?? 0
  );

  const applyDiscount = (base: number): { price: number; original?: number } => {
    if (!base || isNaN(base)) return { price: 0 };
    if (discountPercent > 0) {
      const discounted = base - (base * discountPercent) / 100;
      return { price: discounted, original: base };
    }
    return { price: base };
  };

  // 1) Prefer minimum vehicle price (most accurate for "Starting from")
  const minVehiclePrice = getMinimumVehiclePrice(tour);
  if (minVehiclePrice !== null) {
    const { price, original } = applyDiscount(minVehiclePrice);
    return {
      price,
      isStartingFrom: true,
      hasDiscount: discountPercent > 0,
      originalPrice: original,
    };
  }

  // 2) Next, use pricing schedule (min of netPrice, else actualPrice)
  if (Array.isArray(tour?.pricingSchedule) && tour.pricingSchedule.length > 0) {
    const netPrices = tour.pricingSchedule
      .map((s: any) => Number(s?.netPrice))
      .filter((n: number) => !isNaN(n) && n > 0);
    const actualPrices = tour.pricingSchedule
      .map((s: any) => Number(s?.actualPrice))
      .filter((n: number) => !isNaN(n) && n > 0);
    const baseFromSchedule = netPrices.length > 0
      ? Math.min(...netPrices)
      : actualPrices.length > 0
        ? Math.min(...actualPrices)
        : null;
    if (baseFromSchedule !== null) {
      const { price, original } = applyDiscount(baseFromSchedule);
      return {
        price,
        isStartingFrom: false,
        hasDiscount: discountPercent > 0,
        originalPrice: original,
      };
    }
  }

  // 3) Then, use priceNumber if present and > 0
  const priceNumber = Number(tour?.priceNumber);
  if (!isNaN(priceNumber) && priceNumber > 0) {
    const { price, original } = applyDiscount(priceNumber);
    return {
      price,
      isStartingFrom: false,
      hasDiscount: discountPercent > 0,
      originalPrice: original,
    };
  }

  // 4) Finally, try to parse numeric from price string
  if (typeof tour?.price === 'string') {
    const parsed = Number(String(tour.price).replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed) && parsed > 0) {
      const { price, original } = applyDiscount(parsed);
      return {
        price,
        isStartingFrom: false,
        hasDiscount: discountPercent > 0,
        originalPrice: original,
      };
    }
  }

  // 5) No price data — never return 100. Return 0 and no discount
  return { price: 0, isStartingFrom: false, hasDiscount: false };
};

// this is new file 
