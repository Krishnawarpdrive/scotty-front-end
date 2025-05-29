
import React, { useState } from 'react';
import { useWorkflowData } from './workflow/hooks/useWorkflowData';
import { WorkflowManagementContent } from './workflow/components/WorkflowManagementContent';
import { WorkflowManagementLoading } from './workflow/components/WorkflowManagementLoading';
import { WorkflowManagementError } from './workflow/components/WorkflowManagementError';

const WorkflowManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    workflowStages, 
    qualityGates, 
    handoffDocuments, 
    executiveMetrics,
    loading,
    error 
  } = useWorkflowData();

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <WorkflowManagementLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <WorkflowManagementError error={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <WorkflowManagementContent
        activeTab={activeTab}
        onTabChange={setActiveTab}
        workflowStages={workflowStages}
        qualityGates={qualityGates}
        handoffDocuments={handoffDocuments}
        executiveMetrics={executiveMetrics}
      />
    </div>
  );
};

export default WorkflowManagementPage;
