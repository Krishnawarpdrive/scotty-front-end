
import React from 'react';
import { Button } from '@/components/ui/button';

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange
}) => {
  const periods = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  return (
    <div className="flex gap-2">
      {periods.map((period) => (
        <Button 
          key={period.value}
          variant={selectedPeriod === period.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPeriodChange(period.value)}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
};
