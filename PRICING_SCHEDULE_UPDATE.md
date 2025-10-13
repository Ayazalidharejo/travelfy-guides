# Pricing Schedule Update

## Overview
Updated the Pricing Schedule section to use the vehicle price from Transport Details instead of a separate Actual Price field with discount calculations.

## Changes Made

### 1. Removed Fields from Pricing Schedule
- ❌ **Actual Price field** - No longer needed, using vehicle price instead
- ❌ **Currency field** - Removed, using fixed USD from Transport Details
- ❌ **Net Price field** - Moved to Transport Details section

### 2. Added Net Price to Transport Details
- ✅ **Net Price field** added next to Price (USD)
- **Auto-calculates** from Price (USD) with discount percentage
- Formula: `Net Price = Price - (Price × Discount% ÷ 100)`
- Read-only field with green styling
- Shows "Final price after X% discount" helper text

### 3. Updated Pricing Schedule Logic
- **New flow**: Vehicle Price → Net Price (auto-calculated with discount) → Pricing Schedule
- `addPricingSchedule()` now uses `formData.vehiclePrice` instead of `currentPricing.actualPrice`
- `actualPrice` uses the vehicle price, `netPrice` uses the calculated discounted value
- Discount percentage from form data is applied automatically
- Currency is fixed to 'USD'

### 4. Updated UI Structure

#### Transport Details Section (6 fields):
```
┌────────────────────────────────────────────────────────────┐
│ [Transport Type] [Year] [Make & Variant] [Capacity]        │
│ [Price (USD)]    [Net Price ✓ Auto]                        │
│                                    [➕ Add Vehicle]        │
└────────────────────────────────────────────────────────────┘
```

#### Pricing Schedule Section (Simplified):
```
┌────────────────────────────────────────────────────────────┐
│ Pricing Schedule              💰 Price from Transport Details│
├────────────────────────────────────────────────────────────┤
│ ☑️ Select Days (All days checkbox)                         │
│ ☑️ Select Time Slots (All slots checkbox)                  │
│ [Tour Duration]                                            │
│                               [➕ Add Schedule]            │
└────────────────────────────────────────────────────────────┘
```

## User Workflow

### Old Flow (Before):
1. Fill transport details
2. Go to pricing schedule
3. Enter Actual Price
4. System calculates Net Price with discount
5. Select currency
6. Add schedule

### New Flow (After):
1. Fill transport details
2. **Enter Price (USD)** → Net Price auto-calculates (with discount %)
3. Go to pricing schedule
4. Select days/time slots/duration
5. Add schedule (uses calculated net price from transport details)

## Key Benefits

✅ **Simplified**: Fewer fields to fill
✅ **Consistent**: Price is defined once in Transport Details
✅ **Clear**: Net Price immediately visible next to Price
✅ **Auto-Discount**: Discount percentage automatically applied to calculate net price
✅ **Streamlined**: No need to enter price twice
✅ **Fixed Currency**: USD only, no currency selection needed

## Discount Percentage

The discount percentage is set in the **Booking & Pricing** section of the form:
- Field: "Discount Percentage (%)"
- This value is automatically used to calculate the Net Price
- Formula: `Net Price = Price - (Price × Discount% ÷ 100)`
- If no discount is set, Net Price equals Price (0% discount)

## Technical Details

### Updated Functions:

#### `addPricingSchedule()` (Line 482-583)
- Added internal `calculateNetPriceFromVehicle()` function
- Calculates: `price - (price × discount / 100)`
- Changed from using `currentPricing.actualPrice` to `formData.vehiclePrice`
- `actualPrice` uses vehicle price, `netPrice` uses calculated discounted price
- Error message updated to reference "vehicle price in Transport Details"

#### Net Price Display (Line 2488-2511)
- New field in Transport Details section
- Auto-calculates from `formData.vehiclePrice` with discount
- Uses inline calculation: `price - (price × discount / 100)`
- Read-only with green styling
- Shows "Final price after X% discount" helper text

### Grid Layout Updates:
- Transport Details: Changed to `xl:grid-cols-4` to accommodate 6 fields
- Pricing Schedule: Simplified to `md:grid-cols-2` (only duration field remains)

### Info Banner:
- Changed from "💰 Net Price = Card Display Price"
- To "💰 Price from Transport Details"

## Files Modified

- `src/pages/admin/AdminPostDashboard.tsx`
  - Removed: Actual Price input, Currency dropdown, Net Price from Pricing Schedule
  - Added: Net Price auto field in Transport Details
  - Updated: `addPricingSchedule()` function logic
  - Updated: Grid layouts and info banner

## Validation Changes

- Previous: Required Actual Price in Pricing Schedule
- Current: Requires Vehicle Price in Transport Details
- Error message: "Please enter a vehicle price in Transport Details to add a schedule."

## Data Structure

### Pricing Schedule Object (unchanged structure, different source):
```javascript
{
  days: [...],
  timeSlots: [...],
  duration: "4 Hours",
  actualPrice: vehiclePrice,  // Now from formData.vehiclePrice
  netPrice: calculatedNetPrice, // Calculated: vehiclePrice - (vehiclePrice × discount% ÷ 100)
  currency: "USD",            // Fixed value
  transportType: "...",
  transportModal: "...",
  makeVariant: "..."
}
```

## No Breaking Changes

- Backend API expects same pricing schedule structure
- Data fields remain the same (actualPrice, netPrice, currency)
- Only the source of the price values has changed
- Existing tours continue to work normally

