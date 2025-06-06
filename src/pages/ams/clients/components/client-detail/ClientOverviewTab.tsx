import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Pencil, Check, X, UserRound, Mail, Phone } from 'lucide-react';
import { Client } from '../../types/ClientTypes';
import { cn } from '@/lib/utils';

interface ClientOverviewTabProps {
  client: Client;
}

const ClientOverviewTab: React.FC<ClientOverviewTabProps> = ({ client }) => {
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>({});
  const [editedValues, setEditedValues] = useState<Record<string, any>>({});

  const toggleEdit = (field: string) => {
    setEditableFields(prev => ({ 
      ...prev, 
      [field]: !prev[field] 
    }));
    
    if (!editableFields[field]) {
      // Initialize with current value when starting edit
      setEditedValues(prev => ({
        ...prev,
        [field]: client[field as keyof Client] || ''
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (field: string) => {
    // Here you would call an API to update the client data
    console.log(`Saving ${field} with value: ${editedValues[field]}`);
    toggleEdit(field);
  };

  // Primary Contact Card
  const PrimaryContactCard = () => (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-section">Primary Contact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 bg-primary/10">
            <span className="text-lg font-bold">
              {client.contact?.charAt(0) || 'C'}
            </span>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-medium">{client.contact || "No contact name"}</h3>
            <div className="flex gap-2 text-sm text-muted-foreground">
              {client.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>{client.email}</span>
                </div>
              )}
              {client.contact && !isNaN(Number(client.contact.replace(/\D/g, ''))) && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{client.contact}</span>
                </div>
              )}
            </div>
          </div>
          <div className="ml-auto">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Primary
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Primary Contact Card */}
      <PrimaryContactCard />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Info Card */}
        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-section">Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <EditableField
                label="Industry"
                value={client.industry || 'Not specified'}
                field="industry"
                isEditing={!!editableFields.industry}
                editedValue={editedValues.industry}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
              
              <EditableField
                label="Number of Employees"
                value={client.totalRequirements || 'Not specified'}
                field="totalRequirements"
                isEditing={!!editableFields.totalRequirements}
                editedValue={editedValues.totalRequirements}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
              
              <EditableField
                label="Headquarters"
                value={client.headquarters || 'Not specified'}
                field="headquarters"
                isEditing={!!editableFields.headquarters}
                editedValue={editedValues.headquarters}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Account Info Card */}
        <Card className="shadow-sm hover:shadow transition-shadow duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-section">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <EditableField
                label="Account Type"
                value={client.accountType || 'Customer'}
                field="accountType"
                isEditing={!!editableFields.accountType}
                editedValue={editedValues.accountType}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
              
              <EditableField
                label="Client Tier"
                value={client.clientTier || 'Standard'}
                field="clientTier"
                isEditing={!!editableFields.clientTier}
                editedValue={editedValues.clientTier}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
              
              <EditableField
                label="Client Owner"
                value={client.assignedHR || 'Not assigned'}
                field="assignedHR"
                isEditing={!!editableFields.assignedHR}
                editedValue={editedValues.assignedHR}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Location Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-section">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EditableField
              label="Country"
              value="United States" // Placeholder
              field="country"
              isEditing={!!editableFields.country}
              editedValue={editedValues.country}
              onToggleEdit={toggleEdit}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
            
            <EditableField
              label="State"
              value="California" // Placeholder
              field="state"
              isEditing={!!editableFields.state}
              editedValue={editedValues.state}
              onToggleEdit={toggleEdit}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
            
            <EditableField
              label="City"
              value="San Francisco" // Placeholder
              field="city"
              isEditing={!!editableFields.city}
              editedValue={editedValues.city}
              onToggleEdit={toggleEdit}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Sourcing & Payment Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-section">Sourcing & Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-body">Sourcing Model</h3>
              <EditableField
                label="Sourcing Type"
                value="Direct" // Placeholder
                field="sourcingType"
                isEditing={!!editableFields.sourcingType}
                editedValue={editedValues.sourcingType}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
              
              <EditableField
                label="Referral Source"
                value="Internal" // Placeholder
                field="referralSource"
                isEditing={!!editableFields.referralSource}
                editedValue={editedValues.referralSource}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-body">Commission</h3>
              <EditableField
                label="Commission %"
                value="10%" // Placeholder
                field="commissionPercentage"
                isEditing={!!editableFields.commissionPercentage}
                editedValue={editedValues.commissionPercentage}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
              
              <EditableField
                label="Payment Terms"
                value="Net 30" // Placeholder
                field="paymentTerms"
                isEditing={!!editableFields.paymentTerms}
                editedValue={editedValues.paymentTerms}
                onToggleEdit={toggleEdit}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notes Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200 mb-10">
        <CardHeader className="pb-3">
          <CardTitle className="text-section">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <EditableField
              label="Client Notes"
              value={client.notes || 'No notes available for this client.'}
              field="notes"
              isEditing={!!editableFields.notes}
              editedValue={editedValues.notes}
              onToggleEdit={toggleEdit}
              onInputChange={handleInputChange}
              onSave={handleSave}
              isTextArea
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for editable fields
interface EditableFieldProps {
  label: string;
  value: string | number;
  field: string;
  isEditing: boolean;
  editedValue: string;
  isTextArea?: boolean;
  onToggleEdit: (field: string) => void;
  onInputChange: (field: string, value: string) => void;
  onSave: (field: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  field,
  isEditing,
  editedValue,
  isTextArea = false,
  onToggleEdit,
  onInputChange,
  onSave
}) => {
  return (
    <div className="space-y-1 group">
      <div className="flex justify-between items-center">
        <Label htmlFor={field} className="text-label font-normal text-muted-foreground">
          {label}
        </Label>
        {!isEditing && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onToggleEdit(field)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Pencil className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex items-center gap-2">
          {isTextArea ? (
            <textarea
              id={field}
              value={editedValue}
              onChange={(e) => onInputChange(field, e.target.value)}
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-body ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
          ) : (
            <Input
              id={field}
              value={editedValue}
              onChange={(e) => onInputChange(field, e.target.value)}
              className="h-8 text-body border-transparent hover:border-input focus:border-primary"
            />
          )}
          <div className="flex gap-1">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => onSave(field)}
              className="h-7 w-7"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => onToggleEdit(field)}
              className="h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-body pt-1">{value}</p>
      )}
    </div>
  );
};

export default ClientOverviewTab;
