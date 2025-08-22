# Vercel Deployment Guide

This portfolio application is optimized for seamless deployment on Vercel with full-stack functionality.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo-name)

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **MongoDB Atlas** (Optional): For full-stack functionality
   - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string

## 🛠️ Deployment Methods

### Method 1: One-Click Deploy from GitHub

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `frontend/dist` (auto-detected)

3. **Environment Variables** (Optional for full backend functionality)
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
   DB_NAME=portfolio_db
   CORS_ORIGINS=*
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build completion
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Deploy to production
vercel --prod
```

## 🌐 Environment Configuration

### Frontend Only (Static)
No environment variables needed! The portfolio works perfectly as a static site.

### Full-Stack (with API)
Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGO_URL` | `mongodb+srv://...` | MongoDB Atlas connection string |
| `DB_NAME` | `portfolio_db` | Database name |
| `CORS_ORIGINS` | `*` | Allowed origins (use your domain in production) |

## 🔧 Local Development

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
/
├── frontend/          # React/TypeScript frontend
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── api/              # Serverless API functions
│   ├── index.py      # FastAPI backend
│   └── requirements.txt
├── vercel.json       # Main Vercel configuration
└── package.json      # Root package.json
```

## ✅ Verification

After deployment:

1. **Frontend**: Portfolio should load immediately
2. **API Test**: Go to `/api` endpoint to test backend
3. **Full-Stack Demo**: Use the "Full-Stack Integration Demo" section

## 🚨 Troubleshooting

### Build Fails
- Check that all dependencies are in `frontend/package.json`
- Ensure Node.js version compatibility (18.x recommended)

### API Not Working
- Verify environment variables are set
- Check MongoDB Atlas IP whitelist (allow all: `0.0.0.0/0`)
- Ensure connection string includes database credentials

### 404 Errors
- Verify `vercel.json` configuration
- Check frontend build output directory

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.mongodb.com/atlas](https://docs.mongodb.com/atlas)

---

## 🎯 What's Included

✅ **Portfolio Website**: Complete personal portfolio  
✅ **Responsive Design**: Mobile-first, professional UI  
✅ **Fast Loading**: Optimized for performance  
✅ **SEO Ready**: Meta tags and structured data  
✅ **API Integration**: Full-stack demo with MongoDB  
✅ **Zero Config**: Deploy with one click  

Perfect for developers, designers, and anyone who wants a professional online presence!