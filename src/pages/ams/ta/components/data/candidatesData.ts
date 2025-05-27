
import { Candidate } from "../types/CandidateTypes";

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    role: "Frontend Developer",
    status: "active",
    priority: "high",
    score: 85,
    currentStage: 3,
    totalStages: 5,
    timeInStage: "2 days"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    role: "Backend Developer",
    status: "pending",
    priority: "medium",
    score: 92,
    currentStage: 2,
    totalStages: 5,
    timeInStage: "1 day"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    role: "Full Stack Developer",
    status: "completed",
    priority: "low",
    score: 78,
    currentStage: 5,
    totalStages: 5,
    timeInStage: "0 days"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    role: "UI/UX Designer",
    status: "active",
    priority: "high",
    score: 88,
    currentStage: 4,
    totalStages: 5,
    timeInStage: "3 days"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@email.com",
    role: "DevOps Engineer",
    status: "rejected",
    priority: "medium",
    score: 65,
    currentStage: 1,
    totalStages: 5,
    timeInStage: "5 days"
  }
];
