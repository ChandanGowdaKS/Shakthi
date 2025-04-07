
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Geolocation } from '@capacitor/geolocation';

// API service configuration
const API_BASE_URL = 'https://api.shakthiguard.com'; // Replace with your actual API endpoint when deployed

// Define types for our context
type Contact = {
  id: string;
  name: string;
  phone: string;
  email?: string;
};

type SafetyContextType = {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  removeContact: (id: string) => void;
  location: { latitude: number | null; longitude: number | null } | null;
  isEmergencyActive: boolean;
  activateEmergency: () => void;
  deactivateEmergency: () => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  isListening: boolean;
  startVoiceDetection: () => void;
  stopVoiceDetection: () => void;
};

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};

type SafetyProviderProps = {
  children: ReactNode;
};

// Mock API call - in a real app, this would make actual API calls
const sendEmergencyAlert = async (contactIds: string[], location: {latitude: number, longitude: number}) => {
  console.log('Sending emergency alert to backend', {
    url: `${API_BASE_URL}/emergency/alert`,
    method: 'POST',
    body: JSON.stringify({
      contactIds,
      location,
      timestamp: new Date().toISOString()
    })
  });
  
  // Simulating API call success
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

export const SafetyProvider: React.FC<SafetyProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null } | null>(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Load contacts from localStorage on initial render
  useEffect(() => {
    const savedContacts = localStorage.getItem('safetyContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('safetyContacts', JSON.stringify(contacts));
  }, [contacts]);

  // Get current location
  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      return position;
    } catch (error) {
      console.error('Error getting location', error);
      toast.error('Unable to get your location');
      return null;
    }
  };

  // Start tracking location when emergency is activated
  useEffect(() => {
    let watchId: string | undefined;
    
    if (isEmergencyActive) {
      const startLocationTracking = async () => {
        try {
          watchId = await Geolocation.watchPosition(
            { enableHighAccuracy: true },
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            }
          );
        } catch (error) {
          console.error('Error tracking location', error);
        }
      };
      
      startLocationTracking();
    }
    
    return () => {
      if (watchId) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
  }, [isEmergencyActive]);

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: Date.now().toString()
    };
    setContacts(prev => [...prev, newContact]);
    toast.success('Contact added successfully');
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    toast.success('Contact removed');
  };

  const activateEmergency = async () => {
    setIsEmergencyActive(true);
    const position = await getCurrentLocation();
    
    if (position && contacts.length > 0) {
      try {
        // Send emergency alert to the backend
        if (position.coords) {
          const alertSent = await sendEmergencyAlert(
            contacts.map(c => c.id),
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          );
          
          if (alertSent) {
            toast.success('Emergency alert sent to your contacts');
          }
        }
      } catch (error) {
        console.error('Error sending emergency alert', error);
        toast.error('Failed to send emergency alert');
      }
    } else if (contacts.length === 0) {
      toast.error('No emergency contacts configured');
    }
  };

  const deactivateEmergency = () => {
    setIsEmergencyActive(false);
    toast.success('Emergency mode deactivated');
  };

  const startRecording = () => {
    setIsRecording(true);
    toast.success('Recording started');
    // In a real app, this would use native audio recording APIs
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast.success('Recording stopped and saved');
  };

  const startVoiceDetection = () => {
    setIsListening(true);
    toast.success('Voice detection activated');
    // In a real app, this would initialize TensorFlow voice detection
  };

  const stopVoiceDetection = () => {
    setIsListening(false);
    toast.success('Voice detection deactivated');
  };

  const value = {
    contacts,
    addContact,
    removeContact,
    location,
    isEmergencyActive,
    activateEmergency,
    deactivateEmergency,
    isRecording,
    startRecording,
    stopRecording,
    isListening,
    startVoiceDetection,
    stopVoiceDetection
  };

  return <SafetyContext.Provider value={value}>{children}</SafetyContext.Provider>;
};
