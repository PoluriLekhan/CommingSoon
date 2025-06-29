# Deploy to Vercel - Step by Step Guide

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your project files ready

## Step 1: Prepare Your Project for Static Deployment

Your "Coming Soon" website is now optimized for static deployment with local storage for data persistence.

1. **Download your project files** from Replit:
   - Click the three dots menu in Replit
   - Select "Download as zip"
   - Extract the zip file on your computer

## Step 2: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New repository"** (green button)
3. **Name your repository**: `my-coming-soon-website`
4. **Make it Public** (required for free Vercel deployment)
5. **Don't initialize** with README, .gitignore, or license
6. **Click "Create repository"**

## Step 3: Upload Your Code to GitHub

### Option A: Using GitHub Web Interface (Easier)
1. **Click "uploading an existing file"** on the empty repository page
2. **Drag and drop** all your project files (except node_modules folder)
3. **Write commit message**: "Initial commit - Coming Soon website"
4. **Click "Commit changes"**

### Option B: Using Git Commands (Advanced)
```bash
cd your-project-folder
git init
git add .
git commit -m "Initial commit - Coming Soon website"
git remote add origin https://github.com/yourusername/my-coming-soon-website.git
git push -u origin main
```

## Step 4: Deploy to Vercel

1. **Go to vercel.com** and sign in with GitHub
2. **Click "New Project"**
3. **Import your GitHub repository**:
   - Find your repository in the list
   - Click "Import"

4. **Configure build settings**:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

5. **Click "Deploy"**

## Step 5: Vercel Will Build Your Site

- Vercel will automatically:
  - Install dependencies
  - Build your React frontend as a static site
  - Deploy to a live URL
  - Give you a URL like: `https://my-coming-soon-website.vercel.app`

## Step 6: Test Your Deployment

1. **Visit your live URL**
2. **Test the email signup form** - data saves to browser's local storage
3. **Check the admin panel** at `/admin`
4. **Verify login works** with credentials:
   - Username: `Lekhan`
   - Password: `L2009@khan!`
5. **Test CSV export** for downloading subscriber emails

## Step 7: Custom Domain (Optional)

1. **In Vercel dashboard** > Settings > Domains
2. **Add your custom domain** (like `yoursite.com`)
3. **Update DNS settings** as instructed by Vercel

## How Data Storage Works

- **Subscriber Data**: Stored in browser's local storage (persists between visits)
- **Admin Access**: Login sessions stored locally (expires after 24 hours)
- **CSV Export**: Generates file from local storage data
- **Cross-Device**: Each device/browser has its own data storage

## Managing Subscribers

1. **View all subscribers**: Admin panel shows all signups
2. **Export email list**: Download CSV file or copy all emails to clipboard
3. **Send notifications**: Copy emails and paste into your email client's BCC field

## If You Need Centralized Data Storage Later

1. **Add a database** service (like Supabase or Vercel Postgres)
2. **Update the code** to use API calls instead of local storage
3. **Add environment variables** in Vercel dashboard
4. **Redeploy** the project

## Troubleshooting

- **Build fails**: Check build logs in Vercel dashboard, ensure all dependencies are correct
- **404 errors**: Verify all files uploaded to GitHub correctly
- **Admin login not working**: Clear browser storage and try again
- **Data not saving**: Check if JavaScript is enabled and local storage is available

## Build Error Fix

If you encounter build errors, the issue was resolved by converting to a static-only deployment using local storage instead of server-side functionality.

Your "Coming Soon" website will be live as a fast, static site ready to collect email signups!