
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TagsInput } from "@/components/shared/TagsInput";
import { CreatePanelistData } from "../types/PanelistTypes";
import { useToast } from "@/hooks/use-toast";

interface PanelistCreationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreatePanelistData) => Promise<any>;
}

export const PanelistCreationDrawer: React.FC<PanelistCreationDrawerProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CreatePanelistData>({
    name: "",
    email: "",
    phone: "",
    title: "",
    department: "",
    location: "",
    bio: "",
    seniority_level: "mid",
    skills: [],
    certifications: [],
    languages: [],
    interview_types: [],
    preferred_time_slots: {},
    max_interviews_per_week: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.title || !formData.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onCreate(formData);
      onClose();
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        title: "",
        department: "",
        location: "",
        bio: "",
        seniority_level: "mid",
        skills: [],
        certifications: [],
        languages: [],
        interview_types: [],
        preferred_time_slots: {},
        max_interviews_per_week: 5
      });
    } catch (error) {
      // Error is handled in the onCreate function
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreatePanelistData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Interview Panelist</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1-555-0123"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Senior Software Engineer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleInputChange('department', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seniority">Seniority Level</Label>
                <Select
                  value={formData.seniority_level}
                  onValueChange={(value: any) => handleInputChange('seniority_level', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_interviews">Max Interviews per Week</Label>
                <Input
                  id="max_interviews"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.max_interviews_per_week}
                  onChange={(e) => handleInputChange('max_interviews_per_week', parseInt(e.target.value) || 5)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Brief professional background and expertise..."
                rows={3}
              />
            </div>
          </div>

          {/* Skills and Expertise */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills and Expertise</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Technical Skills</Label>
                <TagsInput
                  tags={formData.skills}
                  onTagsChange={(tags) => handleInputChange('skills', tags)}
                  placeholder="Add technical skills..."
                />
              </div>

              <div className="space-y-2">
                <Label>Interview Types</Label>
                <TagsInput
                  tags={formData.interview_types}
                  onTagsChange={(tags) => handleInputChange('interview_types', tags)}
                  placeholder="e.g., Technical, Behavioral, System Design..."
                />
              </div>

              <div className="space-y-2">
                <Label>Certifications</Label>
                <TagsInput
                  tags={formData.certifications}
                  onTagsChange={(tags) => handleInputChange('certifications', tags)}
                  placeholder="Add certifications..."
                />
              </div>

              <div className="space-y-2">
                <Label>Languages</Label>
                <TagsInput
                  tags={formData.languages}
                  onTagsChange={(tags) => handleInputChange('languages', tags)}
                  placeholder="e.g., English, Spanish, Mandarin..."
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Panelist"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
