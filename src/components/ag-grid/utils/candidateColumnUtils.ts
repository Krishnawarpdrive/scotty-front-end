
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
        const container = document.createElement('div');
        container.className = 'space-y-1';
        
        roles.slice(0, 2).forEach((role: string, index: number) => {
          const roleDiv = document.createElement('div');
          roleDiv.className = 'text-sm truncate max-w-32';
          roleDiv.textContent = role;
          container.appendChild(roleDiv);
        });
        
        if (roles.length > 2) {
          const moreDiv = document.createElement('div');
          moreDiv.className = 'text-xs text-gray-500';
          moreDiv.textContent = `+${roles.length - 2} more`;
          container.appendChild(moreDiv);
        }
        
        return container;
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
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        container.className = 'flex items-center gap-1';
        
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'font-medium';
        scoreSpan.textContent = params.value;
        
        const starSpan = document.createElement('span');
        starSpan.className = 'text-yellow-500';
        starSpan.textContent = '★';
        
        container.appendChild(scoreSpan);
        container.appendChild(starSpan);
        
        return container;
      }
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
        
        const container = document.createElement('div');
        container.className = 'flex items-center gap-2';
        
        const avatar = document.createElement('div');
        avatar.className = 'h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-medium';
        avatar.textContent = initials;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'text-sm truncate';
        nameSpan.textContent = ta.name;
        
        container.appendChild(avatar);
        container.appendChild(nameSpan);
        
        return container;
      }
    })
};
