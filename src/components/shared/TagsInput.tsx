
import React, { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsChange,
  placeholder = "Add tags...",
  className = ""
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onTagsChange([...tags, trimmedValue]);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    onTagsChange(newTags);
  };

  return (
    <div className={`flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] ${className}`}>
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1">
          {tag}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => removeTag(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        onBlur={addTag}
        placeholder={placeholder}
        className="border-0 flex-1 min-w-[120px] h-6 p-0 focus-visible:ring-0"
      />
    </div>
  );
};

export default TagsInput;
