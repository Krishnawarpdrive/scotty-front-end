
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TagsInput from "@/components/shared/TagsInput";
import { CreatePanelistData } from "../../../types/PanelistTypes";

interface ProfessionalInfoSectionProps {
  formData: CreatePanelistData;
  onUpdate: (field: keyof CreatePanelistData, value: any) => void;
}

export const ProfessionalInfoSection: React.FC<ProfessionalInfoSectionProps> = ({
  formData,
  onUpdate
}) => {
  return (
    <>
      <div>
        <Label htmlFor="seniority">Seniority Level</Label>
        <Select
          value={formData.seniority_level}
          onValueChange={(value) => onUpdate('seniority_level', value as any)}
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
          onTagsChange={(skills) => onUpdate('skills', skills)}
          placeholder="Add skills..."
        />
      </div>

      <div>
        <Label>Certifications</Label>
        <TagsInput
          tags={formData.certifications}
          onTagsChange={(certifications) => onUpdate('certifications', certifications)}
          placeholder="Add certifications..."
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => onUpdate('bio', e.target.value)}
          rows={3}
        />
      </div>
    </>
  );
};
