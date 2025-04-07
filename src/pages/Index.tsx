
import React from 'react';
import Layout from '@/components/Layout';
import SOSButton from '@/components/SOSButton';
import VoiceDetection from '@/components/VoiceDetection';
import LocationTracking from '@/components/LocationTracking';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-2">
            <Shield className="h-8 w-8 mr-2 text-safeguard-purple" />
            <h1 className="text-3xl font-bold text-safeguard-purple">Shakthi Guard</h1>
          </div>
          <p className="text-gray-600">AI-powered safety assistant</p>
          <div className="mt-2 inline-flex items-center text-xs text-safeguard-teal">
            <Heart className="h-3 w-3 mr-1" /> 
            <span>Empowering safety through technology</span>
          </div>
        </div>
        
        <div className="flex justify-center py-4">
          <SOSButton />
        </div>
        
        <div className="space-y-4">
          <VoiceDetection />
          
          <Card className="overflow-hidden border-t-4 border-t-safeguard-teal">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-safeguard-purple mb-2">AI Safety Guardian</h2>
              <p className="text-sm text-gray-600 mb-3">
                Our AI system continuously learns from user interactions to improve safety predictions 
                and provide proactive assistance in potentially dangerous situations.
              </p>
              <div className="bg-gradient-to-r from-safeguard-purple/10 to-safeguard-teal/10 p-3 rounded-lg">
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block bg-safeguard-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Voice pattern analysis for distress detection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-safeguard-teal text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Contextual awareness based on location and time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-safeguard-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Multi-language support for global protection</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <LocationTracking />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
