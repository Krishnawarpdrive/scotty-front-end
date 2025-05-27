
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, DollarSign, TrendingUp, Clock } from 'lucide-react';

interface Offer {
  id: string;
  candidateName: string;
  role: string;
  amount: number;
  status: 'sent' | 'accepted' | 'declined' | 'pending' | 'negotiating';
  sentDate: string;
  expiryDate: string;
}

interface OffersCompensationSummaryProps {
  data: {
    offers: Offer[];
    totalBudget: number;
    usedBudget: number;
    averageOffer: number;
  };
}

export const OffersCompensationSummary: React.FC<OffersCompensationSummaryProps> = ({ data }) => {
  const mockData = {
    offers: [
      {
        id: '1',
        candidateName: 'John Smith',
        role: 'Senior Software Engineer',
        amount: 120000,
        status: 'negotiating' as const,
        sentDate: '2024-01-12',
        expiryDate: '2024-01-19'
      },
      {
        id: '2',
        candidateName: 'Sarah Wilson',
        role: 'Product Manager',
        amount: 130000,
        status: 'accepted' as const,
        sentDate: '2024-01-10',
        expiryDate: '2024-01-17'
      },
      {
        id: '3',
        candidateName: 'Mike Johnson',
        role: 'UX Designer',
        amount: 95000,
        status: 'pending' as const,
        sentDate: '2024-01-14',
        expiryDate: '2024-01-21'
      }
    ],
    totalBudget: 500000,
    usedBudget: 345000,
    averageOffer: 115000
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'negotiating': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const budgetUsedPercentage = (mockData.usedBudget / mockData.totalBudget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Offers & Compensation Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Overview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Budget Utilization</span>
            <span className="text-sm text-gray-600">
              ${mockData.usedBudget.toLocaleString()} / ${mockData.totalBudget.toLocaleString()}
            </span>
          </div>
          <Progress value={budgetUsedPercentage} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-gray-600">
            <span>{budgetUsedPercentage.toFixed(1)}% used</span>
            <span>${(mockData.totalBudget - mockData.usedBudget).toLocaleString()} remaining</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                ${mockData.averageOffer.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">Average Offer</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">
                {mockData.offers.length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Active Offers</p>
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-3">
          <h4 className="font-medium">Recent Offers</h4>
          {mockData.offers.map((offer) => (
            <div key={offer.id} className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h5 className="font-medium">{offer.candidateName}</h5>
                  <p className="text-sm text-gray-600">{offer.role}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">${offer.amount.toLocaleString()}</div>
                  <Badge className={getStatusColor(offer.status)}>
                    {offer.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Sent: {offer.sentDate}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Expires: {offer.expiryDate}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                {offer.status === 'pending' && (
                  <Button variant="default" size="sm" className="flex-1">
                    Follow Up
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
