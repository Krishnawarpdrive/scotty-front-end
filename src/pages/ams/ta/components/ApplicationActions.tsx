
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
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-[#009933]/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={isHovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="p-2 rounded-lg bg-[#009933]/10 text-[#009933]"
              >
                {icon}
              </motion.div>
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            <Badge variant="outline" className={getUrgencyColor()}>
              {getUrgencyIcon()}
              {urgency}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{count}</span>
              <span className="text-sm text-gray-500">pending</span>
            </div>
            <Button
              onClick={onClick}
              size="sm"
              className="bg-[#009933] hover:bg-[#00a341] text-white transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <motion.span
                animate={isHovered ? { x: 2 } : { x: 0 }}
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
      icon: <Phone className="h-4 w-4" />,
      title: "Follow-up Calls",
      description: "Candidates awaiting response",
      count: 8,
      urgency: 'high' as const,
      onClick: () => console.log("Making follow-up calls...")
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      title: "Schedule Interviews",
      description: "Ready for next round",
      count: 5,
      urgency: 'medium' as const,
      onClick: () => console.log("Scheduling interviews...")
    },
    {
      icon: <FileText className="h-4 w-4" />,
      title: "Review Applications",
      description: "New submissions to evaluate",
      count: 12,
      urgency: 'medium' as const,
      onClick: () => console.log("Reviewing applications...")
    },
    {
      icon: <Mail className="h-4 w-4" />,
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
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <motion.h2 
          className="text-lg font-semibold text-gray-900"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          Quick Actions
        </motion.h2>
        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
          {actions.reduce((sum, action) => sum + action.count, 0)} Total Tasks
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
