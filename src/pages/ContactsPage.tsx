
import React from 'react';
import Layout from '@/components/Layout';
import ContactManagement from '@/components/ContactManagement';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactsPage = () => {
  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SafeGuard - AI Safety App',
          text: 'Check out SafeGuard, an AI-powered safety app that can help you stay safe!',
          url: window.location.origin
        });
        toast.success('App shared successfully');
      } catch (error) {
        console.error('Error sharing app', error);
        toast.error('Failed to share the app');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(`Check out SafeGuard, an AI-powered safety app: ${window.location.origin}`);
        toast.success('Link copied to clipboard');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-safeguard-purple">My Contacts</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your trusted contacts for emergencies
          </p>
        </div>
        
        <div className="flex justify-center">
          <ContactManagement />
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-3">Safety Resources</h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <p className="text-sm text-gray-600">
              SafeGuard works best when your emergency contacts also have the app installed.
              Share it with your trusted contacts.
            </p>
            <Button
              onClick={shareApp}
              variant="outline"
              className="w-full flex items-center gap-2 justify-center"
            >
              <Share2 className="h-4 w-4" />
              Share SafeGuard with Contacts
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Emergency Services</h3>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Emergency (Police, Fire, Medical)</span>
                <a href="tel:911" className="text-safeguard-purple">911</a>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>National Domestic Violence Hotline</span>
                <a href="tel:18007997233" className="text-safeguard-purple">1-800-799-7233</a>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Crisis Text Line</span>
                <span className="text-safeguard-purple">Text HOME to 741741</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;
