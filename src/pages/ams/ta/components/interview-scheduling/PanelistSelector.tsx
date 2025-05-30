
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Star, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import type { Panelist } from './types/InterviewTypes';

interface PanelistSelectorProps {
  interviewType: string;
  onSelect: (panelistId: string) => void;
}

export const PanelistSelector: React.FC<PanelistSelectorProps> = ({
  interviewType,
  onSelect
}) => {
  const [panelists, setPanelists] = useState<Panelist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPanelist, setSelectedPanelist] = useState<string>('');

  useEffect(() => {
    loadPanelists();
  }, [interviewType]);

  const loadPanelists = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('interview_panelists')
        .select('*')
        .eq('status', 'active')
        .eq('availability_status', 'available')
        .contains('interview_types', [interviewType]);

      if (error) throw error;
      
      const formattedPanelists: Panelist[] = (data || []).map(item => ({
        ...item,
        skills: Array.isArray(item.skills) ? item.skills.map(s => String(s)) : [],
        certifications: Array.isArray(item.certifications) ? item.certifications.map(c => String(c)) : [],
        languages: Array.isArray(item.languages) ? item.languages.map(l => String(l)) : [],
        interview_types: Array.isArray(item.interview_types) ? item.interview_types.map(t => String(t)) : [],
        preferred_time_slots: item.preferred_time_slots as Record<string, any> || {},
        projects_worked_on: Array.isArray(item.projects_worked_on) ? item.projects_worked_on.map(p => String(p)) : [],
        tools_used: Array.isArray(item.tools_used) ? item.tools_used.map(t => String(t)) : []
      }));
      
      setPanelists(formattedPanelists);
    } catch (error) {
      console.error('Error loading panelists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (panelistId: string) => {
    setSelectedPanelist(panelistId);
    onSelect(panelistId);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (panelists.length === 0) {
    return (
      <div className="text-center py-8">
        <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Available Panelists</h3>
        <p className="text-gray-600">
          No panelists are currently available for {interviewType} interviews.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {panelists.map((panelist) => (
        <motion.div
          key={panelist.id}
          whileHover={{ scale: 1.01 }}
          className={`
            relative p-4 border rounded-lg cursor-pointer transition-all
            ${selectedPanelist === panelist.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          onClick={() => handleSelect(panelist.id)}
        >
          {selectedPanelist === panelist.id && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {panelist.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{panelist.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{panelist.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {panelist.title} • {panelist.department}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {panelist.total_interviews} interviews
                </span>
                <Badge 
                  variant={panelist.availability_status === 'available' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {panelist.availability_status}
                </Badge>
              </div>

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
            </div>
          </div>
        </motion.div>
      ))}

      {selectedPanelist && (
        <div className="flex justify-end">
          <Button onClick={() => onSelect(selectedPanelist)}>
            Continue with Selected Panelist
          </Button>
        </div>
      )}
    </div>
  );
};
