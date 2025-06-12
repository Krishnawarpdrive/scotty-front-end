
import { useState, useEffect } from 'react';

interface InterviewHistory {
  id: string;
  type: string;
  date: string;
  interviewer: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  feedback?: string;
  rating?: number;
  duration: string;
  notes?: string;
}

interface ApplicationDetails {
  id: string;
  roleName: string;
  companyName: string;
  appliedDate: string;
  currentStage: string;
  progress: number;
  status: 'active' | 'offer' | 'rejected' | 'withdrawn';
  location: string;
  employmentType: string;
  workMode: string;
  jobDescription: string;
  requirements: string[];
  skillsRequired: string[];
  interviewHistory: InterviewHistory[];
}

export const useCandidateApplicationDetails = (applicationId: string | null) => {
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!applicationId) return;

    const fetchApplicationDetails = async () => {
      setIsLoading(true);
      
      // Mock API call - replace with actual API integration
      setTimeout(() => {
        const mockData: ApplicationDetails = {
          id: applicationId,
          roleName: 'Senior Frontend Developer',
          companyName: 'TechCorp Inc',
          appliedDate: '2024-01-15',
          currentStage: 'Technical Interview',
          progress: 65,
          status: 'active',
          location: 'San Francisco, CA',
          employmentType: 'Full-time',
          workMode: 'Hybrid',
          jobDescription: `We are seeking a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features, ensuring technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability.

This role offers the opportunity to work with cutting-edge technologies and collaborate with a talented team of engineers, designers, and product managers.`,
          requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            '5+ years of experience in frontend development',
            'Strong proficiency in JavaScript, HTML5, and CSS3',
            'Experience with React.js and its ecosystem',
            'Knowledge of state management (Redux, Context API)',
            'Experience with RESTful APIs and GraphQL',
            'Familiarity with version control systems (Git)',
            'Understanding of responsive design principles',
            'Experience with testing frameworks (Jest, Cypress)',
            'Strong problem-solving and communication skills'
          ],
          skillsRequired: [
            'JavaScript', 'React.js', 'TypeScript', 'HTML5', 'CSS3', 'Redux',
            'GraphQL', 'Node.js', 'Git', 'Jest', 'Webpack', 'Responsive Design'
          ],
          interviewHistory: [
            {
              id: '1',
              type: 'Phone Screening',
              date: 'January 18, 2024',
              interviewer: 'Sarah Chen (HR Manager)',
              status: 'completed',
              feedback: 'Great communication skills and enthusiasm for the role. Technical background looks solid.',
              rating: 4,
              duration: '30 minutes'
            },
            {
              id: '2',
              type: 'Technical Interview',
              date: 'January 25, 2024',
              interviewer: 'Mike Johnson (Lead Developer)',
              status: 'completed',
              feedback: 'Strong technical skills demonstrated. Good problem-solving approach and clean code.',
              rating: 5,
              duration: '60 minutes'
            },
            {
              id: '3',
              type: 'Team Interview',
              date: 'February 1, 2024',
              interviewer: 'Development Team',
              status: 'scheduled',
              duration: '45 minutes'
            }
          ]
        };
        
        setApplicationDetails(mockData);
        setIsLoading(false);
      }, 500);
    };

    fetchApplicationDetails();
  }, [applicationId]);

  const submitInterviewReview = async (interviewId: string, review: any) => {
    console.log('Submitting review for interview:', interviewId, review);
    
    // Mock API call - replace with actual API integration
    if (applicationDetails) {
      const updatedHistory = applicationDetails.interviewHistory.map(interview => 
        interview.id === interviewId 
          ? { ...interview, rating: review.rating, feedback: review.feedback }
          : interview
      );
      
      setApplicationDetails({
        ...applicationDetails,
        interviewHistory: updatedHistory
      });
    }
  };

  return {
    applicationDetails,
    isLoading,
    submitInterviewReview
  };
};
