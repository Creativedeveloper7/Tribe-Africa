# Tribe Africa E-commerce - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Free & Fast)
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/Creativedeveloper7/Tribe-Africa`
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy" - your site will be live in minutes!

### Option 2: Netlify (Free & Easy)
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub repository: `https://github.com/Creativedeveloper7/Tribe-Africa`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"

### Option 3: GitHub Pages
1. Go to your repository settings
2. Scroll to "Pages" section
3. Source: "GitHub Actions"
4. Create `.github/workflows/deploy.yml` (see below)

## 📁 Build Output
Your production build is in the `dist/` folder and includes:
- ✅ All React components
- ✅ Banner system with responsive design
- ✅ WhatsApp integration
- ✅ Optimized images and assets
- ✅ CSS and JavaScript bundles

## 🔧 Manual Deployment
If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The dist/ folder contains your production files
# Upload these files to your web server
```

## 🌐 Custom Domain
After deployment, you can add a custom domain in your hosting platform's settings.

## 📱 Features Included
- Responsive banner system below navbar
- WhatsApp integration for orders
- Discounted fabric pricing (KES 1,999)
- Mobile-optimized design
- Dark/light theme support
- Cart functionality
- Product showcase

## 🆘 Support
If you encounter any issues:
1. Check the browser console for errors
2. Verify all image files are in the correct locations
3. Ensure the banner.png file exists in public/gallery/ 