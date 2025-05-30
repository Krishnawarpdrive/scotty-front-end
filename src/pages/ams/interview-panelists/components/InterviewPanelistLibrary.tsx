
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserPlus, Search } from 'lucide-react';
import { PanelistCreationDrawer } from './PanelistCreationDrawer';
import { supabase } from '@/integrations/supabase/client';
import type { Panelist } from '@/pages/ams/ta/components/interview-scheduling/types/InterviewTypes';

const InterviewPanelistLibrary: React.FC = () => {
  const [panelists, setPanelists] = useState<Panelist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadPanelists = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('interview_panelists')
        .select('*');

      if (error) throw error;
      
      // Transform the data to match Panelist interface
      const transformedData: Panelist[] = (data || []).map(item => ({
        ...item,
        skills: Array.isArray(item.skills) ? item.skills.map(s => String(s)) : [],
        certifications: Array.isArray(item.certifications) ? item.certifications.map(c => String(c)) : [],
        languages: Array.isArray(item.languages) ? item.languages.map(l => String(l)) : [],
        interview_types: Array.isArray(item.interview_types) ? item.interview_types.map(t => String(t)) : [],
        preferred_time_slots: item.preferred_time_slots as Record<string, any> || {},
        projects_worked_on: Array.isArray(item.projects_worked_on) ? item.projects_worked_on.map(p => String(p)) : [],
        tools_used: Array.isArray(item.tools_used) ? item.tools_used.map(t => String(t)) : []
      }));
      
      setPanelists(transformedData);
    } catch (error) {
      console.error('Error loading panelists:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPanelists();
  }, [loadPanelists]);

  const handleCreateSuccess = () => {
    loadPanelists();
  };

  const filteredPanelists = panelists.filter(panelist =>
    panelist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    panelist.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Interview Panelist Library</h2>
        <Button onClick={() => setShowCreateDrawer(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Create Panelist
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search panelists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <PanelistCreationDrawer
        open={showCreateDrawer}
        onClose={() => setShowCreateDrawer(false)}
        onSuccess={handleCreateSuccess}
      />

      <Table>
        <TableCaption>A list of your interview panelists.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : filteredPanelists.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No panelists found.</TableCell>
            </TableRow>
          ) : (
            filteredPanelists.map((panelist) => (
              <TableRow key={panelist.id}>
                <TableCell>{panelist.name}</TableCell>
                <TableCell>{panelist.email}</TableCell>
                <TableCell>{panelist.title}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total {filteredPanelists.length} panelists</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default InterviewPanelistLibrary;
