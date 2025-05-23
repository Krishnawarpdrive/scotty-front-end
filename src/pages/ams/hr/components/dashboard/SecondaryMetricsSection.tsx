
import React from 'react';
import { SecondaryMetrics } from './SecondaryMetrics';
import { motion } from 'framer-motion';

export const SecondaryMetricsSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="font-bold text-xl mb-4">Secondary Metrics & Insights</h2>
      <SecondaryMetrics />
    </motion.div>
  );
};
