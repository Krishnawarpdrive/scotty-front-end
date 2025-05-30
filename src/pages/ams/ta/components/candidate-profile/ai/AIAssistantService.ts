interface AIAssistant {
  generateCandidateInsights(candidateData: any): Promise<AIInsight[]>;
  suggestInterviewQuestions(candidateData: any, roleRequirements: any): Promise<string[]>;
  analyzeCandidateMatch(candidateData: any, roleRequirements: any): Promise<AIInsight[]>;
  identifySkillGaps(candidateSkills: string[], requiredSkills: string[]): Promise<SkillGap[]>;
  suggestFormImprovements(formData: any, formType: string): Promise<FormSuggestion[]>;
}

interface AIInsight {
  type: string;
  confidence: number;
  title: string;
  description: string;
  actionable: boolean;
  details?: any;
}

interface SkillGap {
  skill: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  trainingResources?: string[];
}

interface FormSuggestion {
  field: string;
  suggestion: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export class AIAssistantService implements AIAssistant {
  async generateCandidateInsights(candidateData: any): Promise<AIInsight[]> {
    try {
      const insights: AIInsight[] = [];
      
      // Experience analysis
      if (candidateData.experience) {
        const experienceYears = this.calculateTotalExperience(candidateData.experience);
        let experienceConfidence = 0;
        
        if (experienceYears > 10) experienceConfidence = 95;
        else if (experienceYears > 5) experienceConfidence = 80;
        else if (experienceYears > 2) experienceConfidence = 60;
        else experienceConfidence = 40;
        
        insights.push({
          type: 'experience',
          confidence: experienceConfidence,
          title: 'Experience Analysis',
          description: `Candidate has ${experienceYears} years of relevant experience`,
          actionable: experienceYears < 2,
          details: {
            years: experienceYears,
            companies: candidateData.experience.length
          }
        });
      }
      
      // Education analysis
      if (candidateData.education) {
        const highestDegree = this.getHighestDegree(candidateData.education);
        let educationConfidence = 0;
        
        if (highestDegree === 'PhD') educationConfidence = 95;
        else if (highestDegree === 'Masters') educationConfidence = 85;
        else if (highestDegree === 'Bachelors') educationConfidence = 75;
        else educationConfidence = 50;
        
        insights.push({
          type: 'education',
          confidence: educationConfidence,
          title: 'Education Analysis',
          description: `Candidate's highest degree: ${highestDegree}`,
          actionable: false,
          details: {
            degree: highestDegree,
            institutions: candidateData.education.map((edu: any) => edu.institution)
          }
        });
      }
      
      // Skills analysis
      if (candidateData.skills && candidateData.skills.length > 0) {
        const skillsConfidence = Math.min(candidateData.skills.length * 10, 90);
        
        insights.push({
          type: 'skills',
          confidence: skillsConfidence,
          title: 'Skills Analysis',
          description: `Candidate has ${candidateData.skills.length} relevant skills`,
          actionable: candidateData.skills.length < 3,
          details: {
            skills: candidateData.skills,
            recommendation: candidateData.skills.length < 3 ? 'Consider candidates with more skills' : ''
          }
        });
      }
      
      return insights;
    } catch (error) {
      console.error('Error generating candidate insights:', error);
      return [];
    }
  }
  
  async suggestInterviewQuestions(candidateData: any, roleRequirements: any): Promise<string[]> {
    try {
      const questions: string[] = [];
      
      // Experience-based questions
      if (candidateData.experience && candidateData.experience.length > 0) {
        const latestJob = candidateData.experience[0];
        questions.push(`Can you describe your responsibilities as a ${latestJob.title} at ${latestJob.company}?`);
        questions.push(`What were the biggest challenges you faced at ${latestJob.company} and how did you overcome them?`);
      }
      
      // Skills-based questions
      if (roleRequirements.skills && roleRequirements.skills.length > 0) {
        for (const skill of roleRequirements.skills.slice(0, 3)) {
          questions.push(`Can you describe a project where you used ${skill}?`);
          questions.push(`How would you rate your proficiency in ${skill} and why?`);
        }
      }
      
      // Role-specific questions
      if (roleRequirements.role) {
        questions.push(`Why are you interested in the ${roleRequirements.role} position?`);
        questions.push(`What do you think are the most important qualities for success as a ${roleRequirements.role}?`);
      }
      
      // Behavioral questions
      questions.push("Describe a situation where you had to work under pressure to meet a deadline.");
      questions.push("Tell me about a time when you had to resolve a conflict within your team.");
      questions.push("How do you prioritize tasks when you have multiple deadlines?");
      
      return questions;
    } catch (error) {
      console.error('Error suggesting interview questions:', error);
      return [];
    }
  }

  async analyzeCandidateMatch(candidateData: any, roleRequirements: any): Promise<AIInsight[]> {
    try {
      const insights: AIInsight[] = [];
      
      // Safe access to skills with proper type checking
      const candidateSkills = Array.isArray(candidateData.skills) ? candidateData.skills : [];
      const requiredSkills = Array.isArray(roleRequirements.skills) ? roleRequirements.skills : [];
      const preferredSkills = Array.isArray(roleRequirements.preferredSkills) ? roleRequirements.preferredSkills : [];
      const certifications = Array.isArray(candidateData.certifications) ? candidateData.certifications : [];

      // Skills analysis
      if (candidateSkills.length > 0 && requiredSkills.length > 0) {
        const matchingSkills = candidateSkills.filter((skill: string) => 
          requiredSkills.includes(skill)
        );
        const missingSkills = requiredSkills.filter((skill: string) => 
          !candidateSkills.includes(skill)
        );
        const bonusSkills = candidateSkills.filter((skill: string) => 
          preferredSkills.includes(skill)
        );
        
        insights.push({
          type: 'skill_match',
          confidence: (matchingSkills.length / requiredSkills.length) * 100,
          title: 'Skills Analysis',
          description: `Candidate matches ${matchingSkills.length}/${requiredSkills.length} required skills`,
          actionable: missingSkills.length > 0,
          details: {
            matching: matchingSkills,
            missing: missingSkills,
            bonus: bonusSkills
          }
        });
      }
      
      // Experience analysis
      if (candidateData.experience && roleRequirements.minYearsExperience) {
        const experienceYears = this.calculateTotalExperience(candidateData.experience);
        const meetsMinExperience = experienceYears >= roleRequirements.minYearsExperience;
        
        insights.push({
          type: 'experience_match',
          confidence: meetsMinExperience ? 100 : (experienceYears / roleRequirements.minYearsExperience) * 100,
          title: 'Experience Match',
          description: `Candidate has ${experienceYears} years of experience (${roleRequirements.minYearsExperience} required)`,
          actionable: !meetsMinExperience,
          details: {
            candidate: experienceYears,
            required: roleRequirements.minYearsExperience,
            gap: !meetsMinExperience ? roleRequirements.minYearsExperience - experienceYears : 0
          }
        });
      }
      
      // Education match
      if (candidateData.education && roleRequirements.education) {
        const highestDegree = this.getHighestDegree(candidateData.education);
        const requiredDegree = roleRequirements.education.degree;
        const meetsEducation = this.isEqualOrHigherDegree(highestDegree, requiredDegree);
        
        insights.push({
          type: 'education_match',
          confidence: meetsEducation ? 100 : 50,
          title: 'Education Match',
          description: `Candidate has ${highestDegree} degree (${requiredDegree} required)`,
          actionable: !meetsEducation,
          details: {
            candidate: highestDegree,
            required: requiredDegree,
            meets: meetsEducation
          }
        });
      }
      
      // Certification match
      if (certifications.length > 0 && roleRequirements.certifications) {
        const requiredCerts = roleRequirements.certifications;
        const matchingCerts = certifications.filter((cert: string) => 
          requiredCerts.includes(cert)
        );
        
        insights.push({
          type: 'certification_match',
          confidence: requiredCerts.length > 0 ? (matchingCerts.length / requiredCerts.length) * 100 : 100,
          title: 'Certification Match',
          description: `Candidate has ${matchingCerts.length}/${requiredCerts.length} required certifications`,
          actionable: matchingCerts.length < requiredCerts.length,
          details: {
            matching: matchingCerts,
            missing: requiredCerts.filter((cert: string) => !certifications.includes(cert))
          }
        });
      }
      
      // Overall match score
      const overallScore = insights.reduce((sum, insight) => sum + insight.confidence, 0) / insights.length;
      insights.push({
        type: 'overall_match',
        confidence: overallScore,
        title: 'Overall Match Score',
        description: `Candidate is a ${Math.round(overallScore)}% match for this role`,
        actionable: overallScore < 70,
        details: {
          score: Math.round(overallScore),
          recommendation: overallScore >= 80 ? 'Strong match' : overallScore >= 60 ? 'Potential match' : 'Not recommended'
        }
      });
      
      return insights;
    } catch (error) {
      console.error('Error analyzing candidate match:', error);
      return [];
    }
  }
  
  async identifySkillGaps(candidateSkills: string[], requiredSkills: string[]): Promise<SkillGap[]> {
    try {
      const gaps: SkillGap[] = [];
      
      for (const skill of requiredSkills) {
        if (!candidateSkills.includes(skill)) {
          gaps.push({
            skill,
            importance: this.determineSkillImportance(skill, requiredSkills),
            trainingResources: this.suggestTrainingResources(skill)
          });
        }
      }
      
      return gaps;
    } catch (error) {
      console.error('Error identifying skill gaps:', error);
      return [];
    }
  }
  
  async suggestFormImprovements(formData: any, formType: string): Promise<FormSuggestion[]> {
    try {
      const suggestions: FormSuggestion[] = [];
      
      if (formType === 'candidate') {
        if (!formData.name || formData.name.length < 3) {
          suggestions.push({
            field: 'name',
            suggestion: 'Add candidate full name',
            reason: 'Name is required for identification',
            priority: 'high'
          });
        }
        
        if (!formData.email || !formData.email.includes('@')) {
          suggestions.push({
            field: 'email',
            suggestion: 'Add valid email address',
            reason: 'Email is required for communication',
            priority: 'high'
          });
        }
        
        if (!formData.skills || formData.skills.length === 0) {
          suggestions.push({
            field: 'skills',
            suggestion: 'Add candidate skills',
            reason: 'Skills are essential for matching to roles',
            priority: 'high'
          });
        }
        
        if (!formData.experience || formData.experience.length === 0) {
          suggestions.push({
            field: 'experience',
            suggestion: 'Add work experience details',
            reason: 'Experience helps evaluate candidate qualifications',
            priority: 'medium'
          });
        }
      } else if (formType === 'job') {
        if (!formData.title || formData.title.length < 3) {
          suggestions.push({
            field: 'title',
            suggestion: 'Add job title',
            reason: 'Title is required for job posting',
            priority: 'high'
          });
        }
        
        if (!formData.description || formData.description.length < 50) {
          suggestions.push({
            field: 'description',
            suggestion: 'Add detailed job description',
            reason: 'Description helps candidates understand the role',
            priority: 'high'
          });
        }
        
        if (!formData.skills || formData.skills.length === 0) {
          suggestions.push({
            field: 'skills',
            suggestion: 'Add required skills',
            reason: 'Skills are essential for candidate matching',
            priority: 'high'
          });
        }
      }
      
      return suggestions;
    } catch (error) {
      console.error('Error suggesting form improvements:', error);
      return [];
    }
  }
  
  private calculateTotalExperience(experience: any[]): number {
    let totalYears = 0;
    
    for (const job of experience) {
      const startDate = new Date(job.startDate);
      const endDate = job.endDate ? new Date(job.endDate) : new Date();
      const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      totalYears += years;
    }
    
    return Math.round(totalYears * 10) / 10; // Round to 1 decimal place
  }
  
  private getHighestDegree(education: any[]): string {
    const degreeRanking = {
      'High School': 1,
      'Associate': 2,
      'Bachelors': 3,
      'Masters': 4,
      'PhD': 5
    };
    
    let highestDegree = 'High School';
    let highestRank = 0;
    
    for (const edu of education) {
      const degree = edu.degree;
      const rank = degreeRanking[degree as keyof typeof degreeRanking] || 0;
      
      if (rank > highestRank) {
        highestRank = rank;
        highestDegree = degree;
      }
    }
    
    return highestDegree;
  }
  
  private isEqualOrHigherDegree(candidateDegree: string, requiredDegree: string): boolean {
    const degreeRanking = {
      'High School': 1,
      'Associate': 2,
      'Bachelors': 3,
      'Masters': 4,
      'PhD': 5
    };
    
    const candidateRank = degreeRanking[candidateDegree as keyof typeof degreeRanking] || 0;
    const requiredRank = degreeRanking[requiredDegree as keyof typeof degreeRanking] || 0;
    
    return candidateRank >= requiredRank;
  }
  
  private determineSkillImportance(skill: string, allRequiredSkills: string[]): 'critical' | 'high' | 'medium' | 'low' {
    // This is a simplified implementation
    // In a real system, this would use more sophisticated logic or external data
    const criticalSkills = ['JavaScript', 'Python', 'Java', 'React', 'AWS'];
    const highSkills = ['TypeScript', 'Node.js', 'SQL', 'Docker', 'Kubernetes'];
    
    if (criticalSkills.includes(skill)) return 'critical';
    if (highSkills.includes(skill)) return 'high';
    if (allRequiredSkills.indexOf(skill) < allRequiredSkills.length / 2) return 'medium';
    return 'low';
  }
  
  private suggestTrainingResources(skill: string): string[] {
    // This is a simplified implementation
    // In a real system, this would use a database of training resources
    const resources: Record<string, string[]> = {
      'JavaScript': [
        'JavaScript: The Good Parts by Douglas Crockford',
        'MDN Web Docs - JavaScript',
        'Codecademy JavaScript Course'
      ],
      'Python': [
        'Python Crash Course by Eric Matthes',
        'Official Python Documentation',
        'Coursera - Python for Everybody'
      ],
      'React': [
        'React Documentation',
        'React for Beginners by Wes Bos',
        'Udemy - React - The Complete Guide'
      ],
      'AWS': [
        'AWS Documentation',
        'A Cloud Guru - AWS Certified Solutions Architect',
        'AWS Certified Cloud Practitioner Training'
      ]
    };
    
    return resources[skill] || ['Online courses on Udemy or Coursera', 'Official documentation', 'Practice projects on GitHub'];
  }
}

export const aiAssistantService = new AIAssistantService();
