
import { useState, useEffect, useMemo } from 'react';
import { Client } from '../types/ClientTypes';
import { clientsData } from '../data/clientsData';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClients(clientsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = useMemo(() => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTier) {
      filtered = filtered.filter(client => client.client_tier === selectedTier);
    }

    if (selectedStatus) {
      filtered = filtered.filter(client => client.status === selectedStatus);
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];
        
        if (sortConfig.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [clients, searchTerm, selectedTier, selectedStatus, sortConfig]);

  const totalPages = Math.ceil(filteredClients.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + pageSize);

  const pagination: Pagination = {
    currentPage,
    totalPages,
    pageSize,
    totalItems: filteredClients.length
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    clients: paginatedClients,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedTier,
    setSelectedTier,
    selectedStatus,
    setSelectedStatus,
    sortConfig,
    setSortConfig,
    filteredClients: paginatedClients,
    pagination,
    handlePageChange
  };
};
