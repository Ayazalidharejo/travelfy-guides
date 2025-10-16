# 🚀 Hostinger Deployment Guide (Urdu/Roman Urdu)

## Domain: www.karvaantours.com

---

## ✅ Kya Karna Hai - Quick Steps

### 1️⃣ Build Banaye
```bash
npm run build:production
```

**Ye command chalane ke baad `dist` folder ban jayega!**

### 2️⃣ Dist Folder Ki Location
```
📁 Yahan milega: 
c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\dist\
```

**Ye PURA folder Hostinger par upload karna hai!**

### 3️⃣ Hostinger Par Upload Kare

1. Hostinger account mein login karein
2. **File Manager** kholen
3. **public_html** folder mein jayen
4. `dist` folder ke SAARE files upload karein

### 4️⃣ Firebase Setup
1. Firebase Console kholen: https://console.firebase.google.com/
2. **karvaan-tour** project select karein
3. **Authentication** → **Settings** → **Authorized domains**
4. Add karein: `karvaantours.com`
5. Add karein: `www.karvaantours.com`
6. Save karein!

### 5️⃣ SSL Enable Kare
1. Hostinger mein **SSL** section par jayen
2. Free SSL install karein
3. 15-30 minutes wait karein

### 6️⃣ Test Kare
- Website kholen: https://www.karvaantours.com
- Saari cheezein check karein

---

## 📂 Zaroori Locations

| Cheez | Location |
|-------|----------|
| **Source Code** | `c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\` |
| **Build Output** | `c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\dist\` |
| **Upload Yahan** | Hostinger → `public_html/` |
| **Live Website** | https://www.karvaantours.com |

---

## 🔧 Build Commands

```bash
# Development build
npm run build:dev

# Production build (Hostinger ke liye ye chalaye)
npm run build:production

