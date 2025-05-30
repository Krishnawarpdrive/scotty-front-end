
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { InterviewTemplate } from '../types/InterviewTypes';

interface TemplateSelectionStepProps {
  templates: InterviewTemplate[];
  onTemplateSelect: (template: InterviewTemplate) => void;
}

export const TemplateSelectionStep: React.FC<TemplateSelectionStepProps> = ({
  templates,
  onTemplateSelect
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Interview Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border rounded-lg cursor-pointer hover:border-blue-500"
            onClick={() => onTemplateSelect(template)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{template.name}</h4>
              <Badge variant="outline">{template.interview_type}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {template.duration_minutes}m
              </span>
              <span>{template.questions.length} questions</span>
              <span>{template.required_skills.length} skills</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
