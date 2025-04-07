
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSafety } from '@/contexts/SafetyContext';
import { AlertTriangle, Shield } from 'lucide-react';

const SOSButton = () => {
  const { isEmergencyActive, activateEmergency, deactivateEmergency } = useSafety();
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  const handlePressStart = () => {
    setIsLongPressing(true);
    setPressProgress(0);
    
    // Start progress animation
    let startTime = Date.now();
    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(elapsedTime / 1500 * 100, 100); // 1.5 seconds
      setPressProgress(newProgress);
      
      if (newProgress < 100) {
        const frame = requestAnimationFrame(updateProgress);
        setAnimationFrame(frame);
      }
    };
    
    const frame = requestAnimationFrame(updateProgress);
    setAnimationFrame(frame);
    
    const timer = setTimeout(() => {
      if (!isEmergencyActive) {
        activateEmergency();
      }
      setIsLongPressing(false);
      setPressProgress(0);
    }, 1500); // 1.5 seconds long press
    
    setLongPressTimer(timer);
  };

  const handlePressEnd = () => {
    setIsLongPressing(false);
    setPressProgress(0);
    
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      setAnimationFrame(null);
    }
  };

  const toggleEmergency = () => {
    if (isEmergencyActive) {
      deactivateEmergency();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Outer ring animation */}
        <div className={`absolute inset-0 rounded-full ${
          isEmergencyActive 
            ? 'bg-red-500/20 animate-ping' 
            : (isLongPressing ? 'bg-safeguard-purple/10' : 'bg-transparent')
        }`} style={{
          transform: 'scale(1.2)',
          opacity: isLongPressing ? 0.8 : 0
        }}></div>
        
        {isEmergencyActive ? (
          <Button
            className={`sos-button w-32 h-32 rounded-full bg-gradient-to-br from-safeguard-danger to-red-700 hover:from-red-600 hover:to-red-800 text-white text-lg font-bold shadow-lg shadow-red-500/30
              ${isEmergencyActive ? 'pulse-animation' : ''}`}
            onClick={toggleEmergency}
          >
            <div className="flex flex-col items-center justify-center">
              <AlertTriangle className="h-10 w-10 mb-1" />
              <span>ACTIVE</span>
            </div>
          </Button>
        ) : (
          <div className="relative">
            {/* Progress ring */}
            {isLongPressing && (
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="46" 
                  stroke="rgba(126, 87, 194, 0.3)" 
                  strokeWidth="6" 
                  fill="none" 
                />
                <circle 
                  cx="50" cy="50" r="46" 
                  stroke="#7E57C2" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeDasharray={`${2.9 * Math.PI * 46}`}
                  strokeDashoffset={`${2.9 * Math.PI * 46 * (1 - pressProgress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
            )}
            <Button
              className={`sos-button w-32 h-32 rounded-full bg-gradient-to-br from-safeguard-purple to-safeguard-lightpurple hover:from-purple-600 hover:to-purple-700 text-white text-lg font-bold shadow-lg shadow-purple-500/30
                ${isLongPressing ? 'opacity-90 scale-[0.98]' : ''}`}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
            >
              <div className="flex flex-col items-center justify-center">
                <Shield className="h-10 w-10 mb-2" />
                <span>HOLD FOR<br />SOS</span>
              </div>
            </Button>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
        {isEmergencyActive 
          ? 'Tap to cancel emergency' 
          : 'Hold for 1.5 seconds to activate emergency'}
      </p>
      
      {isLongPressing && !isEmergencyActive && (
        <div className="mt-2">
          <p className="text-xs text-safeguard-purple animate-pulse">
            {pressProgress < 30 ? 'Keep holding...' : 
             pressProgress < 70 ? 'Almost there...' : 
             'About to activate!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
