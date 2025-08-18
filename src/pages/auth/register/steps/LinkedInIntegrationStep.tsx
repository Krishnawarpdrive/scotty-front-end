
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LinkedinIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { RegistrationFormData } from '@/types/RegistrationTypes';

interface LinkedInIntegrationStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

const LinkedInIntegrationStep = ({ formData, updateFormData }: LinkedInIntegrationStepProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connected' | 'error'>('idle');
  const [mockData, setMockData] = useState<any>(null);

  const handleLinkedInConnect = async () => {
    setIsConnecting(true);
    
    // Simulate LinkedIn OAuth flow
    setTimeout(() => {
      // Mock successful connection with sample data
      const mockLinkedInData = {
        workExperience: [
          {
            id: '1',
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Corp',
            startDate: '2021-01-01',
            endDate: '2023-12-31',
            isCurrent: false,
            responsibilities: 'Led development of React applications, mentored junior developers',
            skillsGained: ['React', 'TypeScript', 'Node.js', 'AWS'],
            source: 'linkedin' as const
          },
          {
            id: '2',
            jobTitle: 'Software Engineer',
            company: 'StartupXYZ',
            startDate: '2018-06-01',
            endDate: '2020-12-31',
            isCurrent: false,
            responsibilities: 'Built full-stack web applications, collaborated with design team',
            skillsGained: ['JavaScript', 'Python', 'PostgreSQL', 'Docker'],
            source: 'linkedin' as const
          }
        ],
        skills: [
          { name: 'React', proficiencyLevel: 'advanced' as const, yearsExperience: 5, source: 'linkedin' as const },
          { name: 'TypeScript', proficiencyLevel: 'advanced' as const, yearsExperience: 4, source: 'linkedin' as const },
          { name: 'Node.js', proficiencyLevel: 'intermediate' as const, yearsExperience: 3, source: 'linkedin' as const },
          { name: 'Python', proficiencyLevel: 'intermediate' as const, yearsExperience: 2, source: 'linkedin' as const }
        ],
        education: [
          {
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            startDate: '2014-09-01',
            endDate: '2018-05-31',
            source: 'linkedin' as const
          }
        ]
      };

      setMockData(mockLinkedInData);
      setConnectionStatus('connected');
      setIsConnecting(false);

      updateFormData({
        workExperience: mockLinkedInData.workExperience,
        skills: mockLinkedInData.skills,
        education: mockLinkedInData.education,
        linkedinProfile: {
          linkedinId: 'mock-linkedin-id',
          profileUrl: 'https://linkedin.com/in/mockuser',
          profileData: mockLinkedInData,
          syncStatus: 'synced'
        }
      });
    }, 2000);
  };

  if (formData.experienceSource !== 'linkedin') {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          LinkedIn integration is not needed for your selected experience source.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Connect Your LinkedIn</h2>
        <p className="text-muted-foreground">
          We'll securely import your professional information from LinkedIn
        </p>
      </div>

      {connectionStatus === 'idle' && (
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <LinkedinIcon className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle>Ready to Connect LinkedIn?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                What happens next:
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>1. You'll be redirected to LinkedIn to authorize access</li>
                <li>2. We'll import your work experience, skills, and education</li>
                <li>3. You can review and edit the imported information</li>
                <li>4. Your data is processed securely and stored encrypted</li>
              </ul>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                We only request access to your basic profile information, work experience, 
                skills, and education. We never post on your behalf or access your connections.
              </AlertDescription>
            </Alert>

            <Button 
              onClick={handleLinkedInConnect} 
              disabled={isConnecting}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting to LinkedIn...
                </>
              ) : (
                <>
                  <LinkedinIcon className="mr-2 h-4 w-4" />
                  Connect LinkedIn Profile
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {connectionStatus === 'connected' && mockData && (
        <div className="space-y-4">
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Successfully connected to LinkedIn! We've imported your professional information.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Imported Information Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Work Experience ({mockData.workExperience.length} positions)</h4>
                <div className="space-y-2">
                  {mockData.workExperience.map((exp: any, index: number) => (
                    <div key={index} className="bg-muted p-3 rounded">
                      <p className="font-medium">{exp.jobTitle} at {exp.company}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Skills ({mockData.skills.length} skills)</h4>
                <div className="flex flex-wrap gap-2">
                  {mockData.skills.map((skill: any, index: number) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Education</h4>
                {mockData.education.map((edu: any, index: number) => (
                  <div key={index} className="bg-muted p-3 rounded">
                    <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              You can review and edit this information in the next steps before finalizing your profile.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default LinkedInIntegrationStep;
