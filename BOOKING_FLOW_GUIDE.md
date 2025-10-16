# Booking Flow Component - Complete Guide

## 📋 Overview
Complete multi-step booking system with vehicle selection, date/time picker, and contact information form.

## ✨ Features

### **Step 1: Select Details**
1. **Date Selection**
   - Minimum: Tomorrow (prevents same-day bookings)
   - Calendar input for easy selection

2. **Time Selection**
   - 15 time slots from 7:00 AM to 2:00 PM
   - 30-minute intervals
   - Dropdown selector

3. **Number of Travelers**
   - Minimum: 1 person
   - Maximum: 20 people
   - Number input with validation

4. **Vehicle Selection**
   - 7 vehicle options with different capacities
   - **Auto-filtering based on travelers**:
     - Valid vehicles: Clickable and selectable
     - Invalid vehicles: Grayed out with "Too small for X travelers" badge
   
   **Vehicle List:**
   | Vehicle | Capacity | Price/Person |
   |---------|----------|--------------|
   | Alphard | 6 | $50 |
   | Vellfire | 5 | $60 |
   | Mercedes Benz | 3 | $80 |
   | Land Cruiser Prado | 4 | $70 |
   | Toyota Crown | 3 | $65 |
   | Commuter Van | 9 | $45 |
   | Commuter Van (Large) | 13 | $40 |

5. **Validation**
   - Next button DISABLED until:
     - ✅ Date selected
     - ✅ Time selected
     - ✅ Valid number of travelers
     - ✅ Vehicle selected (must be valid for number of travelers)

### **Step 2: Contact Information**
1. **Required Fields:**
   - Full Name *
   - Email Address *
   - Phone Number *
   
2. **Optional Field:**
   - Special Requests (textarea)

3. **Booking Summary Card**
   - Shows all selected details:
     - Date
     - Time
     - Number of travelers
     - Selected vehicle
     - **Total price** (calculated automatically)

4. **Validation**
   - "Confirm Booking" button DISABLED until:
     - ✅ Name filled
     - ✅ Valid email
     - ✅ Phone number filled

## 🎯 How It Works

### **Vehicle Filtering Logic**
```typescript
// A vehicle is valid if its capacity >= number of travelers
isVehicleValid(vehicle) {
  return vehicle.capacity >= numberOfTravelers;
}

// Example:
// If user selects 5 travelers:
// ✅ Valid: Alphard (6), Vellfire (5), Commuter Van (9), Large Van (13)
// ❌ Invalid: Mercedes (3), Prado (4), Crown (3)
```

### **Price Calculation**
```typescript
Total Price = Vehicle Price Per Person × Number of Travelers

// Example:
// Alphard ($50) × 4 travelers = $200 total
```

### **Step Progression**
1. User fills Step 1 → Next button enables → Click Next
2. Step 2 shows → User fills contact info
3. Booking summary displays → Confirm button enables
4. User clicks "Confirm Booking" → Booking submitted

## 📱 Responsive Design

### **Mobile (< 640px)**
- Single column layout
- Stacked form fields
- Full-width buttons
- Simplified vehicle cards

### **Tablet (640px - 1024px)**
- 2 column vehicle grid
- 2-3 column form fields
- Better spacing

### **Desktop (> 1024px)**
- 3 column vehicle grid
- Optimal form layout
- Maximum content width: 1280px

## 🚀 Usage

### **Access the booking flow:**
```
http://localhost:5173/new-booking
```

### **Add link in your components:**
```tsx
import { Link } from 'react-router-dom';

<Link to="/new-booking">
  <Button>Book Now</Button>
</Link>
```

### **Use component directly:**
```tsx
import BookingFlow from '@/components/BookingFlow';

<BookingFlow tourId="123" tourTitle="Tokyo Tour" />
```

## 🎨 UI/UX Features

### **Progress Indicator**
- Shows current step (1 or 2)
- Visual progress bar
- Checkmark on completed steps

### **Visual Feedback**
- Selected vehicle: Blue ring + "Selected" badge
- Invalid vehicle: Grayed out + Red "Too small" badge
- Valid selections: Green confirmation message
- Disabled buttons: Gray + not clickable

### **Hover Effects**
- Cards: Shadow on hover
- Buttons: Scale + color change
- Smooth transitions

## 🔧 Customization

### **Add More Time Slots:**
```typescript
const timeSlots = [
  '7:00 AM', '7:30 AM', // ... add more times
  '5:00 PM', '5:30 PM'  // extend to evening
];
```

### **Modify Vehicle List:**
```typescript
const vehicles: Vehicle[] = [
  {
    id: 8,
    name: 'New Vehicle',
    capacity: 10,
    description: '...',
    features: ['...'],
    image: 'https://...',
    pricePerPerson: 55
  }
];
```

### **Change Validation Rules:**
```typescript
// Require 48 hours advance booking instead of 24
const minHours = 48;
const daysToAdd = minHours / 24;
today.setDate(today.getDate() + daysToAdd);
```

## 🐛 Error Handling

### **Common Issues & Solutions:**

1. **"Next button not enabling"**
   - Check if date is selected
   - Verify time is selected
   - Ensure valid vehicle is selected

2. **"All vehicles grayed out"**
   - Number of travelers exceeds max capacity (13)
   - Reduce number of travelers

3. **"Confirm button disabled"**
   - Fill all required fields (name, email, phone)
   - Verify email format is valid

## 📊 Data Flow

```
User Input
    ↓
Validation Check
    ↓
Enable/Disable Buttons
    ↓
Step Progression
    ↓
Final Submission
```

## 🎯 Next Steps

1. **Test the flow:** Visit `/new-booking`
2. **Try different scenarios:**
   - Select 2 travelers → See which vehicles are available
   - Select 10 travelers → Only large vans available
   - Select 15 travelers → No vehicles available
3. **Customize as needed** for your requirements

## 💡 Tips

- **Best Practice:** Always test with edge cases (1 traveler, 13 travelers, 14+ travelers)
- **User Experience:** Clear error messages and visual feedback
- **Performance:** Lazy load vehicle images for faster initial load
- **Accessibility:** All form fields have proper labels

---

**Created By:** Cascade AI
**Date:** October 14, 2025
**Version:** 1.0.0
