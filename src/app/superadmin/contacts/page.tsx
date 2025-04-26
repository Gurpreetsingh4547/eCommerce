'use client';

import { useState, useEffect } from 'react';
import { getAllContacts, updateContactStatus } from '@/lib/local-data';
import { useToast } from '@/components/ui/use-toast';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  submittedAt: string;
}

export default function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getAllContacts();
      setContacts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contacts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Submissions</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No contact submissions yet</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{contact.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{contact.email}</p>
                  <p className="text-gray-600 dark:text-gray-300">{contact.phone}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    contact.status === 'new' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {contact.status}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(contact.submittedAt)}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                <p className="whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 