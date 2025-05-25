
import React from "react";
import { DailyMetrics } from "./DailyMetrics";
import { ApplicationStages } from "./ApplicationStages";
import { ApplicationActions } from "./ApplicationActions";
import { ApplicationTable } from "./ApplicationTable";

export const MissionControl: React.FC = () => {
  return (
    <div className="space-y-6">
      <DailyMetrics />
      <ApplicationStages />
      <ApplicationActions />
      <ApplicationTable />
    </div>
  );
};
