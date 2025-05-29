
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  AlertTriangle,
  Eye,
  BarChart3
} from 'lucide-react';

interface ClientHiringData {
  client: string;
  totalHires: number;
  targetHires: number;
  progress: number;
  trend: 'up' | 'down';
  trendValue: number;
  avgTimeToHire: number;
  costPerHire: number;
  healthScore: number;
  activeRequirements: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface ClientWiseHiringBreakdownProps {
  data: any;
  isLoading: boolean;
  onClientInsightsClick?: (clientId: string) => void;
}

export const ClientWiseHiringBreakdown: React.FC<ClientWiseHiringBreakdownProps> = ({ 
  data, 
  isLoading, 
  onClientInsightsClick 
}) => {
  const [sortBy, setSortBy] = useState<'progress' | 'healthScore' | 'totalHires'>('progress');

  if (isLoading) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const clientData: ClientHiringData[] = [
    {
      client: 'TechCorp Inc.',
      totalHires: 45,
      targetHires: 50,
      progress: 90,
      trend: 'up',
      trendValue: 12.5,
      avgTimeToHire: 18,
      costPerHire: 4200,
      healthScore: 92,
      activeRequirements: 8,
      riskLevel: 'low'
    },
    {
      client: 'Global Finance Ltd',
      totalHires: 32,
      targetHires: 40,
      progress: 80,
      trend: 'up',
      trendValue: 8.3,
      avgTimeToHire: 22,
      costPerHire: 3800,
      healthScore: 88,
      activeRequirements: 12,
      riskLevel: 'low'
    },
    {
      client: 'Healthcare Solutions',
      totalHires: 28,
      targetHires: 35,
      progress: 80,
      trend: 'down',
      trendValue: -5.2,
      avgTimeToHire: 25,
      costPerHire: 4500,
      healthScore: 75,
      activeRequirements: 15,
      riskLevel: 'medium'
    },
    {
      client: 'Innovation Labs',
      totalHires: 18,
      targetHires: 30,
      progress: 60,
      trend: 'down',
      trendValue: -10.5,
      avgTimeToHire: 32,
      costPerHire: 5200,
      healthScore: 68,
      activeRequirements: 18,
      riskLevel: 'high'
    },
    {
      client: 'Retail Giants',
      totalHires: 22,
      targetHires: 25,
      progress: 88,
      trend: 'up',
      trendValue: 15.2,
      avgTimeToHire: 16,
      costPerHire: 3200,
      healthScore: 94,
      activeRequirements: 6,
      riskLevel: 'low'
    },
    {
      client: 'Manufacturing Co',
      totalHires: 15,
      targetHires: 25,
      progress: 60,
      trend: 'up',
      trendValue: 5.8,
      avgTimeToHire: 28,
      costPerHire: 4800,
      healthScore: 72,
      activeRequirements: 14,
      riskLevel: 'medium'
    }
  ];

  const sortedData = [...clientData].sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return b.progress - a.progress;
      case 'healthScore':
        return b.healthScore - a.healthScore;
      case 'totalHires':
        return b.totalHires - a.totalHires;
      default:
        return 0;
    }
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Client-wise Hiring Breakdown
            </CardTitle>
            <CardDescription>
              Performance analysis and insights across all client accounts
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="progress">Sort by Progress</option>
              <option value="healthScore">Sort by Health Score</option>
              <option value="totalHires">Sort by Total Hires</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.map((client, index) => (
            <motion.div
              key={client.client}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border rounded-lg hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-lg">{client.client}</h4>
                  <Badge className={getRiskColor(client.riskLevel)}>
                    {client.riskLevel} risk
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Health:</span>
                    <span className={`font-medium ${getHealthScoreColor(client.healthScore)}`}>
                      {client.healthScore}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onClientInsightsClick?.(client.client)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Insights
                  </Button>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Progress Section */}
                <div className="lg:col-span-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hiring Progress</span>
                    <span className="text-sm text-gray-600">
                      {client.totalHires}/{client.targetHires}
                    </span>
                  </div>
                  <Progress value={client.progress} className="h-2" />
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 ${
                      client.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {client.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="text-xs font-medium">
                        {Math.abs(client.trendValue)}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>

                {/* Metrics Section */}
                <div className="lg:col-span-3 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">Active Req.</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {client.activeRequirements}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <AlertTriangle className="h-3 w-3 text-orange-600" />
                      <span className="text-xs text-orange-600 font-medium">Avg TTH</span>
                    </div>
                    <div className="text-lg font-bold text-orange-600">
                      {client.avgTimeToHire}d
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Cost/Hire</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      ${client.costPerHire.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
