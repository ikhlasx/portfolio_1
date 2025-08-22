# Pulse Robot Template

A full-stack application with a React/TypeScript frontend and a FastAPI backend.

## Project Structure

- `frontend/`: React/TypeScript frontend built with Vite
- `backend/`: FastAPI backend
- `api/`: Serverless API functions for Vercel deployment

## Local Development

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the development server:
   ```
   uvicorn server:app --reload
   ```

## Deployment to Vercel

This project is configured for deployment to Vercel. For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

### Quick Deployment Steps

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure environment variables in Vercel:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: Your MongoDB database name
   - `CORS_ORIGINS`: Comma-separated list of allowed origins
   - `VITE_API_URL`: The URL of your deployed API

4. Deploy the project

## Environment Variables

### Frontend

Create a `.env` file in the `frontend` directory with:

```
VITE_API_URL=http://localhost:3000/api  # For local development
WDS_SOCKET_PORT=443  # Required for development server with HTTPS
```

### Backend

Create a `.env` file in the `backend` directory with:

```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
```

## License

[MIT](LICENSE)