# Local test
npm run preview
```

---

## 📋 Deployment Checklist

Ye sab steps kare:

- [ ] `npm run build:production` chalaye
- [ ] `dist` folder bana ya nahi check karein
- [ ] Koi error toh nahi dekhen
- [ ] Saari files `public_html` mein upload kare
- [ ] `.htaccess` file upload hui ya nahi check karein
- [ ] Firebase mein domains add kare
- [ ] SSL certificate enable kare
- [ ] https://www.karvaantours.com test kare

---

## 🔥 Firebase Mein Domain Add Karna

**Ye bahut zaroori hai!**

1. https://console.firebase.google.com/ kholen
2. **karvaan-tour** project select karein
3. **Authentication** par jayen
4. **Settings** → **Authorized domains**
5. **Add domain** par click karein
6. Type karein: `karvaantours.com`
7. Phir type karein: `www.karvaantours.com`
8. Save karein!

**Agar ye nahi karenge toh Google login kaam nahi karega!**

---

## 📱 Kaunsi Files Upload Karni Hain

`dist/` folder ke andar se **SAARI files** upload karein:

```
✅ index.html
✅ .htaccess
✅ assets/ (poora folder)
✅ logo.png
✅ Baki saari files
```

**Ye files NAHI upload karni:**
- ❌ node_modules
- ❌ src folder
- ❌ package.json
- ❌ Config files

**Sirf `dist/` folder ka content upload karna hai!**

---

## 🐛 Agar Problem Aaye

| Problem | Solution |
|---------|----------|
| Page refresh par 404 | `.htaccess` file check karein |
| Google login kaam nahi kar raha | Firebase mein domain add karein |
| Blank page aa raha hai | Browser console check karein (F12) |
| HTTPS nahi hai | Hostinger mein SSL enable karein |
| Images nahi dikh rahe | Assets folder upload hui ya nahi check karein |

---

## 🎯 Upload Karne Ke Baad Test Kare

Apni website khol ke ye sab check karein:

1. ✅ Homepage theek se khul raha hai
2. ✅ Navigation kaam kar raha hai
3. ✅ Google se login ho raha hai
4. ✅ Tour booking kaam kar raha hai
5. ✅ Profile picture dikh rahi hai
6. ✅ Mobile par bhi sahi dikh raha hai

---

## 🔄 Website Update Karne Ke Liye

Jab bhi changes kare:

1. Apne code mein changes kare
2. Run kare: `npm run build:production`
3. Naye `dist/` files upload kare
4. Browser cache clear kare
5. Done!

---

## 💡 Yaad Rakhe

- ✅ Build output: `dist/` folder mein milega
- ✅ Upload destination: Hostinger ka `public_html/`
- ✅ Aapka domain: www.karvaantours.com
- ✅ Hamesha production build use kare
- ✅ Upload se pehle test kar lein

---

## 📞 Support

**Agar problem aaye:**
- Hostinger Support: 24/7 live chat available hai
- Firebase Console: https://console.firebase.google.com/
- Deployment Guide (detailed): `HOSTINGER_DEPLOYMENT_GUIDE.md`

---

## 🎊 Tayyar Hain!

### Ye Command Chalaye:
```bash
npm run build:production
```

### Ye Folder Upload Kare:
```
c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\dist\
```

### Yahan Upload Kare:
```
Hostinger → public_html/
```

### Aapki Live Website:
```
https://www.karvaantours.com
```

---

## ✨ Step-by-Step (Asan Tareeqa)

### Step 1: Terminal Kholen
Windows PowerShell ya Command Prompt kholen

### Step 2: Project Folder Mein Jayen
```bash
cd "c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides"
```

### Step 3: Build Command Chalaye
```bash
npm run build:production
```

**Wait karein... Build ban raha hai...**
**Build complete! ✅**

### Step 4: Dist Folder Check Kare
```
c:\Users\AL REHMAN LAPTOP\Desktop\two-in-one\travelfy-guides\dist\
```
Ye folder khol ke dekhen - saari files honi chahiye

### Step 5: Hostinger Kholen
1. Browser mein Hostinger login karein
2. hPanel kholen
3. File Manager par click karein

### Step 6: Public_html Mein Jayen
- Left side mein folders dikhenge
- `public_html` par click karein
- Agar purani files hain toh backup le ke delete kar dein

### Step 7: Files Upload Kare
1. **Upload** button par click karein
2. Apne computer se `dist` folder kholen
3. **SAARI files select karein** (Ctrl+A)
4. Upload karein
5. Wait karein jab tak upload complete na ho

### Step 8: Firebase Setup
1. Naye tab mein https://console.firebase.google.com/ kholen
2. **karvaan-tour** project par click karein
3. Left side mein **Authentication** par click karein
4. Top par **Settings** gear icon par click karein
5. **Authorized domains** section mein jayen
6. **Add domain** par click karein
7. Type karein: `karvaantours.com` aur add karein
8. Phir se **Add domain** par click karein
9. Type karein: `www.karvaantours.com` aur add karein

### Step 9: SSL Enable Kare
1. Hostinger hPanel mein waapis jayen
2. Left side mein **SSL** par click karein
3. **karvaantours.com** select karein
4. **Install SSL** par click karein
5. 15-30 minutes wait karein

### Step 10: Test Kare!
1. Browser mein jayen: https://www.karvaantours.com
2. Check karein sab kuch kaam kar raha hai
3. Google login try karein
4. Booking try karein
5. Mobile par bhi check karein

---

## 🎉 Mubarak Ho!

Aapki website ab live hai! 🚀

**Website:** https://www.karvaantours.com

---

## 📝 Important Notes

### Bandwidth aur Storage:
- Aapki website ka size: ~2-3 MB
- Hostinger ki limit: Usually 100 GB+
- Tension ki koi baat nahi!

### Performance:
- Website fast load hogi
- Images optimized hain
- Gzip compression enable hai
- Browser caching bhi hai

### Security:
- HTTPS enabled
- Firebase authentication secure hai
- .htaccess se site protected hai

---

## 🌟 Final Checklist

Deploy karne se pehle:
- [x] Build ready hai
- [x] .htaccess file banayi
- [x] Environment variables set kiye
- [x] Vite config updated hai

Deploy karte waqt:
- [ ] Build command chalaye
- [ ] Dist folder upload kare
- [ ] Firebase domains add kare
- [ ] SSL enable kare

Deploy ke baad:
- [ ] Website test kare
- [ ] Google login test kare
- [ ] Mobile par test kare
- [ ] Different browsers mein test kare

---

## 💪 Ab Aap Tayyar Hain!

Saari files ready hain, saari instructions mil gayi hain.

**Ab bas:**
1. Build command chalao
2. Files upload karo
3. Test karo
4. Launch karo!

**Best of luck! Kamyabi aapki hai! 🎊**

---

**Questions?** Detailed guide dekhen: `HOSTINGER_DEPLOYMENT_GUIDE.md`

**Happy Deployment! 🚀✨**
