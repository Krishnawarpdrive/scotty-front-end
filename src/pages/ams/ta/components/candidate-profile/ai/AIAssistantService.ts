
// Types for AI Assistant functionality
export interface ResumeParsingResult {
  extractedData: {
    name: string;
    email: string;
    skills: string[];
    experience: string;
    education?: string[];
    certifications?: string[];
    projects?: string[];
  };
  confidence: number;
}

export interface SkillGapAnalysis {
  overallMatch: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendedQuestions: string[];
}

export interface FormSuggestion {
  field: string;
  suggestedValue: string;
  reasoning: string;
  confidence: number;
}

export interface AIInsight {
  type: 'strength' | 'concern' | 'question' | 'recommendation';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

// Mock AI Assistant Service for demonstration
export class AIAssistantService {
  static async analyzeCandidate(candidateData: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      strengths: ['Strong technical background', 'Good communication skills'],
      weaknesses: ['Limited experience in specific domain'],
      recommendations: ['Consider for technical interview', 'Assess domain knowledge'],
      fitScore: 85
    };
  }

  static async generateInterviewQuestions(role: string, skills: string[]) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      'Tell me about your experience with React',
      'How do you handle state management?',
      'Describe a challenging project you worked on'
    ];
  }

  static async suggestSkillGaps(candidateSkills: string[], requiredSkills: string[]) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const gaps = requiredSkills.filter(skill => 
      !candidateSkills.some(candidateSkill => 
        candidateSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    return {
      gaps,
      recommendations: gaps.map(gap => `Consider training in ${gap}`)
    };
  }

  static async processResume(file: File) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      extractedData: {
        name: 'John Doe',
        email: 'john@example.com',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: '5 years'
      },
      confidence: 0.92
    };
  }

  static async parseResume(resumeText: string): Promise<ResumeParsingResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      extractedData: {
        name: 'John Doe',
        email: 'john@example.com',
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
        experience: '5 years',
        education: ['Computer Science Degree'],
        certifications: ['AWS Certified'],
        projects: ['E-commerce Platform', 'Mobile App']
      },
      confidence: 0.92
    };
  }

  static async analyzeSkillGap(candidate: any, roleRequirements: string[]): Promise<SkillGapAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const candidateSkills = candidate.skills || [];
    const matchingSkills = roleRequirements.filter(req => 
      candidateSkills.some((skill: string) => 
        skill.toLowerCase().includes(req.toLowerCase())
      )
    );
    
    const missingSkills = roleRequirements.filter(req => 
      !matchingSkills.includes(req)
    );

    const overallMatch = Math.round((matchingSkills.length / roleRequirements.length) * 100);

    return {
      overallMatch,
      matchingSkills,
      missingSkills,
      recommendedQuestions: [
        `Tell me about your experience with ${missingSkills[0] || 'the required technologies'}`,
        'How would you approach learning new technologies?',
        'Describe a time when you had to quickly adapt to new tools'
      ]
    };
  }

  static async generateFormSuggestions(candidate: any, resumeData?: ResumeParsingResult): Promise<FormSuggestion[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const suggestions: FormSuggestion[] = [];
    
    if (resumeData?.extractedData.experience) {
      suggestions.push({
        field: 'experienceYears',
        suggestedValue: resumeData.extractedData.experience,
        reasoning: 'Extracted from resume analysis',
        confidence: 0.9
      });
    }

    if (candidate.skills?.length > 0) {
      suggestions.push({
        field: 'relevantExperience',
        suggestedValue: `Strong background in ${candidate.skills.slice(0, 3).join(', ')}`,
        reasoning: 'Based on candidate skills profile',
        confidence: 0.8
      });
    }

    return suggestions;
  }

  static async generateAIInsights(candidate: any, formData: any, roleRequirements?: string[]): Promise<AIInsight[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const insights: AIInsight[] = [];
    
    if (candidate.skills?.length > 5) {
      insights.push({
        type: 'strength',
        title: 'Diverse Skill Set',
        description: 'Candidate demonstrates a broad range of technical skills',
        priority: 'high',
        category: 'Technical Skills'
      });
    }

    if (formData.experienceYears && parseInt(formData.experienceYears) < 2) {
      insights.push({
        type: 'concern',
        title: 'Limited Experience',
        description: 'Candidate has less than 2 years of experience',
        priority: 'medium',
        category: 'Experience'
      });
    }

    insights.push({
      type: 'recommendation',
      title: 'Technical Assessment',
      description: 'Consider conducting a practical coding assessment',
      priority: 'medium',
      category: 'Interview Process'
    });

    return insights;
  }
}

// Export a singleton instance for convenience
export const aiAssistant = AIAssistantService;
