#!/usr/bin/env python3
"""
Deployment Verification Script
Tests all endpoints to ensure the application is working correctly
"""
import requests
import time
import sys
from pathlib import Path

def test_frontend():
    """Test frontend accessibility"""
    try:
        response = requests.get("http://localhost:3000", timeout=10)
        if response.status_code == 200:
            print("✅ Frontend: http://localhost:3000 - Working")
            return True
        else:
            print(f"❌ Frontend: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend: {e}")
        return False

def test_backend():
    """Test backend API endpoints"""
    try:
        # Test root endpoint
        response = requests.get("http://localhost:8000/api/", timeout=10)
        if response.status_code == 200:
            print("✅ Backend API: http://localhost:8000/api/ - Working")
        else:
            print(f"❌ Backend API: Status {response.status_code}")
            return False
        
        # Test status endpoint
        response = requests.get("http://localhost:8000/api/status", timeout=10)
        if response.status_code == 200:
            print("✅ Backend Status: http://localhost:8000/api/status - Working")
        else:
            print(f"❌ Backend Status: Status {response.status_code}")
            return False
        
        # Test API docs
        response = requests.get("http://localhost:8000/docs", timeout=10)
        if response.status_code == 200:
            print("✅ API Documentation: http://localhost:8000/docs - Working")
        else:
            print(f"❌ API Documentation: Status {response.status_code}")
        
        return True
    except Exception as e:
        print(f"❌ Backend: {e}")
        return False

def test_build():
    """Test if the frontend can build successfully"""
    try:
        print("🔨 Testing frontend build...")
        import subprocess
        import os
        
        # Use npm.cmd on Windows
        npm_cmd = "npm.cmd" if os.name == 'nt' else "npm"
        
        result = subprocess.run([npm_cmd, "run", "build"], 
                              cwd="frontend", 
                              capture_output=True, 
                              text=True, 
                              timeout=60)
        
        if result.returncode == 0:
            print("✅ Frontend build: Successful")
            return True
        else:
            print(f"❌ Frontend build failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Frontend build test: {e}")
        return False

def main():
    """Main verification function"""
    print("🔍 Portfolio Website - Deployment Verification")
    print("=" * 50)
    
    # Wait for servers to be ready
    print("⏳ Waiting for servers to start...")
    time.sleep(3)
    
    # Test frontend
    frontend_ok = test_frontend()
    
    # Test backend
    backend_ok = test_backend()
    
    # Test build
    build_ok = test_build()
    
    print("\n" + "=" * 50)
    print("📊 VERIFICATION RESULTS:")
    print(f"Frontend: {'✅ PASS' if frontend_ok else '❌ FAIL'}")
    print(f"Backend:  {'✅ PASS' if backend_ok else '❌ FAIL'}")
    print(f"Build:    {'✅ PASS' if build_ok else '❌ FAIL'}")
    
    if all([frontend_ok, backend_ok, build_ok]):
        print("\n🎉 ALL TESTS PASSED! Your portfolio website is ready for deployment.")
        print("\n📱 Local URLs:")
        print("   Frontend: http://localhost:3000")
        print("   Backend:  http://localhost:8000")
        print("   API Docs: http://localhost:8000/docs")
        print("\n🚀 Ready for Vercel deployment!")
        return 0
    else:
        print("\n❌ Some tests failed. Please check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 