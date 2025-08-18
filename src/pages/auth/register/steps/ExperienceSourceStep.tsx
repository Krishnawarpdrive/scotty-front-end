
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LinkedinIcon, PenTool, SkipForward } from 'lucide-react';
import { RegistrationFormData } from '@/types/RegistrationTypes';

interface ExperienceSourceStepProps {
  formData: RegistrationFormData;
  updateFormData: (updates: Partial<RegistrationFormData>) => void;
}

const ExperienceSourceStep = ({ formData, updateFormData }: ExperienceSourceStepProps) => {
  const handleSourceChange = (source: 'linkedin' | 'manual' | 'skip') => {
    updateFormData({ experienceSource: source });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Add Your Experience</h2>
        <p className="text-muted-foreground">
          Choose how you'd like to add your work experience and skills
        </p>
      </div>

      <RadioGroup
        value={formData.experienceSource}
        onValueChange={handleSourceChange}
        className="space-y-4"
      >
        {/* LinkedIn Integration Option */}
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardContent className="flex items-start space-x-4 p-6">
            <RadioGroupItem value="linkedin" id="linkedin" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="linkedin" className="cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <LinkedinIcon className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold">Connect LinkedIn Profile</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Automatically import your work experience, skills, and education from LinkedIn. 
                  This is the fastest way to build your profile.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    What we'll import:
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Work experience and job titles</li>
                    <li>• Skills and endorsements</li>
                    <li>• Education background</li>
                    <li>• Professional summary</li>
                  </ul>
                </div>
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Manual Entry Option */}
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardContent className="flex items-start space-x-4 p-6">
            <RadioGroupItem value="manual" id="manual" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="manual" className="cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <PenTool className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold">Enter Manually</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Add your work experience, skills, and education manually. 
                  This gives you full control over what information to include.
                </p>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    Perfect if you want to:
                  </h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Customize your experience descriptions</li>
                    <li>• Add specific skills and certifications</li>
                    <li>• Control what information to share</li>
                    <li>• Don't have a LinkedIn profile</li>
                  </ul>
                </div>
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardContent className="flex items-start space-x-4 p-6">
            <RadioGroupItem value="skip" id="skip" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="skip" className="cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <SkipForward className="h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-semibold">Skip for Now</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Skip adding experience for now and complete it later from your profile. 
                  You can still proceed with role-based questions.
                </p>
                <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    Note: You can always add your experience later from your profile settings.
                  </p>
                </div>
              </Label>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>

      {formData.experienceSource && (
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {formData.experienceSource === 'linkedin' && 
              "Next, we'll help you connect your LinkedIn profile securely."
            }
            {formData.experienceSource === 'manual' && 
              "Next, you'll be able to add your work experience manually."
            }
            {formData.experienceSource === 'skip' && 
              "Next, we'll ask some questions to understand your role preferences."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ExperienceSourceStep;
