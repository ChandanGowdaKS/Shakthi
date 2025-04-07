
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useSafety } from '@/contexts/SafetyContext';
import { 
  Bell, 
  Volume2, 
  Mic, 
  Shield, 
  ExternalLink, 
  ChevronRight, 
  Info 
} from 'lucide-react';

const SettingsPage = () => {
  const { isListening, startVoiceDetection, stopVoiceDetection } = useSafety();
  const [notifications, setNotifications] = useState(true);
  const [sensitivity, setSensitivity] = useState("medium");
  const [customMessage, setCustomMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSensitivityChange = (value: string) => {
    setSensitivity(value);
    toast.success(`Detection sensitivity set to ${value}`);
  };

  const handleDetectionToggle = (checked: boolean) => {
    if (checked) {
      startVoiceDetection();
    } else {
      stopVoiceDetection();
    }
  };

  const saveCustomMessage = () => {
    if (customMessage.trim()) {
      toast.success('Emergency message updated');
    } else {
      toast.error('Please enter a valid message');
    }
  };

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    // In a real app, this would apply dark mode
    toast.success(`${checked ? 'Dark' : 'Light'} mode activated`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-safeguard-purple">Settings</h1>
          <p className="text-gray-600 text-sm mt-1">
            Customize your SafeGuard experience
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Push Notifications</Label>
                <p className="text-xs text-gray-500">
                  Receive alerts and safety notifications
                </p>
              </div>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="voice-detection">Voice Distress Detection</Label>
                <p className="text-xs text-gray-500">
                  Monitor for distress keywords
                </p>
              </div>
              <Switch 
                id="voice-detection" 
                checked={isListening} 
                onCheckedChange={handleDetectionToggle} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Safety Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sensitivity">Detection Sensitivity</Label>
              <Select value={sensitivity} onValueChange={handleSensitivityChange}>
                <SelectTrigger id="sensitivity">
                  <SelectValue placeholder="Select sensitivity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Higher sensitivity may result in more false alarms
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-message">Custom Emergency Message</Label>
              <Input
                id="custom-message"
                placeholder="e.g., I need help, please check on me"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
              <Button 
                size="sm" 
                onClick={saveCustomMessage}
                className="mt-2 bg-safeguard-purple hover:bg-safeguard-lightpurple"
              >
                Save Message
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Info className="h-5 w-5 mr-2" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-xs text-gray-500">
                  Use dark theme for low light conditions
                </p>
              </div>
              <Switch 
                id="dark-mode" 
                checked={darkMode} 
                onCheckedChange={toggleDarkMode} 
              />
            </div>
            
            <div className="border-t pt-3">
              <Button 
                variant="link" 
                className="w-full justify-between text-safeguard-purple p-0 h-auto"
                onClick={() => toast.info('Version 1.0.0')}
              >
                <span>About SafeGuard</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="link" 
                className="w-full justify-between text-safeguard-purple p-0 h-auto mt-2"
                onClick={() => window.open('https://safeguard-privacy.example.com', '_blank')}
              >
                <span>Privacy Policy</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;
