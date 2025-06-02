
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";
import { CreatePanelistData } from "../types/PanelistTypes";

interface CreatePanelistDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePanelistData) => Promise<void>;
}

export const CreatePanelistDrawer: React.FC<CreatePanelistDrawerProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreatePanelistData>({
    panelist_id: '',
    name: '',
    email: '',
    phone: '',
    title: '',
    department: '',
    location: '',
    bio: '',
    seniority_level: 'mid',
    status: 'active',
    availability_status: 'available',
    interview_authorization_level: 'basic',
    skills: [],
    certifications: [],
    languages: [],
    interview_types: [],
    preferred_time_slots: {},
    max_interviews_per_week: 5,
    rating: 0,
    total_interviews: 0,
    feedback_score: 0,
    interviews_converted_to_offers: 0,
    interviews_allocated_per_day: 2,
    projects_worked_on: [],
    tools_used: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Generate unique panelist_id if not provided
      const dataToSubmit = {
        ...formData,
        panelist_id: formData.panelist_id || `PAN-${Date.now()}`
      };
      
      await onSubmit(dataToSubmit);
      
      // Reset form
      setFormData({
        panelist_id: '',
        name: '',
        email: '',
        phone: '',
        title: '',
        department: '',
        location: '',
        bio: '',
        seniority_level: 'mid',
        status: 'active',
        availability_status: 'available',
        interview_authorization_level: 'basic',
        skills: [],
        certifications: [],
        languages: [],
        interview_types: [],
        preferred_time_slots: {},
        max_interviews_per_week: 5,
        rating: 0,
        total_interviews: 0,
        feedback_score: 0,
        interviews_converted_to_offers: 0,
        interviews_allocated_per_day: 2,
        projects_worked_on: [],
        tools_used: []
      });
    } catch (error) {
      console.error('Error creating panelist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Add New Panelist</DrawerTitle>
              <DrawerDescription>
                Create a new interview panelist profile
              </DrawerDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter job title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seniority_level">Seniority Level</Label>
                  <Select value={formData.seniority_level} onValueChange={(value) => handleInputChange('seniority_level', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid-Level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="principal">Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability_status">Availability</Label>
                  <Select value={formData.availability_status} onValueChange={(value) => handleInputChange('availability_status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Enter a brief bio or description"
                  rows={3}
                />
              </div>
            </div>

            {/* Interview Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interview Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max_interviews_per_week">Max Interviews Per Week</Label>
                  <Input
                    id="max_interviews_per_week"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.max_interviews_per_week}
                    onChange={(e) => handleInputChange('max_interviews_per_week', parseInt(e.target.value) || 5)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interviews_allocated_per_day">Max Interviews Per Day</Label>
                  <Input
                    id="interviews_allocated_per_day"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.interviews_allocated_per_day}
                    onChange={(e) => handleInputChange('interviews_allocated_per_day', parseInt(e.target.value) || 2)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Creating...' : 'Create Panelist'}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
