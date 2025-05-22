
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import ClientAccountDrawer from './components/ClientAccountDrawer';

const ClientAccountCreationPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [justCreatedClient, setJustCreatedClient] = useState<any>(null);
  const navigate = useNavigate();

  // Handle drawer close
  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open);
    if (!open && !justCreatedClient) {
      // Navigate back to clients page when drawer is closed without creating
      navigate('/ams/clients');
    }
  };

  // Handle successful client creation
  const handleClientCreated = (client: any) => {
    setJustCreatedClient(client);
    
    // Store client in local storage for persistence
    try {
      const existingClients = localStorage.getItem('amsClients');
      let clientsArray = [];
      
      if (existingClients) {
        clientsArray = JSON.parse(existingClients);
      }
      
      clientsArray.push(client);
      localStorage.setItem('amsClients', JSON.stringify(clientsArray));
    } catch (err) {
      console.error("Error storing client in local storage:", err);
    }
  };

  // Handle view client details
  const handleViewClient = () => {
    if (justCreatedClient) {
      setDrawerOpen(false);
      navigate(`/ams/clients/${justCreatedClient.id}`);
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
          
          {justCreatedClient ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Client {justCreatedClient.name} created successfully!
              </h3>
              <div className="flex gap-4 justify-center mt-4">
                <Button onClick={handleViewClient} variant="default">
                  View Client Details
                </Button>
                <Button 
                  onClick={() => navigate('/ams/roles/create', { 
                    state: { 
                      clientId: justCreatedClient.id,
                      clientName: justCreatedClient.name 
                    } 
                  })} 
                  variant="outline"
                >
                  Create Role
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setDrawerOpen(true)}>
              {drawerOpen ? 'Focus on Form' : 'Open Form Drawer'}
            </Button>
          )}
        </CardContent>
      </Card>

      <ClientAccountDrawer 
        open={drawerOpen} 
        onOpenChange={handleDrawerOpenChange}
        onClientCreated={handleClientCreated}
      />
    </div>
  );
};

export default ClientAccountCreationPage;
