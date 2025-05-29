
import { ColDef } from 'ag-grid-community';
import { createColumnDef, commonColumns } from './columnUtils';
import { CandidateInfoCellRenderer } from '../cell-renderers/CandidateInfoCellRenderer';
import { StatusBadgeCellRenderer } from '../cell-renderers/StatusBadgeCellRenderer';

export const candidateColumns = {
  candidateInfo: (field: string = 'candidate', headerName: string = 'Candidate'): ColDef =>
    createColumnDef({
      field,
      headerName,
      width: 250,
      pinned: 'left',
      cellRenderer: CandidateInfoCellRenderer,
      sortable: true,
      filter: true
    }),

  appliedRoles: (field: string = 'appliedRoles', headerName: string = 'Applied Roles'): ColDef =>
    createColumnDef({
      field,
      headerName,
      width: 200,
      cellRenderer: (params: any) => {
        const roles = params.value || [];
        return (
          <div className="space-y-1">
            {roles.slice(0, 2).map((role: string, index: number) => (
              <div key={index} className="text-sm truncate max-w-32">{role}</div>
            ))}
            {roles.length > 2 && (
              <div className="text-xs text-gray-500">
                +{roles.length - 2} more
              </div>
            )}
          </div>
        );
      }
    }),

  experience: (field: string = 'experience', headerName: string = 'Experience'): ColDef =>
    createColumnDef({
      field,
      headerName,
      width: 120,
      cellRenderer: (params: any) => {
        const exp = params.value;
        if (exp && typeof exp === 'object' && 'years' in exp && 'months' in exp) {
          return `${exp.years}y ${exp.months}m`;
        }
        return exp || '0y 0m';
      }
    }),

  score: (field: string = 'score', headerName: string = 'Score'): ColDef =>
    createColumnDef({
      field,
      headerName,
      width: 100,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">{params.value}</span>
          <span className="text-yellow-500">★</span>
        </div>
      )
    }),

  assignedTA: (field: string = 'assignedTA', headerName: string = 'Assigned TA'): ColDef =>
    createColumnDef({
      field,
      headerName,
      width: 120,
      cellRenderer: (params: any) => {
        const ta = params.value;
        if (!ta) return '';
        const initials = ta.name ? ta.name.split(' ').map((n: string) => n[0]).join('') : '';
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-medium">
              {initials}
            </div>
            <span className="text-sm truncate">{ta.name}</span>
          </div>
        );
      }
    })
};
