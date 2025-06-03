
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AptitudeTestTab } from '../../../aptitude-tests/AptitudeTestTab';
import { BookOpen, Plus, Calendar, FileText, CheckCircle } from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';

interface AptitudeTestManagerProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const AptitudeTestManager: React.FC<AptitudeTestManagerProps> = ({
  candidate,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('tests');

  // Mock data for demonstration - in real app, this would come from props/API
  const testStatus = {
    assigned: 2,
    completed: 1,
    pending: 1,
    score: 85
  };

  const handleAssignTest = () => {
    console.log('Assign test to candidate:', candidate.name);
    // This would open the test assignment modal
  };

  const handleViewResults = () => {
    console.log('View test results for:', candidate.name);
    // This would open the results view
  };

  return (
    <div className="w-full h-full">
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Aptitude Test Management</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                {testStatus.completed}/{testStatus.assigned} Completed
              </Badge>
              {testStatus.score > 0 && (
                <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">
                  Score: {testStatus.score}%
                </Badge>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Manage aptitude tests and assessments for {candidate.name}
          </p>
        </CardHeader>
        <CardContent className="h-full">
          {/* Prominent CTAs based on test status */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">Quick Actions</h3>
                <p className="text-sm text-purple-700">
                  {testStatus.pending > 0 
                    ? `${testStatus.pending} test(s) pending completion`
                    : testStatus.completed === testStatus.assigned
                    ? 'All tests completed - review results'
                    : 'Assign aptitude tests to evaluate candidate skills'
                  }
                </p>
              </div>
              <div className="flex gap-2">
                {testStatus.pending > 0 ? (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={handleViewResults}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Progress
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAssignTest}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Assign More
                    </Button>
                  </>
                ) : testStatus.completed === testStatus.assigned && testStatus.completed > 0 ? (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleViewResults}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review Results
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAssignTest}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Additional Tests
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleAssignTest}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Assign Test
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tests" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Available Tests
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Test Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tests" className="mt-0 h-full">
              <div className="h-full overflow-auto">
                <AptitudeTestTab />
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-0 h-full">
              <div className="h-full overflow-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test Results & Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock test results */}
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">General Aptitude Test</h4>
                          <p className="text-sm text-gray-600">Completed on Jan 15, 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            Score: 85%
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                        <div>
                          <h4 className="font-medium">Technical Assessment</h4>
                          <p className="text-sm text-gray-600">In Progress - Started Jan 20, 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            Pending
                          </Badge>
                          <Button variant="outline" size="sm">
                            Monitor
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
