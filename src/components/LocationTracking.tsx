
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSafety } from '@/contexts/SafetyContext';
import { MapPin, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const LocationTracking = () => {
  const { location, isEmergencyActive } = useSafety();
  const [locationUrl, setLocationUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      setLocationUrl(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`);
    } else {
      setLocationUrl(null);
    }
  }, [location]);

  const shareLocation = async () => {
    if (locationUrl) {
      try {
        // Using Web Share API if available
        if (navigator.share) {
          await navigator.share({
            title: 'My Current Location',
            text: 'Here is my current location',
            url: locationUrl
          });
          toast.success('Location shared successfully');
        } else {
          // Fallback to copying to clipboard
          await navigator.clipboard.writeText(locationUrl);
          toast.success('Location link copied to clipboard');
        }
      } catch (error) {
        console.error('Error sharing location', error);
        toast.error('Failed to share location');
      }
    } else {
      toast.error('Location not available');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Location Tracking
        </CardTitle>
        <CardDescription>
          {isEmergencyActive 
            ? 'Your location is being tracked and shared with your emergency contacts' 
            : 'Share your current location with trusted contacts'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-md">
            {location?.latitude && location?.longitude ? (
              <div className="text-sm">
                <div className="font-medium">Current coordinates:</div>
                <div className="text-gray-600">
                  Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                </div>
                
                {locationUrl && (
                  <a 
                    href={locationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-safeguard-purple underline mt-1 inline-block"
                  >
                    View on Google Maps
                  </a>
                )}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">Location data not available</div>
            )}
          </div>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full border-safeguard-teal text-safeguard-teal hover:bg-safeguard-teal hover:text-white"
            onClick={shareLocation}
            disabled={!locationUrl}
          >
            <Share2 className="h-4 w-4" />
            Share My Location
          </Button>
          
          {isEmergencyActive && (
            <div className="bg-red-50 border border-red-200 p-2 rounded-md">
              <p className="text-xs text-red-700">
                <strong>Emergency mode active:</strong> Your real-time location is being shared with emergency contacts
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationTracking;
