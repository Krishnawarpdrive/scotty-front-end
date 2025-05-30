
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, Star, Calendar, TrendingUp } from "lucide-react";
import { usePanelistStats } from "../hooks/usePanelistStats";

interface PanelistsHeaderProps {
  onCreatePanelist: () => void;
}

export const PanelistsHeader: React.FC<PanelistsHeaderProps> = ({
  onCreatePanelist
}) => {
  const { stats, isLoading } = usePanelistStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Panelist Library</h1>
          <p className="text-muted-foreground">
            Manage your interview panel experts and track their performance
          </p>
        </div>
        <Button onClick={onCreatePanelist} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Panelist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Panelists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.totalPanelists || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "..." : `${stats?.activePanelists || 0} active`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : (stats?.averageRating || 0).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0 stars
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.interviewsThisWeek || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Interviews scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : `${stats?.utilizationRate || 0}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              Panel capacity used
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
