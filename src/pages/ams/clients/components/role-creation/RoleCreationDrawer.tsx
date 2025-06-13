
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SideDrawer } from "@/components/ui/side-drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Building, 
  Briefcase, 
  Users, 
  Calendar,
  DollarSign,
  MapPin,
  Clock
} from "lucide-react";

interface RoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
  onRoleCreated: (roleData: any) => void;
}

const RoleCreationDrawer: React.FC<RoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  clientId,
  clientName,
  onRoleCreated
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    roleName: '',
    department: '',
    workMode: '',
    employmentType: '',
    experienceLevel: '',
    vacancies: 1,
    budget: '',
    location: '',
    urgency: 'medium',
    description: '',
    requirements: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateRole = () => {
    if (!formData.roleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }

    const roleData = {
      ...formData,
      clientId,
      clientName,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    onRoleCreated(roleData);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      roleName: '',
      department: '',
      workMode: '',
      employmentType: '',
      experienceLevel: '',
      vacancies: 1,
      budget: '',
      location: '',
      urgency: 'medium',
      description: '',
      requirements: ''
    });
  };

  const footerContent = (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
      <Button onClick={handleCreateRole}>
        Create Role
      </Button>
    </div>
  );

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Role"
      description={`Create a new role for ${clientName}`}
      size="xl"
      footer={footerContent}
    >
      <div className="p-6 space-y-6">
        {/* Client Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{clientName}</p>
                <p className="text-sm text-gray-600">Client ID: {clientId}</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Basic Role Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Role Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Role Name *</label>
              <Input
                placeholder="e.g., Senior Software Engineer"
                value={formData.roleName}
                onChange={(e) => handleInputChange('roleName', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Department</label>
                <Select onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Work Mode</label>
                <Select onValueChange={(value) => handleInputChange('workMode', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Employment Type</label>
                <Select onValueChange={(value) => handleInputChange('employmentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="intern">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <Select onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                    <SelectItem value="lead">Lead Level (8+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements & Budget */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Requirements & Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Vacancies
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.vacancies}
                  onChange={(e) => handleInputChange('vacancies', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Budget Range
                </label>
                <Input
                  placeholder="e.g., $80k-120k"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Urgency
                </label>
                <Select 
                  value={formData.urgency}
                  onValueChange={(value) => handleInputChange('urgency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <Input
                placeholder="e.g., San Francisco, CA or Global"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Role Description */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Role Description</label>
              <Textarea
                placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Requirements & Skills</label>
              <Textarea
                placeholder="List the required skills, qualifications, and experience..."
                className="min-h-[100px]"
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </SideDrawer>
  );
};

export default RoleCreationDrawer;
