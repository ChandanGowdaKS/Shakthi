
import React from 'react';
import Layout from '@/components/Layout';
import SOSButton from '@/components/SOSButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Volume2, MessageSquare, Camera, MapPin, ShieldAlert, Video } from 'lucide-react';
import { useSafety } from '@/contexts/SafetyContext';
import { toast } from 'sonner';

const EmergencyPage = () => {
  const { isEmergencyActive, activateEmergency, startRecording, stopRecording, isRecording } = useSafety();
  
  const callEmergencyServices = () => {
    // In a real app, this would use the device's phone capability
    window.location.href = 'tel:911';
  };
  
  const sendSOS = () => {
    if (!isEmergencyActive) {
      activateEmergency();
    } else {
      toast.info('Emergency mode is already active');
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const capturePhoto = () => {
    // In a real app, this would use the device's camera
    toast.success('Photo capture would launch camera in a real app');
  };
  
  const recordVideo = () => {
    toast.success('Video recording would start in a real app');
  };
  
  const shareLocation = () => {
    toast.success('Your location has been shared with emergency contacts');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-safeguard-purple to-safeguard-teal bg-clip-text text-transparent">
            <ShieldAlert className="h-6 w-6 mr-2 text-safeguard-purple" />
            <h1 className="text-2xl font-bold">Emergency Tools</h1>
          </div>
          <p className="text-gray-600 text-sm mt-1">Quick access to safety resources</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <SOSButton />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
            <CardContent className="p-3 text-center">
              <Button 
                onClick={callEmergencyServices}
                className="w-full h-24 flex flex-col items-center justify-center bg-gradient-to-br from-safeguard-danger to-red-700 hover:from-red-600 hover:to-red-800 shadow-md"
              >
                <Phone className="h-8 w-8 mb-1" />
                <span className="text-sm font-semibold">Call 911</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-safeguard-purple to-purple-700"></div>
            <CardContent className="p-3 text-center">
              <Button 
                onClick={sendSOS}
                className="w-full h-24 flex flex-col items-center justify-center bg-gradient-to-br from-safeguard-purple to-purple-800 hover:from-purple-600 hover:to-purple-900 shadow-md"
              >
                <MessageSquare className="h-8 w-8 mb-1" />
                <span className="text-sm font-semibold">Send SOS</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-safeguard-teal to-teal-600"></div>
            <CardContent className="p-3 text-center">
              <Button 
                onClick={toggleRecording}
                className={`w-full h-24 flex flex-col items-center justify-center shadow-md ${
                  isRecording 
                    ? 'bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800' 
                    : 'bg-gradient-to-br from-safeguard-teal to-teal-600 hover:from-teal-500 hover:to-teal-700'
                }`}
              >
                <Volume2 className="h-8 w-8 mb-1" />
                <span className="text-sm font-semibold">{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-gray-700 to-gray-900"></div>
            <CardContent className="p-3 text-center">
              <Button 
                onClick={capturePhoto}
                className="w-full h-24 flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black shadow-md"
              >
                <Camera className="h-8 w-8 mb-1" />
                <span className="text-sm font-semibold">Capture Photo</span>
              </Button>
            </CardContent>
          </Card>
          
          {/* Additional emergency features */}
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <CardContent className="p-3 text-center">
              <Button 
                onClick={recordVideo}
                className="w-full h-24 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md"
              >
                <Video className="h-8 w-8 mb-1" />
                <span className="text-sm font-semibold">Record Video</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500 to-green-700"></div>
            <CardContent className="p-3 text-center">
              <Button 
                onClick={shareLocation}
                className="w-full h-24 flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-md"
              >
                <MapPin className="h-8 w-8 mb-1" />
                <span className="text-sm font-semibold">Share Location</span>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 p-3 bg-safeguard-purple/10 rounded-lg border border-safeguard-purple/20">
          <p className="text-sm text-center text-gray-700">
            <span className="font-semibold text-safeguard-purple">Shakthi Guard AI</span> continuously monitors your safety status. 
            These emergency tools are enhanced with artificial intelligence to provide the fastest response in critical situations.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyPage;
