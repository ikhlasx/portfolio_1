import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, Database } from 'lucide-react';

interface StatusCheck {
  id: string;
  client_name: string;
  timestamp: string;
}

const StatusDemo: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [clientName, setClientName] = useState('');
  const [statusChecks, setStatusChecks] = useState<StatusCheck[]>([]);
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

  // Check API connection on component mount
  useEffect(() => {
    checkApiConnection();
    fetchStatusChecks();
  }, []);

  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      if (response.ok) {
        setApiStatus('connected');
      } else {
        setApiStatus('disconnected');
      }
    } catch (error) {
      console.error('API connection failed:', error);
      setApiStatus('disconnected');
    }
  };

  const fetchStatusChecks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/status`);
      if (response.ok) {
        const data = await response.json();
        setStatusChecks(data);
      }
    } catch (error) {
      console.error('Failed to fetch status checks:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    setStatus('loading');
    try {
      const response = await fetch(`${API_BASE_URL}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_name: clientName }),
      });

      if (response.ok) {
        setStatus('success');
        setClientName('');
        // Refresh the list
        await fetchStatusChecks();
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('Failed to create status check:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const getApiStatusColor = () => {
    switch (apiStatus) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getApiStatusText = () => {
    switch (apiStatus) {
      case 'connected': return 'API Connected';
      case 'disconnected': return 'API Disconnected';
      default: return 'Checking API...';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Full-Stack Demo
          <Badge variant="outline" className={`ml-auto ${getApiStatusColor()}`}>
            {getApiStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your name to test the API"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              disabled={status === 'loading' || apiStatus !== 'connected'}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={status === 'loading' || !clientName.trim() || apiStatus !== 'connected'}
              className="min-w-[100px]"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : status === 'error' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                'Test API'
              )}
            </Button>
          </div>
        </form>

        {statusChecks.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Recent API Calls:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {statusChecks.slice(0, 5).map((check) => (
                <div key={check.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{check.client_name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(check.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {apiStatus === 'disconnected' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">
              Backend API is not accessible. This is normal for static deployments. 
              The portfolio features will still work perfectly!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusDemo;