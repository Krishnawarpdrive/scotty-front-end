
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-muted-foreground mb-4">No clients found</p>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Your First Client
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
