# 🔐 Stripe Setup Guide - Complete Integration

This project has a **fully configured Stripe payment system**. You only need to add your API keys to `.env` files.

---

## 📁 Frontend Setup (.env file in `travelfy-guides` folder)

Create a `.env` file in the `travelfy-guides` folder with:

```env
# Stripe Configuration - FRONTEND
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51SIqBzHLSBbCIp3xEXsLJHg5bBOizEv4qyuzXJgyNTfh4KSQqmWW7lVXXmU2J2Ihd3F2TcFi6Iy8eClkZhSbG6CT00aGxMDuUk

# API Base URL
VITE_API_URL=http://localhost:5000
```

### 🔄 For Production (Real Stripe Keys):
Replace `pk_test_...` with your **LIVE PUBLISHABLE KEY**: `pk_live_...`

---

## 📁 Backend Setup (Already Configured in `new-back/.env`)

Your backend `.env` already has:

```env
STRIPE_SECRET_KEY=sk_test_51SIqBzHLSBbCIp3xeyHkmLyMrbTKisfV1dxX1yKLl2LKf7VrWh3XNzoJejdOlVUA44xfbRtPHxLFQUDdZCoadFq500RhcQwp7V
STRIPE_PUBLISHABLE_KEY=pk_test_51SIqBzHLSBbCIp3xEXsLJHg5bBOizEv4qyuzXJgyNTfh4KSQqmWW7lVXXmU2J2Ihd3F2TcFi6Iy8eClkZhSbG6CT00aGxMDuUk
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 🔄 For Production (Real Stripe Keys):
1. Replace `sk_test_...` with your **LIVE SECRET KEY**: `sk_live_...`
2. Replace `pk_test_...` with your **LIVE PUBLISHABLE KEY**: `pk_live_...`
3. Replace `whsec_...` with your **LIVE WEBHOOK SECRET** from Stripe Dashboard

---

## 🎯 How to Get Your Stripe Keys

### 1️⃣ Get Your API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. For **Testing**: Use keys starting with `pk_test_` and `sk_test_`
3. For **Production**: Toggle to "Live mode" and use keys starting with `pk_live_` and `sk_live_`

### 2️⃣ Get Your Webhook Secret
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://your-domain.com/api/webhook/stripe`
4. Select events to listen to:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
5. Copy the **Signing Secret** (starts with `whsec_`)

---

## ✅ What's Already Configured

### Backend Routes ✅
- `POST /api/payment/create-payment-intent` - Create payment
- `POST /api/payment/confirm-payment` - Confirm payment
- `GET /api/payment/status/:paymentIntentId` - Check payment status
- `POST /api/payment/refund` - Process refunds (Admin only)
- `POST /api/webhook/stripe` - Stripe webhook handler

### Frontend Integration ✅
- Stripe Elements for secure card input
- Environment variable for publishable key
- Payment intent creation
- Real-time payment confirmation
- Error handling and user feedback

### Security Features ✅
- ✅ No API keys hardcoded in code
- ✅ Webhook signature verification
- ✅ HTTPS required for production
- ✅ PCI-compliant payment collection
- ✅ Automatic refund support
- ✅ Payment metadata tracking

---

## 🧪 Testing with Test Cards

Stripe provides test cards that you can use:

| Card Number         | Description                |
|---------------------|----------------------------|
| `4242 4242 4242 4242` | Successful payment         |
| `4000 0000 0000 9995` | Declined (insufficient funds) |
| `4000 0000 0000 0002` | Declined (generic)         |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

---

## 🚀 Going Live Checklist

### Before Switching to Production:

1. **Get Live API Keys**
   - [ ] Get live publishable key (`pk_live_...`)
   - [ ] Get live secret key (`sk_live_...`)
   - [ ] Get webhook signing secret (`whsec_...`)

2. **Update Environment Variables**
   - [ ] Update `VITE_STRIPE_PUBLISHABLE_KEY` in frontend `.env`
   - [ ] Update `STRIPE_SECRET_KEY` in backend `.env`
   - [ ] Update `STRIPE_WEBHOOK_SECRET` in backend `.env`

3. **Configure Webhook**
   - [ ] Add webhook endpoint in Stripe Dashboard
   - [ ] URL: `https://your-production-domain.com/api/webhook/stripe`
   - [ ] Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

4. **Security**
   - [ ] Ensure your site uses HTTPS
   - [ ] Keep `.env` files out of version control
   - [ ] Never expose secret keys in client-side code

5. **Test in Production**
   - [ ] Make a small test payment
   - [ ] Verify webhook events are received
   - [ ] Check Stripe Dashboard for transactions

---

## 💰 How Payments Work

1. **User Books Tour** → Frontend creates payment intent via `/api/payment/create-payment-intent`
2. **Payment Intent Created** → Backend creates Stripe payment intent
3. **User Enters Card** → Stripe Elements securely collects card details
4. **Payment Confirmed** → Stripe processes payment and sends webhook
5. **Booking Confirmed** → System confirms booking and sends confirmation email

---

## 🔧 Troubleshooting

### "Stripe key not found"
- Make sure you created `.env` file in `travelfy-guides` folder
- Restart your dev server after adding environment variables

### "Webhook signature verification failed"
- Update `STRIPE_WEBHOOK_SECRET` in backend `.env`
- Make sure webhook endpoint is correctly configured in Stripe Dashboard

### "Payment failed"
- Check Stripe Dashboard for error details
- Verify API keys are correct
- For test mode, use test card numbers only

---

## 📞 Support

- **Stripe Documentation**: https://stripe.com/docs
- **API Reference**: https://stripe.com/docs/api
- **Webhooks Guide**: https://stripe.com/docs/webhooks
- **Test Cards**: https://stripe.com/docs/testing

---

## ✨ Summary

**You're all set!** Just:
1. Create `.env` file in `travelfy-guides` folder (copy from template above)
2. When ready for production, replace test keys with live keys
3. Everything else is already configured and secure! 🎉
