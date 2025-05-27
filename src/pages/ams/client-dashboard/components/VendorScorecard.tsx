
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { StarIcon, TrendingUpIcon, ClockIcon } from 'lucide-react';

interface VendorScore {
  id: string;
  vendorName: string;
  overallScore: number;
  qualityScore: number;
  speedScore: number;
  costEfficiency: number;
  communicationScore: number;
  activeRoles: number;
  completedPlacements: number;
  rating: number;
  trend: 'up' | 'down' | 'stable';
}

interface VendorScorecardProps {
  scores: VendorScore[];
}

export const VendorScorecard: React.FC<VendorScorecardProps> = ({ scores }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StarIcon className="h-5 w-5 text-primary" />
          Vendor Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scores.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{vendor.vendorName}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{vendor.activeRoles} active roles</span>
                  <span>•</span>
                  <span>{vendor.completedPlacements} placements</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(vendor.overallScore)}`}>
                  {vendor.overallScore}
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Quality</span>
                <span className={getScoreColor(vendor.qualityScore)}>{vendor.qualityScore}%</span>
              </div>
              <Progress value={vendor.qualityScore} className="h-1" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Speed</span>
                <span className={getScoreColor(vendor.speedScore)}>{vendor.speedScore}%</span>
              </div>
              <Progress value={vendor.speedScore} className="h-1" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Cost Efficiency</span>
                <span className={getScoreColor(vendor.costEfficiency)}>{vendor.costEfficiency}%</span>
              </div>
              <Progress value={vendor.costEfficiency} className="h-1" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Communication</span>
                <span className={getScoreColor(vendor.communicationScore)}>{vendor.communicationScore}%</span>
              </div>
              <Progress value={vendor.communicationScore} className="h-1" />
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Badge 
                variant={vendor.trend === 'up' ? 'default' : vendor.trend === 'down' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {vendor.trend === 'up' && <TrendingUpIcon className="h-3 w-3 mr-1" />}
                {vendor.trend === 'up' ? 'Improving' : vendor.trend === 'down' ? 'Declining' : 'Stable'}
              </Badge>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};
