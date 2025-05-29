
import React from 'react';
import { BarChart3, TrendingUp, Clock, DollarSign, Star, Users } from 'lucide-react';

export const getMetricIcon = (type: string) => {
  switch (type) {
    case 'time_to_fill': return <Clock className="h-5 w-5" />;
    case 'quality_score': return <Star className="h-5 w-5" />;
    case 'cost_per_hire': return <DollarSign className="h-5 w-5" />;
    case 'candidate_satisfaction': return <Users className="h-5 w-5" />;
    case 'client_satisfaction': return <TrendingUp className="h-5 w-5" />;
    default: return <BarChart3 className="h-5 w-5" />;
  }
};
