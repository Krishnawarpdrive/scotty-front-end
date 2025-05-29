
import React from 'react';
import { PeriodSelector } from './PeriodSelector';

interface ExecutiveDashboardHeaderProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const ExecutiveDashboardHeader: React.FC<ExecutiveDashboardHeaderProps> = ({
  selectedPeriod,
  onPeriodChange
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Executive Dashboard</h2>
        <p className="text-muted-foreground">
          Key performance indicators and metrics overview
        </p>
      </div>
      <PeriodSelector 
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
      />
    </div>
  );
};
