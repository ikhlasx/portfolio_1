#!/usr/bin/env python3
"""
Backend API Testing Suite for Vercel Deployment
Tests FastAPI backend functionality including health checks, database operations, and CORS configuration.
"""

import asyncio
import aiohttp
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any, List
import uuid

# Test configuration
BACKEND_URL = "http://localhost:8001"  # Internal backend URL
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.test_data = []
        
    async def setup(self):
        """Setup test session"""
        self.session = aiohttp.ClientSession()
        
    async def cleanup(self):
        """Cleanup test session"""
        if self.session:
            await self.session.close()
            
    def log_test(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {},
            "timestamp": datetime.utcnow().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
            
    async def test_health_check(self):
        """Test basic API health check endpoint"""
        try:
            async with self.session.get(f"{API_BASE}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("message") == "Hello World":
                        self.log_test("Health Check", True, "API root endpoint responding correctly", 
                                    {"status_code": response.status, "response": data})
                        return True
                    else:
                        self.log_test("Health Check", False, "Unexpected response format", 
                                    {"status_code": response.status, "response": data})
                        return False
                else:
                    self.log_test("Health Check", False, f"HTTP {response.status}", 
                                {"status_code": response.status})
                    return False
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
            return False
            
    async def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            # Test preflight request
            headers = {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            
            async with self.session.options(f"{API_BASE}/status", headers=headers) as response:
                cors_headers = {
                    'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
                    'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
                    'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
                    'access-control-allow-credentials': response.headers.get('access-control-allow-credentials')
                }
                
                if cors_headers['access-control-allow-origin']:
                    self.log_test("CORS Configuration", True, "CORS headers properly configured", 
                                {"cors_headers": cors_headers})
                    return True
                else:
                    self.log_test("CORS Configuration", False, "Missing CORS headers", 
                                {"cors_headers": cors_headers})
                    return False
                    
        except Exception as e:
            self.log_test("CORS Configuration", False, f"CORS test error: {str(e)}")
            return False
            
    async def test_create_status_check(self):
        """Test POST /api/status endpoint"""
        try:
            test_client_name = f"TestClient_{uuid.uuid4().hex[:8]}"
            payload = {"client_name": test_client_name}
            
            async with self.session.post(f"{API_BASE}/status", 
                                       json=payload,
                                       headers={'Content-Type': 'application/json'}) as response:
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure
                    required_fields = ['id', 'client_name', 'timestamp']
                    if all(field in data for field in required_fields):
                        if data['client_name'] == test_client_name:
                            # Store test data for cleanup
                            self.test_data.append(data)
                            self.log_test("Create Status Check", True, "Status check created successfully", 
                                        {"status_code": response.status, "created_record": data})
                            return True
                        else:
                            self.log_test("Create Status Check", False, "Client name mismatch", 
                                        {"expected": test_client_name, "received": data.get('client_name')})
                            return False
                    else:
                        missing_fields = [f for f in required_fields if f not in data]
                        self.log_test("Create Status Check", False, f"Missing required fields: {missing_fields}", 
                                    {"response": data})
                        return False
                else:
                    error_text = await response.text()
                    self.log_test("Create Status Check", False, f"HTTP {response.status}", 
                                {"status_code": response.status, "error": error_text})
                    return False
                    
        except Exception as e:
            self.log_test("Create Status Check", False, f"Request error: {str(e)}")
            return False
            
    async def test_get_status_checks(self):
        """Test GET /api/status endpoint"""
        try:
            async with self.session.get(f"{API_BASE}/status") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        # Check if our test data is in the response
                        test_records_found = 0
                        for test_record in self.test_data:
                            for record in data:
                                if record.get('id') == test_record.get('id'):
                                    test_records_found += 1
                                    break
                                    
                        self.log_test("Get Status Checks", True, 
                                    f"Retrieved {len(data)} records, {test_records_found} test records found", 
                                    {"total_records": len(data), "test_records_found": test_records_found})
                        return True
                    else:
                        self.log_test("Get Status Checks", False, "Response is not a list", 
                                    {"response_type": type(data).__name__, "response": data})
                        return False
                else:
                    error_text = await response.text()
                    self.log_test("Get Status Checks", False, f"HTTP {response.status}", 
                                {"status_code": response.status, "error": error_text})
                    return False
                    
        except Exception as e:
            self.log_test("Get Status Checks", False, f"Request error: {str(e)}")
            return False
            
    async def test_database_connectivity(self):
        """Test database connectivity through API operations"""
        try:
            # Create a test record
            test_client_name = f"DBTest_{uuid.uuid4().hex[:8]}"
            payload = {"client_name": test_client_name}
            
            # Create record
            async with self.session.post(f"{API_BASE}/status", 
                                       json=payload,
                                       headers={'Content-Type': 'application/json'}) as response:
                if response.status != 200:
                    self.log_test("Database Connectivity", False, "Failed to create test record")
                    return False
                    
                created_record = await response.json()
                
            # Retrieve records to verify persistence
            async with self.session.get(f"{API_BASE}/status") as response:
                if response.status != 200:
                    self.log_test("Database Connectivity", False, "Failed to retrieve records")
                    return False
                    
                records = await response.json()
                
            # Check if our record exists
            record_found = any(r.get('id') == created_record.get('id') for r in records)
            
            if record_found:
                self.log_test("Database Connectivity", True, "Database operations working correctly", 
                            {"created_record_id": created_record.get('id'), "total_records": len(records)})
                return True
            else:
                self.log_test("Database Connectivity", False, "Created record not found in database", 
                            {"created_record_id": created_record.get('id')})
                return False
                
        except Exception as e:
            self.log_test("Database Connectivity", False, f"Database test error: {str(e)}")
            return False
            
    async def test_serverless_compatibility(self):
        """Test serverless configuration compatibility"""
        try:
            # Test multiple concurrent requests to simulate serverless behavior
            async def make_request():
                async with self.session.get(f"{API_BASE}/") as response:
                    return response.status == 200
                    
            tasks = [make_request() for _ in range(5)]
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            successful_responses = sum(1 for result in results if result is True)
                    
            if successful_responses == 5:
                self.log_test("Serverless Compatibility", True, "All concurrent requests successful", 
                            {"concurrent_requests": 5, "successful": successful_responses})
                return True
            else:
                self.log_test("Serverless Compatibility", False, f"Only {successful_responses}/5 requests successful", 
                            {"concurrent_requests": 5, "successful": successful_responses})
                return False
                
        except Exception as e:
            self.log_test("Serverless Compatibility", False, f"Concurrent request test error: {str(e)}")
            return False
            
    async def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests for Vercel Deployment")
        print("=" * 60)
        
        await self.setup()
        
        try:
            # Test sequence
            tests = [
                ("Basic Health Check", self.test_health_check),
                ("CORS Configuration", self.test_cors_headers),
                ("Create Status Check", self.test_create_status_check),
                ("Get Status Checks", self.test_get_status_checks),
                ("Database Connectivity", self.test_database_connectivity),
                ("Serverless Compatibility", self.test_serverless_compatibility),
            ]
            
            passed_tests = 0
            total_tests = len(tests)
            
            for test_name, test_func in tests:
                print(f"\n🧪 Running: {test_name}")
                try:
                    result = await test_func()
                    if result:
                        passed_tests += 1
                except Exception as e:
                    self.log_test(test_name, False, f"Test execution error: {str(e)}")
                    
        finally:
            await self.cleanup()
            
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {total_tests - passed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        # Print detailed results
        print("\n📋 DETAILED RESULTS:")
        for result in self.test_results:
            status = "✅" if result["success"] else "❌"
            print(f"{status} {result['test']}: {result['message']}")
            
        return passed_tests == total_tests

async def main():
    """Main test runner"""
    tester = BackendTester()
    success = await tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend is ready for Vercel deployment.")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Please review the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())