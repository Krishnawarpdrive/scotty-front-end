
import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

interface SkillsAssessmentSectionProps {
  skillsAssessment: Record<string, string>;
  onSkillsAssessmentChange: (skill: string, value: string) => void;
}

export const SkillsAssessmentSection: React.FC<SkillsAssessmentSectionProps> = ({
  skillsAssessment,
  onSkillsAssessmentChange
}) => {
  const skills = [
    'JavaScript/TypeScript',
    'React/Frontend',
    'Node.js/Backend',
    'Database Design',
    'System Architecture',
    'Problem Solving'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg border p-6"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Code className="h-5 w-5" />
        Skills Assessment
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill} className="space-y-2">
            <label className="block text-sm font-medium">{skill}</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={skillsAssessment[skill] || ''}
              onChange={(e) => onSkillsAssessmentChange(skill, e.target.value)}
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Beginner</option>
              <option value="2">2 - Basic</option>
              <option value="3">3 - Intermediate</option>
              <option value="4">4 - Advanced</option>
              <option value="5">5 - Expert</option>
            </select>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
