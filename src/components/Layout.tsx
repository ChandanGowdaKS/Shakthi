
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Phone, User, Map, Settings, AlertTriangle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSafety } from '@/contexts/SafetyContext';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: AlertTriangle, label: 'Emergency', path: '/emergency' },
  { icon: User, label: 'Contacts', path: '/contacts' },
  { icon: Map, label: 'Safe Routes', path: '/routes' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isEmergencyActive } = useSafety();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header branding */}
      <header className="bg-safeguard-purple text-white py-3">
        <div className="container mx-auto flex items-center justify-center">
          <Shield className="h-5 w-5 mr-2" />
          <span className="font-bold text-lg">Shakthi Guard</span>
        </div>
      </header>
      
      {isEmergencyActive && (
        <div className="bg-gradient-to-r from-safeguard-danger to-red-700 text-white py-2 px-4 text-center animate-pulse">
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="font-bold">EMERGENCY MODE ACTIVE</span>
          </div>
        </div>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 bg-gradient-to-b from-white to-purple-50/30">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center">
          {NavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-md transition-colors",
                location.pathname === item.path
                  ? "text-safeguard-purple bg-purple-50"
                  : "text-gray-500 hover:text-safeguard-teal hover:bg-teal-50"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
