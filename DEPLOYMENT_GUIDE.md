# 🚀 Portfolio Website - Deployment Guide

This guide covers both local development and Vercel deployment for your portfolio website.

## 🏠 Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- MongoDB (optional, for full functionality)

### Quick Start
```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev
```

### Manual Start (Alternative)
```bash
# Terminal 1: Start Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --host 127.0.0.1 --port 8000 --reload

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev
```

### Local URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🌐 Vercel Deployment

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the configuration
3. Deploy with zero configuration

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Vercel Configuration
The project includes `vercel.json` with:
- **Frontend**: Static build from `frontend/` directory
- **API**: Python serverless functions from `api/` directory
- **Routes**: API routes under `/api/*`, everything else to frontend

## 📁 Project Structure

```
portfolio_1-main/
├── frontend/          # React + Vite frontend
├── backend/           # FastAPI backend (local dev)
├── api/              # Vercel serverless functions
├── vercel.json       # Vercel configuration
├── start_local.py    # Local development script
└── package.json      # Root package.json
```

## 🔧 Environment Variables

### Local Development
Create `.env` files in respective directories:

**Backend** (`backend/.env`):
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_dev
CORS_ORIGINS=http://localhost:3000
```

**API** (`api/.env`):
```env
MONGO_URL=your_mongodb_atlas_url
DB_NAME=portfolio_prod
CORS_ORIGINS=https://yourdomain.vercel.app
```

### Vercel
Set environment variables in Vercel dashboard:
- `MONGO_URL`: Your MongoDB connection string
- `DB_NAME`: Database name
- `CORS_ORIGINS`: Your domain

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Windows
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:8000 | xargs kill -9
   ```

2. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string
   - App will run without database (limited functionality)

3. **Frontend Build Errors**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

4. **Backend Import Errors**
   ```bash
   cd backend
   pip install -r requirements.txt
   python -c "import server; print('OK')"
   ```

### Vercel-Specific Issues

1. **Function Timeout**
   - API functions have 10s timeout by default
   - Optimize database queries
   - Use connection pooling

2. **Cold Start**
   - First request may be slow
   - Consider using Vercel Pro for better performance

3. **Environment Variables**
   - Ensure all required vars are set in Vercel dashboard
   - Check variable names match exactly

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Function execution times
- Error tracking

### Custom Monitoring
- Add logging to API endpoints
- Monitor MongoDB connection status
- Track API response times

## 🔄 Updates & Maintenance

### Regular Updates
```bash
# Update dependencies
npm update
cd frontend && npm update
cd backend && pip install --upgrade -r requirements.txt

# Test locally
npm run dev
npm run build
```

### Database Maintenance
- Monitor MongoDB performance
- Regular backups
- Index optimization

## 📞 Support

For deployment issues:
1. Check Vercel logs
2. Verify environment variables
3. Test locally first
4. Check MongoDB connection

## 🎯 Best Practices

1. **Always test locally before deploying**
2. **Use environment variables for configuration**
3. **Monitor function performance in Vercel**
4. **Keep dependencies updated**
5. **Use proper error handling**
6. **Implement proper CORS configuration** 