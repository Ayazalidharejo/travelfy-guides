# 🚀 Hostinger Deployment - Quick Reference Card

## Domain: www.karvaantours.com

---

## ⚡ Quick Deploy Steps

### 1️⃣ Build Your Project
```bash
npm run build:production
```

### 2️⃣ Locate Build Output
```
📁 Location: c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\dist\
```

### 3️⃣ Upload to Hostinger
- Go to Hostinger File Manager
- Navigate to `public_html`
- Upload ALL files from `dist` folder

### 4️⃣ Configure Firebase
- Add `karvaantours.com` to Firebase authorized domains
- Add `www.karvaantours.com` to Firebase authorized domains

### 5️⃣ Enable SSL
- Hostinger → SSL → Install Free SSL
- Wait 15-30 minutes

### 6️⃣ Test Your Site
- Visit: https://www.karvaantours.com
- Test all features

---

## 📂 Important Locations

| Item | Location |
|------|----------|
| **Source Code** | `c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\` |
| **Build Output** | `c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\dist\` |
| **Upload To** | Hostinger → `public_html/` |
| **Live Site** | https://www.karvaantours.com |

---

## 🔧 Build Commands

```bash
# Development build
npm run build:dev

# Production build (for Hostinger)
npm run build:production

# Preview build locally
npm run preview
```

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build:production`
- [ ] Verify `dist` folder created
- [ ] Check no build errors
- [ ] Upload all files to `public_html`
- [ ] Verify `.htaccess` uploaded
- [ ] Add domains to Firebase
- [ ] Enable SSL certificate
- [ ] Test https://www.karvaantours.com

---

## 🔥 Firebase Setup

**Console:** https://console.firebase.google.com/

**Steps:**
1. Select project: **karvaan-tour**
2. Authentication → Settings → Authorized domains
3. Add: `karvaantours.com`
4. Add: `www.karvaantours.com`

---

## 🌐 Environment Variables

**Production (.env.production):**
```
VITE_API_BASE_URL=https://tour-backend-eight.vercel.app
```

**Backend:** Already deployed at Vercel
**Firebase:** Keys already in code

---

## 📱 Files to Upload (from dist/)

```
✅ index.html
✅ .htaccess
✅ assets/ (entire folder)
✅ logo.png
✅ Any other static files
```

**DO NOT upload:**
- ❌ node_modules
- ❌ src folder
- ❌ package.json
- ❌ Any config files

**Only upload contents of `dist/` folder!**

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 on refresh | Check `.htaccess` uploaded |
| Google login fails | Add domain to Firebase |
| Blank page | Check browser console |
| No HTTPS | Enable SSL in Hostinger |
| Images not loading | Verify assets folder uploaded |

---

## 📞 Support Links

- **Hostinger Support:** 24/7 Live Chat
- **Firebase Console:** https://console.firebase.google.com/
- **Your Domain:** https://www.karvaantours.com

---

## 🎯 What's Uploaded to Hostinger

After build, your `dist/` folder contains:
- Optimized HTML, CSS, JS
- Compressed images and assets
- Production-ready code
- .htaccess for routing

**Total Size: ~2-3 MB**

---

## ✅ Post-Deployment Tests

Visit your site and test:
1. Homepage loads ✓
2. Navigation works ✓
3. Login with Google ✓
4. Book a tour ✓
5. Profile displays ✓
6. Mobile responsive ✓

---

## 🔄 Updating Your Site

When you make changes:
1. Edit your source code
2. Run: `npm run build:production`
3. Upload new `dist/` files
4. Clear browser cache
5. Done!

---

## 💡 Remember

- ✅ Build output location: `dist/`
- ✅ Upload destination: `public_html/`
- ✅ Your domain: www.karvaantours.com
- ✅ Always use production build
- ✅ Test before announcing

---

## 🎊 You're Ready!

**Command to run:**
```bash
npm run build:production
```

**Folder to upload:**
```
dist/
```

**Where to upload:**
```
Hostinger → public_html/
```

**Your live site:**
```
https://www.karvaantours.com
```

---

**Happy Deploying! 🚀**
