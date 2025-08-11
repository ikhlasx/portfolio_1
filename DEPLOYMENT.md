# Deployment Instructions

This document provides instructions for deploying both the frontend and backend of your application so that it can be accessed by anyone with the link.

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com/) if you don't have one already.
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Navigate to your frontend directory:
   ```bash
   cd frontend
   ```
4. Run the deployment command:
   ```bash
   vercel
   ```
5. Follow the prompts to complete the deployment.
6. Once deployed, Vercel will provide you with a URL that you can share with anyone.

### Option 2: Deploy to Netlify

1. Create an account on [Netlify](https://www.netlify.com/) if you don't have one already.
2. You can deploy in two ways:
   
   **Using the Netlify UI:**
   - Go to the Netlify dashboard
   - Click "New site from Git"
   - Connect your repository
   - Set the build command to `npm run build`
   - Set the publish directory to `build`
   - Click "Deploy site"

   **Using the Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   cd frontend
   netlify deploy --prod
   ```

3. Once deployed, Netlify will provide you with a URL that you can share with anyone.

## Backend Deployment

### Option 1: Deploy to Heroku

1. Create an account on [Heroku](https://www.heroku.com/) if you don't have one already.
2. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
3. Navigate to your backend directory:
   ```bash
   cd backend
   ```
4. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
5. Add a MongoDB add-on or set up your own MongoDB instance:
   ```bash
   heroku addons:create mongodb
   ```
6. Set environment variables:
   ```bash
   heroku config:set MONGO_URL=your_mongodb_connection_string
   heroku config:set DB_NAME=your_database_name
   heroku config:set CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```
7. Deploy to Heroku:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Option 2: Deploy using Docker (Render, Railway, etc.)

1. Choose a platform that supports Docker deployments (Render, Railway, DigitalOcean, etc.)
2. Follow the platform's instructions to deploy a Docker container using the provided Dockerfile in the backend directory.
3. Set the required environment variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: Your database name
   - `CORS_ORIGINS`: Your frontend URL (comma-separated if multiple)

## Connecting Frontend to Backend

After deploying both the frontend and backend, you need to update the frontend to point to your deployed backend:

1. In your frontend deployment platform (Vercel or Netlify), set the environment variable:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```

2. Redeploy your frontend if necessary.

## Using Docker Compose for Local Development

For local development and testing before deployment, you can use Docker Compose:

1. Make sure you have Docker and Docker Compose installed.
2. From the root directory, run:
   ```bash
   docker-compose up
   ```
3. This will start the frontend, backend, and MongoDB containers.
4. Access the frontend at http://localhost:3000 and the backend at http://localhost:8000.

## Troubleshooting

- If your frontend can't connect to the backend, check that the CORS settings in the backend allow requests from your frontend domain.
- Make sure all environment variables are correctly set in your deployment platforms.
- Check the logs of your deployed applications for any errors.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Docker Documentation](https://docs.docker.com/)