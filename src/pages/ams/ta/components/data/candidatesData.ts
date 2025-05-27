
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
    timeInStage: "2 days",
    hiring: "Frontend Developer",
    interviewing: "React Developer",
    stage: {
      current: 3,
      total: 5
    },
    responsible: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg"
    },
    timeSpent: "2 days",
    targetDate: "2024-01-15"
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
    timeInStage: "1 day",
    hiring: "Backend Developer",
    interviewing: "Node.js Developer",
    stage: {
      current: 2,
      total: 5
    },
    responsible: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg"
    },
    timeSpent: "1 day",
    targetDate: "2024-01-18"
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
    timeInStage: "0 days",
    hiring: "Full Stack Developer",
    interviewing: "MERN Stack Developer",
    stage: {
      current: 5,
      total: 5
    },
    responsible: {
      name: "David Brown",
      avatar: "/placeholder.svg"
    },
    timeSpent: "5 days",
    targetDate: "2024-01-10"
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
    timeInStage: "3 days",
    hiring: "UI/UX Designer",
    interviewing: "Product Designer",
    stage: {
      current: 4,
      total: 5
    },
    responsible: {
      name: "Jane Smith",
      avatar: "/placeholder.svg"
    },
    timeSpent: "3 days",
    targetDate: "2024-01-20"
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
    timeInStage: "5 days",
    hiring: "DevOps Engineer",
    interviewing: "Cloud Engineer",
    stage: {
      current: 1,
      total: 5
    },
    responsible: {
      name: "John Doe",
      avatar: "/placeholder.svg"
    },
    timeSpent: "5 days",
    targetDate: "2024-01-12"
  }
];
