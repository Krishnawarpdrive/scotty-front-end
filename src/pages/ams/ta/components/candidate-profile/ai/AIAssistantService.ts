
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
}
