
import React from 'react';
import Layout from '@/components/Layout';
import SafeRoutes from '@/components/SafeRoutes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, MapPin } from 'lucide-react';

const RoutesPage = () => {
  const safetyZones = [
    { name: "Police Stations", icon: Shield },
    { name: "Hospitals & Urgent Care", icon: AlertTriangle },
    { name: "Safe Public Places", icon: MapPin }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-safeguard-purple">Safe Routes</h1>
          <p className="text-gray-600 text-sm mt-1">
            Plan safer journeys and find safety zones
          </p>
        </div>
        
        <SafeRoutes />
        
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Safety Zones Near You</h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                In an emergency, these places may offer safety and assistance:
              </p>
              
              <div className="space-y-3">
                {safetyZones.map((zone, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                    <zone.icon className="h-5 w-5 text-safeguard-purple" />
                    <span className="font-medium">{zone.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>
                  Note: In a real version of the app, these would show actual locations near you
                  based on your current location.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6 bg-safeguard-lightgray">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Safety Reminder
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Always stay aware of your surroundings, even when using navigation.
              If you feel unsafe, seek a populated area or call emergency services.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RoutesPage;
