#!/usr/bin/env python3
"""
Local Development Startup Script
This script starts both the frontend and backend for local development
"""
import subprocess
import sys
import time
import os
from pathlib import Path

def start_backend():
    """Start the FastAPI backend server"""
    print("🚀 Starting Backend Server...")
    backend_dir = Path("backend")
    
    if not backend_dir.exists():
        print("❌ Backend directory not found!")
        return None
    
    try:
        # Install backend dependencies if needed
        print("📦 Installing backend dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"], 
                      check=True, capture_output=True)
        
        # Start backend server
        print("🔥 Starting FastAPI server on http://localhost:8000")
        backend_process = subprocess.Popen([
            sys.executable, "-m", "uvicorn", "server:app", 
            "--host", "127.0.0.1", "--port", "8000", "--reload"
        ], cwd="backend")
        
        return backend_process
    except Exception as e:
        print(f"❌ Failed to start backend: {e}")
        return None

def start_frontend():
    """Start the React frontend development server"""
    print("🚀 Starting Frontend Server...")
    frontend_dir = Path("frontend")
    
    if not frontend_dir.exists():
        print("❌ Frontend directory not found!")
        return None
    
    try:
        # Install frontend dependencies if needed
        print("📦 Installing frontend dependencies...")
        subprocess.run(["npm", "install"], cwd="frontend", check=True, capture_output=True)
        
        # Start frontend server
        print("🔥 Starting React dev server on http://localhost:3000")
        frontend_process = subprocess.Popen(["npm", "run", "dev"], cwd="frontend")
        
        return frontend_process
    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")
        return None

def main():
    """Main startup function"""
    print("🎯 Portfolio Website - Local Development Startup")
    print("=" * 50)
    
    # Start backend
    backend_process = start_backend()
    if backend_process:
        print("✅ Backend started successfully!")
    
    # Wait a moment for backend to initialize
    time.sleep(2)
    
    # Start frontend
    frontend_process = start_frontend()
    if frontend_process:
        print("✅ Frontend started successfully!")
    
    if backend_process and frontend_process:
        print("\n🎉 Both servers are running!")
        print("📱 Frontend: http://localhost:3000")
        print("🔧 Backend: http://localhost:8000")
        print("📚 API Docs: http://localhost:8000/docs")
        print("\nPress Ctrl+C to stop both servers")
        
        try:
            # Wait for user to stop
            backend_process.wait()
            frontend_process.terminate()
        except KeyboardInterrupt:
            print("\n🛑 Stopping servers...")
            backend_process.terminate()
            frontend_process.terminate()
            print("✅ Servers stopped")
    else:
        print("❌ Failed to start one or more servers")
        sys.exit(1)

if __name__ == "__main__":
    main() 