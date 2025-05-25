
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockActivityData } from '../../mock-dashboard-data';
import { motion, AnimatePresence } from 'framer-motion';

interface RecentActivityPanelProps {
  collapsed: boolean;
  onToggle: () => void;
  onPersonClick: (person: string) => void;
  onRoleClick: (role: string) => void;
}

export const RecentActivityPanel: React.FC<RecentActivityPanelProps> = ({ 
  collapsed, 
  onToggle, 
  onPersonClick, 
  onRoleClick 
}) => {
  const [filter, setFilter] = useState('all');
  
  const filteredActivity = filter === 'all' 
    ? mockActivityData 
    : mockActivityData.filter(item => item.type === filter);
  
  if (collapsed) {
    return (
      <div className="w-12 border-l bg-gray-50 flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={onToggle} className="mb-4">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div 
          className="transform -rotate-90 text-gray-500 text-sm font-medium whitespace-nowrap origin-center"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Recent Activity
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-80 border-l bg-gray-50 overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h3 className="font-medium">Recent Activity</h3>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col" onValueChange={setFilter}>
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="role" className="flex-1">Roles</TabsTrigger>
            <TabsTrigger value="candidate" className="flex-1">Candidates</TabsTrigger>
            <TabsTrigger value="client" className="flex-1">Clients</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList 
            items={filteredActivity} 
            onPersonClick={onPersonClick}
            onRoleClick={onRoleClick}
          />
        </TabsContent>
        
        <TabsContent value="role" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList 
            items={filteredActivity} 
            onPersonClick={onPersonClick}
            onRoleClick={onRoleClick}
          />
        </TabsContent>
        
        <TabsContent value="candidate" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList 
            items={filteredActivity} 
            onPersonClick={onPersonClick}
            onRoleClick={onRoleClick}
          />
        </TabsContent>
        
        <TabsContent value="client" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList 
            items={filteredActivity} 
            onPersonClick={onPersonClick}
            onRoleClick={onRoleClick}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ActivityListProps {
  items: any[];
  onPersonClick: (person: string) => void;
  onRoleClick: (role: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ items, onPersonClick, onRoleClick }) => {
  return (
    <AnimatePresence>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <motion.li 
            key={i} 
            className="pb-3 border-b border-gray-100 last:border-b-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-start">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={item.avatarUrl} />
                <AvatarFallback>
                  {item.user.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <button
                    onClick={() => onPersonClick(item.user)}
                    className="font-medium hover:text-blue-600 hover:underline cursor-pointer"
                  >
                    {item.user}
                  </button>
                  {' '}
                  <span>{item.action}</span>
                  {' '}
                  <button
                    onClick={() => onRoleClick(item.target)}
                    className="text-blue-600 hover:underline cursor-pointer font-medium"
                  >
                    {item.target}
                  </button>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-gray-500">{item.time}</span>
                  {item.alert && (
                    <span 
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        item.alertLevel === 'critical' ? 'bg-red-100 text-red-800' :
                        item.alertLevel === 'warning' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.alert}
                    </span>
                  )}
                </div>
                <div className="flex mt-2 gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">Follow up</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">View</Button>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
};

export const CollapsedActivityPanel: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  return (
    <div className="w-12 border-l bg-gray-50 flex flex-col items-center py-4">
      <Button variant="ghost" size="icon" onClick={onToggle} className="mb-4">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div 
        className="transform -rotate-90 text-gray-500 text-sm font-medium whitespace-nowrap origin-center"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        Recent Activity
      </div>
    </div>
  );
};
