
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Filter, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Calendar,
  Award,
  Languages,
  Briefcase
} from "lucide-react";
import { usePanelists } from "../hooks/usePanelists";
import { CreatePanelistDrawer } from "./CreatePanelistDrawer";
import { PanelistDetailDrawer } from "./PanelistDetailDrawer";
import { Panelist } from "../types/PanelistTypes";

const InterviewPanelistLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPanelist, setSelectedPanelist] = useState<Panelist | null>(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  const { panelists, isLoading, createPanelist } = usePanelists({
    searchQuery: searchQuery.trim() || undefined
  });

  const handlePanelistClick = (panelist: Panelist) => {
    setSelectedPanelist(panelist);
    setIsDetailDrawerOpen(true);
  };

  const handleCreatePanelist = async (data: any) => {
    try {
      await createPanelist(data);
      setIsCreateDrawerOpen(false);
    } catch (error) {
      console.error('Error creating panelist:', error);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-3 bg-gray-300 rounded w-32"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview Panelist Library</h1>
          <p className="text-gray-600 mt-2">Manage your interview panelists and their availability</p>
        </div>
        <Button onClick={() => setIsCreateDrawerOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Panelist
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search panelists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Panelists</p>
                <p className="text-2xl font-bold">{panelists.length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold">
                  {panelists.filter(p => p.availability_status === 'available').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {panelists.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {panelists.length > 0 
                    ? (panelists.reduce((sum, p) => sum + p.rating, 0) / panelists.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panelists Grid */}
      {panelists.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No panelists found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? "No panelists match your search criteria. Try adjusting your filters."
                : "Get started by adding your first interview panelist to the library."
              }
            </p>
            <Button onClick={() => setIsCreateDrawerOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Panelist
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {panelists.map((panelist) => (
            <Card 
              key={panelist.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handlePanelistClick(panelist)}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={panelist.avatar_url} alt={panelist.name} />
                    <AvatarFallback>{getInitials(panelist.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{panelist.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{panelist.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(panelist.status)} variant="secondary">
                        {panelist.status}
                      </Badge>
                      <Badge className={getAvailabilityColor(panelist.availability_status)} variant="secondary">
                        {panelist.availability_status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{panelist.department}</span>
                </div>
                
                {panelist.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{panelist.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>{panelist.rating.toFixed(1)} rating</span>
                  </div>
                  <span className="text-gray-600">{panelist.total_interviews} interviews</span>
                </div>

                {panelist.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {panelist.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {panelist.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{panelist.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Mail className="h-3 w-3" />
                    <span>{panelist.email}</span>
                  </div>
                  {panelist.phone && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Phone className="h-3 w-3" />
                      <span>{panelist.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Panelist Drawer */}
      <CreatePanelistDrawer
        open={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        onSubmit={handleCreatePanelist}
      />

      {/* Panelist Detail Drawer */}
      {selectedPanelist && (
        <PanelistDetailDrawer
          open={isDetailDrawerOpen}
          onClose={() => {
            setIsDetailDrawerOpen(false);
            setSelectedPanelist(null);
          }}
          panelist={selectedPanelist}
        />
      )}
    </div>
  );
};

export default InterviewPanelistLibrary;
