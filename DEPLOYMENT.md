# Deploy to Vercel - Step by Step Guide

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your project files ready

## Step 1: Prepare Your Project

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
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables** (if needed later):
   - You can add these in Vercel dashboard > Settings > Environment Variables

6. **Click "Deploy"**

## Step 5: Vercel Will Build Your Site

- Vercel will automatically:
  - Install dependencies
  - Build your React frontend
  - Deploy to a live URL
  - Give you a URL like: `https://my-coming-soon-website.vercel.app`

## Step 6: Test Your Deployment

1. **Visit your live URL**
2. **Test the email signup form**
3. **Check the admin panel** at `/admin`
4. **Verify login works** with credentials:
   - Username: `Lekhan`
   - Password: `L2009@khan!`

## Step 7: Custom Domain (Optional)

1. **In Vercel dashboard** > Settings > Domains
2. **Add your custom domain** (like `yoursite.com`)
3. **Update DNS settings** as instructed by Vercel

## Important Notes

- **Data Storage**: Currently uses in-memory storage, so subscriber data resets on each deployment
- **Admin Access**: Login credentials work with local browser storage
- **Email Export**: Download CSV functionality works for getting subscriber emails
- **No Database**: Simple setup without external database requirements

## If You Need Persistent Data Storage Later

1. **Add a database** (like Vercel Postgres or Supabase)
2. **Update environment variables** in Vercel
3. **Redeploy** the project

## Troubleshooting

- **Build fails**: Check the build logs in Vercel dashboard
- **404 errors**: Ensure all files uploaded correctly to GitHub
- **Admin login not working**: Clear browser storage and try again

Your "Coming Soon" website will be live and ready to collect email signups!