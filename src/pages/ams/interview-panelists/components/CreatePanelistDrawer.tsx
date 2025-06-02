
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
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
  const [formData, setFormData] = useState<CreatePanelistData>({
    panelist_id: "",
    name: "",
    email: "",
    phone: "",
    title: "",
    department: "",
    location: "",
    bio: "",
    status: "active",
    availability_status: "available",
    seniority_level: "mid",
    skills: [],
    certifications: [],
    languages: [],
    interview_types: [],
    preferred_time_slots: {},
    max_interviews_per_week: 5,
    interviews_allocated_per_day: 2,
    projects_worked_on: [],
    tools_used: [],
    interview_authorization_level: "basic",
    timezone: "UTC",
    years_experience: 0
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CreatePanelistData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (currentLanguage.trim() && !formData.languages.includes(currentLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, currentLanguage.trim()]
      }));
      setCurrentLanguage("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        panelist_id: "",
        name: "",
        email: "",
        phone: "",
        title: "",
        department: "",
        location: "",
        bio: "",
        status: "active",
        availability_status: "available",
        seniority_level: "mid",
        skills: [],
        certifications: [],
        languages: [],
        interview_types: [],
        preferred_time_slots: {},
        max_interviews_per_week: 5,
        interviews_allocated_per_day: 2,
        projects_worked_on: [],
        tools_used: [],
        interview_authorization_level: "basic",
        timezone: "UTC",
        years_experience: 0
      });
    } catch (error) {
      console.error('Error creating panelist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Add New Interview Panelist</DrawerTitle>
              <DrawerDescription>
                Create a new interview panelist profile
              </DrawerDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
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

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter job title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
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
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  value={formData.years_experience}
                  onChange={(e) => handleInputChange('years_experience', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'active' | 'inactive' | 'on_leave') => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on_leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="availability_status">Availability</Label>
                <Select value={formData.availability_status} onValueChange={(value: 'available' | 'busy' | 'unavailable') => handleInputChange('availability_status', value)}>
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
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills & Expertise</h3>
            
            <div>
              <Label htmlFor="currentSkill">Add Skills</Label>
              <div className="flex space-x-2">
                <Input
                  id="currentSkill"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Enter a skill"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Languages</h3>
            
            <div>
              <Label htmlFor="currentLanguage">Add Languages</Label>
              <div className="flex space-x-2">
                <Input
                  id="currentLanguage"
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  placeholder="Enter a language"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                />
                <Button type="button" onClick={addLanguage} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.languages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {language}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeLanguage(language)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                  <SelectItem value="CST">Central Time (CST)</SelectItem>
                  <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                  <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                  <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                  <SelectItem value="CET">Central European Time (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Panelist'}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
