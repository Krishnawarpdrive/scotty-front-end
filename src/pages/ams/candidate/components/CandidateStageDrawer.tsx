
import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CandidateStageDrawerProps {
  open: boolean;
  onClose: () => void;
  stageData: any;
}

export const CandidateStageDrawer: React.FC<CandidateStageDrawerProps> = ({
  open,
  onClose,
  stageData
}) => {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] w-[60%] ml-auto">
        <DrawerHeader className="border-b">
          <DrawerTitle>Stage Details</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stage Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Stage Name: {stageData?.name}</p>
                  <p>Status: {stageData?.status}</p>
                  {stageData?.dueDate && <p>Due Date: {stageData?.dueDate}</p>}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="actions" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Required Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  {stageData?.requiredActions ? (
                    <ul>
                      {stageData.requiredActions.map((action: string, index: number) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No actions required for this stage.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
