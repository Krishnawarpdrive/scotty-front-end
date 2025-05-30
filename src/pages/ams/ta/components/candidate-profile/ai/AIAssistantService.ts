
export interface AIInsight {
  id: string;
  type: 'skill_match' | 'experience_gap' | 'cultural_fit' | 'recommendation' | 'strength' | 'concern' | 'question';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  metadata?: Record<string, any>;
}

export interface FormSuggestion {
  field: string;
  suggestion: string;
  suggestedValue?: string;
  confidence: number;
  reason: string;
  reasoning?: string;
}

export interface ResumeParsingResult {
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  skills: {
    technical: string[];
  };
  experience: {
    previousRoles: Array<{
      company: string;
      role: string;
      duration: string;
      description: string;
    }>;
  };
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
  matchingSkills: string[];
  missingSkills: string[];
  additionalSkills: string[];
  overallMatch: number;
  recommendations: string[];
  recommendedQuestions: string[];
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
        actionable: false,
        priority: 'high',
        category: 'technical'
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
      skills: {
        technical: []
      },
      experience: {
        previousRoles: []
      },
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
      matchingSkills: matchedSkills,
      missingSkills: requiredSkills.filter(skill => !matchedSkills.includes(skill)),
      additionalSkills: candidateSkills.filter((skill: string) => !matchedSkills.includes(skill)),
      overallMatch: matchedSkills.length / requiredSkills.length,
      recommendations: [],
      recommendedQuestions: []
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
