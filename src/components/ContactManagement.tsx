
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSafety } from '@/contexts/SafetyContext';
import { Plus, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

const ContactManagement = () => {
  const { contacts, addContact, removeContact } = useSafety();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast.error('Name and phone number are required');
      return;
    }
    
    addContact({ name, phone, email: email.trim() || undefined });
    setName('');
    setPhone('');
    setEmail('');
    setIsAdding(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Emergency Contacts
          {!isAdding && (
            <Button
              size="sm"
              onClick={() => setIsAdding(true)}
              className="bg-safeguard-teal hover:bg-teal-600"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Contact
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAdding ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Contact Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Email (optional)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-safeguard-purple hover:bg-safeguard-lightpurple">
                Save Contact
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : contacts.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No emergency contacts added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <div className="bg-safeguard-purple text-white p-2 rounded-full mr-3">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                    {contact.email && <p className="text-xs text-gray-500">{contact.email}</p>}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeContact(contact.id)}
                  className="text-gray-500 hover:text-safeguard-danger"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactManagement;
