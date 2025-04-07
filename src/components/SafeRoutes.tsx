
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Map, Navigation } from 'lucide-react';
import { toast } from 'sonner';

const SafeRoutes = () => {
  const [destination, setDestination] = useState('');
  const [currentLocation, setCurrentLocation] = useState('My Location');

  const planRoute = () => {
    if (!destination.trim()) {
      toast.error('Please enter a destination');
      return;
    }

    // In a real app, this would use navigation APIs (Google Maps, etc.)
    // For now, we'll just open Google Maps
    try {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(currentLocation)}&destination=${encodeURIComponent(destination)}&travelmode=walking`;
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error opening maps', error);
      toast.error('Could not open maps application');
    }
  };

  const safetyTips = [
    "Stay in well-lit areas when walking at night",
    "Share your route with a friend or family member",
    "Avoid shortcuts through isolated areas",
    "Keep your phone charged and accessible",
    "Trust your instincts - if a route feels unsafe, choose another"
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Map className="h-5 w-5 mr-2" />
          Safe Routes
        </CardTitle>
        <CardDescription>
          Plan safer routes for walking and traveling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 p-2 rounded">
                <span className="text-sm">From:</span>
              </div>
              <div className="text-sm font-medium flex-grow bg-gray-100 p-2 rounded">
                {currentLocation}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 p-2 rounded">
                <span className="text-sm">To:</span>
              </div>
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-grow"
              />
            </div>
          </div>
          
          <Button 
            onClick={planRoute}
            className="w-full bg-safeguard-teal hover:bg-teal-600 flex items-center gap-2 justify-center"
          >
            <Navigation className="h-4 w-4" />
            Plan Safe Route
          </Button>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Safety Tips</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-safeguard-purple">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafeRoutes;
