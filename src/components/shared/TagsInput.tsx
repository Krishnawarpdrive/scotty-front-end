
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  variant?: "outline" | "secondary";
  className?: string;
  helpText?: string;
  emptyMessage?: string;
}

/**
 * A reusable component for managing tags
 */
export const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsChange,
  placeholder = "Add a tag",
  label = "Tags",
  variant = "outline",
  className = "",
  helpText,
  emptyMessage = "No tags added yet"
}) => {
  const [newTag, setNewTag] = useState('');
  
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onTagsChange([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    onTagsChange(tags.filter(t => t !== tag));
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input 
          placeholder={placeholder} 
          value={newTag} 
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={handleAddTag}
          variant="outline"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(tag => (
          <Badge key={tag} variant={variant} className="flex items-center gap-1 py-1">
            {tag}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => handleRemoveTag(tag)}
            />
          </Badge>
        ))}
        {tags.length === 0 && (
          <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>
        )}
      </div>
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  );
};

export default TagsInput;
