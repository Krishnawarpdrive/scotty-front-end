
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupportTicket } from '@/types/ProfileTypes';

interface SupportContextType {
  tickets: SupportTicket[];
  submitTicket: (ticket: Omit<SupportTicket, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTicket: (id: string, updates: Partial<SupportTicket>) => Promise<void>;
  searchArticles: (query: string) => Promise<any[]>;
  isLoading: boolean;
  error: string | null;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const useSupportContext = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupportContext must be used within a SupportProvider');
  }
  return context;
};

interface SupportProviderProps {
  children: ReactNode;
}

export const SupportProvider: React.FC<SupportProviderProps> = ({ children }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTicket = async (ticketData: Omit<SupportTicket, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTicket: SupportTicket = {
        ...ticketData,
        id: `TK-${Date.now()}`,
        status: 'open',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setTickets(prev => [newTicket, ...prev]);
    } catch (err) {
      setError('Failed to submit ticket');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicket = async (id: string, updates: Partial<SupportTicket>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === id 
            ? { ...ticket, ...updates, updated_at: new Date().toISOString() }
            : ticket
        )
      );
    } catch (err) {
      setError('Failed to update ticket');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const searchArticles = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call for article search
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock search results
      return [
        {
          id: '1',
          title: `How to ${query}`,
          content: 'This is a sample article content...',
          category: 'Getting Started',
          helpful: 85
        }
      ];
    } catch (err) {
      setError('Failed to search articles');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: SupportContextType = {
    tickets,
    submitTicket,
    updateTicket,
    searchArticles,
    isLoading,
    error
  };

  return (
    <SupportContext.Provider value={contextValue}>
      {children}
    </SupportContext.Provider>
  );
};
