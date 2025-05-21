
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import ClientAccountDrawer from './components/ClientAccountDrawer';

const ClientAccountCreationPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  // Handle drawer close
  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      // Navigate back to clients page when drawer is closed
      navigate('/ams/clients');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4" 
          onClick={() => navigate('/ams/clients')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
        <h1 className="text-3xl font-bold">Add Client Account</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">You're currently in the process of adding a new client account. Please complete the form in the drawer.</p>
          
          <Button onClick={() => setDrawerOpen(true)}>
            {drawerOpen ? 'Focus on Form' : 'Open Form Drawer'}
          </Button>
        </CardContent>
      </Card>

      <ClientAccountDrawer 
        open={drawerOpen} 
        onOpenChange={handleDrawerOpenChange} 
      />
    </div>
  );
};

export default ClientAccountCreationPage;
