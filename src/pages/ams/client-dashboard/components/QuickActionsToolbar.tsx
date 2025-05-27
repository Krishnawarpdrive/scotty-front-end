
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  ChevronUp,
  Briefcase,
  Video,
  FileText,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const QuickActionsToolbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: 'Request New Role',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: 'Schedule Meeting',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Submit Feedback',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: 'View Reports',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: <Video className="h-5 w-5" />,
      label: 'Join Interview',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: 'Review Documents',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Contact Support',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 space-y-2"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-0 overflow-hidden shadow-lg">
                  <Button
                    className={`${action.color} text-white w-full justify-start h-12 px-4`}
                    variant="default"
                  >
                    {action.icon}
                    <span className="ml-3 whitespace-nowrap">{action.label}</span>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 w-14 shadow-lg"
          size="icon"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? <ChevronUp className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};
