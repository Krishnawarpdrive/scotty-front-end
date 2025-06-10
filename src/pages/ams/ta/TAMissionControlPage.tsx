
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MissionControl } from './components/MissionControl';
import { DAMappingInterface } from './components/da-mapping/DAMappingInterface';

const TAMissionControlPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="mission-control" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mission-control">Mission Control</TabsTrigger>
          <TabsTrigger value="da-mapping">DA Mapping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mission-control" className="space-y-6">
          <MissionControl />
        </TabsContent>
        
        <TabsContent value="da-mapping" className="space-y-6">
          <DAMappingInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TAMissionControlPage;
