
import { Candidate } from '../../types/CandidateTypes';

export interface ResumeParsingResult {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  };
  experience: {
    totalYears: string;
    currentRole: string;
    currentCompany: string;
    previousRoles: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
  };
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  education: {
    degree: string;
    university: string;
    graduationYear: string;
    specialization: string;
  };
  certifications: string[];
  projects: string[];
  achievements: string[];
}

export interface SkillGapAnalysis {
  missingSkills: string[];
  matchingSkills: string[];
  recommendedQuestions: string[];
  strengthAreas: string[];
  improvementAreas: string[];
  overallMatch: number; // percentage
}

export interface FormSuggestion {
  field: string;
  suggestedValue: string;
  confidence: number;
  reasoning: string;
}

export interface AIInsight {
  type: 'strength' | 'concern' | 'question' | 'recommendation';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export class AIAssistantService {
  private static instance: AIAssistantService;

  public static getInstance(): AIAssistantService {
    if (!AIAssistantService.instance) {
      AIAssistantService.instance = new AIAssistantService();
    }
    return AIAssistantService.instance;
  }

  async parseResume(resumeText: string): Promise<ResumeParsingResult> {
    // Simulate AI resume parsing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock parsing result based on resume content analysis
    return {
      personalInfo: {
        name: this.extractName(resumeText),
        email: this.extractEmail(resumeText),
        phone: this.extractPhone(resumeText),
        location: this.extractLocation(resumeText),
        linkedinUrl: this.extractLinkedIn(resumeText),
        githubUrl: this.extractGitHub(resumeText),
        portfolioUrl: this.extractPortfolio(resumeText)
      },
      experience: {
        totalYears: this.extractTotalExperience(resumeText),
        currentRole: this.extractCurrentRole(resumeText),
        currentCompany: this.extractCurrentCompany(resumeText),
        previousRoles: this.extractPreviousRoles(resumeText)
      },
      skills: {
        technical: this.extractTechnicalSkills(resumeText),
        soft: this.extractSoftSkills(resumeText),
        tools: this.extractTools(resumeText)
      },
      education: {
        degree: this.extractDegree(resumeText),
        university: this.extractUniversity(resumeText),
        graduationYear: this.extractGraduationYear(resumeText),
        specialization: this.extractSpecialization(resumeText)
      },
      certifications: this.extractCertifications(resumeText),
      projects: this.extractProjects(resumeText),
      achievements: this.extractAchievements(resumeText)
    };
  }

  async analyzeSkillGap(candidate: Candidate, roleRequirements: string[]): Promise<SkillGapAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Ensure we have arrays to work with and provide proper type annotations
    const candidateSkills: string[] = Array.isArray(candidate.skills) ? candidate.skills : [];
    const requirements: string[] = Array.isArray(roleRequirements) ? roleRequirements : [];
    
    const missingSkills: string[] = requirements.filter((skill: string) => {
      return !candidateSkills.some((candidateSkill: string) => 
        candidateSkill.toLowerCase().includes(skill.toLowerCase())
      );
    });
    
    const matchingSkills: string[] = requirements.filter((skill: string) => {
      return candidateSkills.some((candidateSkill: string) => 
        candidateSkill.toLowerCase().includes(skill.toLowerCase())
      );
    });

    return {
      missingSkills,
      matchingSkills,
      recommendedQuestions: this.generateRecommendedQuestions(missingSkills),
      strengthAreas: this.identifyStrengthAreas(matchingSkills),
      improvementAreas: this.identifyImprovementAreas(missingSkills),
      overallMatch: requirements.length > 0 ? Math.round((matchingSkills.length / requirements.length) * 100) : 0
    };
  }

  async generateFormSuggestions(
    candidate: Candidate, 
    resumeData?: ResumeParsingResult
  ): Promise<FormSuggestion[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const suggestions: FormSuggestion[] = [];

    if (resumeData) {
      // Generate suggestions based on resume data
      if (resumeData.personalInfo.email && !candidate.email) {
        suggestions.push({
          field: 'email',
          suggestedValue: resumeData.personalInfo.email,
          confidence: 0.95,
          reasoning: 'Extracted from resume'
        });
      }

      if (resumeData.experience.currentRole) {
        suggestions.push({
          field: 'currentRole',
          suggestedValue: resumeData.experience.currentRole,
          confidence: 0.90,
          reasoning: 'Current position from resume'
        });
      }

      if (resumeData.experience.totalYears) {
        suggestions.push({
          field: 'experienceYears',
          suggestedValue: resumeData.experience.totalYears,
          confidence: 0.85,
          reasoning: 'Calculated from work history'
        });
      }
    }

    return suggestions;
  }

