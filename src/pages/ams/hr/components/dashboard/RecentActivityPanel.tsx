
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockActivityData } from '../../mock-dashboard-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

interface RecentActivityPanelProps {
  collapsed: boolean;
  onToggle: () => void;
  onActivityClick: (activity: any) => void;
}

export const RecentActivityPanel: React.FC<RecentActivityPanelProps> = ({ 
  collapsed, 
  onToggle,
  onActivityClick
}) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter activity items based on type and search term
  const filteredActivity = mockActivityData
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item => 
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.target.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <div className={`border-l bg-gray-50 overflow-hidden flex flex-col transition-all duration-300 ${
      collapsed ? 'w-0 opacity-0' : 'w-80 opacity-100'
    }`}>
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h3 className="font-medium">Recent Activity</h3>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col" onValueChange={setFilter}>
        <div className="px-4 pt-4 space-y-3">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="role">Roles</TabsTrigger>
            <TabsTrigger value="candidate">Candidates</TabsTrigger>
            <TabsTrigger value="client">Clients</TabsTrigger>
          </TabsList>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search activity..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <TabsContent value="all" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList items={filteredActivity} onActivityClick={onActivityClick} />
        </TabsContent>
        
        <TabsContent value="role" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList items={filteredActivity} onActivityClick={onActivityClick} />
        </TabsContent>
        
        <TabsContent value="candidate" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList items={filteredActivity} onActivityClick={onActivityClick} />
        </TabsContent>
        
        <TabsContent value="client" className="flex-1 overflow-y-auto p-4 data-[state=active]:flex-1">
          <ActivityList items={filteredActivity} onActivityClick={onActivityClick} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ActivityListProps {
  items: any[];
  onActivityClick: (activity: any) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ items, onActivityClick }) => {
  return (
    <AnimatePresence>
      {items.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No activities match your search
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((item, i) => (
            <motion.li 
              key={i} 
              className="pb-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-100 rounded-lg transition-colors p-2 -mx-2 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onActivityClick(item)}
            >
              <div className="flex items-start">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={item.avatarUrl} />
                  <AvatarFallback>
                    {item.user.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{item.user}</span>
                    {' '}
                    <span>{item.action}</span>
                    {' '}
                    <span className="text-blue-600 hover:underline">
                      {item.target}
                    </span>
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
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </AnimatePresence>
  );
};

export const CollapsedActivityPanel: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  return (
    <div className="border-l bg-gray-50 flex flex-col items-center py-4 px-2">
      <Button variant="ghost" size="icon" onClick={onToggle} className="mb-4">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="writing-mode-vertical-rl transform rotate-180 text-gray-500 text-sm font-medium">
        Recent Activity
      </div>
    </div>
  );
};
