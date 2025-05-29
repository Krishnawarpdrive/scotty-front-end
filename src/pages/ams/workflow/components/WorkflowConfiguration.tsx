
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowStage, QualityGate } from '@/types/WorkflowTypes';
import { WorkflowConfigurationHeader } from './workflow-configuration/WorkflowConfigurationHeader';
import { StagesTabContent } from './workflow-configuration/StagesTabContent';
import { AutomationRulesTab } from './workflow-configuration/AutomationRulesTab';
import { WorkflowTemplatesTab } from './workflow-configuration/WorkflowTemplatesTab';

interface WorkflowConfigurationProps {
  stages: WorkflowStage[];
  qualityGates: QualityGate[];
}

export const WorkflowConfiguration: React.FC<WorkflowConfigurationProps> = ({
  stages,
  qualityGates
}) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <WorkflowConfigurationHeader />

      <Tabs defaultValue="stages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stages">Workflow Stages</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="stages" className="space-y-4">
          <StagesTabContent
            stages={stages}
            qualityGates={qualityGates}
            selectedStage={selectedStage}
            onStageSelect={setSelectedStage}
          />
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <AutomationRulesTab />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <WorkflowTemplatesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