  async generateAIInsights(
    candidate: Candidate, 
    formData: any,
    roleRequirements?: string[]
  ): Promise<AIInsight[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const insights: AIInsight[] = [];

    // Experience-based insights
    if (formData.experienceYears) {
      const years = parseInt(formData.experienceYears);
      if (years > 8) {
        insights.push({
          type: 'strength',
          title: 'Extensive Experience',
          description: `${years} years of experience indicates strong domain knowledge and leadership potential.`,
          priority: 'high',
          category: 'experience'
        });
      } else if (years < 2) {
        insights.push({
          type: 'question',
          title: 'Early Career Focus',
          description: 'Consider asking about learning agility and growth mindset.',
          priority: 'medium',
          category: 'experience'
        });
      }
    }

    // Skills-based insights with proper type checking
    if (roleRequirements && Array.isArray(roleRequirements) && formData.technicalSkills && Array.isArray(formData.technicalSkills)) {
      const requirements: string[] = roleRequirements;
      const techSkills: string[] = formData.technicalSkills;
      
      const matchCount = requirements.filter((req: string) => {
        return techSkills.some((skill: string) => 
          skill.toLowerCase().includes(req.toLowerCase())
        );
      }).length;
      
      if (matchCount / requirements.length > 0.8) {
        insights.push({
          type: 'strength',
          title: 'Strong Technical Alignment',
          description: 'Candidate has most required technical skills.',
          priority: 'high',
          category: 'skills'
        });
      } else if (matchCount / requirements.length < 0.5) {
        insights.push({
          type: 'concern',
          title: 'Skill Gap Analysis Needed',
          description: 'Significant gaps in required technical skills. Consider training potential.',
          priority: 'high',
          category: 'skills'
        });
      }
    }

    // Communication insights
    if (formData.softSkills && Array.isArray(formData.softSkills) && formData.softSkills.length > 0) {
      insights.push({
        type: 'recommendation',
        title: 'Soft Skills Assessment',
        description: 'Strong soft skills profile. Focus on behavioral questions.',
        priority: 'medium',
        category: 'communication'
      });
    }

    return insights;
  }

  private extractName(text: string): string {
    // Simple name extraction logic
    const lines = text.split('\n').filter(line => line.trim());
    return lines[0]?.trim() || '';
  }

  private extractEmail(text: string): string {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : '';
  }

  private extractPhone(text: string): string {
    const phoneRegex = /[\+]?[1-9]?[\d\s\-\(\)]{10,}/;
    const match = text.match(phoneRegex);
    return match ? match[0].trim() : '';
  }

  private extractLocation(text: string): string {
    // Look for common location patterns
    const locationPatterns = [
      /(?:Location|Address|Based in):?\s*([^\n]+)/i,
      /([A-Za-z\s]+,\s*[A-Za-z\s]+,?\s*\d{5,6})/,
      /([A-Za-z\s]+,\s*[A-Z]{2,3})/
    ];
    
    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    return '';
  }

  private extractLinkedIn(text: string): string {
    const linkedinRegex = /(?:linkedin\.com\/in\/|linkedin\.com\/profile\/view\?id=)([a-zA-Z0-9\-]+)/;
    const match = text.match(linkedinRegex);
    return match ? `https://linkedin.com/in/${match[1]}` : '';
  }

  private extractGitHub(text: string): string {
    const githubRegex = /(?:github\.com\/)([a-zA-Z0-9\-]+)/;
    const match = text.match(githubRegex);
    return match ? `https://github.com/${match[1]}` : '';
  }

  private extractPortfolio(text: string): string {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = text.match(urlRegex) || [];
    // Filter out common social media and find portfolio-like URLs
    return urls.find(url => 
      !url.includes('linkedin.com') && 
      !url.includes('github.com') && 
      !url.includes('facebook.com') &&
      !url.includes('twitter.com')
    ) || '';
  }

  private extractTotalExperience(text: string): string {
    const expPatterns = [
      /(\d+)\+?\s*years?\s*of\s*experience/i,
      /(\d+)\+?\s*years?\s*experience/i,
      /experience\s*:?\s*(\d+)\+?\s*years?/i
    ];
    
    for (const pattern of expPatterns) {
      const match = text.match(pattern);
      if (match) return `${match[1]} years`;
    }
    return '';
  }

