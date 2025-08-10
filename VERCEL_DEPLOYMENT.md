# Vercel Deployment Guide

This guide explains how to deploy this full-stack application to Vercel.

## Project Structure

The project consists of:
- A React/TypeScript frontend (in the `frontend` directory)
- A FastAPI backend (adapted for Vercel serverless functions in the `api` directory)

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for local testing)
3. A MongoDB database (e.g., MongoDB Atlas)

## Environment Variables

### Required Environment Variables

You need to configure the following environment variables in Vercel:

#### Backend Environment Variables

- `MONGO_URL`: Your MongoDB connection string
- `DB_NAME`: Your MongoDB database name
- `CORS_ORIGINS`: Comma-separated list of allowed origins (or `*` for development)

#### Frontend Environment Variables

- `VITE_API_URL`: The URL of your deployed API (typically `https://your-vercel-project.vercel.app/api`)

### Setting Up Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add each of the required environment variables
5. Make sure to set the appropriate scope for each variable (Production, Preview, Development)

## Deployment Steps

### Option 1: Deploy from GitHub

1. Push your code to a GitHub repository
2. In Vercel dashboard, click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Root Directory: `./` (the root of your repository)
   - Build Command: Leave as default (Vercel will use the configuration in vercel.json)
   - Output Directory: Leave as default (Vercel will use the configuration in vercel.json)
5. Add the environment variables as described above
6. Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. From the root directory of your project, run: `vercel`
4. Follow the prompts to configure your project
5. To deploy to production: `vercel --prod`

## Updating API Endpoints

When deployed to Vercel, your API will be available at:
- `https://your-vercel-project.vercel.app/api`

Make sure your frontend is configured to use this endpoint by setting the `VITE_API_URL` environment variable in Vercel.

## Local Development After Vercel Configuration

For local development after configuring for Vercel:

1. Frontend:
   - Create a `.env.local` file in the `frontend` directory with:
     ```
     VITE_API_URL=http://localhost:3000/api
     ```
   - Run `npm run dev` in the `frontend` directory

2. Backend:
   - Run the backend locally using uvicorn:
     ```
     cd backend
     uvicorn server:app --reload
     ```

## Troubleshooting

- **CORS Issues**: Ensure the `CORS_ORIGINS` environment variable includes your frontend URL
- **Database Connection Issues**: Verify your MongoDB connection string and ensure your IP is whitelisted in MongoDB Atlas
- **API Not Found**: Check that the API routes in vercel.json are correctly configured