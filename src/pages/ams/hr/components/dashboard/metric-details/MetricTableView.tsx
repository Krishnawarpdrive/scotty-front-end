
import React from 'react';
import { MetricData } from '../../../hooks/useDashboardData';

interface MetricTableViewProps {
  metric: MetricData;
}

export const MetricTableView: React.FC<MetricTableViewProps> = ({ metric }) => {
  return (
    <div className="border rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {metric.data.map((item: any, i: number) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
