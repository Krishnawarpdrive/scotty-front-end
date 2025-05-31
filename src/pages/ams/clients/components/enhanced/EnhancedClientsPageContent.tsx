
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedClientsTable } from './EnhancedClientsTable';
import { useClients } from '../../hooks/useClients';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import { Plus, Download, Filter, Building2, Users, DollarSign, Activity } from 'lucide-react';
import { UnifiedClient } from '@/data/unified-types';

export function EnhancedClientsPageContent() {
  const { clients, loading, refetch } = useClients();
  const toast = useEnhancedToast();

  const handleViewDetails = (client: UnifiedClient) => {
    console.log('View client details:', client);
    toast.info({
      title: 'Client Details',
      description: `Opening details for ${client.name}`
    });
  };

  const handleEditClient = (client: UnifiedClient) => {
    console.log('Edit client:', client);
    toast.info({
      title: 'Edit Client',
      description: `Opening edit form for ${client.name}`
    });
  };

  const handleCreateRequirement = (client: UnifiedClient) => {
    console.log('Create requirement for client:', client);
    toast.info({
      title: 'New Requirement',
      description: `Creating new requirement for ${client.name}`
    });
  };

  const handleExportClients = (clientList: UnifiedClient[]) => {
    console.log('Export clients:', clientList);
    // Implement CSV export logic
    const csvData = clientList.map(client => ({
      Name: client.name,
      Email: client.email || '',
      Status: client.status,
      'Hiring Status': client.hiring_status,
      'Total Requirements': client.total_requirements,
      'Budget Utilized': client.budget_utilized,
      'Health Score': client.health_score || '',
      'Assigned HR': client.assigned_hr || '',
      'Last Activity': client.last_activity_date
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate dashboard metrics
  const metrics = React.useMemo(() => {
    if (!clients.length) return { active: 0, hiring: 0, totalBudget: 0, totalRequirements: 0 };
    
    return {
      active: clients.filter(c => c.status === 'Active').length,
      hiring: clients.filter(c => c.hiring_status === 'Active').length,
      totalBudget: clients.reduce((sum, c) => sum + c.budget_utilized, 0),
      totalRequirements: clients.reduce((sum, c) => sum + c.total_requirements, 0)
    };
  }, [clients]);

  const pageActions = (
    <>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Advanced Filters
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportClients(clients)}>
        <Download className="h-4 w-4 mr-2" />
        Export All
      </Button>
      <Button size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Client
      </Button>
    </>
  );

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Client Management"
        subtitle="Track and manage your client relationships, requirements, and engagement"
        actions={pageActions}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.active}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actively Hiring</p>
                <p className="text-2xl font-bold text-green-600">{metrics.hiring}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requirements</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.totalRequirements}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-yellow-600">${metrics.totalBudget.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Clients Table */}
      <EnhancedClientsTable
        clients={clients}
        loading={loading}
        onRefresh={refetch}
        onViewDetails={handleViewDetails}
        onEditClient={handleEditClient}
        onCreateRequirement={handleCreateRequirement}
        onExportClients={handleExportClients}
      />
    </motion.div>
  );
}
