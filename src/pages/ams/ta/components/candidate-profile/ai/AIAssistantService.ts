
export interface AIInsight {
  id: string;
  type: 'skill_match' | 'experience_gap' | 'cultural_fit' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  metadata?: Record<string, any>;
}

export interface FormSuggestion {
  field: string;
  suggestion: string;
  confidence: number;
  reason: string;
}

export interface ResumeParsingResult {
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  certifications: string[];
  summary: string;
}

export interface SkillGapAnalysis {
  requiredSkills: string[];
  candidateSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  additionalSkills: string[];
  overallMatch: number;
  recommendations: string[];
}

export const aiAssistant = {
  async generateInsights(candidateData: any, roleData: any): Promise<AIInsight[]> {
    // Mock implementation - replace with actual AI service
    return [
      {
        id: '1',
        type: 'skill_match',
        title: 'Strong Technical Skills Match',
        description: 'Candidate has 85% of required technical skills',
        confidence: 0.85,
        actionable: false
      }
    ];
  },

  async parseResume(resumeText: string): Promise<ResumeParsingResult> {
    // Mock implementation - replace with actual parsing service
    return {
      personalInfo: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      skills: [],
      experience: [],
      education: [],
      certifications: [],
      summary: ''
    };
  },

  async analyzeSkillGap(candidate: any, requiredSkills: string[]): Promise<SkillGapAnalysis> {
    const candidateSkills = candidate.skills || [];
    const matchedSkills = candidateSkills.filter((skill: string) => 
      requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    );
    
    return {
      requiredSkills,
      candidateSkills,
      matchedSkills,
      missingSkills: requiredSkills.filter(skill => !matchedSkills.includes(skill)),
      additionalSkills: candidateSkills.filter((skill: string) => !matchedSkills.includes(skill)),
      overallMatch: matchedSkills.length / requiredSkills.length,
      recommendations: []
    };
  },

  async generateFormSuggestions(candidate: any, resumeData?: ResumeParsingResult): Promise<FormSuggestion[]> {
    // Mock implementation
    return [];
  },

  async generateAIInsights(candidate: any, formData: any, roleRequirements?: string[]): Promise<AIInsight[]> {
    return this.generateInsights(candidate, { requirements: roleRequirements });
  }
};
