import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TagsInput from "@/components/shared/TagsInput";
import { CreatePanelistData } from "../types/PanelistTypes";
import { useToast } from "@/hooks/use-toast";

interface PanelistCreationDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PanelistCreationDrawer: React.FC<PanelistCreationDrawerProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreatePanelistData>({
    panelist_id: `panelist_${Date.now()}`,
    name: '',
    email: '',
    phone: '',
    title: '',
    department: '',
    location: '',
    bio: '',
    seniority_level: 'mid',
    skills: [],
    certifications: [],
    languages: [],
    interview_types: [],
    preferred_time_slots: {},
    max_interviews_per_week: 5,
    interviews_allocated_per_day: 2,
    projects_worked_on: [],
    tools_used: [],
    interview_authorization_level: 'basic'
  });

  const resetForm = () => {
    setFormData({
      panelist_id: `panelist_${Date.now()}`,
      name: '',
      email: '',
      phone: '',
      title: '',
      department: '',
      location: '',
      bio: '',
      seniority_level: 'mid',
      skills: [],
      certifications: [],
      languages: [],
      interview_types: [],
      preferred_time_slots: {},
      max_interviews_per_week: 5,
      interviews_allocated_per_day: 2,
      projects_worked_on: [],
      tools_used: [],
      interview_authorization_level: 'basic'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      // Error handling is done in the onSuccess function
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Panelist</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="seniority">Seniority Level</Label>
            <Select
              value={formData.seniority_level}
              onValueChange={(value) => setFormData(prev => ({ ...prev, seniority_level: value as any }))}
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

          <div>
            <Label>Skills</Label>
            <TagsInput
              tags={formData.skills}
              onTagsChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
              placeholder="Add skills..."
            />
          </div>

          <div>
            <Label>Certifications</Label>
            <TagsInput
              tags={formData.certifications}
              onTagsChange={(certifications) => setFormData(prev => ({ ...prev, certifications }))}
              placeholder="Add certifications..."
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Panelist"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
