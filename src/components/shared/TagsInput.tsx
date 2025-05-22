
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  variant?: "default" | "secondary" | "outline";
  emptyMessage?: string;
  helpText?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsChange,
  label = "Tags",
  placeholder = "Add a tag",
  variant = "default",
  emptyMessage = "No tags added yet",
  helpText
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: string; name: string }[]>([]);
  const [availableTags, setAvailableTags] = useState<{ id: string; name: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Fetch available tags from Supabase
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('id, name');
        
        if (error) throw error;
        
        setAvailableTags(data || []);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    
    fetchTags();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length > 0) {
      // Filter existing tags that match the input
      const filtered = availableTags.filter(
        tag => 
          tag.name.toLowerCase().includes(value.toLowerCase()) && 
          !tags.includes(tag.id)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      
      // If the tag already exists in available tags, use that
      const existingTag = availableTags.find(
        tag => tag.name.toLowerCase() === inputValue.toLowerCase()
      );
      
      if (existingTag) {
        if (!tags.includes(existingTag.id)) {
          onTagsChange([...tags, existingTag.id]);
        }
      } else {
        // Create new tag in the database
        try {
          const { data, error } = await supabase
            .from('tags')
            .insert([{ name: inputValue.trim() }])
            .select();
          
          if (error) throw error;
          
          if (data && data[0]) {
            // Add the new tag to available tags
            setAvailableTags([...availableTags, data[0]]);
            // Add the new tag to selected tags
            onTagsChange([...tags, data[0].id]);
          }
        } catch (error) {
          console.error('Error creating tag:', error);
        }
      }
      
      setInputValue("");
      setSuggestions([]);
      setShowSuggestions(false);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      // Remove the last tag when backspace is pressed on empty input
      const newTags = [...tags];
      newTags.pop();
      onTagsChange(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const selectSuggestion = (tag: { id: string; name: string }) => {
    if (!tags.includes(tag.id)) {
      onTagsChange([...tags, tag.id]);
    }
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Find tag names for the tag IDs
  const tagNames = tags.map(tagId => {
    const tag = availableTags.find(t => t.id === tagId);
    return tag ? tag.name : tagId;
  });

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      
      <div className="relative">
        <div 
          className={cn(
            "flex flex-wrap gap-2 p-2 border rounded-md min-h-[80px]",
            tags.length === 0 && "items-center"
          )}
        >
          {tags.length > 0 ? (
            <>
              {tags.map((tagId, index) => {
                const tagName = tagNames[index];
                return (
                  <Badge 
                    key={tagId} 
                    variant={variant}
                    className="flex items-center gap-1 py-1 px-2"
                  >
                    {tagName}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tagId)}
                    />
                  </Badge>
                );
              })}
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 min-w-[120px] border-none p-0 pl-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </>
          ) : (
            <>
              <span className="text-muted-foreground text-sm">
                {emptyMessage}
              </span>
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 min-w-[120px] border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </>
          )}
        </div>
        
        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-md z-10 max-h-40 overflow-y-auto">
            {suggestions.map(tag => (
              <div
                key={tag.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => selectSuggestion(tag)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};

export default TagsInput;
