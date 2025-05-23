
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, AlertTriangle, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { mockSecondaryMetrics } from '../../mock-dashboard-data';
import { motion } from 'framer-motion';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

export const SecondaryMetrics: React.FC = () => {
  const [candidatePipelineByTA, interviewToOffer, partnerCollaboration, newHirePerformance, stuckCandidates] = mockSecondaryMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Candidate Pipeline by TA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 h-[300px]">
          <h3 className="font-semibold mb-3 flex items-center justify-between">
            {candidatePipelineByTA.title}
            <Button size="sm" variant="ghost">View All</Button>
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candidatePipelineByTA.data} layout="horizontal">
                <XAxis type="number" tick={{fontSize: 10}} />
                <YAxis dataKey="name" type="category" tick={{fontSize: 10}} />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Button size="sm" className="w-full mt-2">Rebalance Workload</Button>
        </Card>
      </motion.div>

      {/* Interview-to-Offer Ratio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 h-[300px] flex flex-col">
          <h3 className="font-semibold mb-3">{interviewToOffer.title}</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{interviewToOffer.value}</div>
              <div className="flex items-center text-sm text-emerald-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                {interviewToOffer.trendLabel}
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full">Optimize Process</Button>
        </Card>
      </motion.div>

      {/* Partner Collaboration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-4 h-[300px]">
          <h3 className="font-semibold mb-3 flex items-center justify-between">
            {partnerCollaboration.title}
            <span className="text-2xl font-bold">{partnerCollaboration.value}</span>
          </h3>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={partnerCollaboration.data}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                >
                  {partnerCollaboration.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Button size="sm" className="w-full mt-2">Expand Partnerships</Button>
        </Card>
      </motion.div>

      {/* New Hire Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 h-[300px] flex flex-col">
          <h3 className="font-semibold mb-3">{newHirePerformance.title}</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(newHirePerformance.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-2xl font-bold mb-1">{newHirePerformance.rating}/5</div>
              <div className="text-sm text-gray-500">Based on {newHirePerformance.totalRatings} reviews</div>
            </div>
          </div>
          <Button size="sm" className="w-full">View Performance Details</Button>
        </Card>
      </motion.div>

      {/* Stuck Candidates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 h-[300px] flex flex-col">
          <h3 className="font-semibold mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
            {stuckCandidates.title}
          </h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">{stuckCandidates.count}</div>
              <Badge variant="destructive" className="mb-2">
                {stuckCandidates.urgentCount} Urgent ({'>'}14 days)
              </Badge>
              <div className="text-sm text-gray-500">Candidates stuck {'>'}7 days</div>
            </div>
          </div>
          <div className="space-y-2">
            <Button size="sm" className="w-full" variant="destructive">
              Review Urgent Cases
            </Button>
            <Button size="sm" className="w-full" variant="outline">
              Send Follow-up Reminders
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
