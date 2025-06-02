
import { useState, useEffect } from 'react';
import { CandidateWithPipelines } from '../types/MultiPipelineTypes';

export const useMultiPipelineData = (candidateId: string | null) => {
  const [candidate, setCandidate] = useState<CandidateWithPipelines | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!candidateId) {
      setCandidate(null);
      return;
    }

    const fetchCandidateData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Mock data for now - replace with actual API call
        const mockCandidate: CandidateWithPipelines = {
          id: candidateId,
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1 (555) 123-4567",
          current_position: "Senior Frontend Developer",
          current_employer: "TechCorp Inc.",
          experience_years: 5,
          skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
          location: "San Francisco, CA",
          status: "Active",
          overall_score: 85,
          resume_url: "#",
          last_updated: "2024-01-20",
          role_applications: [
            {
              id: "app1",
              role_name: "Senior Frontend Engineer",
              client_name: "TechStart Inc",
              applied_date: "2024-01-15",
              current_stage: "Technical Interview",
              stage_progress: 3,
              total_stages: 5,
              status: "Active",
              hiring_manager: "Sarah Johnson",
              ta_assigned: "Mike Chen",
              next_action: "Schedule final interview",
              next_action_date: "2024-01-25",
              pipeline_type: "client",
              priority: "High",
              stages: [
                {
                  id: "stage1",
                  name: "Phone Screening",
                  status: "completed",
                  order: 1,
                  type: "screening",
                  required_actions: [],
                  completed_date: "2024-01-16"
                },
                {
                  id: "stage2",
                  name: "Technical Assessment",
                  status: "completed",
                  order: 2,
                  type: "assessment",
                  required_actions: [],
                  completed_date: "2024-01-18"
                },
                {
                  id: "stage3",
                  name: "Technical Interview",
                  status: "current",
                  order: 3,
                  type: "interview",
                  required_actions: ["Schedule interview", "Prepare questions"],
                  estimated_date: "2024-01-25",
                  interview_details: {
                    duration_minutes: 60,
                    interviewer: "John Smith",
                    type: "technical",
                    status: "scheduled"
                  }
                },
                {
                  id: "stage4",
                  name: "Client Interview",
                  status: "pending",
                  order: 4,
                  type: "interview",
                  required_actions: ["Coordinate with client"],
                  interview_details: {
                    duration_minutes: 45,
                    interviewer: "Client Team",
                    type: "behavioral",
                    status: "scheduled"
                  }
                },
                {
                  id: "stage5",
                  name: "Offer Discussion",
                  status: "pending",
                  order: 5,
                  type: "offer",
                  required_actions: ["Prepare offer details"]
                }
              ]
            },
            {
              id: "app2",
              role_name: "Lead Developer",
              client_name: "Innovation Labs",
              applied_date: "2024-01-10",
              current_stage: "Client Interview",
              stage_progress: 4,
              total_stages: 5,
              status: "Active",
              hiring_manager: "David Wilson",
              ta_assigned: "Lisa Brown",
              next_action: "Await client feedback",
              next_action_date: "2024-01-24",
              pipeline_type: "partner",
              priority: "Medium",
              stages: [
                {
                  id: "stage1",
                  name: "Initial Screening",
                  status: "completed",
                  order: 1,
                  type: "screening",
                  required_actions: [],
                  completed_date: "2024-01-11"
                },
                {
                  id: "stage2",
                  name: "Technical Round",
                  status: "completed",
                  order: 2,
                  type: "interview",
                  required_actions: [],
                  completed_date: "2024-01-15"
                },
                {
                  id: "stage3",
                  name: "Partner Interview",
                  status: "completed",
                  order: 3,
                  type: "interview",
                  required_actions: [],
                  completed_date: "2024-01-19"
                },
                {
                  id: "stage4",
                  name: "Client Interview",
                  status: "current",
                  order: 4,
                  type: "interview",
                  required_actions: ["Follow up with client"],
                  estimated_date: "2024-01-24"
                },
                {
                  id: "stage5",
                  name: "Final Decision",
                  status: "pending",
                  order: 5,
                  type: "offer",
                  required_actions: ["Prepare final documentation"]
                }
              ]
            }
          ]
        };

        setCandidate(mockCandidate);
      } catch (err) {
        setError('Failed to fetch candidate data');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [candidateId]);

  return { candidate, loading, error, setCandidate };
};