  private extractCurrentRole(text: string): string {
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.match(/\b(Senior|Lead|Principal|Manager|Director|Engineer|Developer|Analyst|Specialist)\b/i)) {
        return line;
      }
    }
    return '';
  }

  private extractCurrentCompany(text: string): string {
    // Look for company patterns after role titles
    const companyPatterns = [
      /at\s+([A-Za-z\s&]+)(?:\s*\||\s*-|\s*,|\s*\n|$)/,
      /@\s+([A-Za-z\s&]+)(?:\s*\||\s*-|\s*,|\s*\n|$)/
    ];
    
    for (const pattern of companyPatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    return '';
  }

  private extractPreviousRoles(text: string): Array<{title: string, company: string, duration: string, description: string}> {
    // Simplified extraction - in real implementation would be more sophisticated
    return [
      {
        title: 'Software Engineer',
        company: 'Previous Company',
        duration: '2020-2022',
        description: 'Developed web applications'
      }
    ];
  }

  private extractTechnicalSkills(text: string): string[] {
    const techSkills: string[] = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#',
      'Angular', 'Vue.js', 'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS',
      'Docker', 'Kubernetes', 'Git', 'Jenkins', 'Linux', 'Windows', 'macOS'
    ];
    
    const textLower = text.toLowerCase();
    return techSkills.filter((skill: string) => 
      textLower.includes(skill.toLowerCase())
    );
  }

  private extractSoftSkills(text: string): string[] {
    const softSkills: string[] = [
      'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
      'Project Management', 'Time Management', 'Adaptability', 'Creativity', 'Collaboration'
    ];
    
    const textLower = text.toLowerCase();
    return softSkills.filter((skill: string) => 
      textLower.includes(skill.toLowerCase())
    );
  }

  private extractTools(text: string): string[] {
    const tools: string[] = [
      'VS Code', 'IntelliJ', 'Eclipse', 'Jira', 'Confluence', 'Slack', 'Teams',
      'Photoshop', 'Figma', 'Sketch', 'Postman', 'Swagger', 'Tableau', 'Power BI'
    ];
    
    const textLower = text.toLowerCase();
    return tools.filter((tool: string) => 
      textLower.includes(tool.toLowerCase())
    );
  }

  private extractDegree(text: string): string {
    const degreePatterns = [
      /\b(Bachelor|Master|PhD|B\.?Tech|M\.?Tech|B\.?E|M\.?E|B\.?S|M\.?S|MBA)\b[^.\n]*/i
    ];
    
    for (const pattern of degreePatterns) {
      const match = text.match(pattern);
      if (match) return match[0].trim();
    }
    return '';
  }

  private extractUniversity(text: string): string {
    const universityPatterns = [
      /(?:University|College|Institute)\s+of\s+[A-Za-z\s]+/i,
      /[A-Za-z\s]+\s+(?:University|College|Institute)/i
    ];
    
    for (const pattern of universityPatterns) {
      const match = text.match(pattern);
      if (match) return match[0].trim();
    }
    return '';
  }

  private extractGraduationYear(text: string): string {
    const yearPattern = /\b(19|20)\d{2}\b/g;
    const years = text.match(yearPattern);
    if (years) {
      // Return the most recent year that's not in the future
      const currentYear = new Date().getFullYear();
      const validYears = years.map(y => parseInt(y)).filter(y => y <= currentYear);
      return Math.max(...validYears).toString();
    }
    return '';
  }

  private extractSpecialization(text: string): string {
    const specializationPatterns = [
      /(?:Computer Science|Information Technology|Software Engineering|Data Science|Artificial Intelligence)/i
    ];
    
    for (const pattern of specializationPatterns) {
      const match = text.match(pattern);
      if (match) return match[0];
    }
    return '';
  }

  private extractCertifications(text: string): string[] {
    const certPatterns = [
      /AWS\s+Certified/i,
      /Microsoft\s+Certified/i,
      /Google\s+Cloud/i,
      /Cisco\s+Certified/i,
      /Oracle\s+Certified/i,
      /Scrum\s+Master/i,
      /PMP/i
    ];
    
    const certifications: string[] = [];
    certPatterns.forEach(pattern => {
      const match = text.match(pattern);
      if (match) certifications.push(match[0]);
    });
    
    return certifications;
  }

  private extractProjects(text: string): string[] {
    // Simplified project extraction
    return ['E-commerce Platform', 'Mobile App Development', 'Data Analytics Dashboard'];
  }

  private extractAchievements(text: string): string[] {
    // Simplified achievement extraction
    return ['Employee of the Month', 'Led successful project delivery', 'Improved system performance by 40%'];
  }

  private generateRecommendedQuestions(missingSkills: string[]): string[] {
    return missingSkills.map((skill: string) => 
      `How would you approach learning ${skill} if required for this role?`
    ).slice(0, 5);
  }

  private identifyStrengthAreas(matchingSkills: string[]): string[] {
    return matchingSkills.slice(0, 3).map((skill: string) => 
      `Strong proficiency in ${skill}`
    );
  }

  private identifyImprovementAreas(missingSkills: string[]): string[] {
    return missingSkills.slice(0, 3).map((skill: string) => 
      `Consider training in ${skill}`
    );
  }
}

export const aiAssistant = AIAssistantService.getInstance();
