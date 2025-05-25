
import React, { useState } from "react";
import { DailyMetrics } from "./DailyMetrics";
import { ApplicationStages } from "./ApplicationStages";
import { ApplicationActions } from "./ApplicationActions";
import { ApplicationTable } from "./ApplicationTable";
import { InterviewDetailsSection } from "./InterviewDetailsSection";
import { Sidebar } from "./Sidebar";

// Sample interview stages data
const sampleInterviewStages = [
  {
    id: 1,
    title: "Initial Screening",
    date: "12 Apr 2025",
    duration: "30 min",
    isActive: true,
    isHighlighted: true,
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 2,
    title: "Technical Round",
    date: "14 Apr 2025",
    duration: "60 min",
    isActive: false,
    isHighlighted: false,
    avatarSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 3,
    title: "HR Interview",
    date: "16 Apr 2025",
    duration: "45 min",
    isActive: false,
    isHighlighted: false,
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
];

export const MissionControl: React.FC = () => {
  const [interviewStages, setInterviewStages] = useState(sampleInterviewStages);

  const handleAddStage = (index: number) => {
    console.log("Adding stage after index:", index);
    // Implement add stage logic here
  };

  const handleSelectStage = (stageId: number) => {
    console.log("Selected stage:", stageId);
    // Implement stage selection logic here
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 space-y-6">
        <DailyMetrics />
        
        {/* Interview Details Section */}
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h3 className="text-base font-medium text-[#020817] mb-4 font-rubik">
            Interview Progress
          </h3>
          <InterviewDetailsSection
            stages={interviewStages}
            onAddStage={handleAddStage}
            onSelectStage={handleSelectStage}
          />
        </div>

        <ApplicationStages />
        <ApplicationActions />
        <ApplicationTable />
      </div>
    </div>
  );
};
