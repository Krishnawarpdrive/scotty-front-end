
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Download, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

interface Invoice {
  id: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

interface BudgetBillingSnapshotProps {
  data: {
    totalBudget: number;
    spentAmount: number;
    remainingBudget: number;
    monthlySpend: number;
    upcomingInvoices: Invoice[];
    paymentStatus: string;
  };
}

export const BudgetBillingSnapshot: React.FC<BudgetBillingSnapshotProps> = ({ data }) => {
  const mockData = {
    totalBudget: 500000,
    spentAmount: 345000,
    remainingBudget: 155000,
    monthlySpend: 45000,
    upcomingInvoices: [
      {
        id: '1',
        amount: 15000,
        dueDate: '2024-01-30',
        status: 'pending' as const,
        description: 'January Recruitment Services'
      },
      {
        id: '2',
        amount: 8500,
        dueDate: '2024-02-05',
        status: 'pending' as const,
        description: 'Background Check Services'
      },
      {
        id: '3',
        amount: 12000,
        dueDate: '2024-01-15',
        status: 'overdue' as const,
        description: 'December Placement Fees'
      }
    ],
    paymentStatus: 'current'
  };

  const budgetUsedPercentage = (mockData.spentAmount / mockData.totalBudget) * 100;
  const overdueInvoices = mockData.upcomingInvoices.filter(inv => inv.status === 'overdue');
  const totalPendingAmount = mockData.upcomingInvoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget & Billing Snapshot
          </CardTitle>
          {overdueInvoices.length > 0 && (
            <Badge className="bg-red-500 text-white">
              {overdueInvoices.length} Overdue
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              ${mockData.totalBudget.toLocaleString()}
            </div>
            <p className="text-sm text-blue-700">Total Budget</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              ${mockData.spentAmount.toLocaleString()}
            </div>
            <p className="text-sm text-green-700">Amount Spent</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <CreditCard className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-600">
              ${mockData.remainingBudget.toLocaleString()}
            </div>
            <p className="text-sm text-gray-700">Remaining</p>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Budget Utilization</span>
            <span className="text-sm text-gray-600">
              {budgetUsedPercentage.toFixed(1)}% used
            </span>
          </div>
          <Progress value={budgetUsedPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-600">
            <span>Monthly spend: ${mockData.monthlySpend.toLocaleString()}</span>
            <span>Projected annual: ${(mockData.monthlySpend * 12).toLocaleString()}</span>
          </div>
        </div>

        {/* Upcoming Invoices */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Upcoming Invoices</h4>
            <div className="text-sm text-gray-600">
              ${totalPendingAmount.toLocaleString()} pending
            </div>
          </div>
          
          {mockData.upcomingInvoices.map((invoice) => (
            <div key={invoice.id} className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h5 className="font-medium">{invoice.description}</h5>
                  <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">${invoice.amount.toLocaleString()}</div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>
              </div>
              
              {invoice.status === 'overdue' && (
                <div className="flex items-center gap-1 text-red-600 text-sm mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Payment overdue</span>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                {invoice.status === 'pending' || invoice.status === 'overdue' ? (
                  <Button variant="default" size="sm" className="flex-1">
                    Pay Now
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4 space-y-2">
          <Button className="w-full" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Financial Report
          </Button>
          <Button className="w-full" variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Contact Finance Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
