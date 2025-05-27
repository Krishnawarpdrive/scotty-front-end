
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  urgency: 'high' | 'medium' | 'low';
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  count,
  urgency,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getUrgencyColor = () => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getUrgencyIcon = () => {
    switch (urgency) {
      case 'high': return <AlertCircle className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <CheckCircle className="h-3 w-3" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="cursor-pointer transition-all duration-300 hover:shadow-md border hover:border-[#009933]/30 h-36">
        <CardHeader className="pb-2 px-4 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={isHovered ? { rotate: 5, scale: 1.05 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="p-1.5 rounded-md bg-[#009933]/10 text-[#009933]"
              >
                {icon}
              </motion.div>
              <CardTitle className="text-xs font-medium">{title}</CardTitle>
            </div>
            <Badge variant="outline" className={`${getUrgencyColor()} text-xs px-1.5 py-0.5`}>
              {getUrgencyIcon()}
              <span className="ml-1 text-xs">{urgency}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-3">
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-gray-900">{count}</span>
              <span className="text-xs text-gray-500">pending</span>
            </div>
            <Button
              onClick={onClick}
              size="sm"
              variant="secondary"
              className="text-xs px-2 py-1 h-7 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <motion.span
                animate={isHovered ? { x: 1 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                Take Action
              </motion.span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ApplicationActions: React.FC = () => {
  const actions = [
    {
      icon: <Phone className="h-3.5 w-3.5" />,
      title: "Follow-up Calls",
      description: "Candidates awaiting response",
      count: 8,
      urgency: 'high' as const,
      onClick: () => console.log("Making follow-up calls...")
    },
    {
      icon: <Calendar className="h-3.5 w-3.5" />,
      title: "Schedule Interviews",
      description: "Ready for next round",
      count: 5,
      urgency: 'medium' as const,
      onClick: () => console.log("Scheduling interviews...")
    },
    {
      icon: <FileText className="h-3.5 w-3.5" />,
      title: "Review Applications",
      description: "New submissions to evaluate",
      count: 12,
      urgency: 'medium' as const,
      onClick: () => console.log("Reviewing applications...")
    },
    {
      icon: <Mail className="h-3.5 w-3.5" />,
      title: "Send Updates",
      description: "Status updates pending",
      count: 3,
      urgency: 'low' as const,
      onClick: () => console.log("Sending updates...")
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <motion.h2 
          className="text-base font-semibold text-gray-900"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          Quick Actions
        </motion.h2>
        <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
          {actions.reduce((sum, action) => sum + action.count, 0)} Total Tasks
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <ActionCard {...action} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
