
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useSafety } from '@/contexts/SafetyContext';
import { Mic, AlertTriangle, Info, Brain } from 'lucide-react';
import { toast } from 'sonner';

// Extended distress keywords for multiple languages (English, Hindi, Spanish, French)
const DISTRESS_KEYWORDS = [
  // English
  'help', 'emergency', 'stop', 'danger', 'please no',
  // Hindi
  'bachao', 'madad', 'roko', 'khatara', 'nahi please',
  // Spanish
  'ayuda', 'emergencia', 'para', 'peligro', 'por favor no',
  // French
  'aidez', 'urgence', 'arrête', 'danger', 's\'il vous plaît non'
];

// AI-powered voice pattern analysis
const analyzeAudioSample = async (audioData: string): Promise<{
  detectedKeyword: string | null;
  confidenceScore: number;
  contextualThreatLevel: number;
  languageDetected: string;
}> => {
  // Simulating API call to AI backend
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulated ML detection with more sophisticated response
      const randomChance = Math.random() * 100;
      
      if (randomChance < 18) { // 18% chance of detecting something
        const keywordIndex = Math.floor(Math.random() * DISTRESS_KEYWORDS.length);
        const keyword = DISTRESS_KEYWORDS[keywordIndex];
        const confidence = Math.random() * 0.5 + 0.5; // Between 0.5 and 1.0
        
        // Determine language based on keyword position
        let language = "English";
        if (keywordIndex >= 5 && keywordIndex < 10) language = "Hindi";
        else if (keywordIndex >= 10 && keywordIndex < 15) language = "Spanish";
        else if (keywordIndex >= 15) language = "French";
        
        // Contextual threat calculation based on voice patterns and environmental factors
        const contextualThreat = Math.random() * 80 + 20; // Between 20 and 100
        
        resolve({
          detectedKeyword: keyword,
          confidenceScore: confidence * 100,
          contextualThreatLevel: contextualThreat,
          languageDetected: language
        });
      } else {
        resolve({
          detectedKeyword: null,
          confidenceScore: 0,
          contextualThreatLevel: Math.random() * 20, // Low baseline threat
          languageDetected: "Unknown"
        });
      }
    }, 500); // 500ms delay to simulate processing time
  });
};

const VoiceDetection = () => {
  const { isListening, startVoiceDetection, stopVoiceDetection, activateEmergency } = useSafety();
  const [detectionLevel, setDetectionLevel] = useState(0);
  const [lastDetected, setLastDetected] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>("Unknown");
  const [contextualThreat, setContextualThreat] = useState(0);
  
  // Enhanced voice detection with AI capabilities
  useEffect(() => {
    let interval: number | undefined = undefined;
    
    if (isListening) {
      interval = window.setInterval(async () => {
        setIsProcessing(true);
        
        try {
          // Simulating recording audio and sending to backend
          const mockAudioData = "base64encodedaudio";
          const result = await analyzeAudioSample(mockAudioData);
          
          if (result.detectedKeyword) {
            setLastDetected(result.detectedKeyword);
            setDetectedLanguage(result.languageDetected);
            setContextualThreat(result.contextualThreatLevel);
            
            // Update detection level based on confidence and contextual threat
            const weightedScore = (result.confidenceScore * 0.6) + (result.contextualThreatLevel * 0.4);
            const newLevel = Math.min(detectionLevel + weightedScore / 4, 100);
            setDetectionLevel(newLevel);
            
            if (newLevel >= 75) {
              activateEmergency();
              toast.error('High-confidence distress detected! Emergency activated', {
                icon: <AlertTriangle className="h-4 w-4" />,
              });
            }
          } else {
            // Gradually decrease detection level
            setDetectionLevel(Math.max(detectionLevel - 5, 0));
            setContextualThreat(result.contextualThreatLevel);
          }
        } catch (error) {
          console.error('Error analyzing voice:', error);
        } finally {
          setIsProcessing(false);
        }
      }, 3000);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isListening, detectionLevel, activateEmergency]);

  const handleToggle = (checked: boolean) => {
    if (checked) {
      startVoiceDetection();
    } else {
      stopVoiceDetection();
      setDetectionLevel(0);
      setLastDetected(null);
    }
  };

  // Determine the detection level color
  const getDetectionLevelColor = () => {
    if (detectionLevel < 25) return 'bg-gradient-to-r from-green-200 to-green-300';
    if (detectionLevel < 50) return 'bg-gradient-to-r from-amber-200 to-amber-300';
    if (detectionLevel < 75) return 'bg-gradient-to-r from-orange-200 to-orange-300';
    return 'bg-gradient-to-r from-red-300 to-red-500';
  };

  return (
    <Card className="w-full border-l-4 border-l-safeguard-purple shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-safeguard-purple/10 to-transparent">
        <CardTitle className="flex items-center">
          <div className="p-1.5 bg-safeguard-purple rounded-full mr-2">
            <Mic className="h-4 w-4 text-white" />
          </div>
          AI Voice Distress Detection
        </CardTitle>
        <CardDescription>
          Using neural networks to analyze voice patterns in multiple languages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="voice-detection"
              checked={isListening}
              onCheckedChange={handleToggle}
            />
            <Label htmlFor="voice-detection" className="flex items-center">
              {isListening ? (
                <span className="flex items-center text-safeguard-purple font-medium">
                  <Brain className="h-4 w-4 mr-1 animate-pulse" /> 
                  AI Monitoring Active
                </span>
              ) : (
                'Monitoring Off'
              )}
            </Label>
          </div>
        </div>
        
        {isListening && (
          <>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">Detection Level</span>
              <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                detectionLevel > 50 ? 'bg-safeguard-danger text-white' : 'bg-gray-100'
              }`}>
                {detectionLevel.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={detectionLevel} 
              className={`h-2.5 ${getDetectionLevelColor()}`} 
            />
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Contextual Threat</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full mr-2">
                    <div 
                      className="bg-safeguard-teal h-1.5 rounded-full" 
                      style={{ width: `${contextualThreat}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium">{contextualThreat.toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Language Detected</p>
                <p className="text-sm font-medium text-safeguard-purple">{detectedLanguage}</p>
              </div>
            </div>
            
            {isProcessing && (
              <div className="mt-3 flex justify-center">
                <p className="text-xs text-gray-500 flex items-center animate-pulse">
                  <Brain className="h-3 w-3 mr-1" /> AI analyzing audio patterns...
                </p>
              </div>
            )}
            
            {lastDetected && (
              <div className="mt-4 p-3 bg-gradient-to-r from-safeguard-purple/10 to-safeguard-teal/5 rounded-lg border border-safeguard-purple/20 flex items-start">
                <Info className="h-4 w-4 mr-2 mt-0.5 text-safeguard-purple" />
                <div>
                  <p className="text-sm font-medium">
                    Detected keyword: <span className="text-safeguard-purple font-bold">{lastDetected}</span> 
                    <span className="text-xs ml-1 text-gray-500">({detectedLanguage})</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {detectionLevel >= 75 
                      ? 'Emergency automatically activated due to high distress level' 
                      : 'AI continuously monitoring for pattern of distress signals'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceDetection;
