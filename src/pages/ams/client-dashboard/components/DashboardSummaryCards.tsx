
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SummaryCard {
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  actions: Array<{ label: string; variant?: 'default' | 'outline' }>;
  icon: React.ReactNode;
  urgent?: boolean;
}

interface DashboardSummaryCardsProps {
  data: SummaryCard[];
}

export const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({ data }) => {
  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return '↗';
      case 'decrease': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {data.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className={`relative hover:shadow-lg transition-shadow ${card.urgent ? 'border-red-200 bg-red-50' : ''}`}>
            {card.urgent && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                Urgent
              </Badge>
            )}
            
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">{card.icon}</div>
                {card.change !== 0 && (
                  <div className={`text-sm ${getChangeColor(card.changeType)} flex items-center`}>
                    {getChangeIcon(card.changeType)} {Math.abs(card.change)}%
                  </div>
                )}
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-gray-900 mb-3">
                {card.value}
              </div>
              
              <div className="space-y-2">
                {card.actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || 'outline'}
                    size="sm"
                    className="w-full text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
