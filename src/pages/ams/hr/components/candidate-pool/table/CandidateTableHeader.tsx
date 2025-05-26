import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
interface CandidateTableHeaderProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: (selected: boolean) => void;
}
export const CandidateTableHeader: React.FC<CandidateTableHeaderProps> = ({
  selectedCount,
  totalCount,
  onSelectAll
}) => {
  return;
};